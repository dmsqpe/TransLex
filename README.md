# TransLex

## Backend com fallback

O backend tenta traduzir primeiro com Gemini. Se o Gemini falhar, ele tenta Groq. Se Groq tambem falhar, ele tenta GitHub Models.

Variaveis principais:

```env
GEMINI_API_KEY=sua_chave_gemini
GEMINI_MODEL=gemini-2.5-flash
GROQ_API_KEY=sua_chave_groq
GROQ_MODEL=llama-3.1-8b-instant
GITHUB_MODELS_TOKEN=seu_token_github
GITHUB_MODELS_MODEL=openai/gpt-4.1-mini
```

Aliases aceitos para o fallback:

```env
COPILOT_FALLBACK_TOKEN=seu_token_github
COPILOT_FALLBACK_MODEL=openai/gpt-4.1-mini
```

No Render, adicione `GEMINI_API_KEY`, `GROQ_API_KEY` e/ou `GITHUB_MODELS_TOKEN` como Secret/Environment Variable. Depois redeploye o servico.

Observacao: o Copilot comum nao funciona como uma API direta para backend. Este fallback usa GitHub Models, que e o caminho API compativel para chamar modelos pela infraestrutura do GitHub.

## Monitor de uso

O backend expõe:

```text
/health
/usage
/usage.json
```

`/usage` mostra um painel visual com tentativas, sucessos, falhas e chamadas de API por provedor.

Os contadores ficam em `usage-stats.json`. Em hospedagens sem disco persistente, como deploys simples no Render, esses dados podem resetar apos restart/redeploy. Para uso profissional, troque esse arquivo por Redis, Postgres ou outro banco persistente.
