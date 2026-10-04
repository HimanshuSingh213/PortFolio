import { readFileSync, readdirSync, existsSync } from "node:fs";

const check = (file) => {
  const html = readFileSync(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  blocks.forEach((m, i) => {
    JSON.parse(m[1]);
    console.log(`${file} :: JSON-LD #${i + 1} valid`);
  });
  if (!blocks.length) console.log(`${file} :: NO JSON-LD FOUND`);
};

check("dist/index.html");
for (const slug of readdirSync("dist/projects")) {
  check(`dist/projects/${slug}/index.html`);
}
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
console.log("sitemap URLs:", (sitemap.match(/<loc>/g) || []).length);
for (const f of ["dist/robots.txt", "dist/og-image.png", "dist/favicon.ico", "dist/favicon.svg", "dist/apple-touch-icon.png", "dist/avatar.jpg", "dist/site.webmanifest"]) {
  console.log(existsSync(f) ? `OK  ${f}` : `MISS ${f}`);
}
