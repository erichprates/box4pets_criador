/** Todo o conteudo do site em um lugar so. Textos em PT-BR. */

/** Dados do site para SEO. `url` e o endereco publico final (sem barra no fim). */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://box4pets.com.br").replace(/\/$/, ""),
  nome: "Box4Pets",
  titulo: "Box4Pets | Genética de saúde para criadores de cães e gatos",
  descricao:
    "O Painel Saúde da Box4Pets avalia 220 doenças genéticas em cães e 39 em gatos, de forma simples e fácil. Laudo no app e em PDF, resultado em 6 semanas e suporte veterinário por WhatsApp.",
} as const;

const wa = (texto: string) => `https://wa.me/5512992111805?text=${encodeURIComponent(texto)}`;

export const links = {
  whatsapp: "https://wa.me/5512992111805",
  pedir: wa("Olá! Vim pelo site e quero pedir o Painel Saúde."),
  contato: wa("Olá! Vim pelo site e gostaria de falar com a equipe Box4Pets."),
  ninhada: wa("Olá! Quero testar todos os filhotes da minha próxima ninhada (Ninhada Testada)."),
  afiliados: wa("Olá! Sou afiliado ALKC/CBKC e quero conhecer as condições especiais."),
  plantel: wa("Olá! Sou criador e quero testar meu plantel. Quantos kits preciso e qual o preço?"),
  merle: wa("Olá! Quero pedir o Teste Merle detalhado."),
  avulso: wa("Olá! Procuro um teste que não está no Painel Saúde. Podem me ajudar?"),
  perfil: wa("Olá! Quero pedir o Perfil de DNA para confirmar paternidade."),
  duvida: wa("Olá! Tenho uma dúvida sobre genética / resultado do laudo."),
  email: "mailto:contato@box4pets.com.br",
  /** Ainda sem endereco no conteudo original: ativacao do kit, lista de doencas, exemplo de laudo, Instagram e paginas legais. */
  pendente: "#",
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/testes", label: "Testes" },
  { href: "/programa-criador", label: "Programa Criador" },
  { href: "/aprenda", label: "Aprenda" },
  { href: "/faq", label: "FAQ" },
] as const;

export type IconName =
  | "dna"
  | "eye"
  | "searchCheck"
  | "target"
  | "brain"
  | "drop"
  | "paw"
  | "stethoscope"
  | "clinic"
  | "heart";

/* ------------------------------------------------------------------ Inicio */

export const selos: { texto: string; icon: IconName }[] = [
  { texto: "Laboratório acreditado internacionalmente com ISO/IEC 17025", icon: "searchCheck" },
  { texto: "Resultado em 6 semanas", icon: "target" },
  { texto: "Laudo no app e em PDF", icon: "eye" },
  { texto: "Suporte veterinário por WhatsApp", icon: "stethoscope" },
];

/** `foto`: caminho em /public/media. Fotos provisorias, a trocar. */
export const porque: { titulo: string; texto: string; icon: IconName; foto?: string }[] = [
  {
    titulo: "Evite filhotes afetados",
    texto:
      "Saiba quais reprodutores são portadores antes de planejar o cruzamento. Dois portadores podem gerar 25% de filhotes afetados em cada ninhada.",
    icon: "searchCheck",
    foto: "/media/porque-ninhada.jpg",
  },
  {
    titulo: "Não descarte bons reprodutores",
    texto: "Um portador saudável continua valioso: basta cruzá-lo com um parceiro livre da mesma mutação.",
    icon: "heart",
    foto: "/media/porque-reprodutor.jpg",
  },
  {
    titulo: "Valorize cada filhote",
    texto:
      "Entregue ao comprador um laudo genético junto com o pedigree. É transparência que justifica o preço.",
    icon: "paw",
    foto: "/media/porque-filhote.jpg",
  },
  {
    titulo: "Proteja o nome do seu canil ou gatil",
    texto: "Menos doença hereditária significa mais qualidade.",
    icon: "clinic",
    foto: "/media/porque-canil.jpg",
  },
];

