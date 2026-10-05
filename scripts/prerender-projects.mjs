// Pre-render static HTML SEO pages for projects: /projects/<slug>/

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import plaintext from "highlight.js/lib/languages/plaintext";

// Register languages for code syntax highlighting
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("text", plaintext);

// Code block syntax highlighting with marked
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      // Fallback to plaintext for unregistered languages
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

import { projects } from "../src/data/projects.js";
import { slugify } from "../src/utils/slug.js";
import { anchorId } from "../src/utils/readme.js";

// Prerender configuration
const SITE = "https://himanshusinghdangi.vercel.app";
const AUTHOR = "Himanshu Singh Dangi";
const MIN_README_LENGTH = 250; // use README only when longer than this
const TODAY = "2026-10-11";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");

if (!existsSync(dist)) {
  console.error("dist/ not found. Run `vite build` first.");
  process.exit(1);
}

// Utility helpers

// Escape text for HTML
const esc = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Clean description formatting
const clean = (s = "") =>
  s.replace(/\*/g, "").replace(/\s+/g, " ").trim();

// Resolve absolute image URL for og:image
const abs = (u) => (!u ? "" : u.startsWith("http") ? u : SITE + u);

// Truncate meta description
const shortDescription = (s) => {
  const text = clean(s);
  if (text.length <= 155) return text;
  const cut = text.slice(0, 155);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
};

// Extract category label
const categoryHook = (c = "") =>
  c.replace(/^[^•]*•\s*/, "").trim() || "Project";

// Parse GitHub repo owner and name
const parseRepo = (url = "") => {
  const m = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  return m ? { owner: m[1], repo: m[2] } : null;
};

// Extract hostname from URL
const hostOf = (url = "") => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

// Strip HTML tags from text
const plain = (html = "") =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

// Check for internal TOC heading
const isContentsHeading = (text) =>
  /^(table\s+of\s+contents|contents|index)$/i.test(text.trim());

// Remap heading levels so h1 is reserved for page title
function normalizeHeadings(html) {
  const levels = [...html.matchAll(/<h([1-6])(?=[\s>])/g)].map((m) => Number(m[1]));
  if (levels.length === 0) return html;

  const top = Math.min(...levels);
  const level = (n) => Math.min(n - top + 2, 6);

  return html.replace(
    /<(\/?)h([1-6])(?=[\s>])/g,
    (match, slash, n) => `<${slash}h${level(Number(n))}`
  );
}

// README fetching and processing

// Fetch raw README markdown from GitHub default branch
async function fetchReadme(owner, repo) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    if (text.length < MIN_README_LENGTH) return null;
    return text;
  } catch {
    return null; // Fallback to project card description if offline or slow
  }
}

// Rewrite relative README links and images to GitHub URLs
function fixReadmeLinks(html, owner, repo) {
  const isAbsolute = (u) => /^(https?:|mailto:|tel:|#|\/\/|data:)/i.test(u);

  html = html.replace(
    /<img([^>]*?)src="([^"]+)"([^>]*?)>/g,
    (match, before, src, after) => {
      if (isAbsolute(src)) return match;
      const fixed = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${src.replace(/^\.?\//, "")}`;
      return `<img${before}src="${fixed}"${after}>`;
    }
  );

  html = html.replace(
    /<a([^>]*?)href="([^"]*)"([^>]*?)>/g,
    (match, before, href, after) => {
      if (!href || isAbsolute(href)) return match;
      const fixed = `https://github.com/${owner}/${repo}/blob/HEAD/${href.replace(/^\.?\//, "")}`;
      return `<a${before}href="${fixed}"${after}>`;
    }
  );

  return html;
}

// Sanitize HTML to prevent script execution
function sanitize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/href="javascript:[^"]*"/gi, 'href="#"');
}

// Remove duplicate leading H1 that matches page title
function stripLeadingTitle(html, title) {
  const t = title.toLowerCase();
  return html.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/, (match, inner) => {
    const h = plain(inner).toLowerCase();
    return h.includes(t) || t.includes(h) ? "" : match;
  });
}

