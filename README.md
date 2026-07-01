<p align="center">
  <img src="media/banner.svg?v=2" alt="security-audit-agent banner" width="800">
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
  <img alt="Platform" src="https://img.shields.io/badge/platform-OpenCode%20|%20Claude%20Code%20|%20Codex%20|%20Gemini-lightgrey">
</p>

<strong>security-audit-agent</strong> is an AI-powered subagent that performs automated security analysis of source code, configuration files, and infrastructure definitions. It follows OWASP Top 10 (2021), OWASP Mobile Top 10, and industry best practices — including LLM/AI security. It runs as an isolated agent, never modifying code, only reporting findings to `security-audit/`.

---

## Features

| | |
|---|---|
| 🛡️ **OWASP Top 10 (A01-A10)** | Full coverage of the 2021 standard with actionable remediation |
| 🤖 **LLM/AI Security (A11)** | Prompt injection, excessive agency, training data exposure, unvalidated output |
| 📱 **Mobile (M01-M10)** | WebView bridges, insecure storage, cert pinning, biometric bypass, reverse engineering |
| ☁️ **Cloud-specific** | AWS (IAM, S3, Security Groups), GCP (IAM, Cloud Storage, Firebase), Azure (RBAC, Key Vault) |
| 🐳 **Infrastructure & CI/CD** | Docker, Kubernetes, Terraform, CI/CD pipeline security |
| 📦 **Dual output** | Human-readable Markdown + SARIF v2.1 JSON |
| 📈 **Incremental scanning** | File hashing tracks changes — delta-only re-scans |
| 🎯 **Configurable severity** | `--min-severity high` — focus on what matters |
| 🔄 **Evolution tracking** | Compares against previous reports to show remediation progress |

## Coverage

```
OWASP Top 10 2021   Mobile Top 10   Infrastructure   LLM/AI Security   Cloud
    A01-A10           M01-M10       Docker/K8s/TF        A11        AWS/GCP/Azure
```

## Platforms Detected

```
Frontend:  React · Vue · Angular · Svelte · HTMX
Backend:   Express · NestJS · Django · FastAPI · Spring Boot · Go · Flask
Mobile:    Flutter · React Native · Kotlin · Swift · Ionic
Database:  PostgreSQL · MySQL · MongoDB · SQLite · Redis · DynamoDB
Auth:      JWT · Sessions · OAuth · Firebase Auth · Auth0 · Cognito
Cloud:     AWS · GCP · Azure
Infra:     Docker · docker-compose · Kubernetes · Terraform · CI/CD
AI/LLM:    OpenAI · Anthropic · LangChain · LlamaIndex
```

## Installation

### OpenCode

Add to your `opencode.json` plugin array:

```json
{
  "plugin": [
    "security-audit-agent@git+https://github.com/ithubcode/security-audit-agent.git"
  ]
}
```

Restart OpenCode. The agent auto-registers via the plugin's config hook.

### Claude Code / Codex / Gemini CLI

See [INSTALL.md](INSTALL.md) for per-platform setup.

## Usage

```bash
# Full audit of entire codebase
@security-audit scan src/

# Focus on critical and high severity only
@security-audit scan src/ --min-severity high

# Backend only
@security-audit scan src/api/ --min-severity medium

# Incremental — only new/changed files since last audit
@security-audit scan src/ --incremental
```

## Output

After each audit, two files are generated in `security-audit/`:

```
security-audit/
├── security-audit-2026-06-30.md      # Full Markdown report
├── security-audit-2026-06-30.json    # SARIF v2.1 compatible
└── security-audit-last-run.json      # Metadata for incremental scans
```

### Sample report

```
Cybersecurity Audit Report: my-project
OWASP Top 10 2021 · Mobile · Infra · LLM/AI
Findings: 8 (1 Critical, 3 High, 3 Medium, 1 Low)

  A03 [Critical] SQL Injection — routes/products.ts:24
  A01 [High]     IDOR in order lookup — routes/orders.ts:42
  A11 [High]     Prompt injection surface — ai/chat.ts:15
  M02 [Critical] Plaintext token storage — app/login.kt:33
```

## Vulnerability Categories

### OWASP Top 10 (2021)

| Code | Category | Severity |
|------|----------|----------|
| A01 | Broken Access Control | Critical |
| A02 | Cryptographic Failures | High |
| A03 | Injection | Critical |
| A04 | Insecure Design | High |
| A05 | Security Misconfiguration | Medium |
| A06 | Vulnerable Components | Medium |
| A07 | Authentication Failures | High |
| A08 | Integrity Failures | High |
| A09 | Logging & Monitoring | Low |
| A10 | Server-Side Request Forgery | High |

### Extended Coverage

| Code | Category | Severity |
|------|----------|----------|
| A11 | LLM & AI Security | High |
| M01-M10 | OWASP Mobile Top 10 | Critical→Medium |
| INF | Infrastructure & CI/CD | Critical→Medium |
| CLOUD | Cloud-specific (AWS/GCP/Azure) | Critical→High |

## Severity Rubric

| Severity | Examples |
|----------|----------|
| **Critical** | RCE, SQL injection, auth bypass, hardcoded secrets in production, unauthenticated admin access |
| **High** | Stored XSS, IDOR with data exposure, weak crypto, prompt injection via user input |
| **Medium** | Reflected XSS, missing security headers, verbose errors, missing rate limiting |
| **Low** | Missing cookie flags, info disclosure in comments, verbose logging |
| **Info** | Outdated library (no known CVE), deprecated API usage |

## Roadmap

- [ ] GitHub Actions SARIF upload for PR security gates
- [ ] Custom severity overrides per category
- [ ] `.secauditrc` config file for project defaults
- [ ] CVE database cross-referencing for dependency scanner
- [ ] OWASP API Top 10 coverage

## License

MIT

---

<p align="center"><em>by <strong>ITHub</strong></em></p>