export type Teste = {
  id: string;
  nome: string;
  texto: string;
  especies: string;
  preco: string;
  recomendado?: boolean;
  icon: IconName;
  foto?: string;
  cta: { label: string; href: string };
};

export const testes: Teste[] = [
  {
    id: "painel",
    nome: "Painel Saúde",
    texto: "220 doenças genéticas em cães; 39 em gatos + Perfil de DNA incluso",
    especies: "Cães e gatos",
    preco: "R$ 619",
    recomendado: true,
    icon: "dna",
    foto: "/media/abordagem-precisao.jpg",
    cta: { label: "Pedir pelo WhatsApp", href: links.pedir },
  },
  {
    id: "merle",
    nome: "Teste Merle",
    texto: "Identifica o subtipo do merle (Mc, Ma, Ma+, M, Mh).",
    especies: "Cães",
    preco: "R$ 450",
    icon: "target",
    foto: "/media/inovacao-confirmacao.jpg",
    cta: { label: "Saiba mais", href: "/testes/merle" },
  },
  {
    id: "avulsos",
    nome: "Testes avulsos",
    texto: "Doenças e características que não estão no Painel Saúde.",
    especies: "Cães e gatos",
    preco: "R$ 450 por teste",
    icon: "searchCheck",
    foto: "/media/inovacao-individualizado.jpg",
    cta: { label: "Saiba mais", href: "/testes/avulsos" },
  },
  {
    id: "perfil",
    nome: "Perfil de DNA",
    texto: "Identidade genética para teste de paternidade. Já vem no Painel Saúde; aqui, vendido sozinho.",
    especies: "Cães e gatos",
    preco: "R$ 489",
    icon: "paw",
    foto: "/media/abordagem-preditiva.jpg",
    cta: { label: "Saiba mais", href: "/testes/perfil" },
  },
];

export const ninhadaHome = {
  tag: "Ninhada Testada",
  titulo: "Todos os filhotes testados.",
  destaque: "Cada família com um certificado.",
  texto:
    "Teste a ninhada inteira e confirme por DNA que cada filhote é filho do pai e da mãe do pedigree. Cada família leva para casa um certificado genético mostrando que o filhote está livre das 220 doenças genéticas avaliadas.",
  itens: ["Pedigree confirmado por DNA", "Certificado genético para cada filhote"],
} as const;

export const passos = [
  { titulo: "Compre o kit", texto: "Você recebe o kit com swab e envelope de retorno já endereçado." },
  { titulo: "Ative pelo app", texto: "Cadastre o cão ou gato pelo app no momento da coleta do material." },
  {
    titulo: "Colete em poucos minutos",
    texto: "Esfregue o swab na bochecha e na gengiva. O animal deve ficar 1 hora sem comer ou beber.",
  },
  { titulo: "Receba o laudo", texto: "Resultado no app e em PDF, com a avaliação de doenças e traços." },
];

/* ------------------------------------------------------------------ Testes */

export const comparativo: {
  teste: string;
  recomendado?: boolean;
  avalia: string;
  especies: string;
  realiza: string;
  preco: string;
  nota?: string;
}[] = [
  {
    teste: "Painel Saúde",
    recomendado: true,
    avalia: "220 doenças genéticas em cães; 39 em gatos + Perfil de DNA incluso",
    especies: "Cães e gatos",
    realiza: "Box4Pets + laboratório Orivet",
    preco: "R$ 619",
    nota: "descontos acima de 3 kits",
  },
  {
    teste: "Teste Merle",
    avalia: "Subtipo do merle (Mc, Ma, Ma+, M, Mh); o Painel Saúde já detecta presença ou ausência do merle",
    especies: "Cães",
    realiza: "Parceiro Orivet",
    preco: "R$ 450",
  },
  {
    teste: "Testes avulsos",
    avalia: "Doenças e características que não estão no Painel Saúde",
    especies: "Cães e gatos",
    realiza: "Parceiro Orivet",
    preco: "R$ 450",
    nota: "por teste",
  },
  {
    teste: "Perfil de DNA",
    avalia: "Identidade genética para teste de paternidade. Já vem no Painel Saúde; aqui, vendido sozinho",
    especies: "Cães e gatos",
    realiza: "Parceiro Orivet",
    preco: "R$ 489",
  },
];

