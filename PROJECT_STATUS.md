# Estado do projeto — Retenção Game

> **Documento de continuidade.** Leia este arquivo antes de propor ou realizar alterações no repositório. Ele descreve o que foi encontrado no código em 2026-11-12; requisitos planejados e relatos de uso são identificados separadamente de funcionalidades verificadas no código.

## 1. Visão geral

Retenção Game é um protótipo de jogo educacional para navegador, em formato de plataforma 2D, voltado ao treinamento de atendimento e retenção responsável de clientes. O jogador explora um cenário, coleta XP e atende clientes em três frentes: Insatisfação, Financeiro e Técnico.

O princípio central é não incentivar retenção a qualquer custo. O atendimento deve investigar a necessidade, apresentar apenas alternativas válidas e respeitar a decisão consciente do cliente, inclusive o cancelamento.

Projeto independente do DeskGaming.

## 2. Tecnologias e execução

- HTML5: estrutura da página e elementos de interface.
- CSS3: layout, HUD, diálogos e adaptação básica para telas menores.
- JavaScript moderno (ES modules): lógica do jogo, dados, física, câmera e interações.
- Canvas 2D: renderização do cenário e dos personagens provisórios.
- Google Fonts (Nunito) importada por CSS.
- Render Static Site: configuração declarada em `render.yaml`.

Não há `package.json`, dependências npm, bundler, framework ou etapa de build declarada no repositório. A aplicação carrega `src/game.js` como módulo diretamente pelo navegador. O projeto não contém suíte de testes automatizados nem workflow de CI visível na árvore analisada.

## 3. Estrutura atual

```
.
├── .gitignore
├── README.md
├── index.html
├── styles.css
├── render.yaml
├── src/
│   ├── data.js
│   └── game.js
├── assets/
│   └── README.md
└── docs/
    ├── GAME_DESIGN.md
    └── ROADMAP.md
```

Documentação principal de continuidade na raiz:
- `PROJECT_STATUS.md`: estado verificado e instruções para futuras conversas.
- `CHANGELOG.md`: histórico cronológico resumido.
- `ROADMAP.md`: planejamento e prioridades atuais.

O arquivo `docs/ROADMAP.md` foi mantido como ponte para o roadmap principal. `docs/GAME_DESIGN.md` continua sendo a referência de visão e regras de design.

### Responsabilidade dos arquivos de código

- `index.html`: canvas 960×540, HUD, controles móveis, instruções e estrutura do diálogo.
- `styles.css`: aparência da página, canvas, HUD, modal, medidor e responsividade básica.
- `src/game.js`: loop de animação, entrada, movimento, colisões, câmera, cenário desenhado, NPCs, atendimento, XP e progressão entre fases.
- `src/data.js`: dados dos três grupos de clientes e respectivos desafios de chefe.
- `render.yaml`: declaração de publicação estática no Render com diretório publicado na raiz.

## 4. Funcionalidades identificadas no código

Os itens abaixo existem na implementação atual. Isso não significa que tenham sido validados em todos os navegadores ou que estejam livres de bugs.

- [x] Página de jogo com Canvas 2D e HUD de fase, XP e vidas.
- [x] Três fases: Insatisfação, Financeiro e Técnico.
- [x] Três clientes regulares e um chefe definidos por fase em `src/data.js`.
- [x] NPCs posicionados no cenário e interação por proximidade usando a tecla E.
- [x] Movimento lateral, salto, gravidade, limites horizontais do mundo e câmera que acompanha o jogador.
- [x] Plataformas com lógica de colisão vertical e lateral implementada.
- [x] Colecionáveis de XP distribuídos pelo cenário.
- [x] Atendimento dividido em três etapas de escolha: investigação, encaminhamento e finalização.
- [x] Medidor de intenção de permanência, com valor percentual e preenchimento colorido conforme o valor.
- [x] Três faixas de resultado: cliente aceita continuar, permanece em dúvida ou mantém o cancelamento.
- [x] Orientação de supervisão disponível durante o atendimento; quando usada, reduz o XP das escolhas daquela conversa.
- [x] Feedback textual e concessão de XP pelas escolhas.
- [x] Controles por teclado e botões móveis básicos.
- [x] Reinício do protótipo.
- [x] Configuração de site estático declarada em `render.yaml`.

## 5. Funcionalidades parciais ou ainda não comprovadas

- [ ] **Diálogo realmente contextual e contínuo:** a interface possui três etapas, mas apenas a primeira usa a pergunta e as alternativas específicas do cliente em `data.js`. As etapas seguintes usam opções genéricas conforme a fase. Não há ainda uma conversa individual completa em que a reação do cliente e a próxima fala mudem de acordo com cada resposta.
- [ ] **Medidor semanticamente calibrado:** os deltas alteram o percentual e determinam o resultado, mas a escala é uma regra simplificada de protótipo; não há validação pedagógica ou de negócio dos pesos.
- [ ] **Progressão por níveis e desbloqueio de 2 a 4 alternativas:** está descrita em `docs/GAME_DESIGN.md`, mas não foi encontrada no código atual.
- [ ] **Sistema de vidas:** o HUD exibe três vidas, mas não foi identificada lógica de perda, recuperação ou consequência.
- [ ] **Cenários e arte finais:** cenário, NPCs, protagonista, plataformas e colecionáveis são desenhados com formas geométricas no Canvas. A pasta `assets/` contém apenas instruções; não há sprites ou tilesets implementados.
- [ ] **Mundo e parkour completos:** há plataformas e colecionáveis simples, mas portas, caminhos alternativos, segredos, interiores e segmentos detalhados da fachada ainda não estão implementados.
- [ ] **Persistência:** não foi encontrada gravação de progresso entre sessões.
- [ ] **Acessibilidade e responsividade:** existem controles móveis e regras CSS básicas, mas não há validação abrangente de acessibilidade, dispositivos ou tamanhos de tela.
- [ ] **Validação real de execução:** o usuário relatou que o protótipo estava funcionando parcialmente, mas não há resultado de testes automatizados ou evidência de teste manual completo no histórico consultado.

