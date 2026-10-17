import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const port = Number(process.env.PORT ?? 3010);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

await stat(path.join(root, "index.html")).catch(() => {
  console.error("out/index.html がありません。先に npm run build を実行してください。");
  process.exit(1);
});

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    if (basePath && pathname === basePath) {
      response.writeHead(308, { Location: `${basePath}/` });
      response.end();
      return;
    }
    if (basePath && !pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404).end("Not found");
      return;
    }
    const relative = pathname.slice(basePath.length).replace(/^\/+/, "");
    let filename = path.resolve(root, relative);
    const withinRoot = path.relative(root, filename);
    if (withinRoot.startsWith("..") || path.isAbsolute(withinRoot)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    if ((await stat(filename)).isDirectory()) filename = path.join(filename, "index.html");
    const body = await readFile(filename);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filename)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(path.join(root, "404.html")));
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Local: http://127.0.0.1:${port}${basePath}/`);
  console.log("静的exportを配信中。停止: Ctrl+C");
});

