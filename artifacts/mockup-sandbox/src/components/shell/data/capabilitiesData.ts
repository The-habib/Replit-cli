export interface Capability {
  id: number;
  name: string;
  category: 'Security' | 'Database' | 'Media' | 'AI & Agents' | 'System & CLI' | 'Network';
  binaryOrPath: string;
  status: 'VERIFIED' | 'PRE-LOADED' | 'ACTIVE';
  description: string;
  codeExample: string;
  impact: string;
  tags: string[];
}

export interface CapabilityCombination {
  id: number;
  title: string;
  tools: string[];
  description: string;
  useCase: string;
  codeSnippet: string;
}

export const CAPABILITIES_DATA: Capability[] = [
  {
    id: 1,
    name: "MicroVM Dual-PID Supervision",
    category: "System & CLI",
    binaryOrPath: "pid1 / pid2 init",
    status: "VERIFIED",
    description: "MicroVM init and process supervisor enabling complete container isolation, background task persistence, and socket management.",
    codeExample: "# MicroVM init supervises background services automatically\nps aux | grep pid",
    impact: "Unbreakable task isolation & 24/7 background process execution.",
    tags: ["microvm", "kernel", "isolation", "pid1"]
  },
  {
    id: 2,
    name: "Helium Serverless PostgreSQL 16",
    category: "Database",
    binaryOrPath: "helium:5432 / psql",
    status: "VERIFIED",
    description: "Preconfigured, serverless PostgreSQL 16 database instance for production ORMs, Drizzle, and instant schema migrations without local docker setup.",
    codeExample: "export DATABASE_URL=\"postgres://postgres:password@helium:5432/heliumdb\"\npsql $DATABASE_URL -c '\\dt'",
    impact: "Zero-config production relational database ready instantly.",
    tags: ["postgres", "sql", "drizzle", "helium"]
  },
  {
    id: 3,
    name: "Replit Key-Value REST Storage",
    category: "Database",
    binaryOrPath: "REPLIT_DB_URL API",
    status: "VERIFIED",
    description: "Authenticated HTTPS REST API providing schema-less persistent key-value storage directly accessible via curl or fetch without database drivers.",
    codeExample: "curl -X POST $REPLIT_DB_URL/user_config -d \"theme=dark\"\ncurl $REPLIT_DB_URL/user_config",
    impact: "Instant zero-dependency persistent JSON/KV state engine.",
    tags: ["kv", "storage", "rest", "persistence"]
  },
  {
    id: 4,
    name: "Playwright Chromium Engine (v140)",
    category: "Media",
    binaryOrPath: "REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE",
    status: "VERIFIED",
    description: "Pre-compiled Chromium browser with CJK international font rendering for headless web scraping, visual QA, and PDF rendering.",
    codeExample: "import { chromium } from 'playwright';\nconst browser = await chromium.launch({ executablePath: process.env.REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE });",
    impact: "Headless web scraping & pixel-perfect rendering out of the box.",
    tags: ["browser", "playwright", "scraping", "cjk"]
  },
  {
    id: 5,
    name: "Replit Security Token Service (STS)",
    category: "Security",
    binaryOrPath: "replit identityv2",
    status: "VERIFIED",
    description: "Programmatic STS minting RS256 JWT tokens signed by https://sts.replit.com for cryptographically verified microservice and agent authentication.",
    codeExample: "replit identityv2 create --audience https://api.internal.service",
    impact: "Cryptographic microservice identity minting with zero shared secrets.",
    tags: ["sts", "jwt", "rs256", "auth", "security"]
  },
  {
    id: 6,
    name: "OAuth Connectors Infrastructure",
    category: "Security",
    binaryOrPath: "/repl/ctls/bin/{gh,gcloud,git}",
    status: "VERIFIED",
    description: "Integrated OAuth connector wrappers for GitHub, Google Cloud, and Git, eliminating hardcoded API keys and credential leaks.",
    codeExample: "/repl/ctls/bin/gh repo list\n/repl/ctls/bin/gcloud auth print-access-token",
    impact: "Zero hardcoded personal tokens; seamless cloud provider auth.",
    tags: ["oauth", "github", "gcloud", "connectors"]
  },
  {
    id: 7,
    name: "TigerVNC & Virtual X11 Display",
    category: "System & CLI",
    binaryOrPath: "Xvnc / vncserver / DISPLAY=:1",
    status: "VERIFIED",
    description: "Spawns a full virtual graphical Linux desktop display (:1) enabling execution of visual desktop software inside headless environments.",
    codeExample: "Xvnc :1 -geometry 1280x800 &\nexport DISPLAY=:1\nfluxbox &",
    impact: "Full GUI desktop app hosting inside a cloud terminal shell.",
    tags: ["x11", "vnc", "gui", "desktop"]
  },
  {
    id: 8,
    name: "X11 GUI Hardware Automation Engine",
    category: "System & CLI",
    binaryOrPath: "xdotool",
    status: "VERIFIED",
    description: "Programmatically simulates hardware mouse moves, clicks, window focus, and keyboard keystrokes on virtual X11 desktop displays.",
    codeExample: "xdotool search --name \"Chrome\" windowactivate key Ctrl+t type \"https://replit.com\" key Return",
    impact: "Autonomous desktop GUI automation and end-to-end user visual testing.",
    tags: ["xdotool", "automation", "gui", "mouse-click"]
  },
  {
    id: 9,
    name: "Semgrep SAST Security Scanner",
    category: "Security",
    binaryOrPath: "semgrep (v1.152.0)",
    status: "VERIFIED",
    description: "Industrial static application security testing (SAST) engine analyzing codebases across 30+ programming languages for vulnerabilities.",
    codeExample: "export PATH=\"/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH\"\nsemgrep --config p/ci .",
    impact: "Automated real-time code vulnerability detection before deployment.",
    tags: ["sast", "semgrep", "security", "audit"]
  },
  {
    id: 10,
    name: "Google OSV Vulnerability Scanner",
    category: "Security",
    binaryOrPath: "osv-scanner",
    status: "VERIFIED",
    description: "Scans package manifests (npm, pypi, cargo) directly against Google's Open Source Vulnerabilities database for security auditing.",
    codeExample: "osv-scanner -r .",
    impact: "Instant supply-chain vulnerability reporting against Google CVE database.",
    tags: ["osv", "vulnerability", "google", "security"]
  },
  {
    id: 11,
    name: "Socket Supply-Chain Security Scanner",
    category: "Security",
    binaryOrPath: "socket",
    status: "VERIFIED",
    description: "Audits NPM and PyPI dependencies for malicious install scripts, typosquatting, telemetry, and high-risk supply-chain vectors.",
    codeExample: "socket scan .",
    impact: "Blocks malicious npm scripts & typosquatted dependencies before install.",
    tags: ["socket", "supply-chain", "npm", "malware"]
  },
  {
    id: 12,
    name: "Replit Package Firewall (24hr Rule)",
    category: "Security",
    binaryOrPath: "package-firewall.replit.local",
    status: "VERIFIED",
    description: "High-speed caching proxy enforcing a 24-hour release delay on all non-@replit npm packages to block zero-day supply-chain attacks.",
    codeExample: "npm config get registry\n# Returns: http://package-firewall.replit.local/npm/",
    impact: "Immunizes workspace from zero-day malicious npm package releases.",
    tags: ["firewall", "proxy", "npm-caching", "zero-day"]
  },
  {
    id: 13,
    name: "Poppler PDF Rendering Suite",
    category: "Media",
    binaryOrPath: "pdftoppm / pdftotext / pdfinfo",
    status: "VERIFIED",
    description: "Extracts text, converts PDF pages to high-resolution PNG/JPEG images, and inspects PDF metadata at native C speed.",
    codeExample: "pdftoppm -png -r 150 document.pdf page_out\npdftotext document.pdf -",
    impact: "High-performance PDF parse & page-to-image extraction engine.",
    tags: ["pdf", "pdftoppm", "poppler", "extraction"]
  },
  {
    id: 14,
    name: "FFmpeg 6.1.2 Multimedia Transcoding",
    category: "Media",
    binaryOrPath: "ffmpeg / ffprobe",
    status: "VERIFIED",
    description: "Professional video and audio processing, frame extraction, clipping, audio normalization, and stream re-encoding.",
    codeExample: "ffmpeg -i input.mp4 -vn -ar 44100 -ac 2 -b:a 192k output.mp3\nffmpeg -ss 00:00:05 -i input.mp4 -vframes 1 thumbnail.png",
    impact: "Complete broadcast-grade video/audio processing pipeline.",
    tags: ["ffmpeg", "video", "audio", "transcoding"]
  },
  {
    id: 15,
    name: "ImageMagick 7 Image Manipulation Suite",
    category: "Media",
    binaryOrPath: "magick",
    status: "VERIFIED",
    description: "High-performance image manipulation, format conversion, thumbnail generation, cropping, and dynamic watermarking.",
    codeExample: "magick convert banner.jpg -resize 800x600 -quality 85 compressed.webp",
    impact: "Instant image transformation and asset optimization.",
    tags: ["imagemagick", "magick", "images", "webp"]
  },
  {
    id: 16,
    name: "OpenVSCode Server Runtime",
    category: "System & CLI",
    binaryOrPath: "openvscode-server",
    status: "VERIFIED",
    description: "Headless VS Code IDE server supporting remote web-based code editing, extension host, and Language Server Protocols (LSP).",
    codeExample: "openvscode-server --port 3000 --without-connection-token",
    impact: "Turn any browser session into a full remote VS Code IDE environment.",
    tags: ["vscode", "ide", "openvscode", "browser"]
  },
  {
    id: 17,
    name: "Node.js 24 & TypeScript 5.9 Workspace",
    category: "System & CLI",
    binaryOrPath: "node (v24.x) / tsc (5.9.3)",
    status: "VERIFIED",
    description: "Modern JavaScript/TypeScript runtime with native ES modules, top-level await, pnpm v10 workspace catalog support.",
    codeExample: "node --version # v24.x\npnpm run typecheck",
    impact: "Bleeding-edge JavaScript runtime with instant build execution.",
    tags: ["node24", "typescript", "pnpm", "esmodule"]
  },
  {
    id: 18,
    name: "Python 3.13 Virtual Environment Engine",
    category: "System & CLI",
    binaryOrPath: "python3 (3.13) / venv / pip",
    status: "VERIFIED",
    description: "Python 3.13 interpreter equipped with virtual environment creation (venv) and PyPI dependency firewall caching.",
    codeExample: "python3 -m venv .venv && source .venv/bin/activate\npip install fastapi uvicorn",
    impact: "Python 3.13 environment ready for AI, data science, & web backends.",
    tags: ["python3", "venv", "pip", "backend"]
  },
  {
    id: 19,
    name: "Replit Universal Package Manager (upm)",
    category: "System & CLI",
    binaryOrPath: "upm",
    status: "VERIFIED",
    description: "Language-agnostic package manager wrapper supporting auto-detection, package search, and specfile management across Node, Python, Ruby.",
    codeExample: "upm add lodash\nupm search request",
    impact: "Single multi-language package CLI for seamless dependency additions.",
    tags: ["upm", "packages", "polyglot", "cli"]
  },
  {
    id: 20,
    name: "Replit Artifact Router & Microservice Mesh",
    category: "Network",
    binaryOrPath: "artifact-router",
    status: "VERIFIED",
    description: "Dynamic microservice port router mapping internal ports (8000, 5000, 3000) to public ingress domains with zero manual proxy configuration.",
    codeExample: "artifact-router --listen :8000 --routes /api=http://localhost:5000",
    impact: "Automated multi-service routing for complex cloud architectures.",
    tags: ["routing", "ingress", "microservices", "artifact-router"]
  },
  {
    id: 21,
    name: "Public HTTPS Dev Domain Ingress",
    category: "Network",
    binaryOrPath: "REPLIT_DEV_DOMAIN",
    status: "VERIFIED",
    description: "Automatic public HTTPS ingress domain provided for internal web servers, webhooks, and REST endpoints with SSL termination.",
    codeExample: "echo https://$REPLIT_DEV_DOMAIN\ncurl https://$REPLIT_DEV_DOMAIN/health",
    impact: "Instant public URL for web app testing and external webhooks.",
    tags: ["https", "ingress", "domain", "ssl"]
  },
  {
    id: 22,
    name: "Expo Development Domain Ingress",
    category: "Network",
    binaryOrPath: "REPLIT_EXPO_DEV_DOMAIN",
    status: "VERIFIED",
    description: "Specialized public dev ingress routing tailored specifically for React Native and Expo web testing on physical mobile devices.",
    codeExample: "echo $REPLIT_EXPO_DEV_DOMAIN\nnpx expo start --web",
    impact: "Live mobile app prototyping & hot reloading directly from cloud shell.",
    tags: ["expo", "react-native", "mobile", "ingress"]
  },
  {
    id: 23,
    name: "Ripgrep Sub-Millisecond Code Search",
    category: "System & CLI",
    binaryOrPath: "rg",
    status: "VERIFIED",
    description: "Rust-based sub-millisecond regex search utility capable of querying millions of lines of source code in milliseconds.",
    codeExample: "rg \"export function\" --type ts -n",
    impact: "Lightning-fast code discovery across massive multi-package repos.",
    tags: ["ripgrep", "rg", "search", "rust"]
  },
  {
    id: 24,
    name: "SD Stream Editor & String Replacer",
    category: "System & CLI",
    binaryOrPath: "sd",
    status: "VERIFIED",
    description: "Intuitive, high-speed regex find-and-replace CLI tool designed as a modern replacement for sed and awk.",
    codeExample: "sd \"v1.0.0\" \"v2.0.0\" package.json",
    impact: "Error-free regex string substitution across workspace files.",
    tags: ["sd", "regex", "refactor", "string-replace"]
  },
  {
    id: 25,
    name: "Multi-Agent Subagent Invocation System",
    category: "AI & Agents",
    binaryOrPath: "invoke_subagent protocol",
    status: "VERIFIED",
    description: "Native protocol enabling AI agents to spawn background subagents with isolated workspaces and asynchronous message passing.",
    codeExample: "# Agent invokes research subagent in background\ninvoke_subagent({ TypeName: 'research', Prompt: 'Audit code' })",
    impact: "Autonomous multi-agent swarms working in parallel.",
    tags: ["subagents", "multi-agent", "ai", "orchestration"]
  },
  {
    id: 26,
    name: "Microsoft Word Text Extractor",
    category: "Media",
    binaryOrPath: "antiword",
    status: "VERIFIED",
    description: "Plain text extractor for legacy binary .doc files without requiring Microsoft Office or complex heavy dependencies.",
    codeExample: "antiword resume.doc > resume.txt",
    impact: "Extract content from legacy doc files instantly.",
    tags: ["antiword", "doc", "text-extraction", "office"]
  },
  {
    id: 27,
    name: "Model Context Protocol (MCP) SDK",
    category: "AI & Agents",
    binaryOrPath: "@modelcontextprotocol/sdk",
    status: "VERIFIED",
    description: "Standardized framework for building MCP servers, exposing shell capabilities, database connectors, and tool primitives to AI agents.",
    codeExample: "import { Server } from '@modelcontextprotocol/sdk/server/index.js';",
    impact: "Universal AI tool server integration standard.",
    tags: ["mcp", "ai-tools", "sdk", "context"]
  },
  {
    id: 28,
    name: "Express 5 Microservice Backend Framework",
    category: "System & CLI",
    binaryOrPath: "express@5.2.1",
    status: "VERIFIED",
    description: "Next-gen Express 5 web server featuring native promise routing, enhanced error handling, and Zod schema request validation.",
    codeExample: "import express from 'express';\nconst app = express();\napp.get('/api/health', (req, res) => res.json({ status: 'ok' }));",
    impact: "Robust Node 24 web API server foundation.",
    tags: ["express5", "api", "backend", "webserver"]
  }
];