export const comoEscolher = [
  { q: "Vai testar reprodutores pela primeira vez?", a: "Painel Saúde.", produto: "painel" },
  {
    q: "Cria raças com padrão merle?",
    a: "Pastor Australiano, Border Collie, Dachshund, Chihuahua e outras: Painel Saúde, que já detecta o merle. Para cruzar dois cães com alguma variante merle, acrescente o Teste Merle detalhado.",
    produto: "merle",
  },
  { q: "Precisa de uma doença específica que não está no painel?", a: "Fale com a equipe para um teste avulso.", produto: "avulsos" },
  {
    q: "Quer confirmar a paternidade da ninhada?",
    a: "O Painel Saúde já inclui o Perfil de DNA. Para filhotes que não vão fazer o Painel, peça só o Perfil de DNA (R$ 489).",
    produto: "perfil",
  },
];

export const painelDestaques = [
  "220 doenças em cães",
  "39 em gatos",
  "Perfil de DNA incluso",
  "Cores e padrões de pelagem",
];

/** Trechos em negrito ficam entre ** **. */
export const statusLaudo: { selo: string; tom: "livre" | "portador" | "risco"; texto: string }[] = [
  {
    selo: "Livre",
    tom: "livre",
    texto: "**Normal:** nenhuma cópia da variante. Pode cruzar com qualquer parceiro para esta condição.",
  },
  {
    selo: "Portador",
    tom: "portador",
    texto:
      "**Uma cópia da variante:** o cão não adoece (nas doenças recessivas), mas pode transmitir. Cruze com um parceiro livre.",
  },
  {
    selo: "Em risco",
    tom: "risco",
    texto:
      "**Duas cópias da variante,** ou uma nas doenças dominantes. Converse com o seu veterinário sobre acompanhamento e reprodução.",
  },
];

export const coleta = [
  "Deixe o cão ou gato 1 hora sem comer, beber ou ter contato com outros animais.",
  "Esfregue o swab na parte interna da bochecha e na gengiva, com movimentos circulares, por 30 a 60 segundos.",
  "Deixe secar por pelo menos 15 minutos e envie no envelope já endereçado.",
];

export const complementares: {
  id: string;
  nome: string;
  texto: string;
  preco: string;
  foto?: string;
  icon: IconName;
  cta: { label: string; href: string };
}[] = [
  {
    id: "merle",
    nome: "Teste Merle",
    texto:
      'O Painel Saúde já detecta se o cão tem a variante merle, mesmo quando ela não aparece no pelo. O Teste Merle detalhado vai além e identifica o subtipo (Mc, Ma, Ma+, M, Mh); subtipos maiores, como M e Mh, estão associados a mais áreas brancas e a mais problemas de saúde. Com isso, você evita cruzar dois merles sem saber, o que pode gerar filhotes "double merle" com risco de surdez e problemas oculares.',
    preco: "R$ 450",
    icon: "target",
    foto: "/media/inovacao-confirmacao.jpg",
    cta: { label: "Pedir o Teste Merle pelo WhatsApp", href: links.merle },
  },
  {
    id: "avulsos",
    nome: "Testes avulsos",
    texto:
      "Precisa de uma doença ou característica que não está no Painel Saúde? Por meio do nosso parceiro Orivet, com mais de 400 testes para cães e gatos, encontramos o teste certo para a sua raça. Cada teste avulso custa R$ 450.",
    preco: "R$ 450 por teste",
    icon: "searchCheck",
    foto: "/media/inovacao-individualizado.jpg",
    cta: { label: "Consultar teste avulso pelo WhatsApp", href: links.avulso },
  },
  {
    id: "perfil",
    nome: "Perfil de DNA",
    texto:
      "O Perfil de DNA é a identidade genética do animal. É ele que permite confirmar a paternidade: comparamos o perfil do filhote com o dos pais. Para isso, pai, mãe e filhotes precisam ter o Perfil de DNA feito. Ele já vem incluso em todo Painel Saúde; para quem só precisa da paternidade, pode ser pedido à parte.",
    preco: "R$ 489",
    icon: "paw",
    foto: "/media/abordagem-preditiva.jpg",
    cta: { label: "Pedir só o Perfil de DNA pelo WhatsApp", href: links.perfil },
  },
];

