# TransLex

## Backend com fallback

O backend tenta traduzir primeiro com Gemini. Se o Gemini falhar, ele tenta automaticamente o fallback via GitHub Models.

Variaveis principais:

```env
GEMINI_API_KEY=sua_chave_gemini
GEMINI_MODEL=gemini-2.5-flash
GITHUB_MODELS_TOKEN=seu_token_github
GITHUB_MODELS_MODEL=openai/gpt-4.1-mini
```

Aliases aceitos para o fallback:

```env
COPILOT_FALLBACK_TOKEN=seu_token_github
COPILOT_FALLBACK_MODEL=openai/gpt-4.1-mini
```

No Render, adicione `GITHUB_MODELS_TOKEN` como Secret/Environment Variable. Depois redeploye o servico.

Observacao: o Copilot comum nao funciona como uma API direta para backend. Este fallback usa GitHub Models, que e o caminho API compativel para chamar modelos pela infraestrutura do GitHub.
