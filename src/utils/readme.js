const cache = new Map();
const FILE_NAMES = ['README.md', 'readme.md', 'Readme.md'];

export const repoFromUrl = (url = '') => {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  return m ? { owner: m[1], repo: m[2].replace(/\.git$/, '') } : null;
};

// Fetch README from GitHub repo
export async function fetchReadme(repoUrl, signal) {
  const info = repoFromUrl(repoUrl);
  if (!info) return null;

  const key = `${info.owner}/${info.repo}`;
  if (cache.has(key)) return cache.get(key);

  for (const name of FILE_NAMES) {
    const res = await fetch(`https://raw.githubusercontent.com/${key}/HEAD/${name}`, { signal });
    if (res.ok) {
      const text = await res.text();
      cache.set(key, text);
      return text;
    }
  }
  return null;
}

// Resolve relative markdown assets to GitHub URLs
export function resolveUrl(src, repoUrl, kind) {
  const info = repoFromUrl(repoUrl);
  if (!src || !info || /^(https?:|data:|mailto:|#|\/\/)/.test(src)) return src;

  const path = src.replace(/^\.?\//, '');
  const { owner, repo } = info;
  return kind === 'img'
    ? `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${path}`
    : `https://github.com/${owner}/${repo}/blob/HEAD/${path}`;
}

// Convert heading to GitHub-style anchor slug
export function anchorId(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}

// Check for internal TOC headings
function isContentsHeading(text) {
  return /^(table\s+of\s+contents|contents|index)$/i.test(text.trim());
}

// Index headings and assign anchor ids for sidebar TOC
export function indexHeadings(container) {
  const all = [...container.querySelectorAll("h1, h2, h3, h4")];
  if (all.length === 0) return [];

  let top = 6;
  for (const el of all) top = Math.min(top, Number(el.tagName[1]));

  const used = {}; // track duplicate ids
  const list = [];

  for (const el of all) {
    const level = Number(el.tagName[1]) - top + 2;
    if (level > 3) continue;

    const label = el.textContent.trim();
    if (isContentsHeading(label)) continue;

    const base = anchorId(label);
    const seen = used[base] || 0;
    used[base] = seen + 1;

    const id = seen ? `${base}-${seen}` : base;
    el.id = id;
    list.push({ id, label, level });
  }

  return list;
}