/* ------------------------------------------------------------------ Precos */

export const planos: {
  faixa: string;
  preco: string;
  selo?: string;
  linha: string;
  texto?: string;
  itens?: string[];
  cta: { label: string; href: string };
}[] = [
  {
    faixa: "1 a 3 kits",
    preco: "R$ 619",
    linha: "em até 6x sem juros · frete grátis",
    itens: [
      "220 doenças em cães; 39 em gatos",
      "Perfil de DNA incluso",
      "Laudo no app e em PDF, em português",
      "Resultado em 6 semanas",
      "Suporte veterinário por WhatsApp",
      "Recoleta grátis se a amostra falhar",
    ],
    cta: { label: "Pedir pelo WhatsApp", href: links.pedir },
  },
  {
    faixa: "Acima de 3 kits",
    preco: "R$ 529",
    selo: "Mais pedido",
    linha: "Economia de R$ 90 por kit (14,5%)",
    texto: "Tudo do Painel Saúde, para testar matrizes e padreadores de uma vez.",
    cta: { label: "Pedir preço de plantel", href: links.plantel },
  },
  {
    faixa: "Acima de 10 kits",
    preco: "R$ 489",
    linha: "Economia de R$ 130 por kit (21%)",
    texto: "Ideal para plantéis grandes e para testar a ninhada inteira (Ninhada Testada).",
    cta: { label: "Pedir preço de plantel", href: links.plantel },
  },
];

export const precosComplementares = [
  { teste: "Teste Merle (parceiro Orivet)", preco: "R$ 450", acao: "Pedir", href: links.merle },
  { teste: "Perfil de DNA avulso (já incluso no Painel Saúde)", preco: "R$ 489", acao: "Pedir", href: links.perfil },
  { teste: "Testes avulsos (parceiro Orivet)", preco: "R$ 450 por teste", acao: "Consultar", href: links.avulso },
];

/* -------------------------------------------------------- Programa Criador */

export const programaPassos = [
  {
    titulo: "Teste os reprodutores",
    texto: "Matrizes e padreadores fazem o Painel Saúde, que já inclui o Perfil de DNA.",
  },
  {
    titulo: "Planeje os cruzamentos",
    texto:
      "Com o laudo em mãos, você evita combinar dois portadores da mesma doença. Em raças merle, inclua o Teste Merle.",
  },
  {
    titulo: "Teste a ninhada",
    texto:
      "Cada filhote faz o Perfil de DNA (sozinho ou incluso no Painel Saúde), comparado com o dos pais para confirmar a paternidade. Na Ninhada Testada, todos os filhotes também fazem o Painel Saúde.",
  },
  {
    titulo: "Entregue o certificado",
    texto:
      "O comprador recebe a confirmação de paternidade e o laudo de saúde dos pais, que podem ser checados pelo app.",
  },
];

export const ninhadaAbas = [
  {
    aba: "Pedigree confirmado por DNA",
    texto:
      "O perfil genético de cada filhote é comparado com o do pai e o da mãe informados no pedigree. Se houver qualquer divergência, você sabe antes da venda, e não depois.",
  },
  {
    aba: "Certificado genético para a família",
    texto:
      "Cada filhote vai para casa com um certificado Box4Pets mostrando a paternidade confirmada e o resultado do Painel Saúde: livre das doenças avaliadas, ou portador quando for o caso.",
  },
];

export const ninhadaComo = [
  "Pai e mãe fazem o Painel Saúde, que já inclui o Perfil de DNA (uma vez só, vale para todas as ninhadas).",
  "Após o desmame, coletamos o swab de todos os filhotes da ninhada.",
  "Em 6 semanas você recebe o laudo de cada filhote e a confirmação de paternidade.",
  "Cada família recebe o certificado genético do seu filhote, impresso e no app, com QR code para verificação.",
];

