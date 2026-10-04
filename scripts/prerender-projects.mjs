import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";
import { slugify } from "../src/utils/slug.js";

const SITE = "https://himanshusinghdangi.vercel.app";
const AUTHOR = "Himanshu Singh Dangi";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "..", "dist");

if (!existsSync(dist)) {
  console.error("dist/ not found. Run `vite build` first.");
  process.exit(1);
}

const esc = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (s = "") => s.replace(/\*/g, "").replace(/\s+/g, " ").trim();

const abs = (u) => (!u ? "" : u.startsWith("http") ? u : SITE + u);

const shortDescription = (s) => {
  const text = clean(s);
  if (text.length <= 155) return text;
  const cut = text.slice(0, 155);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
};

const categoryHook = (c = "") => c.replace(/^[^•]*•\s*/, "").trim() || "Project";

for (const p of projects) {
  const slug = slugify(p.title);
  const url = `${SITE}/projects/${slug}/`;
  const desc = clean(p.description);
  const metaDesc = `${shortDescription(p.description)} Live demo, source code and tech stack — built by ${AUTHOR}.`;
  const title = `${p.title} — ${categoryHook(p.category)} | ${AUTHOR} Portfolio`;
  const image = abs(p.image);

  const jsonLd = {
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
        dateModified: "2026-10-10",
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: p.title,
        alternateName: `${p.title} — ${categoryHook(p.category)}`,
        url,
        image,
        description: desc,
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

  const techChips = p.tech
    .map(
      (t) =>
        `<span class="chip">${esc(t)}</span>`
    )
    .join("");

  const html = `<!doctype html>
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

    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

    <style>
      :root { color-scheme: dark; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        background: #0a0a0a; color: #e4e4e7; line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }
      .wrap { max-width: 52rem; margin: 0 auto; padding: 3rem 1.5rem 4rem; }
      .crumbs { font-size: 0.875rem; color: #71717a; margin-bottom: 2rem; }
      .crumbs a { color: #a1a1aa; text-decoration: none; }
      .crumbs a:hover { color: #fff; }
      .crumbs span { margin: 0 0.4rem; color: #3f3f46; }
      .badge {
        display: inline-block; font-size: 0.75rem; letter-spacing: 0.08em;
        text-transform: uppercase; color: #34d399; border: 1px solid #1f3d33;
        background: #0f1f1a; border-radius: 999px; padding: 0.3rem 0.8rem; margin-bottom: 1rem;
      }
      h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: #fff; letter-spacing: -0.02em; }
      .sub { color: #a1a1aa; font-size: 1.05rem; margin-top: 0.75rem; }
      .shot {
        width: 100%; border-radius: 1rem; border: 1px solid #262626;
        margin: 2rem 0; display: block; background: #111;
      }
      .desc { color: #d4d4d8; font-size: 1.05rem; margin-bottom: 2rem; }
      .chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.25rem; }
      .chip {
        font-size: 0.8rem; color: #e4e4e7; background: #18181b;
        border: 1px solid #262626; border-radius: 0.5rem; padding: 0.3rem 0.7rem;
      }
      .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
      .btn {
        display: inline-block; padding: 0.75rem 1.4rem; border-radius: 0.75rem;
        font-weight: 600; font-size: 0.95rem; text-decoration: none; transition: opacity 0.2s;
      }
      .btn:hover { opacity: 0.85; }
      .btn-primary { background: #34d399; color: #052e22; }
      .btn-ghost { background: #18181b; color: #fff; border: 1px solid #3f3f46; }
      footer { margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid #262626; color: #71717a; font-size: 0.9rem; }
      footer a { color: #34d399; text-decoration: none; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="${SITE}/">Home</a><span>/</span><a href="${SITE}/#work">Projects</a><span>/</span>${esc(p.title)}
      </nav>
      <p class="badge">${esc(p.category)}</p>
      <h1>${esc(p.title)}</h1>
      <p class="sub">${esc(categoryHook(p.category))} — project by ${esc(AUTHOR)}, Frontend &amp; Full Stack Developer.</p>
      <img class="shot" src="${image}" alt="${esc(p.title)} — ${esc(categoryHook(p.category))}" width="1200" height="630" loading="lazy" />
      <p class="desc">${esc(desc)}</p>
      <div class="chips" aria-label="Tech stack">${techChips}</div>
      <div class="actions">
        <a class="btn btn-primary" href="${esc(p.live)}" target="_blank" rel="noopener">Live Demo →</a>
        <a class="btn btn-ghost" href="${esc(p.code)}" target="_blank" rel="noopener">Source Code</a>
        <a class="btn btn-ghost" href="${SITE}/#work">All Projects</a>
      </div>
      <footer>
        Built by <a href="${SITE}/">${esc(AUTHOR)}</a> ·
        <a href="https://github.com/HimanshuSingh213">GitHub</a> ·
        <a href="https://www.linkedin.com/in/himanshu-singh-dangi-631869372/">LinkedIn</a> ·
        <a href="https://x.com/HimanshuInTech">X</a>
      </footer>
    </main>
  </body>
</html>
`;

  const dir = join(dist, "projects", slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
  console.log(`prerendered /projects/${slug}/`);
}

console.log(`Done: ${projects.length} project pages.`);
