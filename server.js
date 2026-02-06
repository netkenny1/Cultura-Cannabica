const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = process.env.PORT || 5173;
const ROOT = process.cwd();

const RATE_LIMIT_MAX = 120;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const rateMap = new Map();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": [
    "default-src 'self'",
    "img-src 'self' https://culturacannabica.es data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "script-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const record = rateMap.get(ip);
  if (!record || now > record.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
};

const setHeaders = (res, ext, isStatic) => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  res.setHeader("Content-Type", MIME_TYPES[ext] || "text/plain; charset=utf-8");
  if (isStatic) {
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  } else {
    res.setHeader("Cache-Control", "no-store");
  }
};

const serveFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    const isStatic = [".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico"].includes(
      ext
    );
    setHeaders(res, ext, isStatic);
    res.statusCode = 200;
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    setHeaders(res, ".html", false);
    res.statusCode = 429;
    res.end("Too many requests");
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    setHeaders(res, ".html", false);
    res.statusCode = 405;
    res.end("Method not allowed");
    return;
  }

  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "").replace(/^\/+/, "") || "index.html";
  let filePath = path.join(ROOT, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!path.extname(filePath)) {
    filePath = `${filePath}.html`;
  }

  serveFile(filePath, res);
});

server.listen(PORT, () => {
  console.log(`Secure server running on http://localhost:${PORT}`);
});
