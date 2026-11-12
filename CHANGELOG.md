# Changelog

Histórico resumido baseado nos commits observados na branch `main` e na documentação existente. Datas em UTC (data do commit); descrições de commit são resumidas e não substituem a inspeção do código.

## 2026-11-12 — Parkour, pulo duplo e continuidade de diálogo
- Adicionado pulo duplo com restauração ao aterrissar.
- Substituído o chão contínuo por trechos de terreno em diferentes alturas e plataformas de ligação; o trajeto entre áreas agora exige saltos.
- Redistribuídos os três clientes e o chefe ao longo do mapa.
- Duas figuras provisórias de supervisão agora aparecem no início de cada fase.
- As etapas de diálogo 2 e 3 passaram a retomar o contexto e o nome do cliente, preservando a estrutura de três etapas.
- As imagens de fachada e personagens enviadas pelo usuário foram recebidas, mas ainda não foram adicionadas como arquivos binários ao repositório; a integração visual final permanece pendente.

## 2026-11-12 — Documentação de continuidade
- Criados `PROJECT_STATUS.md`, `CHANGELOG.md` e `ROADMAP.md` na raiz.
- Definido `PROJECT_STATUS.md` como primeiro documento a consultar em futuras conversas.
- Atualizados os links no README e o antigo `docs/ROADMAP.md` para evitar referências conflitantes.
- Nenhum código ou funcionalidade do jogo foi alterado nesta atualização.

## 2026-11-11 — Mecânicas e interface
- `ce91a0b` — Implementada lógica de colisões de plataformas e atendimento em múltiplas etapas.
- `5206f11` — Adicionado estilo visual ao medidor de intenção de permanência.
- `6f94fe2` — Adicionada codificação por cores do medidor conforme a intenção do cliente.
- `a5fa86c` — Refinada a aparência do preenchimento do medidor.
- `d0a84e1` — Adicionado arquivo `render.yaml` para configuração de site estático no Render.

## 2026-11-11 — Estrutura inicial do protótipo
- `8cfa2e2` — Criada a base jogável do protótipo no navegador.
- `bc23522` — Aplicado estilo de interface com inspiração pixel art.
- `76559ea` — Adicionados README, visão geral e instruções iniciais.
- `e1c4d93` — Adicionado `.gitignore`.

## Observações
- O histórico acima lista os commits relevantes disponíveis na consulta; não representa necessariamente cada alteração de linha do repositório.
- Funcionalidade descrita em mensagem de commit não é considerada validada por isso. Consulte `PROJECT_STATUS.md` para o estado observado no código e as limitações conhecidas.
- Atualize este arquivo em ordem cronológica reversa após alterações relevantes, incluindo hash curto do commit quando disponível.