export const beneficios: { titulo: string; texto: string; icon: IconName }[] = [
  { titulo: 'Selo "Canil Testado Box4Pets"', texto: "Para usar no site, nas redes e no anúncio dos filhotes.", icon: "searchCheck" },
  { titulo: "Perfil do canil no site", texto: "Seu canil listado no site da Box4Pets.", icon: "clinic" },
  { titulo: "Preço de plantel", texto: "Em todos os testes.", icon: "target" },
  { titulo: "Atendimento veterinário dedicado", texto: "Para interpretar laudos e planejar acasalamentos.", icon: "stethoscope" },
  { titulo: "Material para o comprador", texto: "Modelo de certificado e texto explicando o laudo.", icon: "heart" },
];

export const objetivos = [
  "Transparência para compradores e veterinários",
  "Redução de doenças hereditárias nas raças",
  "Confiança na compra do filhote",
  "Criação responsável",
];

export const formulario = [
  { name: "nome", label: "Nome", type: "text" },
  { name: "canil", label: "Canil", type: "text" },
  { name: "racas", label: "Raça(s)", type: "text" },
  { name: "registro", label: "Nº de registro CBKC/ALKC", type: "text" },
  { name: "reprodutores", label: "Número de reprodutores", type: "number" },
  { name: "whatsapp", label: "WhatsApp", type: "tel" },
];

/* ----------------------------------------------------------------- Aprenda */

export const guiaIndice = [
  { href: "#porque", label: "Por que testar antes de cruzar" },
  { href: "#laudo", label: "Entendendo o resultado do laudo" },
  { href: "#combinacoes", label: "Combinações de cruzamento" },
  { href: "#portadores", label: "Portadores e afetados" },
  { href: "#cores", label: "Genética das cores" },
  { href: "#cuidados", label: "Cores que exigem cuidado" },
  { href: "#guia-faq", label: "Perguntas frequentes" },
];

export const guiaLaudo = {
  colunas: ["Resultado no laudo", "O que significa", "Saúde do cão", "O que transmite"],
  linhas: [
    ["Normal (N/N)", "Nenhuma cópia da variante", "Livre da doença testada", "Somente cópias normais"],
    ["Portador (N/m)", "Uma cópia normal e uma com a variante", "Saudável nas doenças recessivas", "A variante para cerca de 50% dos filhotes"],
    ["Afetado (m/m)", "Duas cópias da variante", "Pode desenvolver a doença; acompanhe com o médico-veterinário", "A variante para 100% dos filhotes"],
  ],
};

export const herancas = [
  {
    aba: "Autossômica recessiva",
    texto:
      "O tipo mais comum (PRA-prcd, Hiperuricosúria, Lipofuscinose Ceroide Neuronal). O cão só adoece com duas cópias; o portador é saudável.",
  },
  {
    aba: "Autossômica dominante",
    texto:
      'Uma única cópia já pode causar a doença. O laudo indica "Risco de doença – heterozigoto"; avalie com o médico-veterinário.',
  },
  {
    aba: "Ligada ao cromossomo X",
    texto:
      "Afeta principalmente machos. A fêmea portadora transmite a variante para cerca de metade dos filhos machos.",
  },
  {
    aba: "Penetrância incompleta",
    texto:
      "Na Mielopatia Degenerativa (SOD1), duas cópias aumentam o risco, mas nem todo cão afetado manifesta sinais clínicos.",
  },
  {
    aba: "Codominante (dose-dependente)",
    texto:
      "MDR1 (ABCB1): o portador já pode reagir a doses altas de alguns medicamentos; com duas cópias, mesmo em doses usuais.",
  },
];

