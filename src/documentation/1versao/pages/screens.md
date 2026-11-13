# `pages/screens/`

Telas HTML do React que são exibidas sobre o canvas. Cada tela fica com seu próprio CSS e recebe dados/ações por props de `pages/main/App.jsx`.

| Pasta/arquivo | Responsabilidade e relações |
|---|---|
| `screens/battle/BattleScreen.jsx` | Apresenta encontro, barras de vida e ações de ataque/fuga; usa `pokemon/stats.js`, os sprites e a espécie do oponente. Devolve Pokémon atualizado, resultado e fuga via `onFinish`. |
| `screens/battle/BattleScreen.css` | Arena, barras, personagens e botões da batalha. |
| `screens/menu/GameMenu.jsx` | Lista a equipe e status recebidos pela prop `party`; usa `pokemon/stats.js` e fecha via `onClose`. |
| `screens/menu/GameMenu.css` | Layout e aparência do menu/cartões. |

`App.jsx` decide quando montar cada tela e qual Pokémon/animal fornecer. A batalha não salva diretamente a equipe: ela devolve o resultado ao pai, que atualiza `party`. Mudanças de dados ou nomes de callbacks precisam continuar compatíveis com o pai.

O diálogo da curandeira não está nesta subpasta; sua interface está em `pages/main/App.jsx` e o estilo em `pages/main/App.css`.