// Build table of contents from README H2 headings
function buildToc(html) {
  const used = {}; // Track heading slug counts for deduplication
  const items = [];

  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (match, inner) => {
    const label = plain(inner);
    if (isContentsHeading(label)) return match;

    const base = anchorId(label);
    const seen = used[base] || 0;
    used[base] = seen + 1;

    const id = seen ? `${base}-${seen}` : base;
    items.push(`<li><a href="#${id}">${label}</a></li>`);
    return `<h2 id="${id}">${inner}</h2>`;
  });

  if (items.length < 3) return { html, toc: "" };

  const toc = `
      <nav class="toc" aria-label="On this page">
        <p>On this page</p>
        <ul>${items.join("")}</ul>
      </nav>`;
  return { html, toc };
}

function renderReadme(markdown, owner, repo, title) {
  let html = marked.parse(markdown, { gfm: true, breaks: false });
  html = stripLeadingTitle(html, title);
  html = normalizeHeadings(html);
  html = sanitize(fixReadmeLinks(html, owner, repo));
  return buildToc(html);
}

// Page styles
const css = `
/* Design tokens */
:root {
  --bg: #0a0a0a;
  --bg-soft: #111113;
  --card: #18181b;
  --code-bg: #101014;
  --border: #262626;
  --border-strong: #3f3f46;
  --text: #ffffff;
  --text-soft: #e4e4e7;
  --text-muted: #a1a1aa;
  --text-faint: #71717a;
  --accent: #34d399;
  --accent-deep: #052e22;
  --accent-soft: #0f1f1a;
  --accent-border: #1f3d33;
  --gold: #f59e0b;
  --font-heading: "Space Grotesk", "Inter", sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", monospace;
  --radius: 1rem;
}

/* Base */
:root { color-scheme: dark; scroll-behavior: smooth; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-soft);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: var(--accent); }
img { max-width: 100%; }
::selection { background: var(--accent); color: var(--accent-deep); }
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px;
}

/* --- Background art: two soft glows + fading dot grid (CSS only) --- */
.bg-art { position: fixed; inset: 0; z-index: -1; overflow: hidden; }
.bg-art .orb { position: absolute; border-radius: 50%; filter: blur(130px); opacity: 0.14; animation: drift 16s ease-in-out infinite alternate; }
.bg-art .orb-green { width: 520px; height: 520px; background: #065f46; top: -180px; left: -140px; }
.bg-art .orb-gold { width: 440px; height: 440px; background: #92400e; bottom: -200px; right: -150px; animation-delay: -8s; }
.bg-art .dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(#3f3f46 1px, transparent 1px);
  background-size: 26px 26px; opacity: 0.22;
  -webkit-mask-image: radial-gradient(ellipse 90% 55% at 50% 0%, black, transparent);
  mask-image: radial-gradient(ellipse 90% 55% at 50% 0%, black, transparent);
}
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(46px, 32px) scale(1.07); }
}
@media (prefers-reduced-motion: reduce) {
  .bg-art .orb { animation: none; }
  :root { scroll-behavior: auto; }
}

/* --- Top bar with a thin gradient hairline --- */
.nav {
  position: sticky; top: 0; z-index: 10;
  background: rgba(10, 10, 10, 0.82);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav::after {
  content: ""; display: block; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent) 30%, var(--gold) 70%, transparent);
  opacity: 0.5;
}
.nav-inner {
  max-width: 54rem; margin: 0 auto; padding: 0.75rem 1.5rem;
  display: flex; align-items: center; justify-content: space-between;
}
.brand { display: flex; align-items: center; gap: 0.65rem; text-decoration: none; }
.brand img { width: 1.9rem; height: 1.9rem; border-radius: 50%; border: 1px solid var(--border-strong); }
.brand span { color: var(--text); font-weight: 600; font-size: 0.92rem; }
.nav-links { display: flex; gap: 1.2rem; font-size: 0.84rem; }
.nav-links a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: var(--text); }

/* --- Layout --- */
.wrap { max-width: 54rem; margin: 0 auto; padding: 2.6rem 1.5rem 4rem; }

/* Back link */
.back { display: inline-block; margin-bottom: 1.6rem; font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-faint); text-decoration: none; transition: color 0.2s; }
.back:hover { color: var(--accent); }

/* Hero */
.badge {
  display: inline-block; font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; font-family: var(--font-mono);
  color: var(--accent); border: 1px solid var(--accent-border);
  background: var(--accent-soft); border-radius: 999px;
  padding: 0.32rem 0.85rem; margin-bottom: 1rem;
}
h1 {
  font-family: var(--font-heading); color: var(--text);
  font-size: clamp(2.6rem, 6vw, 3.9rem); font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.05; text-wrap: balance;
}
.sub { color: var(--text-muted); font-size: 1.08rem; margin-top: 0.9rem; max-width: 42rem; }
.sub strong { color: var(--text-soft); font-weight: 600; }

/* Buttons */
.actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.7rem; }
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.78rem 1.5rem; border-radius: 0.8rem;
  font-weight: 600; font-size: 0.94rem; text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--accent); color: var(--accent-deep); box-shadow: 0 8px 28px -10px rgba(52, 211, 153, 0.55); }
.btn-primary:hover { box-shadow: 0 12px 34px -10px rgba(52, 211, 153, 0.7); }
.btn-ghost { background: var(--card); color: var(--text); border: 1px solid var(--border-strong); }
.btn-ghost:hover { border-color: var(--text-faint); }

/* Screenshot in a browser frame, sitting on a soft glow */
.shot-wrap { position: relative; margin: 2.6rem 0 0; }
.shot-wrap::before {
  content: ""; position: absolute; inset: 8% -4% -8% -4%; z-index: -1;
  background: radial-gradient(ellipse 60% 55% at 50% 40%, rgba(52, 211, 153, 0.14), transparent 70%);
  filter: blur(40px);
}
.browser {
  border: 1px solid transparent; border-radius: var(--radius); overflow: hidden;
  background: linear-gradient(var(--bg-soft), var(--bg-soft)) padding-box,
              linear-gradient(180deg, #34343a, #17171b) border-box;
  box-shadow: 0 34px 90px -30px rgba(0, 0, 0, 0.9);
}
.browser-bar { display: flex; align-items: center; gap: 0.5rem; padding: 0.7rem 1rem; border-bottom: 1px solid var(--border); background: rgba(255, 255, 255, 0.015); }
.dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; background: var(--border-strong); }
.dot:first-child { background: #f87171; }
.dot:nth-child(2) { background: var(--gold); }
.dot:nth-child(3) { background: var(--accent); }
.url-pill {
  margin-left: 0.6rem; flex: 1; font-size: 0.74rem; font-family: var(--font-mono);
  color: var(--text-faint); background: var(--card);
  border: 1px solid var(--border); border-radius: 999px;
  padding: 0.28rem 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.browser img.shot { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }

/* Tech chips */
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.4rem 0 0; }
.chip {
  font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-muted);
  background: var(--card); border: 1px solid var(--border);
  border-radius: 0.5rem; padding: 0.3rem 0.7rem;
  transition: color 0.2s, border-color 0.2s;
}
.chip:hover { color: var(--text); border-color: var(--border-strong); }

/* Eyebrow section labels (small caps + rule line) */
.eyebrow {
  display: flex; align-items: center; gap: 0.9rem;
  font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--text-faint);
  margin: 3.2rem 0 1.4rem;
}
.eyebrow::after { content: ""; flex: 1; height: 1px; background: var(--border); }

/* Table of contents card */
.toc {
  background: var(--bg-soft); border: 1px solid var(--border);
  border-radius: 0.9rem; padding: 1.1rem 1.3rem; margin-bottom: 0.5rem;
}
.toc p { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-faint); margin-bottom: 0.6rem; }
.toc ul { list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: 0.3rem 1.4rem; }
.toc a { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }
.toc a:hover { color: var(--accent); }

/* Plain description (fallback when README is too short) */
.desc { color: var(--text-soft); font-size: 1.05rem; max-width: 44rem; }

/* --- Rendered README (GitHub-style, dark) --- */
.readme { font-size: 1rem; }
.readme > p, .readme > ul, .readme > ol { max-width: 44rem; }
.readme h1, .readme h2, .readme h3, .readme h4 {
  font-family: var(--font-heading); color: var(--text);
  margin: 1.9em 0 0.7em; line-height: 1.28; letter-spacing: -0.01em;
  scroll-margin-top: 5.5rem;
}
.readme h1 { font-size: 1.75rem; }
.readme h2 { font-size: 1.42rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border); }
.readme h3 { font-size: 1.14rem; }
.readme h3 .anchor, .readme h2 .anchor { display: none; }
.readme p, .readme ul, .readme ol { margin: 0.9em 0; }
.readme ul, .readme ol { padding-left: 1.5rem; }
.readme li { margin: 0.35em 0; }
.readme li::marker { color: var(--accent); }
.readme blockquote {
  border-left: 3px solid var(--accent); color: var(--text-muted);
  padding: 0.2rem 0 0.2rem 1rem; margin: 1.1em 0; max-width: 44rem;
}
.readme code {
  font-family: var(--font-mono); font-size: 0.85em;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 0.35rem; padding: 0.12em 0.4em;
}
.readme pre {
  background: var(--code-bg); border: 1px solid var(--border);
  border-radius: 0.75rem; padding: 1rem 1.2rem;
  overflow-x: auto; margin: 1.1em 0;
}
.readme pre code { background: none; border: none; padding: 0; font-size: 0.85rem; }
.readme table { width: 100%; border-collapse: collapse; margin: 1.2em 0; font-size: 0.9rem; display: block; overflow-x: auto; }
.readme th, .readme td { border: 1px solid var(--border); padding: 0.55rem 0.85rem; text-align: left; }
.readme th { background: var(--card); color: var(--text); font-weight: 600; }
.readme tr:nth-child(even) td { background: var(--bg-soft); }
.readme img { border-radius: 0.75rem; border: 1px solid var(--border); margin: 0.8em 0.6em 0.8em 0; max-height: 22px; vertical-align: middle; }
.readme img[src*="shields.io"] { border: none; border-radius: 0; margin: 0.25em 0.3em 0.25em 0; max-height: none; }
/* Standalone README images (logos, screenshots): fixed height, width
   scales proportionally and never exceeds the card. */
.readme p > img:only-child:not([src*="shields.io"]),
.readme p > a:only-child > img:only-child:not([src*="shields.io"]) {
  display: block; margin: 1.1rem auto; padding: 0.75rem;
  height: 300px; width: auto; max-width: 100%; object-fit: contain;
  border: 1px solid var(--border); border-radius: 0.75rem; background: var(--bg-soft);
  box-shadow: 0 18px 50px -20px rgba(0, 0, 0, 0.8);
}
@media (max-width: 640px) {
  .readme p > img:only-child:not([src*="shields.io"]),
  .readme p > a:only-child > img:only-child:not([src*="shields.io"]) {
    height: 200px;
  }
}
.readme hr { border: none; border-top: 1px solid var(--border); margin: 2em 0; }

/* Code theme: GitHub Dark High Contrast (same palette VS Code / Cursor use) */
.readme .hljs { color: #f0f3f6; background: #0d1117; }
.readme .hljs-comment, .readme .hljs-quote { color: #9198a1; font-style: italic; }
.readme .hljs-keyword, .readme .hljs-selector-tag, .readme .hljs-doctag, .readme .hljs-formula { color: #ff7b72; }
.readme .hljs-string, .readme .hljs-regexp, .readme .hljs-addition, .readme .hljs-attribute, .readme .hljs-meta .hljs-string { color: #a5d6ff; }
.readme .hljs-number, .readme .hljs-literal, .readme .hljs-variable, .readme .hljs-template-variable { color: #79c0ff; }
.readme .hljs-title, .readme .hljs-title.function_, .readme .hljs-section { color: #d2a8ff; }
.readme .hljs-title.class_, .readme .hljs-type, .readme .hljs-built_in, .readme .hljs-selector-class { color: #ffa657; }
.readme .hljs-tag, .readme .hljs-name, .readme .hljs-meta, .readme .hljs-meta .hljs-keyword { color: #8b949e; }
.readme .hljs-symbol, .readme .hljs-bullet, .readme .hljs-link, .readme .hljs-attr { color: #79c0ff; }
.readme .hljs-deletion { color: #ffdcd7; background: #67060c; }
.readme .hljs-emphasis { font-style: italic; }
.readme .hljs-strong { font-weight: 600; }

/* --- More projects: clean index list instead of boxes --- */
.more-list { list-style: none; border-top: 1px solid var(--border); }
.more-list a {
  display: flex; align-items: baseline; gap: 1rem;
  padding: 0.95rem 0.4rem; text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: padding 0.2s, background 0.2s;
}
.more-list a:hover { padding-left: 0.9rem; background: rgba(255, 255, 255, 0.015); }
.more-list .num { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-faint); min-width: 2rem; }
.more-list strong { color: var(--text); font-family: var(--font-heading); font-size: 1.02rem; font-weight: 600; }
.more-list small { color: var(--text-faint); font-size: 0.82rem; margin-left: auto; text-align: right; }
.more-list .go { color: var(--accent); font-family: var(--font-mono); font-size: 0.9rem; }

/* --- Footer --- */
footer {
  margin-top: 3.5rem; padding-top: 1.4rem; border-top: 1px solid var(--border);
  display: flex; flex-wrap: wrap; gap: 0.6rem 1.5rem; justify-content: space-between;
  color: var(--text-faint); font-size: 0.87rem;
}
footer a { text-decoration: none; }
footer .socials { display: flex; gap: 1.1rem; }

@media (max-width: 560px) {
  .more-list small { display: none; }
  .nav-links a:not(:first-child) { display: none; }
}
`;

