# Repository Guidelines

## Project Structure & Module Organization

This is a static website for Dongyan Design. The main entry is `index.html`; global legacy styles live in `styles.css`; shared navigation rendering lives in `nav.js`. Shared navigation and menu data belongs in `assets/js/site-data.js`. Split CSS should stay focused: `assets/css/navigation.css` for all navigation behavior and `assets/css/portfolio.css` for cases/plans index pages. Content sections are organized by route folders such as `cases/`, `plans/`, `notes/`, `about/`, `services/`, `faq/`, and `contact/`.

## Build, Test, and Development Commands

Run `npm install` once after cloning. Use `npm run check:prepublish` for static release checks, including required files, shared navigation loading order, and protected detail-page sticky layout rules. Use `npm run check:prepublish:render` before publishing; it runs the static checks plus Playwright rendering checks on desktop and 390px mobile viewports.

For a local preview, serve the repository root with a static server, for example:

```bash
python3 -m http.server 4173
```

## Coding Style & Naming Conventions

Keep HTML route folders lowercase and URL-stable, such as `cases/space-014/`. Prefer small, scoped changes. Do not duplicate navigation markup in individual pages; update `assets/js/site-data.js` and `nav.js` instead. Use two-space indentation in HTML, CSS, and JavaScript where the file already follows that style.

## Testing Guidelines

Before publishing, always check: home page, `/cases/`, `/plans/`, one space detail page, one plan detail page, and mobile width `390px`. New visual or navigation changes must pass both prepublish scripts with no horizontal overflow or console errors.

## Commit & Pull Request Guidelines

Use short imperative commit messages, for example `Refine portfolio entry layout` or `Add shared navigation data`. Pull requests should describe the visible change, list affected routes, include screenshots for layout changes, and state the exact verification commands run.

## Agent-Specific Instructions

Publish only from a full clone of the official repository. Do not push from a dirty local experiment directory. After every formal publish, update `README.md`, `设计与内容决策.md`, and `网站修改记录.md`.
