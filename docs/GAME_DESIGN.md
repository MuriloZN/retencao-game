# Documento de design — Retenção Game

## Conceito
Aventura 2D de plataforma e parkour em pixel art. O jogador percorre ambientes inspirados na unidade da empresa, coleta XP e conversa com clientes em situações de retenção.

## Pilares
1. **Aprendizagem prática:** situações plausíveis e decisões contextualizadas.
2. **Exploração:** caminhos, obstáculos, segredos e colecionáveis.
3. **Atendimento responsável:** ouvir, investigar, explicar e respeitar a decisão do cliente.
4. **Progressão:** XP representa desenvolvimento de competências, não pressão para impedir todo cancelamento.

## Estrutura de fases
Cada fase contém três atendimentos regulares e um desafio de chefe:
- **Insatisfação:** experiência ruim, dificuldade de informação e orientações divergentes.
- **Financeiro:** dificuldade de pagamento, mensalidade incompatível e negociação de débitos.
- **Técnico:** lentidão, quedas e problemas recorrentes.

Cada chefe combina diferentes objeções da sua fase.

## Ciclo de atendimento
1. NPC apresenta o contexto.
2. Jogador investiga e identifica a necessidade.
3. Pode solicitar orientação à supervisão a qualquer momento.
4. Escolhe uma resposta entre 2 e 4 alternativas.
5. Recebe feedback explicando o impacto da escolha e XP.
6. Avança pelo cenário.

## Supervisão
Ajuda ilimitada, sem bloquear o jogador. Quando utilizada, reduz o bônus de XP daquela interação. A orientação deve estimular raciocínio (perguntas, pontos de atenção e critérios), sem simplesmente entregar a resposta.

## XP e progressão
- Exploração e colecionáveis concedem XP.
- Atendimento concede XP por investigação, abordagem e solução.
- Uma retenção bem-sucedida pode render bônus, desde que a solução seja adequada ao cliente.
- Respeitar um cancelamento quando essa for a decisão legítima não deve ser tratado como fracasso.
- Faixas de progressão planejadas: Aprendiz (2 opções), Intermediário (3 opções), Experiente (4 opções). As opções adicionais devem trazer nuances e não tornar a resposta correta automática.

## Movimento e câmera
- Plataforma 2D lateral com câmera acompanhando o personagem.
- Personagem posicionado um pouco à esquerda do centro para revelar o caminho à frente.
- Cenário dividido em segmentos independentes para revelar a fachada gradualmente.
- Colisões, plataformas, portas, NPCs, áreas de atendimento e arena do chefe.

## Direção de arte
Pixel art colorida, leitura clara, interface inspirada em HUD de jogos clássicos. A fachada real serve como referência de composição, sem exigir uma reprodução literal. Personagens e cenário serão construídos colaborativamente.

## Princípios de conteúdo
- Não usar dados pessoais ou casos identificáveis de clientes.
- Não inventar políticas comerciais ou condições de oferta.
- Ajustar exemplos às regras e processos que forem validados pela equipe.
- Evitar premiar pressão, informação enganosa ou promessas impossíveis.
