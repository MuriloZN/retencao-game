export const phases = [
  { name:"Insatisfação", supervisor:"Supervisora", intro:"Vamos entender o que aconteceu antes de propor qualquer saída. Escute, investigue e reconheça a experiência do cliente.", customers:[
    {name:"Camila",role:"Cliente",issue:"Fui mal atendida quando liguei da última vez. Ninguém explicou o que estava acontecendo.",question:"Como você começaria esse atendimento?",options:[
      {text:"Reconhecer a experiência, pedir desculpas pelo ocorrido e perguntar o que aconteceu.",good:true,feedback:"Boa abordagem: você acolheu a reclamação e abriu espaço para entender os detalhes.",xp:25},
      {text:"Dizer que isso não costuma acontecer e mudar logo de assunto.",good:false,feedback:"Evite minimizar a experiência. Primeiro demonstre que ouviu e leve a situação a sério.",xp:4},
      {text:"Oferecer um desconto imediatamente, sem investigar.",good:false,feedback:"Uma compensação sem entender o problema pode não resolver a causa da insatisfação.",xp:8}
    ]},
    {name:"Rafael",role:"Cliente",issue:"Tive dificuldade para encontrar informações sobre meu plano e fiquei sem saber a quem recorrer.",question:"Qual é o próximo passo mais útil?",options:[
      {text:"Perguntar qual informação ele procurava e em que etapa teve dificuldade.",good:true,feedback:"Correto: perguntas abertas ajudam a localizar a dificuldade real.",xp:25},
      {text:"Repetir todas as condições do contrato de uma vez.",good:false,feedback:"Informação em excesso não resolve necessariamente a dúvida. Descubra primeiro o que falta.",xp:6}
    ]},
    {name:"Joana",role:"Cliente",issue:"Precisei entrar em contato várias vezes e cada pessoa me passou uma orientação diferente.",question:"Como conduzir a conversa?",options:[
      {text:"Reconstruir o histórico, confirmar o que já foi tentado e alinhar uma orientação clara.",good:true,feedback:"Muito bem: continuidade e clareza reduzem retrabalho e aumentam confiança.",xp:25},
      {text:"Pedir que ela explique tudo novamente sem consultar o histórico.",good:false,feedback:"Quando possível, aproveite o histórico para não transferir todo o esforço ao cliente.",xp:5}
    ]}
  ],boss:{name:"Desafio da Insatisfação",issue:"O cliente relata atendimento ruim, informações desencontradas e falta de retorno.",question:"Qual abordagem integra melhor esses pontos?",options:[
    {text:"Reconhecer os problemas, ouvir a sequência dos fatos, consultar o histórico e combinar próximos passos realistas.",good:true,feedback:"Excelente! Você conectou os fatos e apresentou um caminho transparente.",xp:45},
    {text:"Focar apenas em oferecer um benefício para encerrar a reclamação.",good:false,feedback:"O benefício não substitui a resolução das causas da insatisfação.",xp:5}
  ]}},
  {name:"Financeiro",supervisor:"Supervisor",intro:"Nesta etapa, investigue a realidade financeira sem julgamento. Explique alternativas com transparência e respeite os limites do cliente.",customers:[
    {name:"Bruno",issue:"Estou com dificuldade para pagar a fatura neste mês.",question:"Como começar?",options:[
      {text:"Entender o momento, verificar opções disponíveis e explicar condições sem prometer o que não existe.",good:true,feedback:"Boa escolha: acolhimento e alternativas claras.",xp:25},
      {text:"Pressionar para pagar imediatamente.",good:false,feedback:"Pressão prejudica a confiança e não resolve a dificuldade financeira.",xp:4}
    ]},
    {name:"Patrícia",issue:"A mensalidade ficou pesada para o meu orçamento.",question:"O que investigar?",options:[
      {text:"Perguntar o que mudou no orçamento e entender quais serviços são essenciais para ela.",good:true,feedback:"Você buscou contexto antes de sugerir mudanças.",xp:25},
      {text:"Insistir que o preço é justo e que ela deve manter o plano.",good:false,feedback:"Defender o preço sem ouvir a necessidade não ajuda a encontrar uma solução.",xp:5}
    ]},
    {name:"Diego",issue:"Tenho valores em aberto e não entendi as opções de negociação.",question:"Qual resposta é mais adequada?",options:[
      {text:"Conferir os valores e apresentar as condições de negociação disponíveis, com custos e prazos.",good:true,feedback:"Transparência é essencial para uma decisão consciente.",xp:25},
      {text:"Garantir que qualquer negociação será aprovada.",good:false,feedback:"Nunca prometa condições que ainda não foram confirmadas.",xp:3}
    ]}
  ],boss:{name:"Desafio Financeiro",issue:"O cliente tem parcelas em atraso, orçamento reduzido e dúvidas sobre o valor mensal.",question:"Como equilibrar os fatores?",options:[
    {text:"Mapear a dificuldade, conferir débitos, explicar opções reais e avaliar um plano compatível com o orçamento.",good:true,feedback:"Ótimo: você tratou o cenário completo sem criar falsas expectativas.",xp:45},
    {text:"Oferecer o maior desconto possível sem verificar regras.",good:false,feedback:"Condições precisam ser verificadas e explicadas corretamente.",xp:4}
  ]}},
  {name:"Técnico",supervisor:"Supervisora",intro:"Agora o foco é entender sintomas, frequência, impacto e histórico técnico. Não conclua a causa antes de investigar.",customers:[
    {name:"Lucas",issue:"Minha internet está lenta principalmente à noite.",question:"O que perguntar primeiro?",options:[
      {text:"Investigar horários, dispositivos afetados, testes realizados e exemplos de uso.",good:true,feedback:"Boa investigação: você está delimitando o cenário.",xp:25},
      {text:"Afirmar que o problema é o roteador sem testar.",good:false,feedback:"Evite diagnosticar por suposição.",xp:4}
    ]},
    {name:"Fernanda",issue:"A conexão cai várias vezes durante o dia.",question:"Como avançar?",options:[
      {text:"Levantar frequência, luzes do equipamento, dispositivos e ocorrências anteriores.",good:true,feedback:"Você coletou dados úteis para direcionar o diagnóstico.",xp:25},
      {text:"Orientar a reiniciar e encerrar sem confirmar o resultado.",good:false,feedback:"Confirme se a orientação resolveu e registre a recorrência.",xp:6}
    ]},
    {name:"André",issue:"Já recebi suporte outras vezes, mas o problema voltou.",question:"Qual cuidado é importante?",options:[
      {text:"Consultar atendimentos anteriores e verificar se a causa foi resolvida ou apenas contornada.",good:true,feedback:"Excelente: recorrência pede análise do histórico e da causa.",xp:25},
      {text:"Repetir o mesmo procedimento sem consultar o histórico.",good:false,feedback:"Repetir ações sem contexto pode gerar mais frustração.",xp:4}
    ]}
  ],boss:{name:"Desafio Técnico",issue:"O cliente relata lentidão, quedas frequentes e várias tentativas anteriores sem solução definitiva.",question:"Qual é a melhor condução?",options:[
    {text:"Organizar os sintomas, consultar o histórico, seguir diagnóstico adequado e alinhar prazo e próximos passos.",good:true,feedback:"Excelente! Você conectou sintomas e histórico sem antecipar conclusões.",xp:45},
    {text:"Prometer que a conexão nunca mais terá falhas.",good:false,feedback:"Não prometa resultados absolutos. Explique o que será verificado e acompanhado.",xp:3}
  ]}}
];