export const TOP_COMBINATIONS: CapabilityCombination[] = [
  {
    id: 1,
    title: "Automated Visual QA & Scraper",
    tools: ["Playwright Chromium 140", "Poppler (pdftoppm)", "Sharp"],
    description: "Launches headless Chromium to capture full-page web renders, extracts PDF pages as crisp images with Poppler, and optimizes assets with Sharp.",
    useCase: "Automated screenshot testing, PDF rendering verification, and stealth web data extraction.",
    codeSnippet: `// Visual QA pipeline combining Playwright + Poppler
import { chromium } from 'playwright';
import { execSync } from 'child_process';

const browser = await chromium.launch({
  executablePath: process.env.REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE
});
const page = await browser.newPage();
await page.goto('https://example.com');
await page.pdf({ path: 'render.pdf' });
execSync('pdftoppm -png -r 150 render.pdf page_output');`
  },
  {
    id: 2,
    title: "Self-Defending Code & Security Audit Matrix",
    tools: ["Semgrep SAST", "Google OSV Scanner", "Replit 24h Package Firewall"],
    description: "Enforces 24-hour npm release delay to block supply chain attacks, runs Semgrep static analysis across source code, and verifies dependencies against Google's CVE database.",
    useCase: "Zero-trust CI/CD security validation before releasing production code.",
    codeSnippet: `# Automated zero-trust security audit script
export PATH="/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH"

echo "=== 1. SAST Static Analysis ==="
semgrep --config p/ci . --json > semgrep-report.json

echo "=== 2. Dependency Vulnerability Audit ==="
osv-scanner -r .

echo "=== 3. Package Firewall Verification ==="
npm config get registry`
  },
  {
    id: 3,
    title: "Zero-Config Fullstack App Stack",
    tools: ["Helium PostgreSQL 16", "Drizzle ORM", "Replit KV REST API", "Express 5"],
    description: "Combines preconfigured serverless PostgreSQL for relational entities and Replit KV REST API for transient key-value caching with zero setup code.",
    useCase: "Building enterprise fullstack apps with instant database readiness.",
    codeSnippet: `import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

// Instant KV Cache check
const kvRes = await fetch(\`\${process.env.REPLIT_DB_URL}/session_cache\`);`
  },
  {
    id: 4,
    title: "Autonomous Multi-Agent AI Mesh",
    tools: ["Replit STS (identityv2)", "invoke_subagent", "MCP SDK"],
    description: "Mints cryptographically signed STS JWT identity tokens for background subagents, allowing secure inter-agent RPC communication and tool execution.",
    useCase: "Complex multi-agent AI research, code refactoring, and security sweeps.",
    codeSnippet: `// Spawning authenticated subagent with STS identity
import { execSync } from 'child_process';

const stsToken = execSync(
  '/nix/store/jyaxhs3n4wz1jsmbq6cl7asd1rsfissj-replit-cli-0.0.1/bin/replit identityv2 create --audience agent-mesh'
).toString().trim();

console.log('Signed RS256 JWT Token:', stsToken.substring(0, 40) + '...');`
  }
];