/** normais / portadores / afetados em %. `tom`: ok, atencao ou evitar. */
export const combinacoes: { par: string; n: number; p: number; a: number; rec: string; tom: "ok" | "atencao" | "evitar" }[] = [
  { par: "Normal × Normal", n: 100, p: 0, a: 0, rec: "Cruzamento ideal", tom: "ok" },
  { par: "Normal × Portador", n: 50, p: 50, a: 0, rec: "Seguro; teste os filhotes antes de usá-los na reprodução", tom: "ok" },
  { par: "Normal × Afetado", n: 0, p: 100, a: 0, rec: "Seguro para a ninhada, se o afetado estiver apto; todos serão portadores", tom: "atencao" },
  { par: "Portador × Portador", n: 25, p: 50, a: 25, rec: "Não recomendado", tom: "evitar" },
  { par: "Portador × Afetado", n: 0, p: 50, a: 50, rec: "Não recomendado", tom: "evitar" },
  { par: "Afetado × Afetado", n: 0, p: 0, a: 100, rec: "Evitar", tom: "evitar" },
];

export const orientacoes = [
  {
    aba: "Cão portador",
    itens: [
      "Mantenha-o na reprodução se ele tiver qualidades importantes para o seu programa.",
      "Cruze sempre com um parceiro testado e Normal (N/N) para aquela variante.",
      "Teste os filhotes antes de defini-los como futuros reprodutores; prefira os Normais.",
      "Informe o status de portador ao tutor do filhote.",
    ],
  },
  {
    aba: "Cão afetado (duas cópias)",
    itens: [
      "Primeiro, avalie a saúde do cão com o médico-veterinário.",
      "Reprodução só se a doença não comprometer o bem-estar dele e com parceiro Normal.",
      "Todos os filhotes serão portadores: só para preservar características raras.",
      "Para doenças graves, precoces ou dolorosas, não utilize o cão afetado na reprodução.",
    ],
  },
];

export const pigmentos = [
  {
    nome: "Eumelanina",
    texto:
      "Pigmento escuro: preto, marrom, azul ou isabela. Colore pelo e pele: trufa e coxins acompanham a cor do pelo.",
  },
  {
    nome: "Feomelanina",
    texto:
      "Pigmento claro, do creme ao vermelho intenso. Aparece só no pelo. Pelo avermelhado com trufa preta = feomelanina.",
  },
];

export const genesCor = [
  { gene: "Gene E (MC1R)", texto: "decide se há eumelanina no pelo. Cães ee têm pelo creme a vermelho, e K e A não aparecem. Em produz a máscara melânica." },
  { gene: "Gene K (CBD103)", texto: "K torna a pelagem sólida e esconde o gene A; Kbr produz o tigrado; ky/ky deixa o gene A se expressar." },
  { gene: "Gene A (ASIP)", texto: "ay (zibelina/sable) > aw (cinza lobo) > at (preto e canela) > a (preto recessivo)." },
  { gene: "Gene B (TYRP1)", texto: "duas cópias marrons tornam o cão marrom, com trufa marrom." },
  { gene: "Gene D (MLPH)", texto: "dd dilui o preto em azul e o marrom em isabela." },
  { gene: "Gene I (MFSD12)", texto: "intensidade da feomelanina, do vermelho ao creme quase branco." },
  { gene: "Modificadores", texto: "Merle (M), Arlequim (H, Dogue Alemão), manchas brancas (S/MITF; KIT no Pastor Alemão), albinismo (SLC45A2)." },
];

/** `hex`: amostra aproximada da pelagem, so ilustrativa. */
export const coresEsperadas = [
  { combo: "E_ · K_ · B_ · D_", cor: "Preto sólido", hex: "#1c1c1e" },
  { combo: "E_ · K_ · bb · D_", cor: "Marrom/chocolate sólido", hex: "#5b3a29" },
  { combo: "E_ · K_ · B_ · dd", cor: "Azul (blue)", hex: "#6c7480" },
  { combo: "E_ · K_ · bb · dd", cor: "Isabela (lilac)", hex: "#b3a096" },
  { combo: "E_ · ky/ky · at/at · B_", cor: "Preto e canela / tricolor", hex: "#3a2a20" },
  { combo: "E_ · ky/ky · ay_ · B_", cor: "Zibelina / sable / fulvo", hex: "#b98352" },
  { combo: "ee (qualquer K, A) · B_", cor: "Creme a vermelho, trufa preta", hex: "#d9a56a" },
  { combo: "ee (qualquer K, A) · bb", cor: "Creme a vermelho, trufa marrom", hex: "#e3c39a" },
];

