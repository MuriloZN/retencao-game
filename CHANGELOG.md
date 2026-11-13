Changelog
2026-11-13 — Retenção Impossível: lobby, storytelling e mapas
Nome do jogo e lobby: "Retenção Impossível".
Antes de cada fase: card de história com as duas supervisoras (contexto, dicas e padrões de qualidade). Avança com botão, Enter, E ou Espaço; Esc pula.
Três mapas próprios (`src/levels.js`) com vãos e plataformas que exigem pulo; cair custa 1 vida, e sem vidas volta ao início da fase.
Chefe só pode ser atendido depois dos 3 clientes. Corrigido o registro de atendimento concluído (antes marcava o cliente errado) e a troca de fase (agora reinicia posição e mapa).
Paredes laterais nos trechos de chão. Não testado jogando do início ao fim.
2026-11-12 — Visual v2 alinhado à referência
Card branco do diálogo agora representa duas supervisoras (bustos provisórios em pixel art, desenhados em canvas) com aba "Supervisoras"; a ajuda virou "Pedir ajuda às supervisoras".
HUD: moedas contam separado do XP, painel de nível/XP e objetivo da fase (com fase) no estilo da referência.
Cenário: cerca, calçada com grama, plataformas de terra com pedras, placa "Y ➜", moedas douradas animadas, bloco "?" sobre clientes (vira ✓ ao concluir) e parallax do fundo sem vazar a borda.
Retrato do HUD recortado no rosto. Não testado em navegador.
2026-11-12 — Sprites jogáveis e HUD integrado
Adicionados spritesheets PNG transparentes e leves: `assets/player-male-sprite.png` e `assets/player-female-sprite.png`.
O lobby exibe os spritesheets e mantém a seleção entre os dois protagonistas.
O personagem selecionado agora é efetivamente desenhado no Canvas com quatro quadros: repouso, corrida, corrida e salto.
A orientação do sprite acompanha a direção do movimento.
Adicionado retrato no HUD, barra de XP, nível, contador de moedas/XP, vidas, pausa e objetivo da fase.
Ajustado o layout para aproximar a apresentação da referência visual fornecida pelo usuário.
2026-11-12 — Lobby e cenário com fachada original
Criada tela inicial de lobby com seleção entre personagem masculino e feminino.
A imagem `assets/back.png` passou a ser carregada como fundo do Canvas.
O botão de reinício retorna ao lobby.
2026-11-12 — Parkour e pulo duplo
Adicionado pulo duplo e trechos de terreno em diferentes alturas, ligados por plataformas.
Redistribuídos clientes e chefe ao longo do percurso.
2026-11-12 — Documentação de continuidade
Criados `PROJECT_STATUS.md`, `CHANGELOG.md` e `ROADMAP.md` na raiz.
2026-11-11 — Mecânicas e interface
Implementada lógica de colisões de plataformas e atendimento em etapas.
Adicionado e refinado o medidor de retenção.
Observações
Funcionalidade descrita no histórico não significa que tenha sido validada em todos os navegadores.
Atualize este arquivo após alterações relevantes.
