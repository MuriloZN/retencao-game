# Retenção Game

Jogo educacional de retenção de clientes em formato plataforma 2D, com estética pixel art inspirada no ambiente da Desktop.

> **Status:** protótipo inicial jogável em navegador. Projeto independente do DeskGaming.

## Objetivo
Treinar investigação, escuta ativa, comunicação, diagnóstico e apresentação de soluções justas em três frentes: **Insatisfação**, **Financeiro** e **Técnico**. O jogo não recompensa retenção a qualquer custo: quando cancelar é a decisão adequada, respeitar o cliente também é um bom resultado.

## Executar
Não há dependências ou etapa de build nesta versão. Abra `index.html` em um navegador moderno ou publique o repositório com GitHub Pages.

## Controles
- **A / D** ou **← / →**: movimentar
- **Espaço** ou **↑**: pular
- **E**: conversar/interagir
- **Esc**: fechar diálogo

## Estrutura
- `index.html`: ponto de entrada do protótipo
- `styles.css`: interface e apresentação
- `src/game.js`: loop, controles, câmera, colisões e diálogos
- `src/data.js`: fases, clientes e situações de atendimento
- `docs/GAME_DESIGN.md`: visão de jogo e regras
- `docs/ROADMAP.md`: próximos passos
- `assets/`: espaço reservado para sprites, cenários, áudio e UI

## Ciclo de jogo
1. Explore o cenário e colete fichas de XP.
2. Encontre clientes e pressione **E** para iniciar o atendimento.
3. Investigue a situação antes de escolher uma resposta.
4. Peça ajuda à supervisão quando quiser. A ajuda é ilimitada, mas reduz o bônus de XP daquela interação.
5. Receba feedback e avance até o chefe da fase.

## Princípios de aprendizagem
- Investigar antes de oferecer uma solução.
- Evitar promessas que não possam ser cumpridas.
- Personalizar a abordagem sem pressionar o cliente.
- Considerar a solução justa, inclusive quando ela envolve o cancelamento.

## Personalização
O projeto foi iniciado como uma base colaborativa. Personagens, fachada, cenários, diálogos e identidade visual serão refinados em conjunto. Use referências visuais autorizadas pela empresa; não inclua dados reais de clientes ou informações internas/confidenciais.

Consulte [o documento de design](docs/GAME_DESIGN.md) e [o roadmap](docs/ROADMAP.md).
