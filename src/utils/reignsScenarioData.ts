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
    role: 'Asesora Técnica Passivhaus',
    avatarBg: 'bg-indigo-100',
    avatarColor: 'text-indigo-900',
  },
  surveyor: {
    id: 'surveyor',
    name: 'Carlos',
    role: 'Aparejador (Director de Ejecución)',
    avatarBg: 'bg-teal-100',
    avatarColor: 'text-teal-900',
  },
  devil: {
    id: 'devil',
    name: 'El Diablillo',
    role: 'Voz de la Impaciencia',
    avatarBg: 'bg-rose-100',
    avatarColor: 'text-rose-900',
  },
};

// =========================================================================
// RECORRIDO COMPLETO: «DE LA PARCELA A LAS LLAVES» (10 FASES CANÓNICAS)
// =========================================================================
export const REIGNS_SCENARIOS_FULL: GameCard[] = [
  // FASE 1: «LAS VISTAS NO VIENEN CON LICENCIA»
  // Pregunta que resuelve: ¿Esta parcela encaja con mi vivienda?
  {
    id: 'card-vistas-licencia',
    level: 1,
    sceneTitle: 'Hito 1: «Las vistas no vienen con licencia»',
    character: CHARACTERS.partner,
    messageType: 'chat',
    prompt:
      '«Hemos encontrado una parcela preciosa con unas vistas increíbles. El vendedor nos dice que hay otro comprador muy interesado y que conviene dar una señal para reservar cuanto antes. ¿Reservamos ya?»',
    detailContext:
      'La ubicación es espectacular, pero aún no has pedido la ficha urbanística al ayuntamiento, no sabes si los accesos permiten el paso de la grúa ni si la pendiente encarecerá el movimiento de tierras.',
    devilVoice:
      'Con estas vistas, ¿qué más necesitas? Reserva antes de que te la quiten.',
    advisorVoice:
      'Antes de comprometerte, comprobemos qué puedes construir y si tu modelo encaja con las condiciones de la parcela.',
    phaseAnalogy: {
      title: 'Comprar un billete de tren sin saber si la vía llega hasta tu pueblo',
      metaphor:
        'Enamorarte del paisaje de la ventanilla y pagar el billete sin comprobar si el tren tiene parada o si tendrás que caminar 20 kilómetros por el monte.',
      explanation:
        'Una parcela sin ficha urbanística revisada es una incógnita: servidumbres de paso, retranqueos de linde obligatorios o una pendiente acusada pueden forzar a rediseñar la casa entera o disparar el coste del hormigón.',
      cases: [
        {
          label: 'Si la parcela tiene pendiente o sospecha de roca',
          tip: 'Exige un levantamiento topográfico y estudio geotécnico previo. Una pala picando roca sin prever cuesta más de 6.000 € que el banco no financia.',
        },
        {
          label: 'Si estás en zona urbana consolidada',
          tip: 'Verifica la altura máxima de cornisa y los retranqueos con los vecinos antes de dar ninguna señal.',
        },
      ],
    },
    leftChoice: {
      id: 'V1_RESERVAR_IMPULSO',
      label: 'Reservar y comprobar después',
      subtext: 'Pagar la señal rápido para que no te quiten la parcela',
      deltaPresupuesto: -6000,
      deltaSemanas: 5,
      deltaEstres: 25,
      deltaFactura: 0,
      consequenceText:
        'Aparece una servidumbre de linde municipal y un desnivel de 3 metros no contemplado: obliga a rediseñar la cimentación y adaptar el modelo, sumando 6.000 € y 5 semanas de trámites adicionales.',
      partnerReaction:
        '«El arquitecto municipal dice que no podemos colocar la casa donde queríamos por la servidumbre. Toca rehacer planos y pagar modificaciones...»',
      technicalTip: {
        warning:
          'Las prisas por reservar suelen ocultar condicionantes técnicos o jurídicos que encarecen la construcción.',
        advice:
          'Dedica unos días a contrastar la ficha técnica urbanística y las cotas de acceso antes de comprometer dinero.',
        quote: '«Comprar las vistas está bien. Saber qué puedes poner delante, mejor».',
      },
      consequenceAnimation: {
        icon: '🌄',
        description:
          'La postal de la parcela se gira y revela condicionantes imprevistos: retranqueos forzosos, pendiente pronunciada y adaptación obligada.',
        visualType: 'parcel_postcard',
      },
      parallelOutcome: {
        title: 'Si hubieses comprobado la viabilidad primero:',
        budgetResult: '0 € en adaptaciones o sobrecostes de cimentación.',
        weeksResult: '4 semanas ganadas en licencias limpias.',
        narrative:
          'Habrías negociado el precio de la parcela conociendo el desnivel real y las cotas de apoyo.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'V1_REVISAR_VIABILIDAD',
      label: 'Revisar la viabilidad antes',
      subtext: 'Comprobar ficha urbanística, accesos y pendiente',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText:
        'Dedicas unos días a comprobar la ficha urbanística y los accesos para el transporte de piezas. Compruebas que el modelo de catálogo encaja con orientación sur óptima sin sorpresas.',
      partnerReaction:
        '«¡Menos mal que revisamos! Descubrimos la cota exacta de acometidas y confirmamos que la grúa entra sin problemas por el camino».',
      consequenceAnimation: {
        icon: '📋',
        description:
          'Ficha técnica validada: modelo compatible con la parcela, accesos de transporte confirmados y viabilidad urbanística limpia.',
        visualType: 'parcel_postcard',
      },
      parallelOutcome: {
        title: 'Si hubieses reservado a ciegas:',
        budgetResult: '+6.000 € en muros de contención imprevistos.',
        weeksResult: '+5 semanas de rediseños con el ayuntamiento.',
        narrative:
          'Habrías asumido de tu bolsillo los costes de adaptar la vivienda a una parcela sin estudiar.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 1,
  },

  // FASE 2: «EL PRECIO DE LA CASA NO ES TODA LA CUENTA»
  // Pregunta que resuelve: ¿He contemplado el proyecto completo?
  {
    id: 'card-cuenta-completa',
    level: 1,
    sceneTitle: 'Hito 2: «El precio de la casa no es toda la cuenta»',
    character: CHARACTERS.advisor,
    messageType: 'in_person',
    prompt:
      '«El precio anunciado de la vivienda encaja perfectamente con nuestros ahorros y el límite de hipoteca. Pero todavía no hemos separado la vivienda de catálogo, los gastos de la parcela, los servicios profesionales, las tasas de licencia y las obras de acometida exterior. ¿Avanzamos calculando solo el precio anunciado?»',
    detailContext:
      'El conflicto no es comparar ofertas de constructores (eso viene después): es comprobar si puedes asumir el proyecto completo antes de quedarte sin reserva de fondos a mitad de camino.',
    devilVoice:
      'La casa entra en el presupuesto. Lo demás serán cuatro cosas.',
    advisorVoice:
      'Hagamos la cuenta completa: qué incluye la oferta, qué va aparte y qué queda por conocer.',
    phaseAnalogy: {
      title: 'Comprar un billete de avión sin contar las tasas, la maleta y el hotel',
      metaphor:
        'Ver una oferta de vuelo por 30 € y pensar que las vacaciones te costarán 30 €. Al llegar a destino descubres que el taxi cuesta 50 €, la maleta 70 € y el hotel 400 €.',
      explanation:
        'La vivienda industrializada fija el precio de la edificación, pero el autopromotor debe presupuestar las 4 cajas del proyecto: 1) Vivienda en taller y montaje, 2) Terreno e impuestos, 3) Proyectos visados y licencias municipales, 4) Acometidas exteriores y vallado.',
      cases: [
        {
          label: 'Si tu presupuesto total va ajustado',
          tip: 'Reserva siempre entre un 15% y un 20% para los costes no constructivos (notaría, ITP, ICIO municipal, geotécnico y acometidas).',
        },
        {
          label: 'Para la tasación de la hipoteca',
          tip: 'El banco solo financia la ejecución de la casa, no las tasas ni los impuestos de compra del terreno.',
        },
      ],
    },
    leftChoice: {
      id: 'P2_PRECIO_PORTADA',
      label: 'Decidir con el precio anunciado',
      subtext: 'Asumir que lo demás serán gastos menores secundarios',
      deltaPresupuesto: -8500,
      deltaSemanas: 4,
      deltaEstres: 30,
      deltaFactura: 0,
      consequenceText:
        'Surgen conceptos no contemplados: tasa municipal ICIO, acometidas de agua y electricidad y licencia de obra. Consumen tu fondo de reserva para acabados y elevan el estrés financiero.',
      partnerReaction:
        '«Nadie nos dijo que la acometida de luz y la tasa del ayuntamiento sumaban más de 8.500 €. Ahora vamos con la soga al cuello para la cocina...»',
      technicalTip: {
        warning:
          'Que un concepto no aparezca en la portada del catálogo no significa que no llegue a la cuenta final.',
        advice:
          'Elabora una matriz con las 4 cajas: edificación, terreno e impuestos, servicios técnicos y exteriores. Así sabrás tu capacidad real desde el día uno.',
        quote: '«Que no aparezca en la portada no significa que no llegue a la cuenta».',
      },
      consequenceAnimation: {
        icon: '📦',
        description:
          'La cifra de portada se despliega en varias cajas: aparecen tasas municipales, acometidas exteriores y servicios no previstos.',
        visualType: 'budget_breakdown',
      },
      parallelOutcome: {
        title: 'Si hubieses preparado el presupuesto global:',
        budgetResult: 'Reserva económica intacta sin sustos en la cuenta.',
        weeksResult: 'Financiación bancaria cuadrada desde el principio.',
        narrative:
          'Habrías sabido con exactitud cuánto podías destinar a la casa y cuánto a los trámites sin recortar en calidad.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'P2_PRESUPUESTO_GLOBAL',
      label: 'Preparar el presupuesto global',
      subtext: 'Desglosar vivienda, parcela, trámites y obras exteriores',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText:
        'El juego desglosa el presupuesto en cajas nítidas: vivienda con precio cerrado, reserva para tasas municipales y partida de acometidas exteriores. Ajustas prioridades con certidumbre total.',
      partnerReaction:
        '«Ahora sí que vemos el mapa completo: sabemos cada euro a dónde va y nos queda un fondo de emergencia reservado sin tocar».',
      consequenceAnimation: {
        icon: '📊',
        description:
          'Presupuesto global desglosado en cajas ordenadas: vivienda con precio vinculante, tasas acotadas y acometidas asignadas.',
        visualType: 'budget_breakdown',
      },
      parallelOutcome: {
        title: 'Si te hubieses fiado solo del precio de portada:',
        budgetResult: '+8.500 € en gastos imprevistos de trámites y zanjas.',
        weeksResult: '+4 semanas buscando financiación de urgencia.',
        narrative:
          'Habrías agotado tus ahorros en las tasas iniciales sin margen para los acabados de la vivienda.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 1,
  },

  // FASE 3: «EL PURGATORIO DE LOS PRESUPUESTOS»
  // Pregunta que resuelve: ¿Estoy comparando lo mismo?
  {
    id: 'card-purgatorio-presupuestos',
    level: 2,
    sceneTitle: 'Hito 3: «El purgatorio de los presupuestos»',
    character: CHARACTERS.partner,
    messageType: 'chat',
    prompt:
      '«Llevamos semanas esperando ofertas de varios constructores tradicionales: una deja los suelos pendientes, otra no aclara la climatización y la más barata tiene 14 partidas como "a concretar en obra". No hay forma de compararlas. ¿Pedimos un par de ofertas más a ver si alguna aclara?»',
    detailContext:
      'El conflicto no es simplemente esperar: es seguir esperando sin saber si podrás comparar los presupuestos o conocer el alcance real del precio a largo plazo.',
    devilVoice:
      'Pide un par de presupuestos más. Alguno llegará más barato. Lo que no esté incluido ya lo veremos.',
    advisorVoice:
      'No necesitas más números: necesitas saber qué incluye cada uno. Podemos partir de un modelo de catálogo y definir sus adaptaciones, exclusiones y condiciones.',
    phaseAnalogy: {
      title: 'Pedir presupuesto para reformar un coche sin saber si incluye el motor',
      metaphor:
        'Un taller te presupuesta la chapa por 5.000 €, otro te da 9.000 € con motor y frenos, y el tercero dice "precio orientativo". No compites en precio, compites en incertidumbre.',
      explanation:
        'El presupuesto tradicional con mediciones abiertas traslada el riesgo al autopromotor. El modelo de catálogo desglosa cada componente con especificación cerrada para comparar manzanas con manzanas.',
      cases: [
        {
          label: 'Si recibes ofertas con diferencias de más de 30.000 €',
          tip: 'La diferencia casi nunca es margen comercial: son capítulos enteros omitidos deliberadamente para ganar el contrato.',
        },
        {
          label: 'Para la tranquilidad con la hipoteca',
          tip: 'El banco rechaza presupuestos con partidas abiertas o rebaja la tasación hasta un 20%.',
        },
      ],
    },
    leftChoice: {
      id: 'P3_SEGUIR_ESPERANDO',
      label: 'Seguir esperando y comparar cifras',
      subtext: 'Pedir más ofertas tradicionales con partidas abiertas',
      deltaPresupuesto: -4800,
      deltaSemanas: 8,
      deltaEstres: 30,
      deltaFactura: 15,
      consequenceText:
        'Pasan dos meses más. Se acumulan hojas de cálculo con interrogaciones y partidas pendientes. El calendario avanza, sube el estrés y aparece un coste simulado asociado a la espera.',
      partnerReaction:
        '«Dos meses más esperando para seguir con las mismas dudas sobre qué entra y qué no. Ya no sé qué constructor dice la verdad...»',
      technicalTip: {
        warning:
          'El presupuesto más corto no siempre es el más claro. Y el más gordo tampoco garantiza que esté todo incluido.',
        advice:
          'Define el alcance completo de cada partida y exige ofertas con mediciones vinculantes sobre especificaciones técnicas cerradas.',
        quote: '«El presupuesto más corto no siempre es el más claro. Y el más gordo tampoco garantiza que esté todo incluido».',
      },
      consequenceAnimation: {
        icon: '📑',
        description:
          'Se acumulan sobres, aparecen interrogaciones sobre las partidas y pasan hojas del calendario con costes de espera.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses definido el alcance con catálogo:',
        budgetResult: 'Presupuesto cerrado sin sorpresas financieras.',
        weeksResult: '8 semanas de calendario ahorradas.',
        narrative:
          'Habrías comparado propuestas completas sobre una base técnica sólida.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'P3_DEFINIR_ALCANCE',
      label: 'Definir alcance y propuestas completas',
      subtext: 'Partir de un modelo de catálogo con adaptaciones y condiciones claras',
      deltaPresupuesto: 0,
      deltaSemanas: 2,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText:
        'Se dedica un tiempo acotado a aclarar el alcance y disminuye la incertidumbre. Cada partida queda clasificada entre incluida, adaptada o excluida.',
      partnerReaction:
        '«¡Por fin una tabla que se entiende! Sabemos exactamente qué incluye el precio, los plazos de entrega y qué partidas van por nuestra cuenta».',
      consequenceAnimation: {
        icon: '📊',
        description:
          'Los documentos se ordenan en una comparación clara: partidas cerradas, exclusiones identificadas y certidumbre técnica.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses seguido pidiendo folios con "a concretar":',
        budgetResult: '+4.800 € en costes financieros por dilatar el inicio.',
        weeksResult: '+8 semanas de retraso acumulado.',
        narrative:
          'Habrías seguido atrapado en el limbo de las hojas de cálculo.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
  },

  // FASE 4: «TU ARQUITECTO Y MI CONSTRUCTOR: ¿OS CONOCÉIS?»
  // Pregunta que resuelve: ¿El equipo está coordinado?
  {
    id: 'card-arquitecto-constructor',
    level: 2,
    sceneTitle: 'Hito 4: «Tu arquitecto y mi constructor: ¿os conocéis?»',
    character: CHARACTERS.architect,
    messageType: 'in_person',
    prompt:
      '«La arquitecta ha proyectado detalles singulares de fachada y voladizos. El constructor dice: "Esto sobre plano queda muy bonito, pero aquí en el andamio no se puede hacer así sin meter tres pilares más". Cada uno defiende su postura. ¿Cómo lo resolvemos?»',
    detailContext:
      'El dilema clásico: diseñar sin considerar los métodos constructivos reales genera disputas, sobrecostes y soluciones improvisadas en obra.',
    devilVoice:
      'Que el arquitecto mande y el constructor espabile en la obra. Ya lo resolverán entre ellos a pie de andamio.',
    advisorVoice:
      'Arquitectura y construcción deben hablar el mismo idioma desde el primer croquis. Un sistema industrializado unifica diseño y fabricación en el mismo modelo.',
    phaseAnalogy: {
      title: 'El diseñador de moda que dibuja un vestido sin saber si existe tela para coserlo',
      metaphor:
        'El sastre dibuja un traje espectacular, pero el costurero dice que la tela se desgarra al primer pespunte. Discuten mientras tú pagas el alquiler de la pasarela.',
      explanation:
        'Cuando el arquitecto diseña en el vacío y el constructor improvisa en el andamio, el autopromotor queda atrapado en el fuego cruzado pagando los platos rotos.',
      cases: [
        {
          label: 'Si buscas diseño de autor sin sorpresas',
          tip: 'Exige que tu arquitecto trabaje con los sistemas constructivos y tolerancias del fabricante antes del visado definitivo.',
        },
        {
          label: 'Para evitar precios contradictorios',
          tip: 'Cada detalle no coordinado en plano se convierte en obra en una partida con sobreprecio abusivo.',
        },
      ],
    },
    leftChoice: {
      id: 'A4_RESOLVER_EN_OBRA',
      label: 'Dejar que lo resuelvan en obra',
      subtext: 'Mantener el proyecto singular y que el constructor improvise en el tajo',
      deltaPresupuesto: -8200,
      deltaSemanas: 5,
      deltaEstres: 25,
      deltaFactura: 0,
      consequenceText:
        'En plena obra se detiene el trabajo 3 semanas. Hay que rehacer el cálculo, meter pilares metálicos no previstos que rompen la estética y pagar 8.200 € más en modificaciones.',
      partnerReaction:
        '«El arquitecto le echa la culpa al constructor por no saber ejecutarlo, y el constructor al arquitecto por dibujar cosas imposibles. Y la factura la pagamos nosotros...»',
      technicalTip: {
        warning:
          'Cuando el arquitecto y el constructor no se coordinan antes de la obra, tú eres el árbitro que paga las multas.',
        advice:
          'La industrialización une ingeniería y arquitectura en un único modelo BIM: lo que se diseña en pantalla es exactamente lo que encaja en el tajo al milímetro.',
        quote: '«La distancia entre el tablero de dibujo y el andamio siempre se mide en euros del cliente».',
      },
      consequenceAnimation: {
        icon: '📐',
        description:
          'Paralización por detalles no constructivos: cruce de reproches entre gremios y facturas por refuerzos improvisados.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses apostado por el codiseño técnico:',
        budgetResult: '0 € en modificaciones o pilares improvisados.',
        weeksResult: 'Ritmo continuo sin parones en la obra.',
        narrative:
          'El diseño habría respetado la estética pactada adaptándose a los procesos de fabricación.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'A4_CODISEÑO_SISTEMA',
      label: 'Codiseño técnico integrado',
      subtext: 'Coordinar arquitecto y sistema constructivo antes del visado',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText:
        'Arquitecta y equipo de taller validan las piezas en el modelo digital antes de visarlo. Cada unión queda resuelta y calculada al milímetro sin tocar un ladrillo.',
      partnerReaction:
        '«Da gusto verlos colaborar. La arquitecta ajustó el detalle en 3D y en taller confirmaron que la pieza saldrá lista de fábrica sin tocar nada en obra».',
      consequenceAnimation: {
        icon: '🤝',
        description:
          'Modelo digital BIM compartido: arquitectura validada para fabricación industrializada con tolerancias milimétricas.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses dejado que discutieran en el andamio:',
        budgetResult: '+8.200 € en refuerzos y pilares no presupuestados.',
        weeksResult: '+5 semanas de obra empantanada.',
        narrative:
          'Habrías tenido una casa con parches estructurales que afearían el diseño original.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
  },

  // FASE 5: «PASSIVHAUS NO ES UN MENÚ A LA CARTA»
  // Pregunta que resuelve: ¿Se proyecta y verifica el conjunto?
  {
    id: 'card-passivhaus-no-menu',
    level: 3,
    sceneTitle: 'Hito 5: «Passivhaus no es un menú a la carta»',
    character: CHARACTERS.advisor,
    messageType: 'in_person',
    prompt:
      '«Estamos definiendo el proyecto y nos ofrecen incorporar algunas soluciones Passivhaus sueltas: "Ponemos unas buenas ventanas y bastante aislamiento, y lo llamamos «tipo Passivhaus» dejando los cálculos para después". ¿Elegimos algunas mejoras por separado o diseñamos los cinco principios integrados y verificados?»',
    detailContext:
      'Passivhaus se apoya en cinco principios que trabajan juntos: aislamiento térmico continuo, ventanas de altas prestaciones, control de puentes térmicos, hermeticidad al aire y ventilación con recuperación de calor. Aplicar algunos no equivale a cumplir el estándar completo.',
    devilVoice:
      'Pon buenas ventanas y bastante aislamiento. Lo llamamos "tipo Passivhaus" y los cálculos los dejamos para después.',
    advisorVoice:
      'Diseñemos el conjunto desde el principio y comprobemos su balance energético. Si decides certificar, tendremos el proyecto preparado para demostrar el cumplimiento.',
    phaseAnalogy: {
      title: 'Cinco ingredientes buenos cocinados cada uno por su cuenta sin receta',
      metaphor:
        'Cinco ingredientes buenos no hacen una receta si cada uno cocina por su cuenta.',
      explanation:
        'Comprar un motor potente pero ponerle ruedas de bicicleta no crea un coche rápido. En una vivienda, colocar triple vidrio sin eliminar los puentes térmicos en los pilares provoca condensación justo en la junta.',
      cases: [
        {
          label: 'Para el balance de confort real en verano e invierno',
          tip: 'El cálculo PHPP simula la física del edificio hora a hora según la radiación solar y el clima local, garantizando que el diseño no sufrirá sobrecalentamiento.',
        },
        {
          label: 'Si te interesa poder certificar oficialmente',
          tip: 'La certificación oficial requiere cumplir criterios prestacionales, aportar documentación y verificar la ejecución en obra con ensayo de hermeticidad ante un certificador autorizado.',
        },
      ],
    },
    leftChoice: {
      id: 'PH5_MENU_A_LA_CARTA',
      label: 'Elegir mejoras sin verificar',
      subtext: 'Poner elementos aislados "tipo Passivhaus" sin comprobar el conjunto',
      deltaPresupuesto: -4500,
      deltaSemanas: 3,
      deltaEstres: 20,
      deltaFactura: 35,
      consequenceText:
        'Aparecen elementos eficientes pero descompensados y el escenario energético queda como «Sin verificar». Al no haber cálculo conjunto, si más adelante queréis optar a la certificación oficial, el auditor exige rehacer detalles de puentes térmicos con retrasos y costes imprevistos.',
      partnerReaction:
        '«El técnico dice que tenemos buenas ventanas, pero como no se calculó el conjunto, la esquina del salón tiene un puente térmico y no podemos certificar sin hacer obras...»',
      technicalTip: {
        warning:
          'Llamar a una vivienda "tipo Passivhaus" sin balance energético PHPP es un reclamo comercial que suele acabar en disconfort y reformas imprevistas.',
        advice:
          'Passivhaus no se compra a trozos: se proyecta como un sistema integral donde cada principio apoya a los demás.',
        quote: '«Cinco ingredientes buenos no hacen una receta si cada uno cocina por su cuenta».',
      },
      consequenceAnimation: {
        icon: '🧩',
        description:
          'Piezas aisladas iluminadas con interrogación: puentes térmicos sin resolver, balance energético no verificado y revisión de proyecto necesaria.',
        visualType: 'five_principles',
      },
      parallelOutcome: {
        title: 'Si hubieses integrado los 5 principios con cálculo previo:',
        budgetResult: '0 € en rediseños o rectificaciones de puentes térmicos.',
        weeksResult: 'Proyecto verificado y preparado para certificar si se solicita.',
        narrative:
          'Habrías sabido la demanda energética exacta con el PHPP antes de poner el primer tornillo.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'PH5_INTEGRAR_5_PRINCIPIOS',
      label: 'Integrar los cinco principios',
      subtext: 'Verificar el proyecto con cálculo PHPP global',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: -10,
      consequenceText:
        'Se dedica tiempo al cálculo y a la coordinación inicial. El indicador energético pasa a «Estimación calculada» y se activa el estado «Objetivo de certificación previsto». El balance PHPP aporta la justificación técnica rigurosa.',
      partnerReaction:
        '«¡Las cinco piezas conectadas en la simulación! Sabemos exactamente cuánta energía demandará la casa y el proyecto queda preparado para demostrar el cumplimiento si decidimos certificar».',
      technicalTip: {
        warning:
          'El cálculo PHPP estima las necesidades energéticas pero no garantiza una factura fija: el consumo real depende también del uso y de las condiciones de funcionamiento.',
        advice:
          'La certificación requiere cumplir criterios, auditar ejecución y superar el test Blower Door por un certificador autorizado. Diseñar el conjunto verificado desde el principio es el único camino viable.',
        quote: '«Ruta rigurosa: Proyectar → Calcular → Ejecutar y comprobar → Certificar, si se solicita».',
      },
      consequenceAnimation: {
        icon: '📐',
        description:
          'Ruta de los 5 principios conectada: Aislamiento + Ventanas + Puentes térmicos + Hermeticidad + VMC. Cálculo PHPP validado y objetivo de certificación previsto.',
        visualType: 'five_principles',
      },
      parallelOutcome: {
        title: 'Si hubieses elegido elementos sueltos a la carta:',
        budgetResult: '+4.500 € en modificaciones y auditorías para corregir puentes térmicos.',
        weeksResult: 'Incertidumbre sobre el rendimiento real de la vivienda.',
        narrative:
          'Habrías pagado por materiales caros sin la seguridad de que trabajasen coordinados.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // FASE 6: «¿MÁS MÁQUINA O MEJOR ABRIGO?»
  // Pregunta que resuelve: ¿Las instalaciones responden al diseño?
  {
    id: 'card-maquina-abrigo',
    level: 3,
    sceneTitle: 'Hito 6: «¿Más máquina o mejor abrigo?»',
    character: CHARACTERS.advisor,
    messageType: 'in_person',
    prompt:
      '«Toca decidir el sistema térmico. El instalador nos propone una bomba de calor aerotérmica de 16 kW con suelo radiante por 22.000 €, diciendo: "Metemos una máquina grande con potencia de sobra y así no hace falta gastar tanto en aislamientos de fachada". ¿Invertimos en máquina potente o en abrigo térmico continuo?»',
    detailContext:
      'Una máquina grande en una casa mal aislada es como poner una estufa enorme en una tienda de campaña: gastará una barbaridad todos los meses para siempre.',
    devilVoice:
      'Pon la aerotermia más potente que haya; con 16 kW tienes potencia para calentar un polideportivo, ya no pasarás frío nunca.',
    advisorVoice:
      'Una casa bien abrigada solo necesita la energía de un secador de pelo. Invierte en aislamiento continuo y hermeticidad; la máquina se amortiza en facturas de 35 €/mes.',
    phaseAnalogy: {
      title: 'El termo de café de montaña vs la cafetera gigante enchufada a la batería del coche',
      metaphor:
        'Un buen termo mantiene el café hirviendo 24 horas sin gastar nada de electricidad. Si usas un vaso de cartón, necesitas una resistencia eléctrica encendida a tope todo el rato.',
      explanation:
        'El estándar Passivhaus prioriza la envolvente pasiva: muros con aislamiento continuo de 18-24 cm que retienen el calor. La climatización requerida es mínima (apenas 2-3 kW).',
      cases: [
        {
          label: 'Si piensas en tus gastos fijos a 30 años',
          tip: 'El aislamiento dura 60 años sin mantenimiento. Una bomba de calor compleja se avería o debe sustituirse a los 12-15 años.',
        },
        {
          label: 'Para el confort en verano',
          tip: 'Un buen abrigo térmico con control solar exterior evita el sobrecalentamiento estival sin tener que encender el aire acondicionado a 18°C.',
        },
      ],
    },
    leftChoice: {
      id: 'M6_SOBREDIMENSIONAR',
      label: 'Priorizar máquina grande',
      subtext: 'Bomba de 16 kW con menos aislamiento en fachadas',
      deltaPresupuesto: -5500,
      deltaSemanas: 2,
      deltaEstres: 15,
      deltaFactura: 90,
      consequenceText:
        'La máquina gigante enciende y apaga continuamente consumiendo picos eléctricos brutales. La factura de luz sube a 125 €/mes en invierno y en verano el suelo refrescante genera condensación en las baldosas.',
      partnerReaction:
        '«Ha llegado la primera factura de enero: 130 €. Y eso que el instalador decía que la máquina era muy eficiente. La casa pierde el calor en cuanto se apaga...»',
      technicalTip: {
        warning:
          'Sobredimensionar la climatización encarece la instalación inicial y multiplica el término de potencia contratada con la eléctrica.',
        advice:
          'En Passivhaus la envolvente hace el 90% del trabajo: con muros aislados de transmitancia U ≤ 0,15 W/m²K, tu casa se climatiza con el consumo de un electrodoméstico pequeño.',
        quote: '«La energía más barata y limpia es la que tu casa no necesita consumir».',
      },
      consequenceAnimation: {
        icon: '⚡',
        description:
          'Facturas eléctricas mensuales disparadas, bomba de calor arrancando a máxima potencia y condensaciones en suelos.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses priorizado el abrigo continuo:',
        budgetResult: '5.500 € ahorrados en equipos sobredimensionados.',
        weeksResult: 'Facturas estables por debajo de 35 €/mes.',
        narrative:
          'Habrías conseguido confort constante a 21°C todo el año sin depender de tarifas eléctricas disparadas.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'M6_ENVOLVENTE_PASIVA',
      label: 'Priorizar abrigo térmico Passivhaus',
      subtext: 'Aislamiento continuo de altas prestaciones y equipo térmico compacto',
      deltaPresupuesto: 0,
      deltaSemanas: 0,
      deltaEstres: -5,
      deltaFactura: -10,
      consequenceText:
        'Optáis por envolvente continua en madera técnica superaislada y una bomba compacta de apenas 3 kW. La casa retiene el calor de forma natural y la factura mensual cae a 35 €/mes.',
      partnerReaction:
        '«Hacen 2°C fuera y dentro estamos en manga corta a 21°C con el termostato casi al mínimo. La factura de la luz no llega ni a 40 € al mes».',
      consequenceAnimation: {
        icon: '🛡️',
        description:
          'Envolvente continua Passivhaus: fachada protegida, puentes térmicos eliminados y factura energética reducida al mínimo.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses instalado la máquina gigante con poco aislamiento:',
        budgetResult: '+5.500 € de sobrecoste en el equipo inicial.',
        weeksResult: '+90 €/mes en facturas eléctricas para siempre.',
        narrative:
          'Habrías sido rehén de la factura eléctrica cada invierno y cada ola de calor.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // FASE 7: «SOLO VAMOS A MOVER ESTA PARED»
  // Pregunta que resuelve: ¿Conozco el impacto de mis cambios?
  {
    id: 'card-mover-pared',
    level: 3,
    sceneTitle: 'Hito 7: «Solo vamos a mover esta pared»',
    character: CHARACTERS.surveyor,
    messageType: 'in_person',
    prompt:
      '«Ya hemos aprobado el proyecto, pero visitando la obra se nos ocurre cambiar la cocina de sitio y ampliar una habitación: "Total, es solo mover una pared". Manolo dice: "Eso se hace en dos días picando un poco el forjado". Carlos el aparejador nos mira con atención. ¿Aprobamos el cambio sobre la marcha?»',
    detailContext:
      'No se penaliza personalizar: se muestra la diferencia entre cambiar con información conociendo el impacto técnico en instalaciones y costes, y hacerlo a ciegas en obra.',
    devilVoice:
      'Ahora o nunca. Es mover una pared, no una montaña.',
    advisorVoice:
      'Puedes cambiar de idea. Primero veamos qué afecta, cuánto cuesta y cuándo puede hacerse.',
    phaseAnalogy: {
      title: 'Cambiar la puerta del baño cuando el alicatado ya está terminado',
      metaphor:
        'Pides mover la puerta 40 cm a la derecha: parece una tontería, pero exige arrancar azulejos, desviar las tuberías de agua y reponer la impermeabilización del suelo.',
      explanation:
        'En construcción industrializada y Passivhaus, cada tabique canaliza conductos de ventilación VMC o electricidad premecanizados. Moverlo en maqueta digital cuesta 0 €; moverlo en obra sin estudiar genera rozas destructivas.',
      cases: [
        {
          label: 'Si el cambio afecta a bajantes o fontanería',
          tip: 'Revisa siempre las pendientes de desagüe. Mover un inodoro lejos de la bajante principal provoca atascos crónicos de difícil solución.',
        },
        {
          label: 'Para mantener el precio pactado',
          tip: 'Exige una ficha de impacto con coste y plazo cerrado antes de autorizar cualquier modificación en el tajo.',
        },
      ],
    },
    leftChoice: {
      id: 'MP7_CAMBIO_SOBRE_MARCHA',
      label: 'Pedir el cambio y resolver después',
      subtext: 'Mover la pared sobre la marcha sin valorar el impacto técnico',
      deltaPresupuesto: -5500,
      deltaSemanas: 3,
      deltaEstres: 20,
      deltaFactura: 15,
      consequenceText:
        'El cambio activa revisiones y trabajos adicionales simulados: al desplazar el tabique, la roza rompe un conducto de ventilación VMC y hay que reforzar el forjado. Se suman 5.500 € y 3 semanas de retraso.',
      partnerReaction:
        '«Manolo nos ha pasado una factura de precios contradictorios por desviar los tubos. Lo que parecía mover una pared se ha convertido en un lío de obras...»',
      technicalTip: {
        warning:
          'Cambiar de idea sobre la marcha sin ficha de impacto es el origen de las facturas más abultadas en una obra.',
        advice:
          'Antes de mover un elemento, pide la ficha con coste, plazo e instalaciones afectadas; decidirás con información real.',
        quote: '«Cambiar de idea es gratis. Cambiar lo que ya está en marcha merece una pregunta».',
      },
      consequenceAnimation: {
        icon: '🧱',
        description:
          'Al desplazar la pared se iluminan los elementos afectados: bajantes, conductos de ventilación y rozas que generan retrasos.',
        visualType: 'wall_impact',
      },
      parallelOutcome: {
        title: 'Si hubieses valorado el impacto antes de aprobar:',
        budgetResult: '0 € en precios contradictorios imprevistos.',
        weeksResult: 'Ritmo de obra conservado sin parones.',
        narrative:
          'Habrías decidido el ajuste conociendo las implicaciones de plazo y coste antes de romper nada.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'MP7_VALORAR_IMPACTO',
      label: 'Valorar el impacto antes de aprobar',
      subtext: 'Ver ficha con coste, plazo y elementos afectados antes de decidir',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText:
        'Aparece la ficha de impacto: se comprueba que la pared no afecta a elementos de carga ni a pasos de VMC. Decidís un ajuste consciente y el equipo de taller lo adapta en plano sin sobrecostes.',
      partnerReaction:
        '«Vimos la ficha de impacto en pantalla, ajustamos el mobiliario de la cocina para no tocar las bajantes y conseguimos el espacio que queríamos sin gastar de más».',
      consequenceAnimation: {
        icon: '📋',
        description:
          'Ficha de impacto generada: coste, plazo y elementos afectados acotados antes de autorizar el cambio.',
        visualType: 'wall_impact',
      },
      parallelOutcome: {
        title: 'Si hubieses pedido el cambio a ciegas:',
        budgetResult: '+5.500 € en rozas y desvíos de fontanería.',
        weeksResult: '+3 semanas de parón.',
        narrative:
          'Habrías tenido que pagar horas extras de albañilería sin control del precio.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // FASE 8: «EL BARRO O EL TALLER»
  // Pregunta que resuelve: ¿Está preparada la ejecución?
  {
    id: 'card-barro-taller',
    level: 4,
    sceneTitle: 'Hito 8: «El barro o el taller»',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt:
      '«Arrancan los trabajos en parcela y se mete un temporal de tres semanas de lluvia continua. Manolo nos dice: "No pasa nada, aquí se ha construido con ladrillo y hormigón de toda la vida; tapamos los sacos con un plástico y seguimos adelante". El terreno es un barrizal y el agua llena las zanjas. ¿Qué hacemos?»',
    detailContext:
      'Construir a la intemperie expone materiales delicados al agua. En taller, la estructura se fabrica seca y bajo techo, y se monta en parcela en días.',
    devilVoice:
      'Sigue con la obra tradicional; tapamos con un plástico y que los albañiles vayan tirando aunque llueva, para no parar.',
    advisorVoice:
      'El aislamiento empapado en el lodo pierde propiedades térmicas para siempre. La estructura debe llegar de taller en seco y montarse con grúa en días protegida de la lluvia.',
    phaseAnalogy: {
      title: 'Coser un traje a medida bajo una tormenta en la calle vs coserlo en un taller de sastrería',
      metaphor:
        'Imagínate al sastre cosiendo telas caras bajo la lluvia: la lana se empapa, el hilo encoge y las costuras quedan deformadas.',
      explanation:
        'La obra húmeda in situ depende 100% del tiempo meteorológico. La madera técnica producida en nave industrial bajo clima controlado conserva su humedad óptima y se monta hermética en días.',
      cases: [
        {
          label: 'Si vives de alquiler mientras construyes',
          tip: 'Cada mes de parón por lluvia te cuesta entre 800 € y 1.500 € en alquiler puente de tu piso actual.',
        },
        {
          label: 'Si te preocupa el moho futuro en paredes',
          tip: 'El agua atrapada en el hormigón y ladrillos durante la obra tarda hasta dos años en evaporarse, generando humedades ocultas.',
        },
      ],
    },
    leftChoice: {
      id: 'B8_OBRA_HUMEDA',
      label: 'Continuar en parcela con lluvia',
      subtext: 'Seguir con ladrillo y mortero bajo la lluvia tapando con plásticos',
      deltaPresupuesto: -9800,
      deltaSemanas: 7,
      deltaEstres: 25,
      deltaFactura: 15,
      consequenceText:
        'Paro total de obra. Los palés de lana mineral quedan encharcados en el lodo y pierden sus propiedades aislantes. El alquiler de andamios y casetas sigue facturando y el alquiler de tu piso se alarga 7 semanas.',
      partnerReaction:
        '«Los andamios siguen cobrando 1.200 € al mes y en la parcela no hay nadie porque el barro cubre hasta los tobillos. Otro mes más pagando el alquiler de nuestro piso...»',
      technicalTip: {
        warning:
          'La humedad atrapada en cerramientos tradicionales durante la obra es la causa principal de fisuras, eflorescencias y moho.',
        advice:
          'La envolvente de madera técnica industrializada se monta en seco en 5 días con grúa telescópica, cerrando la casa al agua antes de que caiga la primera gota.',
        quote: '«El barro en la parcela no es folclore de la obra: es dinero que se pudre bajo el agua».',
      },
      consequenceAnimation: {
        icon: '🌧️',
        description:
          'Zanjas inundadas, materiales de aislamiento empapados en el fango y alquiler de andamios corriendo sin avance de obra.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses elegido el montaje en seco de taller:',
        budgetResult: '0 € en sobrecostes de andamios o alquileres puente.',
        weeksResult: 'Casa techada y cerrada al agua en apenas 5 días.',
        narrative:
          'Los paneles habrían llegado protegidos en camión y montados con grúa sin importar el barro del terreno.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'B8_TALLER_SECO',
      label: 'Montaje en seco con grúa',
      subtext: 'Estructura fabricada en taller bajo techo y ensamblada en días',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText:
        'Mientras en la parcela la cimentación fragua protegida, en la nave industrial se cortan y ensamblan los paneles de madera técnica con control CNC. Llegan en camiones y se montan en 5 días.',
      partnerReaction:
        '«¡Increíble! En una semana la casa entera está en pie, techada y estanca al agua. Los vecinos se han quedado con la boca abierta».',
      consequenceAnimation: {
        icon: '🏗️',
        description:
          'Grúa telescópica ensamblando paneles de madera técnica con precisión milimétrica bajo techo, cerrando la vivienda en días.',
        visualType: 'budget_cost_increase',
      },
      parallelOutcome: {
        title: 'Si hubieses seguido apilando ladrillos en el barro:',
        budgetResult: '+9.800 € en andamios y meses de alquiler extra.',
        weeksResult: '+7 semanas de retraso por fraguado y lluvias.',
        narrative:
          'Habrías tenido una estructura con humedad residual que tardaría meses en secar.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
  },

  // FASE 9: «EL GRUPO DE WHATSAPP NO ES UN JEFE DE OBRA»
  // Pregunta que resuelve: ¿Quién organiza las intervenciones?
  {
    id: 'card-whatsapp-coordinacion',
    level: 4,
    sceneTitle: 'Hito 9: «El grupo de WhatsApp no es un jefe de obra»',
    character: CHARACTERS.partner,
    messageType: 'chat',
    prompt:
      '«Hay 7 gremios diferentes en la obra: fontanero, electricista, pladurista, yesaire... Nadie asume responsabilidades y el fontanero dice que no puede pasar el tubo porque el del pladur ya cerró el tabique. Manolo dice: "Hacemos un grupo de WhatsApp y nos vamos coordinando ahí". ¿Dejamos la coordinación en el chat?»',
    detailContext:
      'Coordinar gremios independientes a base de mensajes y audios es el agujero negro donde mueren los plazos, el presupuesto y la salud mental.',
    devilVoice:
      'Crea el grupo de WhatsApp; así te enteras de todo al momento y los tienes a todos controlados desde el móvil.',
    advisorVoice:
      'Un grupo de chat no es un sistema de gestión. Exige un interlocutor técnico único con un protocolo industrializado donde cada hito esté planificado antes de entrar al tajo.',
    phaseAnalogy: {
      title: 'Dirigir una orquesta sinfónica mediante mensajes de voz de WhatsApp a los violinistas',
      metaphor:
        'Imagínate al director mandando notas de voz mientras cada músico toca a su propio ritmo cuando le viene bien. El resultado es puro ruido.',
      explanation:
        'En la construcción tradicional se solapan oficios sin protocolo: el fontanero rompe lo que hizo el pladurista y el pintor tapa las rozas sin sellar. La industrialización utiliza un único equipo de montaje con responsabilidades claras.',
      cases: [
        {
          label: 'Si trabajas y no puedes estar en la obra a diario',
          tip: 'Tener que arbitrar peleas entre gremios por chat te consumirá horas de trabajo y estrés crónico.',
        },
        {
          label: 'Para la garantía final de la vivienda',
          tip: 'Cuando algo falla en una obra con gremios sueltos, todos se echan la culpa mutuamente y nadie repara la avería.',
        },
      ],
    },
    leftChoice: {
      id: 'W9_GRUPO_WHATSAPP',
      label: 'Coordinar por grupo de WhatsApp',
      subtext: 'Gestionar los gremios independientes mediante chat y llamadas',
      deltaPresupuesto: -6200,
      deltaSemanas: 6,
      deltaEstres: 35,
      deltaFactura: 0,
      consequenceText:
        'El grupo de WhatsApp se convierte en una pesadilla de audios a deshoras, reproches y fotos de cables cortados. Nadie se hace responsable de las averías y la obra se retrasa 6 semanas con 6.200 € en horas extras de remates.',
      partnerReaction:
        '«Tengo 47 mensajes sin leer y un audio de tres minutos del fontanero gritándole al electricista. Ya no puedo más con esta tensión...»',
      technicalTip: {
        warning:
          'En la obra, un audio de WhatsApp sin plano visado es un sobrecoste esperando a ocurrir.',
        advice:
          'Exige siempre un único interlocutor contractual responsable de toda la envolvente y las instalaciones. Si algo falla, solo hay un teléfono al que llamar.',
        quote: '«El grupo de WhatsApp sirve para compartir memes, no para construir la casa de tu vida».',
      },
      consequenceAnimation: {
        icon: '📱',
        description:
          'Notificaciones continuas en el móvil, cruce de culpas entre gremios desorganizados y retrasos en el calendario.',
        visualType: 'whatsapp_schedule',
      },
      parallelOutcome: {
        title: 'Si hubieses contratado con un interlocutor técnico único:',
        budgetResult: '0 € en remates o parches por solape de oficios.',
        weeksResult: 'Entrega en fecha sin un solo mensaje de tensión.',
        narrative:
          'Un jefe de montaje industrializado habría coordinado todo según el modelo BIM sin molestarte durante tu jornada laboral.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'W9_INTERLOCUTOR_UNICO',
      label: 'Interlocutor técnico único',
      subtext: 'Protocolo industrializado con un solo responsable contractual',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -15,
      deltaFactura: 0,
      consequenceText:
        'Exiges un único jefe de proyecto responsable de montaje e instalaciones. Cada gremio entra según un cronograma milimétrico y cualquier incidencia se resuelve en el modelo digital.',
      partnerReaction:
        '«¡Qué alivio! Recibimos un informe fotográfico semanal con los hitos completados y ni un solo dolor de cabeza por el móvil».',
      consequenceAnimation: {
        icon: '👔',
        description:
          'Cronograma industrializado de montaje: responsabilidades centralizadas, protocolo de comprobación y reportes semanales ordenados.',
        visualType: 'whatsapp_schedule',
      },
      parallelOutcome: {
        title: 'Si hubieses coordinado por WhatsApp:',
        budgetResult: '+6.200 € en parches y horas de gremios desorganizados.',
        weeksResult: '+6 semanas de retraso y discusiones.',
        narrative:
          'Habrías vivido semanas de angustia arbitrando disputas de obra desde tu teléfono.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
  },

  // FASE 10: «LAS LLAVES NO CIERRAN TODOS LOS PENDIENTES»
  // Pregunta que resuelve: ¿La entrega queda bien resuelta?
  {
    id: 'card-llaves-pendientes',
    level: 5,
    sceneTitle: 'Hito 10: «Las llaves no cierran todos los pendientes»',
    character: CHARACTERS.builder,
    messageType: 'in_person',
    prompt:
      '«La vivienda parece terminada y tenemos unas ganas enormes de mudarnos. Quedan por revisar algunos detalles, la entrega y la documentación prevista. Manolo nos da una palmada en la espalda con las llaves en la mano: "Coge las llaves y entra ya. Lo que falte ya lo hablamos por WhatsApp". ¿Entramos ya?»',
    detailContext:
      'El momento más emocionante, pero donde se cierran las garantías legales del contrato y se libera la última certificación bancaria retenida.',
    devilVoice:
      'Coge las llaves. Lo que falte ya lo hablamos por WhatsApp.',
    advisorVoice:
      'Hagamos una revisión, dejemos los pendientes por escrito y repasemos cómo funciona la casa.',
    phaseAnalogy: {
      title: 'Sacar un coche nuevo del concesionario sin encender el motor ni comprobar los frenos',
      metaphor:
        'Si sacas el coche a ciegas a la autovía y no frena, el vendedor te dirá que pidas cita para el mes que viene. Has perdido toda la fuerza de negociación.',
      explanation:
        'Cuando firmas el fin de obra sin reservas, el banco le entrega al constructor el último pago retenido como garantía. Una vez cobrado, sus incentivos para volver a arreglar remates caen a cero. La comprobación técnica garantiza que te entreguen una casa terminada y garantizada ante notario.',
      cases: [
        {
          label: 'Si quieres que se cumplan los últimos remates',
          tip: 'La retención del último pago es la única herramienta que garantiza que terminen hasta el último detalle antes de mudarte.',
        },
        {
          label: 'Para el valor patrimonial de tu casa',
          tip: 'El libro digital del edificio con los certificados energéticos y planos as-built es tu mayor garantía ante seguro y tasadores.',
        },
      ],
    },
    leftChoice: {
      id: 'E10_ENTRAR_YA_PRISAS',
      label: 'Entrar y revisar sobre la marcha',
      subtext: 'Coger las llaves y confiar en los flecos por WhatsApp',
      deltaPresupuesto: -6500,
      deltaSemanas: 0,
      deltaEstres: 25,
      deltaFactura: 25,
      consequenceText:
        'Firmas el acta sin reservas. Reaparecen consultas y visitas de técnicos que añaden estrés y tareas pendientes. La máquina de ventilación hace ruido, faltan manuales y tienes que pagar a terceros para calibrarla.',
      partnerReaction:
        '«Llevamos tres semanas viviendo aquí con flecos sin resolver y Manolo ya no contesta los WhatsApps. Toca arreglarlo nosotros...»',
      technicalTip: {
        warning:
          'Firmar la entrega sin repasar la lista de comprobaciones deja las conversaciones abiertas y te deja legalmente indefenso.',
        advice:
          'No entregues el último pago sin el acta de pruebas técnicas: comprobación de caudal del pulmón de aire, certificado de inflado hermético y entrega del libro de la casa con garantías selladas.',
        quote: '«Las llaves abren la puerta. Una buena entrega evita dejar conversaciones abiertas».',
      },
      consequenceAnimation: {
        icon: '🔑',
        description:
          'Llavero entregado sin carpeta técnica: flecos pendientes sin garantía, llamadas sin responder y puesta en marcha deficiente.',
        visualType: 'keys_handover_folder',
      },
      parallelOutcome: {
        title: 'Si hubieses hecho una entrega ordenada:',
        budgetResult: 'Puesta en marcha perfecta sin gastar un céntimo extra.',
        weeksResult: 'Garantía decenal y libro del edificio entregados en mano.',
        narrative:
          'El pulmón de aire habría quedado calibrado en absoluto silencio con sus filtros limpios listos.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'E10_ENTREGA_ORDENADA',
      label: 'Hacer una entrega ordenada',
      subtext: 'Revisión exhaustiva, pendientes por escrito y guía de funcionamiento',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText:
        'Se dedica tiempo a la revisión formal: acta de comprobación técnica, libro digital del edificio entregado, lista de flecos firmada con retención y explicación completa del funcionamiento de la VMC.',
      partnerReaction:
        '«Todo revisado y sellado. La carpeta está completa, nos explicaron cómo cambiar los filtros de la VMC y la casa funciona como un reloj suizo».',
      consequenceAnimation: {
        icon: '📁',
        description:
          'Llavero entregado junto a la carpeta oficial completa: revisión sellada, documentación as-built, pendientes acotados y uso de instalaciones explicado.',
        visualType: 'keys_handover_folder',
      },
      parallelOutcome: {
        title: 'Si hubieses cogido las llaves a ciegas:',
        budgetResult: '+6.500 € en arreglos y calibraciones de tu bolsillo.',
        weeksResult: 'Semanas de llamadas y discusiones sin respuesta.',
        narrative:
          'Habrías tenido que pagar a terceros para arreglar instalaciones mal calibradas cuando ya estabas viviendo dentro.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 5,
  },
];

// =========================================================================
// MODO PARTIDA RÁPIDA (5 SITUACIONES SELECCIONADAS)
// =========================================================================
export const REIGNS_SCENARIOS_QUICK: GameCard[] = [
  // 1. Comprobar la parcela
  REIGNS_SCENARIOS_FULL[0],
  // 2. Comparar presupuestos y alcance
  REIGNS_SCENARIOS_FULL[2],
  // 3. Proyectar el conjunto Passivhaus
  REIGNS_SCENARIOS_FULL[4],
  // 4. Ejecución en taller vs lodo
  REIGNS_SCENARIOS_FULL[7],
  // 5. Entrega ordenada y llaves
  REIGNS_SCENARIOS_FULL[9],
];

// Default export is the full 10-phase journey
export const REIGNS_SCENARIOS: GameCard[] = REIGNS_SCENARIOS_FULL;

export function calculatePlayerProfile(
  history: { chosenOptionId: string; isPassivhausWay?: boolean }[],
  totalCount: number = 10
): PlayerProfile {
  const passivChoices = history.filter((h) => h.isPassivhausWay).length;
  const ratio = totalCount > 0 ? passivChoices / totalCount : 0;

  if (ratio >= 0.75) {
    return {
      title: 'Planificador con Visión (Oro Passivhaus)',
      tagline: '«Anticipar y coordinar en plano es el mayor ahorro de tu vida»',
      description:
        'Has conquistado todos los momentos clave de la autopromoción: revisaste la viabilidad de la parcela antes de comprometerte, preparaste el presupuesto global desglosado, blindaste el alcance en el purgatorio presupuestal, coordinaste el codiseño entre arquitecta y taller, integraste los cinco principios Passivhaus con cálculo PHPP, priorizaste el abrigo térmico sobre máquinas gigantes, valoraste el impacto antes de mover tabiques, montaste en seco protegido de la lluvia, estableciste un interlocutor técnico único y cerraste una entrega ordenada con documentación y garantías. ¡Tu hogar terminado tiene confort absoluto a 21°C, aire purificado y costes bajo control para los próximos 30 años!',
      badgeEmoji: '🏆',
    };
  }

  if (ratio >= 0.45) {
    return {
      title: 'Explorador Pragmático',
      tagline: '«Equilibrio entre aprendizaje real y sentido común»',
      description:
        'Has navegado las decisiones más delicadas de la autopromoción. Viviste en carne propia cómo un detalle sin coordinar, una reserva a ciegas o improvisar cambios en obra encarecen el proceso, y comprobaste por qué los cinco principios coordinados, el montaje en taller y la entrega documentada son indispensables para vivir tranquilo.',
      badgeEmoji: '🧭',
    };
  }

  return {
    title: 'Superviviente de la Obra',
    tagline: '«Has vivido la obra tradicional en su estado más puro»',
    description:
      'Experimentaste de primera mano qué ocurre cuando se reserva por unas vistas sin licencia, se compara con precios de portada o se confía la coordinación a un grupo de WhatsApp. La mejor noticia: aquí equivocarse no te cuesta una hipoteca. ¡Ahora sabes exactamente qué preguntar y exigir en tu proyecto real!',
    badgeEmoji: '🧱',
  };
}
