# Generative Computer Graphics Journal

This repository is your working journal for weekly notes, experiments, reflections, drawings, and creative-code sketches.

Write journal entries in [Obsidian](https://obsidian.md/). Create sketches locally with VS Code or use the online [p5.js Editor](https://editor.p5js.org/).

When you push changes to GitHub, the journal is automatically published as a website using Quartz and GitHub Pages.

## Create your journal repository

Create your own repository from this template before you begin:

1. On the template repository page, select **Use this template**.
2. Select **Create a new repository**.
3. Choose your GitHub account as the owner.
4. Give the repository a name.
5. Choose **Public**, unless your instructor tells you otherwise.
6. Select **Create repository**.

Do not fork the template. A repository created from the template starts with a clean history containing a single initial commit.

## Enable GitHub Pages

Enable publishing once in your new repository:

1. Open **Settings** in your repository.
2. Select **Pages** under **Code, planning, and automation**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and check the **Deploy Quartz** workflow.
5. If the workflow has not started, open it and select **Run workflow**.

After a successful deployment, GitHub shows the website address in **Settings > Pages**.

## Setup

Install:

- [Git](https://git-scm.com/)
- [Obsidian](https://obsidian.md/)
- [VS Code](https://code.visualstudio.com/), recommended for local sketches

Then:

1. Clone your new repository, not the template repository.
2. Open Obsidian.
3. Select **Open folder as vault**.
4. Choose the cloned repository folder.
5. Install the Obsidian plugins listed below.

## Obsidian plugins

Open **Settings > Community plugins > Browse**.

Install and enable:

- **Embed HTML** by mnaoumov, for embedding HTML sketches.
- **Excalidraw** by Zsolt Viczian, for creating and embedding drawings.
- **Format with Prettier** by Alex Gavrusev, for consistent Markdown formatting.
- **Obsidian Git**, if you want to manage Git from inside Obsidian.

Obsidian Git is optional. You can use the Git tools built into VS Code instead.

## Editing sketches

### Option 1: VS Code

This is the recommended option.

Create each sketch inside the appropriate weekly folder:

```text
weeks/w01/sketches/my-sketch/
├── index.html
├── sketch.js
└── style.css
```

Open the repository folder in VS Code and edit the files locally.

Embed the local sketch in your journal:

```md
![[./sketches/my-sketch/index.html]]
```

### Option 2: p5.js Editor

You can also create and host a sketch using the online p5.js Editor.

When the sketch is ready:

1. Save the sketch in your p5.js account.
2. Copy its fullscreen URL from the p5.js Editor.
3. Paste the URL into an iframe in your journal page.
4. Commit and push the journal page to GitHub.

For example:

```html
<iframe
  src="https://editor.p5js.org/your-username/full/your-sketch-id"
  width="800"
  height="600"
  style="border: 0;"
  allowfullscreen
>
</iframe>
```

Replace the `src` URL with the fullscreen URL of your p5.js sketch.

You do not need to download the sketch or add its files to this repository. The sketch remains hosted by the p5.js Editor. If the online sketch is deleted or becomes unavailable, the embedded version will also stop working.

## Working with Git

Choose one Git workflow.

### Option 1: Obsidian Git

Use the Obsidian Git plugin to pull, commit, and push changes from Obsidian.

### Option 2: VS Code

Use the **Source Control** panel in VS Code to pull, review, commit, and push changes.

You do not need to use both options. They work with the same local repository.

Use this workflow each time:

1. Pull before starting.
2. Edit your journal or sketches.
3. Save and review your changes.
4. Commit with a short, clear message.
5. Push to GitHub.

For ordinary journal updates, you can work on `main`. Use a separate branch and pull request for larger structural or publishing changes.

## Repository structure

```text
weeks/
├── w01/
│   ├── index.md
│   ├── journal.md
│   └── sketches/
├── w02/
│   └── ...
attachments/
Excalidraw/
sketches/
index.md
```

- `weeks/wXX/` contains the work for each week.
- `journal.md` contains weekly documentation and reflection.
- `index.md` links to the pages for that week.
- `weeks/wXX/sketches/` contains sketches developed locally with VS Code.
- `attachments/` contains images, videos, audio, and other media.
- `Excalidraw/` contains Excalidraw drawings.

Sketches hosted in the p5.js Editor do not need a local folder.

You normally do not need to edit `.github/`, `quartz.config.yaml`, or `quartz-plugins/`.

## Journal pages

Start each page with frontmatter:

```yaml
---
title: Week 01 Journal
date: 2026-09-14
week: 1
tags:
  - journal
  - experiment
publish: true
---
```

Each weekly entry should document:

- Exploration and experimentation
- Influences and references
- Algorithmic thinking
- Critical reflection

Include both successful and unsuccessful experiments. The journal should show your process, not only finished results.

## Embedding content

Embed an image:

```md
![[my-image.jpg]]
```

Embed an Excalidraw drawing:

```md
![[My Drawing.excalidraw]]
```

Embed a local HTML sketch:

```md
![[./sketches/my-sketch/index.html]]
```

You can optionally specify its size:

```md
![[./sketches/my-sketch/index.html|800x500]]
```

Embed a sketch hosted in the p5.js Editor:

```html
<iframe
  src="https://editor.p5js.org/your-username/full/your-sketch-id"
  width="800"
  height="600"
  style="border: 0;"
  allowfullscreen
>
</iframe>
```

## Publishing

After GitHub Pages is enabled, pushing changes to `main` starts the deployment automatically.

Open the repository's **Actions** tab to check whether the **Deploy Quartz** workflow succeeded. The deployment may take a few minutes.

## Privacy

This repository is public. Do not commit:

- Passwords or API keys
- Personal or sensitive information
- Files that should remain private

The `private/` folder is excluded from the published website, but committed files may still be visible in the public GitHub repository.
