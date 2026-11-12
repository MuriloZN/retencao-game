# Roadmap — Retenção Game

> Planejamento vivo do projeto. O estado atual das funcionalidades está em `PROJECT_STATUS.md`; este arquivo organiza o trabalho futuro. Itens concluídos devem ser marcados somente após implementação e validação compatível com o item.

## Prioridade 0 — Validar a base atual

- [ ] Testar o pulo duplo e confirmar que ele é necessário nos trechos previstos.
- [ ] Ajustar espaçamento, alturas e colisões do percurso com base em teste real.
- [ ] Integrar os arquivos fornecidos (fachada e personagens) em `assets/` e conectá-los ao Canvas.

- [ ] Executar o jogo no navegador e registrar navegador, dispositivo e resultado.
- [ ] Testar salto, aterrissagem em cada plataforma, colisões laterais, passagem sob plataformas e queda das bordas.
- [ ] Verificar se o jogador consegue alcançar os NPCs e o chefe sem ficar preso.
- [ ] Testar interação, fechamento do diálogo, reinício e progressão entre as três fases.
- [ ] Conferir a publicação do Render e a relação entre o nome do serviço existente e o `render.yaml`.

**Dependência:** testes manuais antes de alterar a física ou declarar as colisões estáveis.

## Prioridade 1 — Sistema de atendimento contextual

- [ ] Dar a cada cliente uma conversa própria com continuidade entre introdução/investigação, negociação/encaminhamento e finalização.
- [ ] Fazer o cliente reagir à escolha feita, incluindo mudança de tom, novas informações ou objeções.
- [ ] Garantir que as etapas 2 e 3 dependam do contexto do cliente, não apenas da fase.
- [ ] Diferenciar diálogos de clientes regulares, chefes e supervisores.
- [ ] Definir comportamento ao fechar ou abandonar um atendimento, evitando reinícios ou conclusões acidentais.
- [ ] Revisar limites e variações do medidor de permanência com critérios pedagógicos claros.
- [ ] Garantir que cancelar de forma consciente não seja tratado como derrota ou falha moral.
- [ ] Validar pontuação de XP por investigação, solução, ajuda da supervisão e desfecho.

**Dependência:** decisões de conteúdo e regras de negócio validadas antes de expandir o banco de diálogos.

## Prioridade 2 — Progressão e qualidade de jogo

- [ ] Implementar níveis de experiência e desbloqueio gradual de 2 a 4 alternativas, mantendo opções inadequadas para reflexão.
- [ ] Implementar ou remover conscientemente o contador de vidas (atualmente visual).
- [ ] Criar tela de resultados com feedback por competência.
- [ ] Avaliar persistência do progresso entre sessões.
- [ ] Expandir variações de clientes e situações para reduzir repetição.
- [ ] Adicionar testes reproduzíveis para os fluxos principais.

**Dependência:** estabilização do atendimento e definição de regras de XP.

## Prioridade 3 — Cenário e identidade visual

- [ ] Definir o protagonista e opções de aparência.
- [ ] Criar spritesheets de idle, caminhada e salto.
- [ ] Criar supervisores, clientes e chefes em pixel art.
- [ ] Construir a fachada em segmentos reutilizáveis e revelar o cenário conforme a câmera avança.
- [ ] Criar áreas de entrada, estacionamento, recepção e ambientes internos.
- [x] Adicionar relevo com plataformas em alturas variadas e travessias obrigatórias por salto.
- [ ] Adicionar obstáculos, rotas alternativas e segredos com propósito de exploração.
- [ ] Substituir gradualmente as formas geométricas provisórias por assets finais.

**Dependência:** estabilizar dimensões de colisão, escala e câmera antes de produzir tilesets finais.

## Prioridade 4 — Conteúdo, validação e publicação

- [ ] Revisar diálogos com pessoas experientes em atendimento.
- [ ] Validar políticas, procedimentos, ofertas, prazos e condições com responsáveis.
- [ ] Testar usabilidade com jogadores e registrar feedback.
- [ ] Revisar acessibilidade, contraste, legibilidade, teclado e controles móveis.
- [ ] Testar navegadores e resoluções suportados.
- [ ] Documentar o processo de publicação e verificar a configuração do serviço no Render.

## Regras de manutenção do roadmap

- Marcar como concluído apenas após conferir código e testar o comportamento correspondente.
- Registrar bloqueios e dependências em cada item relevante.
- Reordenar prioridades quando surgirem bugs críticos ou decisões novas; registrar mudanças importantes em `CHANGELOG.md`.
- Não tratar ideias de design como funcionalidades implementadas.
