/* ============================================================
   BRAINDANCING — Dados do sistema
   Extraído do briefing/slide oficial do RPG "Braindancing"
   ============================================================ */

// ---------- PERÍCIAS (10 pontos para distribuir) ----------
const SKILLS = [
  { id:"corpo", nome:"Corpo", desc:"Determina sua Vida. Cada ponto = +10 de Vida."},
  { id:"intel", nome:"Inteligência", desc:"Determina Sanidade e RAM. Cada ponto = +10 Sanidade e +2 RAM."},
  { id:"reflexos", nome:"Reflexos", desc:"Agilidade, iniciativa e precisão em combate."},
  { id:"tecnica", nome:"Técnica", desc:"Perícia com cibernéticas, hacking e engenharia."},
  { id:"moral", nome:"Moral", desc:"Determinação, coragem e estabilidade emocional."},
];

const BASE_LEVEL = 50;
const SKILL_POINTS = 10;
const BASE_VIDA = 50;
const BASE_SANIDADE = 25;

// ---------- CIBERNÉTICAS ----------
// slots: número máximo de implantes que podem ser escolhidos naquela parte do corpo
const CYBER_PARTS = [
  {
    id: "cortex",
    nome: "Córtex Frontal",
    slots: 3,
    icon: "🧠",
    itens: [
      { nome: "Execução Tática", desc: "A cada cena, você ganha 1 ação livre após executar uma pessoa." },
      { nome: "Crítico Amplificado", desc: "Causa +1D8 em qualquer ataque crítico. Agora, seus hacks podem critar." },
      { nome: "Reciclagem de RAM", desc: "Quando você fica sem RAM (Techpoints), recupera automaticamente dois pontos. Uma vez por cena." },
      { nome: "Crítico Rápido", desc: "Seus hacks rápidos podem critar. Causa +1d4 de dano no crítico. Sua DT de crítico agora é 18." },
      { nome: "Hack Duplo", desc: "Uma vez por cena, você pode utilizar dois hacks em uma mesma ação." },
      { nome: "Kerenzikov", desc: "Uma vez por cena, ative o KERENZIKOV: ação livre e pode atirar três vezes durante o efeito." },
      { nome: "Demolidor de Máquinas", desc: "Você destrói drones, robôs e qualquer máquina com um golpe a menos do que o necessário." },
      { nome: "Dreno de Eliminação", desc: "Ganha 1 ponto de RAM ao eliminar um inimigo. Máximo de 5 pontos de RAM acumulados por ação." },
      { nome: "Execução Dupla", desc: "A cada cena, ganha uma ação livre após executar uma pessoa. Pode ser usado duas vezes, mas entra em cooldown na próxima cena de luta." },
      { nome: "Mente Amplificada", desc: "Você ganha 2 de RAM a cada ponto de atributo em Inteligência (bônus adicional)." },
      { nome: "Regeneração de RAM", desc: "Você recupera 1,25 de RAM por turno, ao invés de 1." },
      { nome: "Firewall Mental", desc: "Uma vez por cena, você pode escolher ignorar um hack inimigo." },
    ],
  },
  {
    id: "os",
    nome: "Sistema Operacional",
    slots: 1,
    icon: "💾",
    itens: [
      { nome: "OS Furtivo", desc: "Use hacks simples enquanto faz outra ação. Inimigos demoram um turno a mais para localizar seus hacks. Gasta metade do RAM em máquinas." },
      { nome: "OS Ofensivo", desc: "Use hacks simples enquanto faz outra ação. +1d4 de dano com arma contra alvos afetados por hacks simples. +1d6 de dano de hacks se seguido de um hack simples." },
      { nome: "OS Fantasma", desc: "Use hacks simples enquanto faz outra ação. Inimigos demoram dois turnos a mais para te localizar. -2 de RAM para hacks simples, +5 de RAM por eliminação." },
      { nome: "OS Combo", desc: "Use hacks simples enquanto faz outra ação. +1d4 de dano de hacks simples e +2 por hacks usados em combate (reseta por cena). Atirar com arma inteligente em alvo hackeado acelera o hack." },
      { nome: "OS Propagação", desc: "Use hacks simples enquanto faz outra ação. Seus hacks simples aumentam a área em 50% e se espalham automaticamente para todos os inimigos disponíveis." },
      { nome: "OS Persistente", desc: "Use hacks simples enquanto faz outra ação. Hacks rápidos duram um turno a mais e atingem mais um inimigo. +1d4 por turno sob efeito de seus hacks." },
      { nome: "Dilatação Temporal I", desc: "Uma vez por cena, diminua o tempo: ação livre e ataque dois inimigos ao invés de um só. Recebe metade de dano de queimadura, químico ou elétrico." },
      { nome: "Dilatação Temporal II", desc: "Uma vez por cena, diminua o tempo: ação livre e ataque três inimigos ao invés de um só. Ao eliminar um inimigo, pode eliminar mais um (acumula até 4)." },
      { nome: "Berserk Crítico", desc: "Ative o modo BERSERK (não pode ficar com menos de 5 de vida, nem usar itens/armas de longa distância). Dobra dano crítico, ação livre por turno, DT crítico 15. Dura 2 turnos, 1x por cena." },
      { nome: "Dilatação + Impacto", desc: "Uma vez por cena, ação livre e ataque dois inimigos. Se ativado em movimento, +1 turno de duração, reduz dano de queda e +1d4 de dano com arma de fogo." },
      { nome: "Dilatação Crítica", desc: "Uma vez por cena, ação livre e ataque três inimigos. DT de crítico agora é 17. +1d4 de dano ao critar." },
      { nome: "Dilatação Executora", desc: "Uma vez por cena, ação livre e ataque três inimigos. Ao neutralizar um inimigo, realize outra ação livre." },
      { nome: "Berserk Duplo", desc: "Ative o modo BERSERK: duas ações livres por turno, dura 2 turnos, 1x por cena. Ao terminar, recupera 1d6 de vida por inimigo eliminado." },
      { nome: "Berserk Vingativo", desc: "Ative o modo BERSERK. Com menos da metade da vida, +1d4 de dano; com 5 ou menos, dano dobrado. Recupera 1d6 de vida por inimigo eliminado. Dura 2 turnos." },
      { nome: "Berserk Triplo", desc: "Ative o modo BERSERK: três ações livres por turno, dura 2 turnos, 1x por cena. Ao terminar, recupera 1d6 de vida por inimigo eliminado." },
    ],
  },
  {
    id: "rosto",
    nome: "Rosto / Olhos",
    slots: 1,
    icon: "👁",
    itens: [
      { nome: "Olhos de Precisão", desc: "Sua DT de crítico agora é 18. Com outra cibernética de redução de crítico, sua DT agora é 16." },
      { nome: "Scanner Tático", desc: "Uma vez por cena, escaneie o ambiente para localizar máquinas, inimigos e explosivos. Dura 1 turno, efeito dura 3 turnos." },
      { nome: "Camuflagem Óptica", desc: "Câmeras, drones e máquinas demoram mais dois turnos para te localizar." },
      { nome: "Mira Tecno-Sincronizada", desc: "Conectado à sua arma tecnológica: uma vez por turno, escaneie inimigos próximos para atacar mesmo escondido." },
      { nome: "Scanner Automático I", desc: "Uma vez por cena, escaneie o ambiente automaticamente para localizar máquinas, inimigos e explosivos. Dura 2 turnos." },
      { nome: "Scanner Automático II", desc: "Uma vez por cena, escaneie automaticamente máquinas, armadilhas e explosivos. Dura 2 turnos." },
      { nome: "Scanner Automático III", desc: "Uma vez por cena, escaneie automaticamente máquinas, câmeras e explosivos. Dura 2 turnos." },
      { nome: "Máscara Sintética (especial)", desc: "Implante especial obtido em missão — não pode ser escolhido na criação. Escaneia um rosto e o recria como máscara, adaptando todo o corpo à nova identidade." , especial: true },
    ],
  },
  {
    id: "circulatorio",
    nome: "Sistema Circulatório / Respiratório",
    slots: 3,
    icon: "🫀",
    itens: [
      { nome: "Adrenalina de Combate", desc: "Ao neutralizar um inimigo com arma de mão, gaste RAM ou Sanidade para realizar outra ação." },
      { nome: "Autocura de Emergência", desc: "Ao ficar com 10 de vida ou menos, cura 1d4 por turno até atingir metade da vida." },
      { nome: "Sangue Resistente", desc: "Imune a dano de veneno. Toma apenas metade de dano térmico ou elétrico." },
      { nome: "Bomba de Sangue", desc: "Cura instantaneamente metade da vida e recupera 1d4 de vida até encher. Uma vez por cena." },
      { nome: "Disparo Duplo", desc: "Uma vez por cena, atire em dois inimigos ao invés de um." },
      { nome: "Vampirismo Tecnológico", desc: "Ao atirar com arma tecnológica carregada, ganha 1d4 de vida ou sanidade, à sua escolha." },
      { nome: "Transfusão de Combate", desc: "Ao atirar com arma tecnológica carregada, ganha 1d4 de vida." },
      { nome: "Sanguessuga", desc: "Ao eliminar um inimigo, recupera 1d4 de vida." },
      { nome: "Impulso Livre", desc: "Uma vez por cena, realize uma ação livre." },
      { nome: "Golpe Quádruplo", desc: "A cada 4 ataques com arma de mão, realize um ataque duplo." },
      { nome: "Segundo Coração", desc: "Durante toda a campanha, você pode morrer uma vez e ressuscitar." },
      { nome: "Fôlego de Sobrevivência", desc: "Ao ficar com menos de 15 de vida, realize uma ação livre." },
    ],
  },
  {
    id: "nervoso",
    nome: "Sistema Nervoso",
    slots: 3,
    icon: "⚡",
    itens: [
      { nome: "Reflexos Aprimorados I", desc: "Vantagem em iniciativa: você é, no mínimo, o terceiro a agir (não reduz se ficar em 1º/2º)." },
      { nome: "Reflexos Aprimorados II", desc: "Vantagem em iniciativa: você é, no mínimo, o quarto a agir (não reduz se ficar em 1º/2º)." },
      { nome: "Instinto Furtivo", desc: "Ganha uma ação de movimento extra se o combate iniciar enquanto você estiver escondido e não visto." },
      { nome: "Precisão de Perto I", desc: "A 10m do inimigo, DT de crítico vira 15. A 20m, vira 10." },
      { nome: "Mobilidade Total", desc: "Você pode atirar correndo, deslizando ou pulando, sem desvantagens." },
      { nome: "Mitigação de Dano", desc: "+50% de defesa. Efeito mitigação: 1 a cada 3 cenas, toma apenas metade do dano." },
      { nome: "Fuga Instintiva I", desc: "Uma vez por cena, ação de movimento livre ao ficar com menos de 10 de vida." },
      { nome: "Fuga Instintiva II", desc: "Uma vez por cena, ação de movimento livre ao ficar com menos de 15 de vida." },
      { nome: "Precisão com Lâminas", desc: "DT de crítico agora é 15 para lâminas e armas jogáveis." },
      { nome: "Sexto Sentido", desc: "Uma vez por cena, ação de movimento livre quando faltar um turno para os inimigos te localizarem." },
      { nome: "Sequência Letal", desc: "Ao eliminar inimigos, ganha +2 de dano de armas de fogo (acumula até +30)." },
      { nome: "Precisão de Perto II", desc: "A 10m do inimigo, DT de crítico vira 10. A 20m, vira 5." },
    ],
  },
  {
    id: "pele",
    nome: "Pele",
    slots: 3,
    icon: "🩹",
    itens: [
      { nome: "Resiliência a Surpresa", desc: "Quando atacado de surpresa, toma 5 a menos de dano." },
      { nome: "Derme Reforçada", desc: "Ganha +5 de resistência." },
      { nome: "Regeneração Cutânea", desc: "Cura 1d4 de vida por turno a cada ponto de atributo em Corpo." },
      { nome: "Defesa Perfeita", desc: "Ao critar em teste de defesa, toma metade da metade do dano." },
      { nome: "Pós-Kerenzikov", desc: "Quando o KERENZIKOV termina, você não toma dano no próximo turno." },
      { nome: "Escudo de Aliados", desc: "Uma vez por turno, ignore um projétil direcionado a você ou outra pessoa, se estiver na frente do alvo." },
      { nome: "Camuflagem Térmica", desc: "Inimigos demoram o dobro de tempo para te localizar." },
      { nome: "Placas Subdérmicas I", desc: "Ganha +10 de armadura." },
      { nome: "Absorção de Impacto", desc: "Acumula todo o dano recebido; uma vez por cena, converta metade em um ataque." },
      { nome: "Placas Subdérmicas II", desc: "Ganha 30 de armadura." },
      { nome: "Blindagem de Proximidade", desc: "Quanto mais perto do ataque, menos dano você toma: a 2m reduz 50%, a 5m reduz 25%." },
      { nome: "Blindagem de Distância", desc: "Ganha +35 de armadura quando está a mais de 10m de distância de qualquer inimigo." },
      { nome: "Descarga Elétrica Aleatória", desc: "Ao tomar dano, role 1d100. Em 10, 23 ou 100, emite choque de 100 de dano em inimigos a menos de 5m." },
    ],
  },
  {
    id: "esqueleto",
    nome: "Esqueleto",
    slots: 2,
    icon: "🦴",
    subtitulo: "sem sofrer ciberpsicose",
    itens: [
      { nome: "Estrutura Reforçada I", desc: "Ganha 40 de armadura." },
      { nome: "Capacidade de Carga", desc: "Dobra sua capacidade de carregar itens e armas." },
      { nome: "Vitalidade Óssea I", desc: "Ganha 20 de vida." },
      { nome: "Regeneração Avançada", desc: "Itens de cura curam o dobro e concedem 10 de armadura." },
      { nome: "Estrutura Reforçada II", desc: "Ganha 35 de armadura e pode andar +2m em ações de movimento." },
      { nome: "Neofibra Mitigadora", desc: "Ganha mitigação: com Neofibra, toma metade do dano em 1 a cada 2 cenas." },
      { nome: "Adaptação sob Pressão", desc: "Aumenta a armadura em 10 quando está com menos da metade da vida." },
      { nome: "Conversor de Dano", desc: "Receber dano restaura RAM em 10% do dano recebido." },
      { nome: "Mitigação Total", desc: "Com Neofibra e Juntas de Mola, toma metade do dano durante todas as cenas." },
      { nome: "Punho de Aço", desc: "Aumenta em 1d4 o dano dos ataques com armas de mão." },
      { nome: "Estrutura Reforçada III", desc: "Ganha 20 de armadura." },
      { nome: "Vitalidade Óssea II", desc: "Ganha 2 de vida a cada ponto de atributo em Corpo." },
    ],
  },
  {
    id: "maos",
    nome: "Mãos",
    slots: 2,
    icon: "✋",
    itens: [
      { nome: "Precisão Inteligente", desc: "Ganha 1d10 ao critar com armas inteligentes." },
      { nome: "Ricochete Calculado", desc: "Aumenta a chance da arma de fogo ricochetear (DT 18) e +1d8 de dano no ricochete." },
      { nome: "Desembainhar Rápido", desc: "Não precisa de bandoleira para puxar a arma livremente." },
      { nome: "Recarga Potente", desc: "Recarregar arma tecnológica ou inteligente faz o próximo tiro causar +1d8 de dano." },
      { nome: "Arremesso Preciso", desc: "DT de crítico para armas arremessáveis agora é 15." },
      { nome: "Ativação Furtiva", desc: "Ativa efeitos de armas inteligentes e tecnológicas automaticamente, sem sair do modo furtivo." },
    ],
  },
  {
    id: "bracos",
    nome: "Braços",
    slots: 1,
    icon: "💪",
    itens: [
      { nome: "Lâminas de Choque", desc: "Lâminas nos braços causam 1d4 de dano de choque por ataque, além do 1d8 da lâmina." },
      { nome: "Chicotes Elétricos", desc: "Chicoteie até 3 inimigos a até 10m, causando 1d8 de dano + choque de 1d4 por ataque." },
      { nome: "Braços Leves - Choque", desc: "+1d4 em golpes físicos e 1d4 de dano de choque por ataque." },
      { nome: "Projéteis de Choque", desc: "Lance projéteis de choque: 1d10 de dano por projétil." },
      { nome: "Braços Leves - Sangramento", desc: "+1d4 em golpes físicos. Aplica sangramento em 4 no 1d4 (+1d4 até curar)." },
      { nome: "Lâminas Sangrentas", desc: "Lâminas podem causar sangramento (4 no 1d4, +1d4 até curar), além do 1d8 da lâmina." },
      { nome: "Chicotes Sangrentos", desc: "Chicoteie até 3 inimigos a 10m (1d8) e cause sangramento em 4 no 1d4." },
      { nome: "Projéteis Físicos", desc: "Lance projéteis físicos: 1d10 de dano por projétil." },
      { nome: "Braços Leves - Térmico", desc: "+1d4 em golpes físicos. Aplica dano térmico em 4 no 1d4 (+1d4 por 3 turnos)." },
      { nome: "Lâminas Incandescentes", desc: "Lâminas podem causar dano térmico (4 no 1d4, +1d4 por 3 turnos), além do 1d8 da lâmina." },
      { nome: "Chicotes Incandescentes", desc: "Chicoteie até 3 inimigos a 10m (1d8) e cause dano térmico em 4 no 1d4." },
      { nome: "Projéteis Químicos I", desc: "Projéteis químicos: 1d10 de dano, podendo causar queimadura (1d4 por 2 turnos)." },
      { nome: "Braços Leves - Químico", desc: "+1d4 em golpes físicos. Aplica dano químico em 4 no 1d4 (+1d4 por 3 turnos)." },
      { nome: "Lâminas Corrosivas", desc: "Lâminas podem causar dano químico (4 no 1d4, +1d4 por 3 turnos), além do 1d8 da lâmina." },
      { nome: "Projéteis Químicos II", desc: "Projéteis químicos: 1d10 de dano, podendo causar veneno (1d4 por 2 turnos)." },
      { nome: "Chicotes Corrosivos", desc: "Chicoteie até 3 inimigos a 10m (1d8) e cause dano químico em 4 no 1d4." },
    ],
  },
  {
    id: "pernas",
    nome: "Pernas",
    slots: 1,
    icon: "🦵",
    itens: [
      { nome: "Salto Carregado", desc: "Gaste uma ação para carregar o pulo e saltar mais alto e mais longe." },
      { nome: "Corrida Aprimorada", desc: "Corra mais rápido e ganhe mais uma ação de movimento, uma vez por cena." },
      { nome: "Combo de Movimento", desc: "Ganha mais uma ação de movimento por cena. Com o combo inteiro, ganha mais duas." },
      { nome: "Passos Silenciosos", desc: "Ganha +5 em testes de furtividade." },
      { nome: "Double Jump", desc: "Com duas ações, pule duas vezes, inclusive no meio do ar." },
    ],
  },
];

