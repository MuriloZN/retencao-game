# Retenção Game

Jogo educacional de retenção de clientes em formato plataforma 2D, com estética pixel art inspirada no ambiente da Desktop. Projeto independente do DeskGaming.

> **Status atual:** protótipo de navegador. Consulte primeiro [PROJECT_STATUS.md](PROJECT_STATUS.md) para conhecer o estado verificado, limitações e próximos passos.

## Documentação de continuidade

- [PROJECT_STATUS.md](PROJECT_STATUS.md) — primeiro documento a consultar ao retomar o projeto.
- [CHANGELOG.md](CHANGELOG.md) — histórico cronológico de alterações relevantes.
- [ROADMAP.md](ROADMAP.md) — prioridades e planejamento atual.
- [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) — visão de jogo, pilares e regras de design.

## Executar

Não há dependências ou etapa de build nesta versão. Abra `index.html` em um servidor estático local ou publique o repositório em um serviço de hospedagem estática.

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
- `assets/`: espaço reservado para sprites, cenários, áudio e UI
- `docs/GAME_DESIGN.md`: visão de jogo e regras
- `docs/ROADMAP.md`: atalho para o roadmap principal na raiz

## Princípios de aprendizagem

- Investigar antes de oferecer uma solução.
- Evitar promessas que não possam ser cumpridas.
- Personalizar a abordagem sem pressionar o cliente.
- Considerar a solução justa, inclusive quando ela envolve o cancelamento.

Use referências visuais autorizadas pela empresa; não inclua dados reais de clientes ou informações internas/confidenciais.

**Regra de continuidade:** toda alteração relevante deve ser registrada em `CHANGELOG.md` e refletida em `PROJECT_STATUS.md`. Atualize `ROADMAP.md` quando prioridades ou planejamento mudarem.
