// t = trechos de chão [x, largura, y]; p = plataformas [x, y, largura]; n = x dos 3 clientes + chefe.
// Alcance do jogador: pulo simples ≈ 128px de vão e 110px de altura; pulo duplo ≈ 230px e 190px.
export const levels=[
 {t:[[0,600,438],[850,500,420],[1560,430,360],[2260,540,400],[3040,460,340]],
  p:[[690,395,60],[1400,385,70],[1500,345,60],[2030,325,70],[2140,285,70],[2850,365,65],[2960,330,65]],n:[1050,1700,2500,3380]},
 {t:[[0,520,438],[780,330,400],[1330,300,350],[1900,380,410],[2520,300,360],[3100,400,330]],
  p:[[590,395,55],[690,355,55],[1150,370,55],[1245,335,55],[1680,310,55],[1780,265,55],[1850,320,50],[2320,370,55],[2420,320,55],[2870,320,50],[2960,280,50],[3040,305,45]],n:[920,2020,2650,3380]},
 {t:[[0,440,438],[700,220,410],[1180,200,360],[1620,240,420],[2150,220,350],[2640,220,400],[3120,380,330]],
  p:[[540,380,50],[1000,360,50],[1440,325,50],[1540,290,50],[1930,370,45],[2020,320,45],[2440,310,45],[2530,265,45],[2930,360,45],[3020,320,45]],n:[800,1700,2250,3400]}
];
// w: "a" = Supervisora 1 (contexto), "b" = Supervisora 2 (dicas e padrões de qualidade)
export const stories=[
 [{w:"a",t:"Estamos tendo muitas dificuldades com clientes insatisfeitos ultimamente e precisamos da sua ajuda para recuperá-los!"},
  {w:"b",t:"Dica de ouro: escute primeiro. Reconheça a experiência do cliente, faça perguntas abertas e só depois pense em uma solução."},
  {w:"b",t:"E lembre-se: siga sempre os padrões de qualidade do atendimento. Nada de prometer o que não pode cumprir ou oferecer algo fora das regras da empresa."},
  {w:"a",t:"Atravesse o percurso, converse com cada cliente e enfrente o desafio no final. Estaremos com você em cada atendimento!"}],
 [{w:"a",t:"Agora o problema é outro: muitos clientes querem cancelar por causa do valor da mensalidade e de débitos em aberto."},
  {w:"b",t:"Investigue a realidade financeira sem julgar. Entenda o que mudou e explique as alternativas com clareza."},
  {w:"b",t:"Só apresente condições que existem e que você verificou. Desconto fora da política ou promessa sem confirmação quebra as regras e a confiança."},
  {w:"a",t:"O caminho está mais difícil nesta fase. Vá com calma, e conte com a gente nas conversas!"}],
 [{w:"a",t:"Os clientes estão enfrentando lentidão e quedas de conexão, e muitos já tentaram suporte antes sem solução definitiva."},
  {w:"b",t:"Colete os sintomas: horários, equipamentos e frequência. Consulte o histórico antes de concluir qual é a causa."},
  {w:"b",t:"Nunca garanta que o problema não vai voltar. Explique o que será verificado, o prazo e como o cliente terá retorno, sempre dentro dos procedimentos."},
  {w:"a",t:"Esta é a última fase e a mais exigente. Você já mostrou que consegue. Vamos lá!"}]
];
