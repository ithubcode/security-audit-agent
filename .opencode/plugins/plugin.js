import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENT_NAME = 'security-audit';
const AGENT_FILE = path.resolve(__dirname, `../../agents/${AGENT_NAME}.md`);

export const SecurityAuditPlugin = async () => {
  let prompt;
  try {
    prompt = fs.readFileSync(AGENT_FILE, 'utf8');
  } catch {
    console.error(`[security-audit-agent] Failed to read agent prompt: ${AGENT_FILE}`);
    return {};
  }

  return {
    config: async (config) => {
      config.agent = config.agent || {};
      if (!config.agent[AGENT_NAME]) {
        config.agent[AGENT_NAME] = {
          description: 'Cybersecurity audit for OWASP Top 10, mobile, infra, and LLM/AI vulnerabilities',
          hidden: true,
          mode: 'subagent',
          prompt,
          tools: { bash: true, edit: true, read: true, write: true },
        };
      }
    },
  };
};
