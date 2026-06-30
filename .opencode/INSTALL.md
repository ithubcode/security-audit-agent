# Installing security-audit-agent

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": [
    "security-audit-agent@git+https://github.com/ithubcode/security-audit-agent.git"
  ]
}
```

Restart OpenCode. The agent auto-registers at startup.

## Verify

Run the agent:

```
@security-audit scan src/ --min-severity high
```

## Updating

OpenCode auto-updates plugins on restart. Pin a version:

```json
"security-audit-agent@git+https://github.com/ithubcode/security-audit-agent.git#v1.0.0"
```