export const cuidados = {
  colunas: ["Gene / cor", "Cruzamento de risco", "Consequência", "Orientação"],
  linhas: [
    ["Merle (M)", "Merle × Merle", "25% de filhotes duplo merle (M/M), com risco alto de surdez, cegueira e microftalmia", "Cruze merle apenas com não merle (m/m) testado"],
    ["Arlequim (H), Dogue Alemão", "Hh × Hh", "H/H causa morte embrionária", "Cruze arlequim apenas com hh"],
    ["Diluição (dd)", "Azul ou isabela", "Em algumas raças, risco de Alopecia por Diluição de Cor", "Avalie o histórico da linhagem e a pele dos reprodutores"],
    ["Albinismo (SLC45A2)", "Portador × Portador", "25% de filhotes albinos, com sensibilidade à luz e risco de lesões de pele", "Cruze portadores apenas com Normais"],
  ],
};

export type Pergunta = { q: string; a: string };

export const guiaFaq: Pergunta[] = [
  { q: "Meu cão é portador. Ele vai ficar doente?", a: "Nas doenças recessivas, não. O portador é saudável e só precisa de atenção na escolha do parceiro." },
  { q: "Posso vender um filhote portador?", a: "Sim. Informe o resultado ao novo tutor e, se o filhote for usado na reprodução, oriente que seja cruzado com um cão Normal." },
  { q: "Preciso testar os filhotes se os dois pais são Normais?", a: "Para as variantes testadas nos pais, os filhotes serão Normais. Ainda assim, o teste confirma a identidade e o parentesco (perfil de DNA) e avalia as cores." },
  { q: "O resultado Normal garante que meu cão nunca terá a doença?", a: "Garante que ele não tem a variante testada. Algumas doenças podem ter outras causas genéticas ainda não descritas ou causas não genéticas." },
  { q: "Meu cão tem uma cor diferente do resultado. O teste está errado?", a: "Na maioria dos casos, a diferença vem de um gene que não está no painel ou de um modificador específico da raça. Nossa equipe analisa o caso." },
  { q: "Posso cruzar dois cães merle se forem de subtipos leves?", a: "Não recomendamos sem conhecer os subtipos exatos dos dois reprodutores. Converse com nossa equipe antes." },
];

/* --------------------------------------------------------------------- FAQ */