## 6. Bugs, riscos e pontos de atenção

1. **Colisões precisam de teste prático.** A função `movePlayer()` resolve colisões horizontais antes da etapa vertical. Isso pode gerar bloqueios laterais inesperados quando o jogador está abaixo ou ao lado de uma plataforma. A lógica existe, mas não deve ser considerada validada apenas pela leitura do código.
2. **O conteúdo das conversas se repete dentro da fase.** A segunda e a terceira etapas dependem principalmente de `phaseIndex`, não do contexto específico de cada cliente. Isso limita a continuidade e a individualização do atendimento.
3. **Fechar o diálogo interrompe o atendimento.** ESC e o botão de fechar ocultam a janela sem concluir o encontro; ao reinteragir, o atendimento pode recomeçar do início.
4. **A vida exibida é apenas visual.** O contador não está conectado a um sistema de jogo.
5. **O medidor não representa uma avaliação validada.** Os limites de 65% e 35%, os deltas e o bônus de XP são parâmetros fixos no código e precisam de revisão antes de uso como treinamento formal.
6. **Sem testes automatizados.** Não há configuração de lint, testes unitários, testes de integração ou CI identificada.
7. **Arte provisória.** A apresentação atual é geométrica e não corresponde à direção de arte pixel art desejada para a versão final.
8. **Configuração de hospedagem:** `render.yaml` declara o serviço com nome `retencao-game`. O serviço utilizado anteriormente pelo usuário foi informado como `retencao-game-1`; verificar a configuração no Render antes de assumir que o Blueprint está sincronizado com o serviço existente.

Não foi possível confirmar nesta análise se o site publicado está atualizado ou se todos os fluxos funcionam em navegador. Não declarar esses pontos como testados.

## 7. Decisões técnicas e regras de negócio

- Manter a aplicação simples, sem framework ou build enquanto isso atender ao escopo.
- Preservar HTML/CSS/JavaScript nativos e Canvas 2D, salvo decisão explícita de arquitetura.
- Manter os dados de clientes e fases separados da lógica em `src/data.js`.
- Não usar dados pessoais, casos identificáveis ou informações internas/confidenciais de clientes.
- Não inventar políticas comerciais, descontos, condições ou prazos. Conteúdo operacional deve ser validado por responsáveis.
- Investigar antes de oferecer solução; não minimizar a experiência nem fazer promessas impossíveis.
- Não premiar pressão ou retenção a qualquer custo. Cancelamento consciente e adequado deve ser respeitado.
- Ajuda da supervisão deve orientar o raciocínio, não simplesmente entregar a resposta; seu uso reduz o XP daquela interação.
- A direção visual desejada é pixel art inspirada no ambiente da Desktop, construída colaborativamente. A arte final deve vir depois da estabilização dos sistemas básicos.

## 8. Último estado conhecido

- Branch padrão observada: `main`.
- Commit mais recente observado durante a análise: `a5fa86cf8c06fe9a2bb892d73cdb3f1454ebca5b` — “Refine retention meter fill appearance” (2026-11-11).
- Commits imediatamente anteriores incluem implementação de colisões e atendimento em etapas, além do medidor de retenção e ajustes visuais.
- O usuário informou anteriormente que o protótipo publicado funcionava “mais ou menos bem”. Isso é um relato de uso, não um teste independente desta análise.
- Não foram alterados arquivos de código nesta atualização documental.

## 9. Próximas prioridades

1. Testar o jogo no navegador e registrar reprodução dos problemas de colisão; corrigir apenas após observar o comportamento.
2. Reestruturar os atendimentos para que cada cliente tenha falas, respostas e reações contextualizadas nas três etapas.
3. Revisar a lógica do medidor, os resultados e o XP para garantir coerência pedagógica e tratamento justo do cancelamento.
4. Criar testes manuais reproduzíveis e, se fizer sentido, adicionar testes automatizados leves sem introduzir dependências desnecessárias.
5. Implementar progressão por níveis e desbloqueio de alternativas, caso essa regra continue aprovada.
6. Evoluir o cenário, os personagens e a fachada para pixel art depois de estabilizar física e diálogos.
7. Validar conteúdo de atendimento, acessibilidade, dispositivos e publicação.

## 10. Instruções para futuras conversas com o assistente

**Manutenção manual:** estes documentos são uma convenção de trabalho, não um mecanismo automatizado. Não foi encontrado workflow ou verificação que atualize os arquivos por conta própria; quem implementar uma alteração deve atualizar a documentação no mesmo conjunto de trabalho.

1. Ler este `PROJECT_STATUS.md` primeiro; em seguida consultar `CHANGELOG.md`, `ROADMAP.md` e `docs/GAME_DESIGN.md) conforme necessário.
2. Conferir o código atual antes de afirmar que uma funcionalidade existe ou está concluída.
3. Distinguir claramente entre implementado, parcialmente implementado, planejado, relatado pelo usuário e testado.
4. Antes de editar, verificar o estado mais recente da branch e os arquivos afetados.
5. Preservar decisões técnicas e regras de negócio registradas. Se uma decisão mudar, registrar a mudança no changelog e atualizar este status.
6. Após qualquer alteração relevante, atualizar este arquivo e o changelog; atualizar o roadmap quando prioridades ou escopo mudarem.
7. Não modificar código como parte de uma tarefa exclusivamente documental.
8. Não declarar testes, deploy ou funcionamento confirmados sem executar a validação correspondente e registrar o resultado.