// JSON-LD structured data
function jsonLd(p, url, title, metaDesc, image) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: title,
        description: metaDesc,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#project` },
        dateModified: TODAY,
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: p.title,
        alternateName: `${p.title} — ${categoryHook(p.category)}`,
        url,
        image,
        description: clean(p.description),
        keywords: [p.title, categoryHook(p.category), ...p.tech].join(", "),
        codeRepository: p.code,
        programmingLanguage: p.tech.join(", "),
        genre: p.category,
        inLanguage: "en",
        author: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/#work` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: AUTHOR,
        url: `${SITE}/`,
        jobTitle: "Frontend & Full Stack Developer",
        sameAs: [
          "https://github.com/HimanshuSingh213",
          "https://x.com/HimanshuInTech",
          "https://www.linkedin.com/in/himanshu-singh-dangi-631869372/",
        ],
      },
    ],
  };
}

// Render full project HTML page
function buildPage(p, readme, others, index) {
  const slug = slugify(p.title);
  const url = `${SITE}/projects/${slug}/`;
  const desc = clean(p.description);
  const metaDesc = `${shortDescription(p.description)} Live demo, source code and tech stack — built by ${AUTHOR}.`;
  const title = `${p.title} — ${categoryHook(p.category)} | ${AUTHOR} Portfolio`;
  const image = abs(p.shot || p.image);
  const hook = categoryHook(p.category);

  // Tech chips
  const chips = p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("");

  // README content or fallback description
  const content = readme
    ? `${readme.toc}<div class="readme">${readme.html}</div>`
    : `<p class="desc">${esc(desc)}</p>`;

  // Related projects list
  const more = others
    .map(
      (o, i) => `
      <li>
        <a href="${SITE}/projects/${slugify(o.title)}/">
          <span class="num">${String(i + 1).padStart(2, "0")}</span>
          <strong>${esc(o.title)}</strong>
          <small>${esc(categoryHook(o.category))}</small>
          <span class="go">→</span>
        </a>
      </li>`
    )
    .join("");

  return `<!doctype html>
<html lang="en" prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a0a" />
    <title>${esc(title)}</title>
    <meta name="title" content="${esc(title)}" />
    <meta name="description" content="${esc(metaDesc)}" />
    <meta name="author" content="${esc(AUTHOR)}" />
    <meta name="keywords" content="${esc([p.title, ...p.tech, AUTHOR, "portfolio", "developer"].join(", "))}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="48x48" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Geist+Mono:wght@400;500&display=swap" />

    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${esc(AUTHOR)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(metaDesc)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${esc(p.title)} — project by ${esc(AUTHOR)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:site" content="@HimanshuInTech" />
    <meta name="twitter:creator" content="@HimanshuInTech" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(metaDesc)}" />
    <meta name="twitter:image" content="${image}" />

    <script type="application/ld+json">${JSON.stringify(jsonLd(p, url, title, metaDesc, image))}</script>
    <style>${css}</style>
  </head>
  <body>
    <!-- Background visual accents -->
    <div class="bg-art" aria-hidden="true">
      <div class="orb orb-green"></div>
      <div class="orb orb-gold"></div>
      <div class="dots"></div>
    </div>

    <!-- Top bar -->
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="${SITE}/">
          <img src="${SITE}/avatar.jpg" alt="${esc(AUTHOR)}" width="30" height="30" />
          <span>${esc(AUTHOR)}</span>
        </a>
        <nav class="nav-links">
          <a href="${SITE}/#work">Projects</a>
          <a href="https://github.com/HimanshuSingh213">GitHub</a>
          <a href="https://www.linkedin.com/in/himanshu-singh-dangi-631869372/">LinkedIn</a>
        </nav>
      </div>
    </header>

    <main class="wrap">
      <a class="back" href="${SITE}/#work">← All projects</a>

      <!-- Hero section -->
      <p class="badge">${esc(p.category)}</p>
      <h1>${esc(p.title)}</h1>
      <p class="sub">${esc(hook)} — a project by <strong>${esc(AUTHOR)}</strong>, Frontend &amp; Full Stack Developer.</p>
      <div class="actions">
        <a class="btn btn-primary" href="${esc(p.live)}" target="_blank" rel="noopener">Live Demo →</a>
        <a class="btn btn-ghost" href="${esc(p.code)}" target="_blank" rel="noopener">Source Code</a>
      </div>

      <!-- Project preview screenshot -->
      <div class="shot-wrap">
        <div class="browser">
          <div class="browser-bar">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span class="url-pill">${esc(hostOf(p.live))}</span>
          </div>
          <img class="shot" src="${image}" alt="${esc(p.title)} — ${esc(hook)}" width="1600" height="900" loading="lazy" />
        </div>
      </div>

      <!-- Tech stack -->
      <div class="chips" aria-label="Tech stack">${chips}</div>

      <!-- Project details and README -->
      <p class="eyebrow">About this project</p>
      ${content}

      <!-- More projects list -->
      <ol class="more-list">${more}</ol>

      <footer>
        <span>Built by <a href="${SITE}/">${esc(AUTHOR)}</a> · Updated ${TODAY}</span>
        <span class="socials">
          <a href="https://github.com/HimanshuSingh213">GitHub</a>
          <a href="https://www.linkedin.com/in/himanshu-singh-dangi-631869372/">LinkedIn</a>
          <a href="https://x.com/HimanshuInTech">X</a>
        </span>
      </footer>
    </main>
  </body>
</html>
`;
}

// Prerender all project pages
for (const [index, p] of projects.entries()) {
  const slug = slugify(p.title);

  // Fetch and render GitHub README if available
  let readme = null;
  const repo = parseRepo(p.code);
  if (repo) {
    const markdown = await fetchReadme(repo.owner, repo.repo);
    if (markdown) {
      readme = renderReadme(markdown, repo.owner, repo.repo, p.title);
      console.log(`  README used (${markdown.length} chars)`);
    } else {
      console.log(`  no rich README -> card description fallback`);
    }
  }

  const others = projects.filter((o) => o.title !== p.title);
  const html = buildPage(p, readme, others, index);

  const dir = join(dist, "projects", slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
  console.log(`prerendered /projects/${slug}/`);
}

console.log(`Done: ${projects.length} project pages.`);
