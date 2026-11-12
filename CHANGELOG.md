# Changelog

## 2026-11-12 — Sprites jogáveis e HUD integrado
- Adicionados spritesheets PNG transparentes e leves: `assets/player-male-sprite.png` e `assets/player-female-sprite.png`.
- O lobby exibe os spritesheets e mantém a seleção entre os dois protagonistas.
- O personagem selecionado agora é efetivamente desenhado no Canvas com quatro quadros: repouso, corrida, corrida e salto.
- A orientação do sprite acompanha a direção do movimento.
- Adicionado retrato no HUD, barra de XP, nível, contador de moedas/XP, vidas, pausa e objetivo da fase.
- Ajustado o layout para aproximar a apresentação da referência visual fornecida pelo usuário.

## 2026-11-12 — Lobby e cenário com fachada original
- Criada tela inicial de lobby com seleção entre personagem masculino e feminino.
- A imagem `assets/back.png` passou a ser carregada como fundo do Canvas.
- O botão de reinício retorna ao lobby.

## 2026-11-12 — Parkour e pulo duplo
- Adicionado pulo duplo e trechos de terreno em diferentes alturas, ligados por plataformas.
- Redistribuídos clientes e chefe ao longo do percurso.

## 2026-11-12 — Documentação de continuidade
- Criados `PROJECT_STATUS.md`, `CHANGELOG.md` e `ROADMAP.md` na raiz.

## 2026-11-11 — Mecânicas e interface
- Implementada lógica de colisões de plataformas e atendimento em etapas.
- Adicionado e refinado o medidor de retenção.

## Observações
- Funcionalidade descrita no histórico não significa que tenha sido validada em todos os navegadores.
- Atualize este arquivo após alterações relevantes.