// ---------- HACKS (custam RAM) ----------
const HACKS = [
  { nome: "Veneno Viral", custo: 16, desc: "Infecta com veneno tóxico: 1d8/turno por 3 turnos. Espalha para até 2 inimigos próximos. Dano térmico o faz explodir (dobro de dano)." },
  { nome: "Chama Persistente", custo: 16, desc: "Coloca fogo no inimigo: 1d8/turno por 3 turnos. Reaplicável. Derrete até 40% da armadura em 9 turnos." },
  { nome: "Curto Confuso", custo: 10, desc: "1d4 de dano + confusão por um turno. Robôs/câmeras/torretas tomam o dobro. Dano dobra a cada reaplicação." },
  { nome: "Pulso Ensurdecedor", custo: 8, desc: "Ensurdece um inimigo, afetando detecção furtiva e impedindo comunicação." },
  { nome: "Sobrecarga Letal", custo: 20, desc: "Causa 2 de dano por RAM gasta na cena. Após o 1º uso, passa a custar -2 de RAM." },
  { nome: "Paralisia Total", custo: 20, desc: "Desabilita o movimento de qualquer alvo, incluindo robôs." },
  { nome: "Curto-Circuito Cibernético", custo: 20, desc: "Desativa cibernética inimiga por um turno. 3 conjurações: 1d4 de choque. 5 conjurações no mesmo alvo: quebra permanentemente." },
  { nome: "Cegueira Total", custo: 10, desc: "Cega o inimigo (incluindo robôs, torretas e câmeras) por um turno." },
  { nome: "Sabotagem de Arma", custo: 16, desc: "Detona a arma primária do inimigo, forçando a troca até o fim do combate." },
  { nome: "Chamariz", custo: 8, desc: "Chama a atenção do inimigo para sua posição com a guarda baixa. Pode redirecionar para uma câmera. Uso único por inimigo." },
  { nome: "Apagar Memória", custo: 10, desc: "O alvo esquece você (ou aliado escolhido) e desiste de procurar por um turno." },
  { nome: "Varredura de Rede", custo: 8, desc: "Revela todos os inimigos conectados às tecnologias disponíveis." },
  { nome: "Grito de Socorro Falso", custo: 10, desc: "Simula um pedido de ajuda para atrair um inimigo até um corpo abatido." },
  { nome: "Fratricídio", custo: 20, desc: "Força o inimigo a atacar seu aliado mais próximo (ou a si mesmo, se sozinho)." },
  { nome: "Autodetonação", custo: 20, desc: "Força o inimigo a detonar a própria granada nas mãos." },
  { nome: "Autoexecução", custo: 20, desc: "Força o inimigo a atirar em si mesmo com a própria arma (ou roubar uma arma próxima)." },
  { nome: "Nocaute Silencioso", custo: 10, desc: "Desmaia um inimigo sem alertar os demais, atacando o sistema nervoso." },
];

// ---------- ARMAS ----------
const WEAPON_CATEGORIES = [
  { id: "fogo", nome: "Arma de Fogo", desc: "Possui versões pesada e pistola." },
  { id: "inteligente", nome: "Arma Inteligente", desc: "Balas teleguiadas. Possui versões pesada e pistola." },
  { id: "tecnologica", nome: "Arma Tecnológica", desc: "Pode ser carregada para causar mais dano. Possui versões pesada e pistola." },
  { id: "lamina", nome: "Lâmina", desc: "Arma de mão (corpo a corpo)." },
  { id: "maos", nome: "Arma de Mão (impacto)", desc: "Arma de mão (corpo a corpo)." },
];

// ---------- ITENS ----------
const ITEMS_EXEMPLO = [
  "Granadas", "Bandoleira", "Kit médico", "Mochila", "Corda",
  "Coroa de neurodança", "Bebidas", "Remédios", "Melhoria pra arma",
  "Isqueiros", "Passe de metrô",
];
