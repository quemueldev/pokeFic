# Arquivos de entrada e configuração

Este mapa descreve os arquivos na raiz do repositório, que inicializam a aplicação ou definem ferramentas e recursos públicos.

| Arquivo/pasta | Responsabilidade e relações |
|---|---|
| `index.html` | Documento inicial do Vite; fornece `#root` e carrega `src/main.jsx`. |
| `package.json` | Scripts (`dev`, `build`, `lint`, `preview`) e dependências React/Vite/ESLint. |
| `package-lock.json` | Resolução versionada das dependências npm. |
| `vite.config.js` | Configura o plugin React no Vite. |
| `eslint.config.js` | Regras de ESLint para JavaScript/JSX e hooks do React. |
| `.gitignore` | Ignora dependências, saída de build, logs e arquivos locais. |
| `README.md` | README original do template React/Vite; ainda não descreve a arquitetura específica do jogo. |
| `public/favicon.svg` | Favicon referenciado por `index.html`. |
| `public/icons.svg` | Símbolos SVG estáticos; não é importado pelo fluxo React atual. |
| `src/main.jsx` | Inicialização do React; importa o reset global e monta `pages/main/App.jsx`. |
| `src/index.css` | Estilo global mínimo: remove margens/padding e aplica `border-box`. |

`dist/` é gerado por `npm run build` e `node_modules/` é criado pelo npm. Não edite esses diretórios como fonte. Os comandos devem ser executados a partir da raiz do repositório:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Não há suíte de testes automatizados configurada no `package.json` desta versão.
