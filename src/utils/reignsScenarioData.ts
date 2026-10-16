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
    name: 'Carlos',
    role: 'Empresa Constructora',
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
};

export const REIGNS_SCENARIOS: GameCard[] = [
  // NIVEL 1: La parcela
  {
    id: 'card-level-1',
    level: 1,
    sceneTitle: 'Nivel 1: La Parcela',
    character: CHARACTERS.partner,
    messageType: 'chat',
    prompt: '«La parcela nos encanta y tiene unas vistas increíbles. Dicen que hay otra pareja interesada. ¿Hacemos la transferencia de reserva ya mismo?»',
    detailContext: 'Ubicación prometedora de 550 m², pero aún no has consultado la normativa municipal ni el tipo de suelo.',
    leftChoice: {
      id: 'L1_IMPULSO',
      label: 'Reservar por impulso',
      subtext: 'Asegurar el terreno antes de que se lo lleven',
      deltaPresupuesto: -4500, // Imprevisto de cimentación por no mirar
      deltaSemanas: 6, // Retrasos en licencia
      deltaEstres: 25,
      deltaFactura: 0,
      consequenceText: 'Reservaste sin mirar la ficha urbanística. Meses después descubres una servidumbre de paso y roca dura que encarece la cimentación.',
      partnerReaction: '«Oye... el técnico municipal dice que hay que retranquearse 5 metros más de lo que creíamos. ¿Eso qué significa para los metros útiles?»',
      technicalTip: {
        warning: 'Has reservado sin consultar la cédula urbanística ni la pendiente real.',
        advice: 'Antes de entregar una señal, solicita siempre la ficha urbanística municipal y un estudio geotécnico preliminar.',
        quote: '«Comprar una parcela solo por las vistas es como comprar un coche solo por el color de la tapicería».',
      },
      parallelOutcome: {
        title: 'Si hubieses revisado la información técnica antes:',
        budgetResult: '0 € en sobrecostes de cimentación y zanjas.',
        weeksResult: '6 semanas ganadas al tramitar la licencia con datos exactos.',
        narrative: 'Habrías detectado los retranqueos antes de pagar, ajustando la orientación bioclimática hacia el sur desde el primer croquis.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L1_TECNICA',
      label: 'Revisar información técnica',
      subtext: 'Verificar normativa, orientación y subsuelo',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Revisas la cédula urbanística y la orientación solar. Todo encaja perfectamente para aprovechar la radiación pasiva del invierno.',
      partnerReaction: '«Menos mal que pediste la ficha urbanística: pudimos negociar 6.000 € de rebaja al detectar la pendiente».',
      parallelOutcome: {
        title: 'Si hubieses reservado por impulso:',
        budgetResult: '+4.500 € en imprevistos de picado de roca.',
        weeksResult: '+6 semanas de retraso por trámites municipales.',
        narrative: 'Habrías tenido que rehacer la implantación tras descubrir que la línea de fachada no coincidía con lo que dijo el comercial.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
  },

  // CARTA DE IMPREVISTO 1: Entre nivel 1 y 2
  {
    id: 'card-surprise-1',
    level: 1,
    sceneTitle: '🎴 Carta de Imprevisto: La vida también juega',
    character: CHARACTERS.partner,
    messageType: 'surprise',
    prompt: '«Cambio de planes: en mi empresa han aprobado el teletrabajo permanente. Necesitamos que una estancia sirva como despacho luminoso con silencio acústico».',
    detailContext: 'Un requerimiento nuevo cuando el proyecto está empezando a dibujarse.',
    leftChoice: {
      id: 'S1_METROS_EXTRA',
      label: 'Añadir 20 m² más',
      subtext: 'Hacer la casa más grande sobre la marcha',
      deltaPresupuesto: -24000,
      deltaSemanas: 4,
      deltaEstres: 20,
      deltaFactura: 15,
      consequenceText: 'Ampliar metros brutos dispara el coste de estructura y la hipoteca, aumentando además el volumen a climatizar para siempre.',
      partnerReaction: '«El banco nos pide avalistas para ampliar el préstamo por los metros extra... me está dando un poco de vértigo».',
      technicalTip: {
        warning: 'Ampliar metros no siempre es la solución a nuevas necesidades funcionales.',
        advice: 'El diseño arquitectónico inteligente optimiza circulaciones y crea espacios polivalentes sin inflar los m² construidos.',
        quote: '«Los metros cuadrados que no construyes son los más baratos de calentar y limpiar».',
      },
      parallelOutcome: {
        title: 'Si hubieses adaptado el modelo BIM flexiblemente:',
        budgetResult: '24.000 € ahorrados en hipoteca.',
        weeksResult: '0 semanas perdidas en replanteos estructurales.',
        narrative: 'Habrías resuelto el despacho con un tabique móvil acústico en madera y carpintería con triple vidrio aislante.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'S1_DISENO_FLEXIBLE',
      label: 'Adaptar el modelo BIM',
      subtext: 'Espacio polivalente sin inflar metros',
      deltaPresupuesto: 0,
      deltaSemanas: 0,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Elena ajusta la distribución en el modelo 3D: un dormitorio se convierte en estancia dual con aislamiento acústico reforzado.',
      partnerReaction: '«¡Me encanta! Es super luminoso y no hemos tenido que pedir más hipoteca al banco».',
      parallelOutcome: {
        title: 'Si hubieses añadido 20 m² sobre la marcha:',
        budgetResult: '+24.000 € de sobrecoste directo en obra.',
        weeksResult: '+4 semanas de recálculo estructural.',
        narrative: 'Habrías tenido que recortar en calidades de carpintería para compensar el gasto de los metros añadidos.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 2,
    isSurpriseCard: true,
  },

  // NIVEL 2: El diseño
  {
    id: 'card-level-2',
    level: 2,
    sceneTitle: 'Nivel 2: El Diseño',
    character: CHARACTERS.architect,
    messageType: 'in_person',
    prompt: '«Hemos cerrado la distribución de la vivienda. Si queréis ajustar tabiques o ventanas, este es el momento de congelar el gemelo digital antes de fabricar».',
    detailContext: 'Las modificaciones sobre plano cuestan 0 €; las modificaciones una vez empezada la obra cuestan miles.',
    leftChoice: {
      id: 'L2_SOBRE_LA_MARCHA',
      label: 'Verlo sobre la marcha',
      subtext: 'Decidir tabiques cuando estemos dentro',
      deltaPresupuesto: -9500,
      deltaSemanas: 5,
      deltaEstres: 20,
      deltaFactura: 10,
      consequenceText: 'Mover una pared cuando los tubos ya están tirados supone demoler, rozar de nuevo y generar desajustes entre fontanero y albañil.',
      partnerReaction: '«El jefe de obra nos ha pasado una factura de 3.200 € solo por desplazar el tabique del baño 40 centímetros...»',
      technicalTip: {
        warning: 'El "ya lo iremos viendo en obra" es la partida más cara de cualquier presupuesto.',
        advice: 'En la edificación industrializada, el modelo BIM se congela al 100% antes de cortar la madera con CNC en planta.',
        quote: '«Una línea borrada en el ordenador cuesta dos segundos; una pared derribada en obra cuesta dos semanas».',
      },
      parallelOutcome: {
        title: 'Si hubieses cerrado el diseño coordinado:',
        budgetResult: '9.500 € ahorrados en demoliciones y rozas.',
        weeksResult: '5 semanas de adelanto en la fabricación.',
        narrative: 'Los pasamuros y la estructura habrían salido de fábrica ya mecanizados al milímetro.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L2_CONGELAR_BIM',
      label: 'Cerrar versión coordinada',
      subtext: 'Definir todo en modelo 3D antes de fabricar',
      deltaPresupuesto: 0,
      deltaSemanas: 2,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Congelas el proyecto completo: estructura, pasos de instalaciones y envolvente. La fábrica ya puede ordenar las maderas certificadas.',
      partnerReaction: '«Ver la casa en el visor 3D nos dio muchísima seguridad. Sabemos exactamente qué vamos a recibir».',
      parallelOutcome: {
        title: 'Si hubieses dejado cambios para la obra in situ:',
        budgetResult: '+9.500 € en partidas adicionales y replanteos.',
        weeksResult: '+5 semanas de parón por falta de planos claros.',
        narrative: 'Habrías tenido que discutir con el instalador sobre por dónde pasar los tubos de ventilación.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // NIVEL 3: El contrato
  {
    id: 'card-level-3',
    level: 3,
    sceneTitle: 'Nivel 3: El Contrato',
    character: CHARACTERS.builder,
    messageType: 'chat',
    prompt: '«Tengo mi presupuesto listo: sale 25.000 € más barato que la casa industrializada. Incluye lo habitual; lo que vaya saliendo de cimentación lo vemos sobre la marcha».',
    detailContext: 'Un presupuesto tradicional atractivo a simple vista pero con partidas abiertas y sin penalización por retrasos.',
    leftChoice: {
      id: 'L3_OFERTA_BARATA',
      label: 'Elegir la oferta más barata',
      subtext: 'Ahorrar 25.000 € en el contrato inicial',
      deltaPresupuesto: -32000, // Termina saliendo más caro
      deltaSemanas: 12,
      deltaEstres: 35,
      deltaFactura: 45,
      consequenceText: 'El presupuesto barato tenía partidas alzadas: la cimentación subió un 40%, el aislamiento era básico y el constructor tardó 14 meses más.',
      partnerReaction: '«Una pregunta: ¿la impermeabilización y la grúa estaban incluidas o estaban en nuestra imaginación? Porque nos piden 14.000 € más».',
      technicalTip: {
        warning: 'Has firmado una oferta con partidas sin definir y precios a liquidar.',
        advice: 'Antes de comparar importes, revisa el pliego de condiciones, exclusiones y que el precio sea cerrado con fecha fija notarial.',
        quote: '«El "ya lo veremos" es un acabado que nunca viene incluido en el presupuesto pero siempre aparece en la factura final».',
      },
      parallelOutcome: {
        title: 'Si hubieses elegido contrato cerrado de catálogo:',
        budgetResult: '32.000 € de desvío evitados por completo.',
        weeksResult: '3 meses de alquiler puente ahorrados.',
        narrative: 'Habrías firmado con penalización por día de retraso y con todos los ensayos Passivhaus garantizados.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L3_CONTRATO_CERRADO',
      label: 'Contrato cerrado llave en mano',
      subtext: 'Precio fijo, alcance completo y plazo notarial',
      deltaPresupuesto: 0,
      deltaSemanas: 6,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText: 'Firmas contrato llave en mano de catálogo en madera técnica. El precio queda blindado ante notario y la entrega programada para primavera.',
      partnerReaction: '«Qué tranquilidad saber que cada céntimo está cerrado y que el banco ha aprobado la hipoteca en la primera revisión».',
      parallelOutcome: {
        title: 'Si hubieses aceptado la oferta abierta tradicional:',
        budgetResult: '+32.000 € en sobrecostes y precios contradictorios.',
        weeksResult: '+12 semanas pagando alquiler e hipoteca a la vez.',
        narrative: 'Habrías sufrido la clásica llamada del constructor diciendo que el acero y el hormigón han subido de precio.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 3,
  },

  // CARTA DE IMPREVISTO 2: Entre nivel 3 y 4
  {
    id: 'card-surprise-2',
    level: 3,
    sceneTitle: '🎴 Carta de Imprevisto: La vida también juega',
    character: CHARACTERS.advisor,
    messageType: 'surprise',
    prompt: '«En fábrica me preguntan por la orientación del porche: podemos incorporar una pérgola bioclimática que bloqueará el sol en agosto y lo dejará entrar en enero».',
    detailContext: 'Una decisión de física del edificio que afecta al consumo de energía durante los próximos 30 años.',
    leftChoice: {
      id: 'S2_QUITAR_PERGOLA',
      label: 'Prescindir de la pérgola',
      subtext: 'Ahorrar hoy ese detalle arquitectónico',
      deltaPresupuesto: 0,
      deltaSemanas: 0,
      deltaEstres: 10,
      deltaFactura: 35, // Factura en verano subirá por aire acondicionado
      consequenceText: 'En verano los ventanales se convierten en un horno: la radiación solar directa sobrecalienta el salón y obliga a encender el split al máximo.',
      partnerReaction: '«Uff, son las 6 de la tarde y en el salón hace 28°C porque no hay sombra sobre los cristales. Tenemos que poner toldos ya».',
      technicalTip: {
        warning: 'Ahorrar en protecciones solares pasivas traslada el coste a la factura eléctrica.',
        advice: 'Un alero o pérgola bioclimática calculada bloquea el ángulo solar alto de verano sin tapar el sol bajo de invierno.',
        quote: '«La mejor energía es la sombra que no consume electricidad».',
      },
      parallelOutcome: {
        title: 'Si hubieses incluido la protección solar bioclimática:',
        budgetResult: 'Confort de 21°C permanente sin picos de aire acondicionado.',
        weeksResult: '0 modificaciones posteriores con toldos postizos.',
        narrative: 'La casa habría regulado su temperatura de forma natural gracias al cálculo solar del proyecto.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'S2_INCLUIR_PERGOLA',
      label: 'Integrar pérgola bioclimática',
      subtext: 'Protección solar pasiva calculada',
      deltaPresupuesto: -2500,
      deltaSemanas: 0,
      deltaEstres: -5,
      deltaFactura: -10, // Ahorro en refrigeración
      consequenceText: 'La pérgola se integra en la estructura de madera en fábrica. En verano el porche proyecta sombra fresca y en invierno deja pasar el calor.',
      partnerReaction: '«Qué acierto la pérgola: el porche es el rincón más bonito de la casa y el salón está fresquísimo sin encender nada».',
      parallelOutcome: {
        title: 'Si hubieses prescindido de la pérgola:',
        budgetResult: '+35 €/mes en consumo de climatización en verano.',
        weeksResult: 'Disconfort térmico en olas de calor.',
        narrative: 'Habrías tenido que vivir con las persianas bajadas a media tarde para no asarte en el salón.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
    isSurpriseCard: true,
  },

  // NIVEL 4: La construcción
  {
    id: 'card-level-4',
    level: 4,
    sceneTitle: 'Nivel 4: La Construcción',
    character: CHARACTERS.advisor,
    messageType: 'in_person',
    prompt: '«Llegan las carpinterías exteriores. El instalador convencional dice que con un bote de espuma de poliuretano rápida sobra y que las cintas herméticas son una exageración».',
    detailContext: 'Un punto crítico: la unión entre la ventana y el muro representa el 60% de las patologías de condensación y moho en casas convencionales.',
    leftChoice: {
      id: 'L4_ESPUMA_RAPIDA',
      label: 'Aceptar la espuma rápida',
      subtext: 'Ahorrar tiempo y no complicar al operario',
      deltaPresupuesto: -7500,
      deltaSemanas: 2,
      deltaEstres: 30,
      deltaFactura: 65,
      consequenceText: 'La espuma rígida se cuartea con las dilataciones. En invierno entra un silbido de aire frío y en las esquinas del marco aparece moho negro.',
      partnerReaction: '«Álex me dice que la pared de la habitación está helada y que la cortina se mueve con el viento aunque la ventana esté cerrada...»',
      technicalTip: {
        warning: 'Has roto la capa hermética de la envolvente.',
        advice: 'El estándar Passivhaus exige cintas elásticas continuas (Siga/ProClima) que garantizan estanqueidad al aire duradera y transpirabilidad al vapor.',
        quote: '«Una ventana de 2.000 € instalada sin cintas de estanqueidad funciona como una ventana de 200 € abierta dos dedos».',
      },
      parallelOutcome: {
        title: 'Si hubieses exigido el sellado Passivhaus:',
        budgetResult: '0 € en tratamientos antihumedad y pinturas especiales.',
        weeksResult: 'Silencio acústico total frente al viento exterior.',
        narrative: 'Habrías superado el test Blower Door con nota sobresaliente y facturas mínimas.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L4_SELLADO_PASSIVHAUS',
      label: 'Exigir sellado hermético certificado',
      subtext: 'Cintas elásticas continuas y triple vidrio',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -5,
      deltaFactura: 0,
      consequenceText: 'Se colocan cintas herméticas perimetrales y carpinterías con triple vidrio. El test Blower Door marca n50 = 0,42 ren/h (matrícula Passivhaus).',
      partnerReaction: '«El técnico del Blower Door se ha quedado impresionado: ha presurizado a 50 Pa y no entra ni un hilo de aire por ningún lado».',
      parallelOutcome: {
        title: 'Si hubieses aceptado la espuma convencional sin cintas:',
        budgetResult: '+7.500 € en parches y condensaciones.',
        weeksResult: '+65 €/mes en calefacción por corrientes parásitas.',
        narrative: 'Habrías tenido que soportar corrientes de aire frío y manchas de condensación en invierno.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 4,
  },

  // NIVEL 5: La entrega
  {
    id: 'card-level-5',
    level: 5,
    sceneTitle: 'Nivel 5: La Entrega',
    character: CHARACTERS.advisor,
    messageType: 'in_person',
    prompt: '«La casa parece lista para entrar a vivir. Toca el acta de recepción: ¿Firmamos y recogemos las llaves o repasamos la lista de comprobaciones y certificados previstos?»',
    detailContext: 'El momento más emocionante del proyecto, pero también donde se cierran las garantías contractuales.',
    leftChoice: {
      id: 'L5_ENTRAR_YA',
      label: 'Recibir las llaves sin más',
      subtext: 'Mudarse de inmediato sin repasar la lista',
      deltaPresupuesto: -6000,
      deltaSemanas: 0,
      deltaEstres: 20,
      deltaFactura: 20,
      consequenceText: 'Te mudas con prisas. A las dos semanas descubres que el recuperador de calor de la VMC no estaba calibrado y los caudales no ventilan bien.',
      partnerReaction: '«El extractor hace un zumbido raro y la constructora dice que como ya firmamos el fin de obra sin reservas, tardarán 3 semanas en venir».',
      technicalTip: {
        warning: 'Firmar el acta de recepción sin comprobaciones previas debilita tu posición legal.',
        advice: 'Exige siempre el equilibrado de la VMC, el certificado final Blower Door y la entrega del libro del edificio con todas las garantías.',
        quote: '«La emoción de la mudanza no debe nublar la firma del acta más importante de tu vida».',
      },
      parallelOutcome: {
        title: 'Si hubieses comprobado las verificaciones previstas:',
        budgetResult: 'Puesta en marcha impecable sin costes imprevistos.',
        weeksResult: 'Garantía notarial de 10 años formalizada.',
        narrative: 'La VMC habría quedado calibrada al milímetro con filtros F7 listos para funcionar en silencio.',
      },
      isPassivhausWay: false,
    },
    rightChoice: {
      id: 'L5_VERIFICAR_PROTOCOLOS',
      label: 'Comprobar verificaciones previstas',
      subtext: 'Revisar certificados, VMC y libro del edificio',
      deltaPresupuesto: 0,
      deltaSemanas: 1,
      deltaEstres: -10,
      deltaFactura: 0,
      consequenceText: 'Revisas el protocolo completo: caudal de la VMC equilibrado, Blower Door certificado, certificado Passivhaus entregado y garantías selladas.',
      partnerReaction: '«Todo verificado y perfecto. ¡Estamos listos para la mudanza y las llaves son oficialmente nuestras!»',
      parallelOutcome: {
        title: 'Si hubieses firmado a ciegas por las prisas:',
        budgetResult: '+6.000 € en ajustes de instalaciones posteriores.',
        weeksResult: 'Semanas de llamadas a instaladores que ya estaban en otra obra.',
        narrative: 'Habrías tenido que pelear por la calibración de la máquina de ventilación cuando ya estabas viviendo dentro.',
      },
      isPassivhausWay: true,
    },
    houseStageAfter: 5,
  },
];

export function calculatePlayerProfile(history: { chosenOptionId: string; isPassivhausWay?: boolean }[]): PlayerProfile {
  const passivChoices = history.filter((h) => h.isPassivhausWay).length;

  if (passivChoices >= 4) {
    return {
      title: 'Planificador con Visión',
      tagline: '«Anticipar en plano es el mayor ahorro de tu vida»',
      description: 'Has entendido que el valor de una casa no está en improvisar en el barro, sino en blindar contratos, cuidar la física de la envolvente y disfrutar de 30 años de confort y salud con facturas mínimas.',
      badgeEmoji: '🏆',
    };
  }

  if (passivChoices >= 2) {
    return {
      title: 'Explorador de Posibilidades',
      tagline: '«Equilibrio entre prudencia y aprendizaje sobre la marcha»',
      description: 'Has explorado opciones y tomado decisiones pragmáticas. Detectaste algunos riesgos a tiempo y comprobaste por qué la estanqueidad y la certeza contractual marcan la diferencia en el presupuesto final.',
      badgeEmoji: '🧭',
    };
  }

  return {
    title: 'Improvisador Valiente',
    tagline: '«Has vivido la obra real en tus propias carnes»',
    description: 'Comprobaste de primera mano qué pasa cuando se aceptan presupuestos con partidas abiertas o se recortan detalles como las cintas de estanqueidad. La buena noticia: ¡en la vida real puedes elegir el modelo de catálogo antes de poner un solo euro!',
    badgeEmoji: '🧱',
  };
}
