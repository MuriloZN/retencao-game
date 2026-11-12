# Changelog

Histórico resumido baseado nos commits observados na branch `main` e nas alterações realizadas.

## 2026-11-12 — Lobby e cenário com fachada original
- Criada tela inicial de lobby com seleção entre personagem masculino e feminino.
- Adicionadas prévias visuais com os arquivos `assets/pman.png` e `assets/pfem.png`.
- O jogo fica pausado até o usuário selecionar um personagem e pressionar “Iniciar jogo”.
- A imagem `assets/back.png` passou a ser carregada como cenário de fundo do Canvas, substituindo a fachada geométrica provisória.
- O botão de reinício retorna ao lobby para permitir nova seleção.
- A escolha do personagem é armazenada durante a sessão. A representação em movimento no mapa continua provisória até a preparação de sprites com fundo transparente.

## 2026-11-12 — Parkour, pulo duplo e continuidade de diálogo
- Adicionado pulo duplo com restauração ao aterrissar.
- Substituído o chão contínuo por trechos de terreno em diferentes alturas e plataformas de ligação; o trajeto entre áreas agora exige saltos.
- Redistribuídos os três clientes e o chefe ao longo do mapa.
- Duas figuras provisórias de supervisão agora aparecem no ponto inicial de cada fase.
- As etapas de diálogo 2 e 3 passaram a retomar o contexto e o nome do cliente, preservando a estrutura de três etapas.

## 2026-11-12 — Documentação de continuidade
- Criados `PROJECT_STATUS.md`, `CHANGELOG.md` e `ROADMAP.md` na raiz.
- Definido `PROJECT_STATUS.md` como primeiro documento a consultar em futuras conversas.
- Atualizados os links no README e o antigo `docs/ROADMAP.md` para evitar referências conflitantes.

## 2026-11-11 — Mecânicas e interface
- Implementada lógica de colisões de plataformas e atendimento em múltiplas etapas.
- Adicionado e refinado o medidor de intenção de permanência.
- Adicionado arquivo `render.yaml` para configuração de site estático no Render.

## Observações
- Funcionalidade descrita no histórico não significa que tenha sido validada em todos os navegadores.
- Atualize este arquivo após alterações relevantes.
