import { GameCard, Character, PlayerProfile } from '../types/game';

export const CHARACTERS: Record<string, Character> = {
  architect: {
    id: 'architect',
    name: 'Elena',
    role: 'Arquitecta del Proyecto',
    avatarBg: 'bg-emerald-100',
    avatarColor: 'text-emerald-800',
  },
  builder: {
    id: 'builder',
    name: 'Manolo',
    role: 'Constructor',
    avatarBg: 'bg-amber-100',
    avatarColor: 'text-amber-900',
  },
  partner: {
    id: 'partner',
    name: 'Álex',
    role: 'Tu Pareja (Co-promotor)',
    avatarBg: 'bg-sky-100',
    avatarColor: 'text-sky-900',
  },
  advisor: {
    id: 'advisor',
    name: 'Laura',
    role: 'Asesora Técnica',
    avatarBg: 'bg-indigo-100',
    avatarColor: 'text-indigo-900',
  },
};

export const REIGNS_SCENARIOS: GameCard[] = [
  // FASE 1: EL PURGATORIO DE LOS PRESUPUESTOS
  {
    id: 'card-level-1',
    level: 1,
    sceneTitle: 'Fase 1: «El Purgatorio de los Presupuestos»',
    character: CHARACTERS.partner,
    messageType: 'chat',
    prompt:
      '«Has enviado los planos a varios constructores. Pasan las semanas y llegan ofertas que no incluyen lo mismo: una deja partidas pendientes, otra no aclara instalaciones y otra tiene un precio atractivo con demasiados "a concretar" pero no sabemos compararlos entre ellos.»',
    detailContext:
      'El conflicto no es simplemente esperar: es seguir esperando sin saber si finalmente podrás comparar los presupuestos o conocer el alcance real del precio y lo que supone a largo plazo.',
    devilVoice:
      'Pide un par de presupuestos más. Alguno llegará más barato. Lo que no esté incluido ya lo veremos.',
    advisorVoice:
      'No necesitas más números: necesitas saber qué incluye cada uno. Podemos partir de un modelo de catálogo y definir sus adaptaciones, exclusiones y condiciones.',
    phaseAnalogy: {
      title: 'El buffet con letra pequeña vs la carta con precio cerrado',
      metaphor:
        'Comparar menús de 12 € y 30 € donde el primero te cobra luego el agua a 8 €, el pan a 5 € y el cubierto a 10 €.',
      explanation:
        'Un presupuesto con partidas abiertas o precios "orientativos" traslada el riesgo a tu bolsillo. Partir de una base definida y tasada de antemano permite saber qué incluye y qué excluye cada propuesta.',
      cases: [
        {
          label: 'Si tu presupuesto de hipoteca va justo',
          tip: 'No firmes partidas abiertas de "movimiento de tierras a justificar": exige alcance cerrado y estudio previo del terreno.',
        },
        {
          label: 'Si una oferta está muy por debajo de mercado',
          tip: 'Revisa las exclusiones: acometidas exteriores, licencias y climatización suelen quedar fuera para inflar costes luego.',
        },
        {
          label: 'Para comparar ofertas de forma homogénea',
          tip: 'Compara siempre con la misma especificación de cerramientos, carpinterías y hermeticidad.',
        },
      ],
    },
    leftChoice: {
      id: 'L1_ESPERAR_PRESUPUESTOS',
      label: 'Seguir esperando y comparar las cifras',
      subtext: 'Pedir más ofertas y esperar a que los números cuadren',
      deltaPresupuesto: -4500, // Coste simulado asociado a la espera
      deltaSemanas: 5, // El calendario avanza
      deltaEstres: 20, // Sube el estrés
      deltaFactura: 15, // Repercusión negativa en eficiencia por falta de definición
      consequenceText:
        'El calendario avanza 5 semanas esperando presupuestos heterogéneos. La incertidumbre aumenta y aparece un coste simulado por la demora acumulada sin llegar a saber qué incluye cada oferta.',
      partnerReaction:
        '«Llegan más folios con números dispares, pero ninguno aclara si incluye la cimentación ni las instalaciones... estamos en el mismo punto que hace un mes».',
      technicalTip: {
        warning:
          'Esperar más presupuestos heterogéneos sin base común no aporta claridad: añade tiempo, confusión y partidas imprevistas.',
        advice:
          'Exige una matriz comparativa homogénea con alcance cerrado, mediciones detalladas y exclusiones explícitas.',
        quote: '«El presupuesto más corto no siempre es el más claro. Y el más gordo tampoco».',
        analogy: {
          title: 'El billete de tren sin asiento',
          story:
            'Comprar un billete a mitad de precio parece un triunfo hasta que descubres en el andén que no incluye asiento, ni equipaje, ni parada en tu estación. Comparar presupuestos sin alcance es exactamente esa trampa.',
          lesson: 'Compara especificaciones técnicas y alcances reales, no totales en un folio.',
          adaptableAdvice:
            'Para tu caso: pide un desglose por capítulos homogéneos antes de evaluar el precio final.',
          cases: [
            {
              label: 'Ofertas con "partidas alzadas"',
              tip: 'Una partida alzada de electricidad o fontanería suele quedarse corta y generar sobrecostes posteriores.',
            },
            {
              label: 'Modelo de catálogo definido',
              tip: 'Permite conocer de antemano calidades, marcas y certificaciones energéticas incluidas.',
            },
          ],
        },
      },
      consequenceAnimation: {
        icon: '📬',
        description:
          'Se acumulan sobres en la mesa, aparecen signos de interrogación sobre las partidas incompletas y pasan hojas del calendario sin resolver la incertidumbre.',
        visualType: 'envelopes',
      },
      parallelOutcome: {
        title: 'Si hubieses definido el alcance desde el inicio:',
        budgetResult: '0 € en costes simulados por esperas e indefinición.',
        weeksResult: '5 semanas de calendario ganadas para iniciar trámites.',
        narrative:
          'Habrías comparado propuestas completas sobre bases idénticas sin perder un mes en cifras heterogéneas.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L1_DEFINIR_ALCANCE',
      label: 'Definir el alcance y comparar propuestas completas',
      subtext: 'Partir de modelo claro, adaptaciones, exclusiones y condiciones',
      deltaPresupuesto: 0,
      deltaSemanas: 1, // Se dedica un tiempo acotado a aclarar el alcance
      deltaEstres: -5, // Disminuye la incertidumbre
      deltaFactura: 0,
      consequenceText:
        'Se dedica un tiempo acotado a aclarar el alcance: capítulos definidos, condiciones claras y exclusiones tasadas. Disminuye la incertidumbre y se pueden comparar propuestas completas con criterio.',
      partnerReaction:
        '«¡Por fin vemos qué entra y qué no! Con las adaptaciones y exclusiones sobre la mesa, ahora sí podemos contrastar propuestas completas».',
      consequenceAnimation: {
        icon: '📋',
        description:
          'Los documentos y partidas se ordenan en una comparación clara de alcance, disipando las dudas y fijando las condiciones.',
        visualType: 'envelopes',
      },
      parallelOutcome: {
        title: 'Si hubieses seguido pidiendo más números a ciegas:',
        budgetResult: '+4.500 € en costes simulados por demoras e indefinición.',
        weeksResult: '+5 semanas de parón y estrés comparando presupuestos dispares.',
        narrative:
          'Habrías seguido atrapado en la rueda de ofertas incomparables sin saber el alcance real de cada una.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 1,
  },

  // FASE 2: TU ARQUITECTO Y MI CONSTRUCTOR: ¿OS CONOCÉIS?
  {
    id: 'card-level-2',
    level: 2,
    sceneTitle: 'Fase 2: «Tu Arquitecto y mi Constructor: ¿Os Conocéis?»',
    character: CHARACTERS.architect,
    messageType: 'in_person',
    prompt:
      '«Quieres trabajar con un arquitecto externo. Ha diseñado una casa que te encanta, pero todavía no ha coordinado los detalles con la empresa que la construirá ni conoce en profundidad su sistema.»',
    detailContext:
      'Trabajar con un arquitecto externo es una opción totalmente válida. El problema que se plantea es empezar sin coordinación, no elegir a un profesional independiente.',
    devilVoice:
      'El arquitecto dibuja y el constructor construye. Ya se entenderán cuando empiece la obra.',
    advisorVoice:
      'Tu arquitecto puede trabajar con nosotros. Antes coordinemos el diseño, el sistema constructivo y quién resuelve cada detalle.',
    phaseAnalogy: {
      title: 'El compositor y la orquesta que tocan juntos sin ensayar',
      metaphor:
        'Si el autor compone para piano y la orquesta solo tiene violines, el primer acorde desafinará en el estreno.',
      explanation:
        'Empezar sin coordinación técnica previa provoca que en obra aparezcan dudas de replanteo, pasos de instalaciones que no coinciden o detalles sin resolver. Coordinar antes alinea planos y ejecución.',
      cases: [
        {
          label: 'Si tu arquitecto tiene un diseño de autor singular',
          tip: 'La oficina técnica de la empresa constructora adapta luces y encuentros sin alterar el concepto arquitectónico.',
        },
        {
          label: 'Si se busca un estándar de alta eficiencia',
          tip: 'Arquitecto y constructor deben consensuar la continuidad del aislamiento y la hermeticidad antes de fabricar.',
        },
        {
          label: 'Para delimitar responsabilidades técnicas',
          tip: 'Conviene acordar previamente quién valida cada nudo constructivo, forjado y paso de tuberías.',
        },
      ],
    },
    leftChoice: {
      id: 'L2_COORDINAR_EN_OBRA',
      label: 'Que se coordinen cuando empiece la obra',
      subtext: 'Arrancar ya y que vayan resolviendo sobre el terreno',
      deltaPresupuesto: -6500, // Costes simulados por consultas y revisiones
      deltaSemanas: 4, // Semanas añadidas por dudas técnicas pendientes
      deltaEstres: 25, // Tensión por descoordinación
      deltaFactura: 10,
      consequenceText:
        'Aparecen consultas, revisiones y decisiones pendientes que no estaban resueltas en plano. Esto añade 4 semanas al calendario, costes simulados de adaptación y tensión entre los técnicos.',
      partnerReaction:
        '«El constructor dice que el plano no contemplaba el paso de tubos y el arquitecto pide revisar los encuentros... la obra está parada mientras se ponen de acuerdo».',
      technicalTip: {
        warning:
          'Los vacíos de coordinación entre proyecto y construcción los acaba absorbiendo el presupuesto y el calendario del cliente.',
        advice:
          'Sienta a tu arquitecto y al equipo técnico del constructor antes de fabricar o mover tierras para validar encuentros y responsabilidades.',
        quote: '«Mejor presentar al arquitecto y al constructor antes de que los presente un problema».',
        analogy: {
          title: 'El sastre y el patronista',
          story:
            'Si el sastre dibuja una prenda sin conocer el tejido del patronista, habrá que hacer arreglos improvisados en la prueba final. Coordinar el plano con el sistema evita rehacer piezas.',
          lesson: 'Una mesa técnica previa ahorra semanas de revisiones en obra.',
          adaptableAdvice:
            'Para tu caso: facilita a tu arquitecto las especificaciones del sistema constructivo para que module los detalles con precisión.',
          cases: [
            {
              label: 'Arquitecto con diseño a medida',
              tip: 'Revisar la modulación estructural permite optimizar escuadrías sin alterar la estética deseada.',
            },
            {
              label: 'Instalaciones complejas',
              tip: 'Definir patinillos y pasos en el plano digital evita perforaciones imprevistas en la estructura.',
            },
          ],
        },
      },
      consequenceAnimation: {
        icon: '📐',
        description:
          'Dos planos intentan superponerse, pero algunos elementos no encajan; surgen interrogaciones sobre las cotas y los encuentros constructivos.',
        visualType: 'blueprints',
      },
      parallelOutcome: {
        title: 'Si hubiesen revisado juntos el proyecto antes:',
        budgetResult: '6.500 € ahorrados en revisiones y consultas de obra.',
        weeksResult: '4 semanas ganadas con ejecución continua sin parones.',
        narrative:
          'Habrían acordado los encuentros constructivos y las responsabilidades antes de iniciar la construcción.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L2_REVISAR_JUNTOS',
      label: 'Revisar juntos el proyecto antes de construir',
      subtext: 'Invertir tiempo en resolver encuentros, instalaciones y medidas',
      deltaPresupuesto: 0,
      deltaSemanas: 1, // Se invierte tiempo al principio en resolver encuentros
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText:
        'Se invierte tiempo al principio en resolver encuentros, instalaciones, medidas y responsabilidades. Tu arquitecto y la empresa constructora alinean el proyecto para arrancar con certidumbre.',
      partnerReaction:
        '«Da tranquilidad verles colaborar. Han revisado los detalles clave y ahora todo el equipo sabe qué tiene que hacer cada uno».',
      consequenceAnimation: {
        icon: '✅',
        description:
          'Los dos planos se alinean con precisión y las interrogaciones se convierten en comprobaciones técnicas verificadas.',
        visualType: 'blueprints',
      },
      parallelOutcome: {
        title: 'Si los hubieses dejado entenderse cuando empezara la obra:',
        budgetResult: '+6.500 € en revisiones y consultas sobre la marcha.',
        weeksResult: '+4 semanas de obra parada por discrepancias técnicas.',
        narrative:
          'Habrías tenido que lidiar con dudas de replanteo y decisiones pendientes con la obra ya iniciada.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
  },

  // FASE 3: EL BARRO O EL TALLER
  {
    id: 'card-level-3',
    level: 3,
    sceneTitle: 'Fase 3: «El Barro o el Taller»',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt:
      '«La construcción va a comenzar y la previsión anuncia lluvia. Hay que decidir cómo se organizarán la fabricación, las entregas, la protección de materiales y el cierre de la vivienda.»',
    detailContext:
      'Contrapón improvisación y planificación. No afirmes que los materiales de una obra convencional se deterioran inevitablemente ni que una solución industrializada elimina todos los riesgos.',
    devilVoice:
      'Trae todo a la parcela. Si llueve, ya buscaremos una lona para que no se eche a perder.',
    advisorVoice:
      'Planifiquemos qué llega, dónde se protege y cómo se monta. En nuestra opción industrializada, parte del trabajo se prepara en taller.',
    phaseAnalogy: {
      title: 'El catering preparado en obrador vs cocinar al aire libre con lluvia',
      metaphor:
        'Preparar una receta delicada al aire libre bajo un chaparrón obliga a tapar cazuelas con plásticos. Elaborar en cocina protegida y montar en el lugar reduce el riesgo.',
      explanation:
        'Planificar entregas por fases y preparar componentes en taller protegido acorta el tiempo de exposición a la intemperie, facilitando gestionar episodios meteorológicos adversos.',
      cases: [
        {
          label: 'Parcelas con acceso de tierra o barro',
          tip: 'La lluvia dificulta el tránsito de camiones pesados; planificar el transporte en ventanas secas evita atascos.',
        },
        {
          label: 'Montaje en temporadas húmedas',
          tip: 'Un plan de protección con montaje secuencial permite cerrar el tejado y la envolvente con mayor rapidez.',
        },
        {
          label: 'Acopios en parcela',
          tip: 'Los materiales sensibles deben colocarse sobre plataformas elevadas y ventiladas, nunca directamente en el barro.',
        },
      ],
    },
    leftChoice: {
      id: 'L3_RESOLVER_SOBRE_LA_MARCHA',
      label: 'Ir resolviendo según venga el tiempo',
      subtext: 'Llevar material a la parcela y proteger sobre la marcha',
      deltaPresupuesto: -5500, // Costes simulados de reorganización y protecciones improvisadas
      deltaSemanas: 5, // Episodio de lluvia provoca paradas
      deltaEstres: 25, // Aumenta el estrés
      deltaFactura: 5,
      consequenceText:
        'Un episodio de lluvia provoca paradas y reorganización en la parcela. Hay que improvisar protecciones, esperar a que el terreno drene y reprogramar trabajos, con impacto simulado en semanas y estrés.',
      partnerReaction:
        '«Ha llovido tres días seguidos, la parcela es un barrizal y los camiones no pueden entrar. Toca reorganizar el calendario otra vez...»',
      technicalTip: {
        warning:
          'Confiar en resolver la protección sobre la marcha suele derivar en parones no previstos y gastos imprevistos de reorganización.',
        advice:
          'Establece un protocolo de acopios y secuencia de montaje antes de recibir materiales en obra.',
        quote: '«La lluvia puede aparecer sin avisar. El plan de protección, mejor que no».',
        analogy: {
          title: 'El paraguas olvidado en el coche',
          story:
            'Saber que puede llover y no llevar impermeable te obliga a correr bajo los aleros y mojarte la ropa. Tener un plan de protección no evita la nube, pero te mantiene seco.',
          lesson: 'La planificación no cambia el clima, pero evita que el agua paralice tu proyecto.',
          adaptableAdvice:
            'Para tu caso: programa la cimentación y exige fechas acotadas de llegada para la estructura.',
          cases: [
            {
              label: 'Vivienda con entramado o madera técnica',
              tip: 'El montaje en seco permite techar la vivienda en pocos días reduciendo la exposición al agua.',
            },
            {
              label: 'Obra en ladera o terreno arcilloso',
              tip: 'El barro acumulado retrasa los trabajos; acondicionar la zona de descarga ahorra semanas.',
            },
          ],
        },
      },
      consequenceAnimation: {
        icon: '🌧️',
        description:
          'Aparecen nubes sobre la parcela con materiales pendientes de proteger y operarios esperando que el barro seque para reanudar trabajos.',
        visualType: 'rain_factory',
      },
      parallelOutcome: {
        title: 'Si hubieses planificado fabricación y montaje:',
        budgetResult: '5.500 € ahorrados en protecciones improvisadas y reorganización.',
        weeksResult: '5 semanas de adelanto al gestionar mejor el episodio de lluvia.',
        narrative:
          'La secuencia prevista en taller habría permitido avanzar en seco y reducir la exposición en la parcela.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L3_PLANIFICAR_TALLER',
      label: 'Planificar fabricación, protección y montaje',
      subtext: 'Preparar en taller y coordinar entregas por etapas',
      deltaPresupuesto: 0,
      deltaSemanas: 1, // Secuencia prevista gestiona mejor el episodio
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText:
        'La secuencia prevista permite gestionar mejor el episodio de lluvia: parte del trabajo se prepara en taller y las piezas llegan a la parcela por etapas coordinadas, sin convertir el resultado en una promesa de plazo universal.',
      partnerReaction:
        '«A pesar de la previsión de lluvia, como las piezas vienen preparadas por fases, el montaje avanza de forma ordenada y sin sorpresas».',
      consequenceAnimation: {
        icon: '🏭',
        description:
          'Se observa el trabajo avanzando en taller protegido y las piezas llegando a la parcela por etapas coordinadas con grúa.',
        visualType: 'rain_factory',
      },
      parallelOutcome: {
        title: 'Si hubieses dejado la protección al azar:',
        budgetResult: '+5.500 € en reorganización y paradas no planificadas.',
        weeksResult: '+5 semanas de retraso esperando que el terreno seque.',
        narrative:
          'Habrías sufrido paradas repetidas y acopios a la intemperie pendientes de lonas improvisadas.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // FASE 4: ¿MÁS MÁQUINA O MEJOR ABRIGO?
  {
    id: 'card-level-4',
    level: 4,
    sceneTitle: 'Fase 4: «¿Más Máquina o Mejor Abrigo?»',
    character: CHARACTERS.advisor,
    messageType: 'in_person',
    prompt:
      '«Llega el momento de elegir la climatización. Una propuesta empieza por instalar mucha potencia; la otra comienza revisando la envolvente y calculando las necesidades de la vivienda.»',
    detailContext:
      'No atribuyas toda la diferencia de consumo al tamaño del equipo. No afirmes que la casa no pierde calor ni que la ventilación sustituye siempre a la calefacción y la refrigeración.',
    devilVoice:
      'Pon una máquina grande. Si sobra potencia, mejor. Así no hablamos más del aislamiento.',
    advisorVoice:
      'Primero veamos qué necesita la casa. Después elegimos la envolvente y los equipos que encajan con ella.',
    phaseAnalogy: {
      title: 'El abrigo de invierno vs subir la calefacción al máximo',
      metaphor:
        'Ponerse un buen abrigo térmico permite estar cómodo en casa sin necesidad de tener radiadores al rojo vivo zumbando día y noche.',
      explanation:
        'Un equipo sobredimensionado en una vivienda con demanda térmica sin optimizar no compensa las corrientes ni garantiza mayor confort. Dimensionar la envolvente y los equipos de forma coordinada optimiza la inversión y el consumo.',
      cases: [
        {
          label: 'Si buscas confort térmico homogéneo',
          tip: 'Una envolvente bien aislada y sin puentes térmicos evita paredes frías y corrientes de aire en invierno.',
        },
        {
          label: 'Si quieres controlar el consumo eléctrico',
          tip: 'Calcular la carga térmica real evita comprar máquinas caras que luego trabajan en ciclos cortos ineficientes.',
        },
        {
          label: 'Calidad del aire interior',
          tip: 'La ventilación mecánica controlada renueva el aire con filtros, complementando de forma eficiente a la climatización.',
        },
      ],
    },
    leftChoice: {
      id: 'L4_ELEGIR_MAQUINA_SIN_REVISAR',
      label: 'Elegir la máquina sin revisar las necesidades',
      subtext: 'Instalar mucha potencia sin comprobar la envolvente',
      deltaPresupuesto: -4000, // Mayor coste de máquina sobredimensionada e instalación
      deltaSemanas: 0,
      deltaEstres: 15,
      deltaFactura: 45, // Escenario energético ilustrativo menos favorable
      consequenceText:
        'Se muestra una inversión en equipo de gran potencia y un escenario energético ilustrativo menos favorable: la máquina trabaja con mayor consumo y el confort interior se resiente si la envolvente no acompaña.',
      partnerReaction:
        '«La máquina es enorme y se escucha en el porche, pero en el salón sigue habiendo rincones fríos... parece que la potencia sola no lo resuelve todo».',
      technicalTip: {
        warning:
          'Sobredimensionar la potencia de climatización sin calcular la demanda real encarece el equipo y no resuelve las fugas de la envolvente.',
        advice:
          'Calcula primero las pérdidas y ganancias térmicas de la casa; después elige aislamiento, carpinterías y el equipo proporcionado.',
        quote: '«Antes de comprar un radiador más grande, mira si tu casa está jugando con el abrigo abierto».',
        analogy: {
          title: 'El anorak fino con estufa a cuestas',
          story:
            'Salir a una ventisca con una camisa fina y una estufa portátil no te dará el confort de un buen anorak de plumas. Tu vivienda debe funcionar igual: primero su abrigo, luego el equipo.',
          lesson: 'El aislamiento bien instalado trabaja 24 horas al día sin consumir electricidad.',
          adaptableAdvice:
            'Para tu caso: solicita el balance de demanda térmica (kWh/m²·año) antes de contratar la aerotermia.',
          cases: [
            {
              label: 'Clima frío en invierno',
              tip: 'El triple vidrio y la estanqueidad reducen la potencia necesaria de la bomba de calor a la mitad.',
            },
            {
              label: 'Clima cálido en verano',
              tip: 'La protección solar pasiva evita que el calor entre en la vivienda antes de encender el aire.',
            },
          ],
        },
      },
      consequenceAnimation: {
        icon: '💨',
        description:
          'Una máquina de climatización crece exageradamente en la fachada mientras siguen apareciendo flechas de intercambio térmico escapando por la envolvente.',
        visualType: 'machine_coat',
      },
      parallelOutcome: {
        title: 'Si hubieses calculado y dimensionado el conjunto:',
        budgetResult: 'Inversión equilibrada entre envolvente y equipo de climatización.',
        weeksResult: 'Escenario energético ilustrativo con consumo optimizado.',
        narrative:
          'Habrías conseguido un confort estable dimensionando la potencia justa para las necesidades reales de la casa.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L4_CALCULAR_CONJUNTO',
      label: 'Calcular y dimensionar el conjunto',
      subtext: 'Solución coordinada de envolvente, ventilación y climatización',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: -10, // Escenario energético ilustrativo más favorable
      consequenceText:
        'Se muestra una solución coordinada de envolvente, ventilación y climatización con un escenario energético ilustrativo más favorable: el cálculo previo permite ajustar el equipo al comportamiento térmico real de la vivienda.',
      partnerReaction:
        '«El equipo es compacto, silencioso y la casa mantiene una temperatura muy agradable en todas las habitaciones sin picos de consumo».',
      consequenceAnimation: {
        icon: '🧥',
        description:
          'Se destaca primero la envolvente continua y hermética de la casa y después aparece el equipo de climatización ajustado a su medida.',
        visualType: 'machine_coat',
      },
      parallelOutcome: {
        title: 'Si hubieses elegido máquina sin revisar necesidades:',
        budgetResult: '+4.000 € en equipo sobredimensionado y acometidas.',
        weeksResult: 'Escenario de facturas energéticas sensiblemente menos favorable.',
        narrative:
          'Habrías dependido de una potencia excesiva para intentar compensar las pérdidas térmicas de los muros.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
  },

  // FASE 5: EL GRUPO DE WHATSAPP NO ES UN JEFE DE OBRA
  {
    id: 'card-level-5',
    level: 5,
    sceneTitle: 'Fase 5: «El Grupo de WhatsApp no es un Jefe de Obra»',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt:
      '«Electricidad, fontanería y acabados necesitan intervenir en zonas compartidas. Todos tienen su calendario, pero no has definido quién organiza las tareas y resuelve los encuentros.»',
    detailContext:
      'No confundas interlocutor único con una persona que asume todas las funciones técnicas y legales del proyecto. Se trata de tener un canal organizado y responsabilidades identificadas.',
    devilVoice:
      'Contrata a cada uno por separado y crea un grupo. Coordinar son cuatro mensajes.',
    advisorVoice:
      'Puedes contratar por separado, pero la coordinación necesita tiempo, conocimientos y responsabilidades claras. Otra opción es un alcance llave en mano bien definido.',
    phaseAnalogy: {
      title: 'El grupo de chat del viaje escolar vs el guía profesional',
      metaphor:
        'Un grupo de WhatsApp con 15 personas proponiendo restaurantes termina en discusiones y retrasos. Un itinerario con responsables claros permite disfrutar del viaje.',
      explanation:
        'En la fase final de obra intervienen gremios simultáneos. Si no hay un responsable de coordinación identificado, las tareas se pisan, surgen malentendidos y los plazos se dilatan.',
      cases: [
        {
          label: 'Si contratas gremios por separado',
          tip: 'Reserva tiempo diario para comprobar solapes de fechas y definir quién responde de cada remate.',
        },
        {
          label: 'Si eliges una opción llave en mano',
          tip: 'La constructora coordina a sus propios oficios bajo un único contrato con plazos e hitos verificables.',
        },
        {
          label: 'Firma de modificaciones',
          tip: 'Cualquier cambio de enchufes o sanitarios debe registrarse en plano con coste aprobado antes de picar.',
        },
      ],
    },
    leftChoice: {
      id: 'L5_COORDINARLO_YO_SIN_PLAN',
      label: 'Coordinarlo yo sin un plan previo',
      subtext: 'Gestionar a los gremios por el grupo de chat sobre la marcha',
      deltaPresupuesto: -6000, // Partidas desajustadas y rectificaciones
      deltaSemanas: 4, // Aumentan el estrés y las semanas del escenario
      deltaEstres: 30, // Se acumulan llamadas y tareas que se pisan
      deltaFactura: 0,
      consequenceText:
        'Se acumulan llamadas, visitas y tareas que se pisan entre gremios. Aumentan el estrés y las semanas del escenario por malentendidos sobre quién debía intervenir primero en cada estancia.',
      partnerReaction:
        '«El electricista dice que el fontanero no le dejó pasar los tubos, el pintor no puede entrar y el teléfono no para de sonar... coordinar esto nos está superando».',
      technicalTip: {
        warning:
          'Asumir la coordinación de múltiples gremios sin experiencia ni calendario formal multiplica las interferencias y los retrasos.',
        advice:
          'Establece una secuencia de entrada por fases y un protocolo único de comunicación con responsables identificados.',
        quote: '«Puedes ser el dueño de la casa sin convertirte en el servicio de atención al gremio».',
        analogy: {
          title: 'El semáforo en un cruce concurrido',
          story:
            'Si quitas el semáforo de un cruce y pides a los conductores que se organicen por bocinazos, habrá atasco seguro. El plan de obra es el semáforo que dice quién pasa primero.',
          lesson: 'Una buena coordinación ahorra discusiones y protege los plazos de entrega.',
          adaptableAdvice:
            'Para tu caso: exige un diagrama de Gantt de oficios con fechas de inicio y fin comprometidas.',
          cases: [
            {
              label: 'Montaje de cocina y carpinterías',
              tip: 'El suelo y la pintura deben estar terminados y protegidos antes de colocar muebles a medida.',
            },
            {
              label: 'Pruebas de instalaciones',
              tip: 'Comprobar estanqueidad y presión de agua antes de cerrar falsos techos y tabiques.',
            },
          ],
        },
      },
      consequenceAnimation: {
        icon: '📱',
        description:
          'Se multiplican las notificaciones y audios en el teléfono mientras dos tareas de gremios intentan ocupar el mismo hueco del calendario a la vez.',
        visualType: 'whatsapp_schedule',
      },
      parallelOutcome: {
        title: 'Si hubieses definido coordinación e interlocución:',
        budgetResult: '6.000 € ahorrados en solapes y remates rehechos.',
        weeksResult: '4 semanas ganadas con entrega coordinada en fecha.',
        narrative:
          'Habrías tenido una secuencia de oficios ordenada con un canal claro y responsabilidades identificadas.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L5_DEFINIR_COORDINACION',
      label: 'Definir coordinación e interlocución',
      subtext: 'Secuencia organizada, canal claro y responsables identificados',
      deltaPresupuesto: 0,
      deltaSemanas: 0,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText:
        'Se muestra una secuencia organizada, un canal de comunicación claro y responsables identificados. Los oficios entran de forma escalonada y cada remate queda verificado antes de pasar al siguiente.',
      partnerReaction:
        '«Todo avanza como un reloj: el calendario de tareas se cumple, las dudas se resuelven por un canal oficial y la casa está lista para la entrega».',
      consequenceAnimation: {
        icon: '🗓️',
        description:
          'Las tareas de cada oficio se ordenan en una secuencia de calendario sincronizada, con hitos claros y sin solapes.',
        visualType: 'whatsapp_schedule',
      },
      parallelOutcome: {
        title: 'Si hubieses intentado coordinarlo todo sin plan previo:',
        budgetResult: '+6.000 € en rectificaciones y visitas repetidas.',
        weeksResult: '+4 semanas de retraso con gremios pisándose en la obra.',
        narrative:
          'Habrías sufrido llamadas constantes a deshoras y la tensión de arbitrar cruces entre operarios.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 5,
  },
];

export function calculatePlayerProfile(
  history: { chosenOptionId: string; isPassivhausWay?: boolean }[]
): PlayerProfile {
  const passivChoices = history.filter((h) => h.isPassivhausWay).length;

  if (passivChoices >= 4) {
    return {
      title: 'Planificador con Visión',
      tagline: '«Anticipar y coordinar en plano es el mayor ahorro de tu vida»',
      description:
        'Has entendido que el secreto de una casa no es improvisar sobre el terreno ni fiarse de presupuestos incompletos o grupos de chat, sino definir el alcance, coordinar a tu arquitecto con el constructor, planificar el montaje y cuidar la envolvente térmica. ¡Tu simulación concluye con confort y control de presupuesto!',
      badgeEmoji: '🏆',
    };
  }

  if (passivChoices >= 2) {
    return {
      title: 'Explorador Pragmático',
      tagline: '«Equilibrio entre aprendizaje real y sentido común»',
      description:
        'Has explorado las dos caras de la autopromoción: la tentación de empezar rápido frente a la necesidad de fijar el alcance, coordinar gremios y dimensionar equipos con criterio. La experiencia en este juego te da las preguntas esenciales antes de firmar cualquier contrato en la vida real.',
      badgeEmoji: '🧭',
    };
  }

  return {
    title: 'Superviviente de la Obra',
    tagline: '«Has vivido la improvisación de obra en primera persona»',
    description:
      'Experimentaste qué ocurre cuando se comparan cifras sin conocer el alcance, se deja la coordinación a la improvisación o se intenta gestionar a los gremios por mensajes sueltos. La mejor parte: aquí equivocarse no cuesta una hipoteca. ¡Ahora sabes qué puntos revisar en tu proyecto!',
    badgeEmoji: '🧱',
  };
}
