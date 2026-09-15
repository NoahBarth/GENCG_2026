import type { QuartzTransformerPlugin } from "@quartz-community/types"
import { visit } from "unist-util-visit"

const htmlEmbedRegex =
  /!\[\[([^\]|]+\.html)(?:\|(\d+)(?:x(\d+))?)?\]\]/gi

const svgEmbedRegex =
  /!\[\[([^\]|]+\.svg)(?:\|(\d+)(?:x(\d+))?)?\]\]/gi

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

export const HtmlEmbed: QuartzTransformerPlugin = () => {
  return {
    name: "HtmlEmbed",

    textTransform(_ctx, src) {
      // SVG:
      //
      // ![[attachments/image.svg]]
      // ![[attachments/image.svg|800]]
      // ![[attachments/image.svg|800x500]]
      //
      // Convert to <img> BEFORE CrawlLinks.
      // CrawlLinks will then resolve the path correctly.
      src = src.replace(
        svgEmbedRegex,
        (_match, rawSrc: string, rawWidth?: string, rawHeight?: string) => {
          const embedSrc = rawSrc.trim()

          const size =
            rawWidth !== undefined
              ? ` width="${rawWidth}"${
                  rawHeight !== undefined
                    ? ` height="${rawHeight}"`
                    : ""
                }`
              : ""

          return `<img src="${escapeAttribute(
            embedSrc,
          )}"${size} alt="" class="svg-embed">`
        },
      )

      // Standalone HTML:
      //
      // Keep it hidden from CrawlLinks until after CrawlLinks runs.
      src = src.replace(
        htmlEmbedRegex,
        (_match, rawSrc: string, rawWidth?: string, rawHeight?: string) => {
          const embedSrc = rawSrc.trim()
          const width = rawWidth ?? "100%"
          const height = rawHeight ?? "600"

          return `<quartz-html-embed src="${escapeAttribute(
            embedSrc,
          )}" width="${width}" height="${height}"></quartz-html-embed>`
        },
      )

      return src
    },

    htmlPlugins() {
      return [
        () => {
          return (tree) => {
            visit(tree, "element", (node: any) => {
              if (node.tagName !== "quartz-html-embed") {
                return
              }

              const src = node.properties?.src

              if (typeof src !== "string") {
                return
              }

              node.tagName = "iframe"

              node.properties = {
                src,
                width: node.properties?.width ?? "100%",
                height: node.properties?.height ?? "600",
                loading: "lazy",
                sandbox: ["allow-scripts"],
                className: ["html-embed"],
                style: "border: 0;",
              }

              node.children = []
            })
          }
        },
      ]
    },
  }
}
