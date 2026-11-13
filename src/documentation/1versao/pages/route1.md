# `pages/route1/`

Contém `route1/index.jsx`, um arquivo vazio e não importado pelo fluxo atual. Apesar do nome, esse arquivo não implementa o mapa da rota.

O mapa funcional está em `pages/rendering/drawRoute1.js`; seus dados estão em `pages/rendering/data/route1.js`. A seleção do mapa e a transição de entrada/saída são controladas por `pages/main/AppController.jsx`.

Antes de adicionar lógica de rota aqui, confirme se ela deve ser uma tela React ou parte da renderização de mundo em canvas; hoje essas responsabilidades estão separadas.
