# TransLex

TransLex agora esta preparado para:

- rodar localmente
- subir no Render como um app web unico
- servir o frontend publicamente
- manter a extensao apontando para um backend online
- facilitar uma futura adaptacao para WebView em Android e iOS

## Como a estrutura ficou

- `server.js`
  Backend Node.js com Gemini API
  Tambem serve o frontend publico em `/`
- `Extensao.html`
  Interface principal
- `js.js`
  Logica do frontend, historico, tema, idioma da interface e configuracao da URL do backend
- `css.css`
  Estilos
- `background.js`
  Menu de contexto da extensao
- `manifest.json`
  Manifesto da extensao
- `package.json`
  Scripts para rodar no Render
- `render.yaml`
  Blueprint do Render

## Rodando localmente

1. Abra um PowerShell na pasta do projeto.
2. Defina a chave:
   ` $env:GEMINI_API_KEY="SUA_CHAVE_AQUI" `
3. Rode:
   ` node server.js `
4. Abra:
   ` http://localhost:3000 `

## O que mudou para deploy

Agora o `server.js` serve:

- frontend publico em `/`
- healthcheck em `/health`
- traducao em `POST /translate`

Entao um unico servico no Render ja resolve:

- site publico
- backend online

## Deploy no Render

### Opcao 1: usando `render.yaml`

1. Suba esta pasta para um repositorio no GitHub.
2. Entre no Render.
3. Clique em `New` -> `Blueprint`.
4. Selecione o repositorio.
5. O Render vai ler o arquivo `render.yaml`.
6. Configure a variavel:
   `GEMINI_API_KEY`
7. Se quiser, ajuste:
   `GEMINI_MODEL`
8. Finalize o deploy.

### Opcao 2: criando manualmente

1. Suba o projeto para o GitHub.
2. No Render, clique em `New` -> `Web Service`.
3. Escolha o repositorio.
4. Use:
   - Runtime: `Node`
   - Build Command: vazio
   - Start Command: `node server.js`
5. Adicione as variaveis:
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL=gemini-2.5-flash`
6. Salve e faça o deploy.

## Como testar depois do deploy

Quando o Render terminar, voce vai ganhar uma URL parecida com:

`https://seu-app.onrender.com`

Teste:

- Site publico:
  `https://seu-app.onrender.com`
- Health:
  `https://seu-app.onrender.com/health`

## Como usar a extensao com o backend online

1. Recarregue a extensao em `chrome://extensions`.
2. Abra o popup da extensao.
3. No campo `URL do backend`, coloque a URL do Render.
   Exemplo:
   `https://seu-app.onrender.com`
4. Clique em `Salvar URL`.
5. A partir disso, a extensao passa a usar o backend online em vez do `localhost`.

## Como fica o frontend publico

O frontend agora ja pode ser acessado em um site publico pelo proprio Render.

Isso significa que voce nao precisa mais:

- deixar o HTML aberto localmente
- hostear o frontend no seu PC

## Futuro WebView

Como o frontend agora ja pode rodar como site publico:

- Android pode abrir essa URL em WebView
- iOS pode abrir essa URL em WKWebView

Depois, quando voce quiser, da para:

- transformar o frontend em PWA
- empacotar em Capacitor
- empacotar em React Native WebView
- criar um app nativo em volta do site

## Observacoes importantes

- A extensao continua local, mas o backend pode ficar 100% online.
- O site publico e o backend podem ser o mesmo servico.
- Se a URL do Render mudar, atualize o campo `URL do backend` da extensao.
- O `manifest.json` ja foi ajustado para permitir `localhost` e dominios `onrender.com`.

## Proximo passo recomendado

Depois de colocar no ar, eu recomendo fazer uma segunda rodada com:

- dominio proprio
- PWA
- pagina de configuracoes separada
- indicadores de progresso para textos longos
- protecao melhor para resposta inconsistente da IA