export const faqGrupos: { titulo: string; itens: Pergunta[] }[] = [
  {
    titulo: "Sobre o teste",
    itens: [
      { q: "Quais doenças o Painel Saúde avalia?", a: "O painel avalia 220 doenças genéticas em cães e 39 doenças e variantes em gatos. A lista completa, com filtro por raça, está aqui." },
      { q: "O Painel Saúde serve para gatos?", a: "Sim. O Painel Saúde está disponível para cães e gatos, de qualquer raça ou sem raça definida. Em gatos, o painel avalia 39 doenças e variantes genéticas. O laudo destaca as condições mais relevantes para a raça do animal." },
      { q: "A partir de que idade posso testar?", a: "Em qualquer idade, inclusive filhotes. Recomendamos coletar depois do desmame, para evitar contaminação com DNA da mãe." },
      { q: "Em quanto tempo sai o resultado?", a: "Em 6 semanas. Você acompanha cada etapa pelo app." },
      { q: "O teste genético substitui exames clínicos?", a: "Não. O DNA mostra predisposições e o status de portador, mas não substitui exames como displasia de quadril por imagem ou avaliação oftalmológica. O ideal é combinar os dois." },
      { q: "Onde é feita a análise?", a: "No laboratório da Orivet, com acreditação ISO/IEC 17025 e NATA. A Box4Pets é a distribuidora exclusiva no Brasil e cuida da logística, do laudo em português e do suporte." },
    ],
  },
  {
    titulo: "Resultados e reprodução",
    itens: [
      { q: "Meu cão é portador. Devo tirá-lo da reprodução?", a: "Não necessariamente. Um portador saudável pode ser cruzado com um parceiro livre da mesma variante, sem risco de filhotes afetados. Nossa equipe veterinária ajuda a planejar." },
      { q: "Como faço o teste de paternidade?", a: "A paternidade é confirmada pelo Perfil de DNA, que já vem incluso no Painel Saúde e também pode ser pedido à parte (R$ 489). Pai, mãe e filhotes precisam ter o Perfil de DNA; comparamos os perfis e confirmamos a paternidade." },
      { q: "O Teste Merle está incluído no Painel Saúde?", a: "Em parte. O Painel Saúde detecta a presença ou ausência do merle, sem diferenciar subtipos. O Teste Merle detalhado, que identifica os subtipos, é vendido à parte e realizado pelo nosso parceiro Orivet." },
      { q: "Preciso de um teste que não está no Painel Saúde. E agora?", a: "Por meio do parceiro Orivet, oferecemos testes avulsos para doenças e características fora do painel. Fale com a equipe pelo WhatsApp." },
      { q: "O que é a Ninhada Testada?", a: "É o programa em que todos os filhotes da ninhada são testados: cada um faz o Painel Saúde e tem a paternidade confirmada pelo DNA do pai e da mãe informados no pedigree. Cada família recebe um certificado genético do seu filhote." },
      { q: "O certificado garante que o filhote é livre de doenças?", a: "Ele mostra que o filhote está livre das 220 doenças genéticas avaliadas no Painel Saúde. Não cobre doenças fora do painel, infecções ou problemas não genéticos; por isso o acompanhamento veterinário continua essencial. Se o filhote for portador de alguma variante, o certificado informa." },
      { q: "O resultado é aceito pela CBKC e pela ALKC?", a: "[Confirmar com as entidades como o laudo pode ser usado no registro.]" },
    ],
  },
  {
    titulo: "Pedido, preço e entrega",
    itens: [
      { q: "Como faço o pedido?", a: 'Pelo WhatsApp (12) 99211-1805. Clique em qualquer botão "Pedir pelo WhatsApp" do site, diga quantos kits quer e para quais animais, e nossa equipe envia o link de pagamento. O kit sai logo após a confirmação.' },
      { q: "Tem desconto para quem compra vários kits?", a: "Sim. Acima de 3 kits, cada Painel Saúde sai por R$ 529; acima de 10 kits, por R$ 489." },
      { q: "Posso comprar vários kits e usar depois?", a: "Sim. Os kits têm validade de [X] meses e só são vinculados a um animal na ativação." },
      { q: "E se a amostra falhar?", a: "Enviamos um novo kit sem custo." },
    ],
  },
];

/* ------------------------------------------------------------------ Rodape */

type LinkRodape = { label: string; href: string; icone?: "whatsapp" | "email" | "instagram"; nome?: string };

export const rodape: {
  frase: string;
  colunas: { titulo: string; links: LinkRodape[] }[];
  legal: string;
  politicas: string[];
} = {
  frase: "Genética de saúde para quem ama cães e gatos.",
  colunas: [
    {
      titulo: "Produto",
      links: [
        { label: "Painel Saúde", href: "/testes/painel" },
        { label: "Teste Merle", href: "/testes/merle" },
        { label: "Testes avulsos", href: "/testes/avulsos" },
        { label: "Perfil de DNA", href: "/testes/perfil" },
        { label: "Lista de doenças", href: links.pendente },
      ],
    },
    {
      titulo: "Criador",
      links: [
        { label: "Programa Criador", href: "/programa-criador" },
        { label: "Aprenda", href: "/aprenda" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      titulo: "Contato",
      links: [
        { label: "(12) 99211-1805", href: links.whatsapp, icone: "whatsapp", nome: "WhatsApp" },
        { label: "contato@box4pets.com.br", href: links.email, icone: "email", nome: "E-mail" },
        { label: "@box4petsdna", href: links.pendente, icone: "instagram", nome: "Instagram" },
      ],
    },
  ],
  legal: "Representação comercial: Estima Especialidades e Diagnósticos LTDA. · CNPJ 11.869.947/0001-50",
  politicas: ["Política de Privacidade", "Política de Reembolso", "Termos de Serviço"],
};
