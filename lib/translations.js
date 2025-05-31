const translations = {
  // Navigation
  navigation: {
    es: [
      { name: 'Inicio', href: '/' },
      { name: 'Demo', href: '/#demo' },
      { name: 'Características', href: '/#features' },
      { name: 'Cómo funciona', href: '/como-funciona' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/preguntas-frecuentes' },
    ],
    en: [
      { name: 'Home', href: '/' },
      { name: 'Demo', href: '/#demo' },
      { name: 'Features', href: '/#features' },
      { name: 'How it works', href: '/como-funciona' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/preguntas-frecuentes' },
    ]
  },

  // Footer
  footer: {
    es: {
      copyright: '© {year} Maia. Todos los derechos reservados.',
      terms: 'Términos y condiciones',
      privacy: 'Política de privacidad'
    },
    en: {
      copyright: '© {year} Maia. All rights reserved.',
      terms: 'Terms and Conditions',
      privacy: 'Privacy Policy'
    }
  },

  // Metadata
  metadata: {
    es: {
      title: 'Maia - Transforma tus recorridos virtuales en inteligencia comercial',
      description: 'Maia transforma tus recorridos virtuales en herramientas de inteligencia comercial, ayudando a las empresas a tomar mejores decisiones basadas en datos.',
      keywords: ['maia', 'recorridos virtuales', 'inteligencia comercial', 'análisis de datos', 'realidad virtual'],
    },
    en: {
      title: 'Maia - Transform your virtual tours into business intelligence',
      description: 'Maia transforms your virtual tours into business intelligence tools, helping companies make better data-driven decisions.',
      keywords: ['maia', 'virtual tours', 'business intelligence', 'data analysis', 'virtual reality'],
    }
  },

  // Language Toggle
  languageToggle: {
    es: 'EN',
    en: 'ES'
  },

  // Accessibility
  accessibility: {
    es: {
      openMenu: 'Abrir menú principal',
      closeMenu: 'Cerrar menu', 
      linkedin: 'LinkedIn',
      email: 'Email',
      languageSwitch: 'Cambiar a inglés'
    },
    en: {
      openMenu: 'Open main menu',
      closeMenu: 'Close menu',
      linkedin: 'LinkedIn',
      email: 'Email',
      languageSwitch: 'Switch to Spanish'
    }
  },

  // Hero Component
  hero: {
    es: {
      heading: '¿Y si tus propiedades se vendieran <span>solas</span>?',
      description: 'Convierte tus recorridos virtuales en agentes de ventas inteligentes que capturan leads y generan conversiones.',
      cta: '¡Quiero probarlo!',
      demoTitle: 'Demo de Maia'
    },
    en: {
      heading: 'What if your properties could sell <span>themselves</span>?',
      description: 'Transform your virtual tours into intelligent sales agents that capture leads and generate conversions.',
      cta: 'I want to try it!',
      demoTitle: 'Maia Demo'
    }
  },

  // KeyValues Component
  keyValues: {
    es: {
      heading: 'Recorridos virtuales con IA que convierten <span>visitas en ventas</span>',
      description: 'Transformamos tus recorridos virtuales en experiencias interactivas guiadas por IA, donde los compradores pueden explorar proyectos sin depender de un ejecutivo.',
      ctaButton: 'Conoce cómo funciona',
      features: [
        {
          title: 'Agente AI en tus recorridos virtuales',
          description: 'Nuestro agente AI guía a tus potenciales clientes a través de los espacios, respondiendo a sus preguntas, aclarando dudas y destacando los atributos más relevantes según sus intereses.',
          benefits: [
            'Tours virtuales disponibles 24/7',
            'Interacción mediante lenguaje natural',
            'Personalización según intereses del cliente'
          ],
          imgAlt: 'Recorridos virtuales inteligentes'
        },
        {
          title: 'Captura de datos sin fricción',
          description: 'Captamos datos como nombre, RUT, correo e intereses a través de lenguaje natural, sin fricción y sin formularios. Transformamos visitas virtuales en leads calificados.',
          benefits: [
            'Conversación natural en lugar de formularios',
            'Mayor tasa de conversión de visitantes a leads',
            'Leads más calificados con mejor información'
          ],
          imgAlt: 'Captura inteligente de datos'
        },
        {
          title: 'Análisis de comportamiento',
          description: 'Analizamos el comportamiento completo dentro del recorrido: qué miró, cuánto tiempo estuvo, qué ignoró, qué preguntó. Esto te entrega información sobre intención de compra y nivel de interés.',
          benefits: [
            'Análisis de tiempo de permanencia',
            'Registro de preguntas y respuestas',
            'Insights sobre intención de compra'
          ],
          imgAlt: 'Análisis de comportamiento'
        }
      ]
    },
    en: {
      heading: 'AI-powered virtual tours that convert <span>visits into sales</span>',
      description: 'We transform your virtual tours into interactive experiences guided by AI, where buyers can explore projects without depending on a sales agent.',
      ctaButton: 'Learn how it works',
      features: [
        {
          title: 'AI Agent in your virtual tours',
          description: 'Our AI agent guides your potential clients through the spaces, answering their questions, clarifying doubts, and highlighting the most relevant attributes according to their interests.',
          benefits: [
            'Virtual tours available 24/7',
            'Natural language interaction',
            'Personalization based on client interests'
          ],
          imgAlt: 'Intelligent virtual tours'
        },
        {
          title: 'Frictionless data capture',
          description: 'We capture data such as name, ID, email, and interests through natural language, without friction and without forms. We transform virtual visits into qualified leads.',
          benefits: [
            'Natural conversation instead of forms',
            'Higher conversion rate from visitors to leads',
            'More qualified leads with better information'
          ],
          imgAlt: 'Intelligent data capture'
        },
        {
          title: 'Behavior analysis',
          description: 'We analyze the complete behavior within the tour: what they looked at, how long they stayed, what they ignored, what they asked. This gives you information about purchase intention and level of interest.',
          benefits: [
            'Dwell time analysis',
            'Record of questions and answers',
            'Insights on purchase intention'
          ],
          imgAlt: 'Behavior analysis'
        }
      ]
    }
  },

  // Partners Component
  partners: {
    es: {
      heading: 'Empresas que han confiado en nosotros'
    },
    en: {
      heading: 'Companies that have trusted us'
    }
  },

  // TrustedBy Component
  trustedBy: {
    es: {
      heading: 'Apoyados por'
    },
    en: {
      heading: 'Supported by'
    }
  },

  // FinalCTA Component
  finalCTA: {
    es: {
      heading: '¿Listo para transformar tus recorridos virtuales?',
      description: 'Convierte tus propiedades en máquinas de venta automáticas. Consigue más leads calificados y aumenta tus conversiones.',
      ctaButton: '¡Quiero probarlo!'
    },
    en: {
      heading: 'Ready to transform your virtual tours?',
      description: 'Convert your properties into automatic sales machines. Get more qualified leads and increase your conversions.',
      ctaButton: 'I want to try it!'
    }
  },

  // FAQ CTA Component
  faqCTA: {
    es: {
      heading: '¿Tienes dudas sobre Maia?',
      description: 'Revisa nuestra sección de preguntas frecuentes donde encontrarás respuestas a las consultas más comunes.',
      ctaButton: 'Preguntas Frecuentes'
    },
    en: {
      heading: 'Do you have questions about Maia?',
      description: 'Check our FAQ section where you will find answers to the most common queries.',
      ctaButton: 'Frequently Asked Questions'
    }
  },

  // Blog Section Component
  blogSection: {
    es: {
      heading: 'Novedades',
      description: 'Lee lo último de nuestro blog',
      categories: {
        realEstateTech: 'Tecnología inmobiliaria'
      },
      tags: {
        virtualTours: 'Recorridos virtuales'
      },
      readingTime: '{minutes} min de lectura',
      blogPosts: {
        renderVsVirtualTour: {
          title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
          description: 'Aprende cuándo utilizar cada tecnología y cómo maximizar tu retorno de inversión en marketing digital inmobiliario.'
        }
      }
    },
    en: {
      heading: 'News',
      description: 'Read the latest from our blog',
      categories: {
        realEstateTech: 'Real Estate Technology'
      },
      tags: {
        virtualTours: 'Virtual Tours'
      },
      readingTime: '{minutes} min read',
      blogPosts: {
        renderVsVirtualTour: {
          title: 'Render or tour? When to use each one to sell better',
          description: 'Learn when to use each technology and how to maximize your return on investment in real estate digital marketing.'
        }
      }
    }
  },

  // How It Works Page (como-funciona)
  howItWorks: {
    es: {
      title: '¿Cómo convertir tus reccorridos virtuales en <span class="text-primary-500 relative">máquinas de ventas<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>?',
      description: 'Te explicamos, paso a paso, cómo integrar nuestra agente AI que guía a los visitantes, capta sus datos y analiza su comportamiento para que vendas más sin mover un dedo.',
      processTitle: 'Así es el proceso de sumar a Maia a tu equipo comercial:',
      steps: [
        {
          title: 'Nos entregas las imágenes y documentación necesaria',
          description: 'Necesitamos las fotos o renders 360° y toda la información relevante. Maia será tan buena como la información que reciba.'
        },
        {
          title: 'Rehacemos el recorrido e integramos a Maia',
          description: 'Montamos el tour en nuestra plataforma e integramos la agente AI que guiará a los visitantes, responderá preguntas y destacará lo más relevante.'
        },
        {
          title: 'Defines qué datos quieres captar',
          description: 'RUT, nombre, correo, intereses… tú eliges. Nosotros lo capturamos de forma natural y sin fricción.'
        },
        {
          title: 'Publicas el recorrido donde quieras',
          description: 'En tu web, una landing, redes sociales o incluso WhatsApp. Donde tenga más impacto.'
        },
        {
          title: 'Los visitantes interactúan con Maia',
          description: 'Exploran la propiedad, hacen preguntas y obtienen respuestas en tiempo real. Como si hablaran con tu mejor vendedor.'
        },
        {
          title: 'Recibes leads enriquecidos con contexto y comportamiento',
          description: 'Te entregamos reportes con los datos clave e insights comerciales para que puedas cerrar más ventas.'
        }
      ],
      prevStep: 'Paso anterior',
      nextStep: 'Siguiente paso',
      whatMaiaCanDo: {
        title: '¿Qué puede hacer Maia?',
        features: [
          {
            title: 'Asistencia experta',
            description: 'Responde como un asesor experto en ventas, siempre disponible para tus clientes.'
          },
          {
            title: 'Recomendaciones inteligentes',
            description: 'Destaca atributos relevantes según el interés específico de cada visitante.'
          },
          {
            title: 'Enfoque visual',
            description: 'Destaca puntos clave del proyecto en cada vista del recorrido virtual.'
          },
          {
            title: 'Captura de datos natural',
            description: 'Captura datos sin fricción mediante conversaciones naturales y fluidas.'
          },
          {
            title: 'Análisis de comportamiento',
            description: 'Analiza el comportamiento de los visitantes dentro del recorrido virtual.'
          },
          {
            title: 'Insights comerciales',
            description: 'Detecta intereses, patrones y objeciones frecuentes para optimizar tu estrategia.'
          }
        ]
      },
      whyUseMaia: {
        title: '¿Por qué usar Maia?',
        comparison: {
          features: 'Características',
          withoutMaia: 'Sin Maia',
          withMaia: 'Con Maia',
          dataCapture: {
            title: 'Captura de datos',
            withoutMaia: {
              header: 'Formulario estático',
              detail: 'Alta fricción'
            },
            withMaia: {
              header: 'Conversación natural',
              detail: 'Sin fricción'
            }
          },
          information: {
            title: 'Información obtenida',
            withoutMaia: {
              header: 'Básica',
              detail: 'Solo datos de contacto'
            },
            withMaia: {
              header: 'Completa + comportamiento',
              detail: 'Datos + insights'
            }
          },
          userExperience: {
            title: 'Experiencia del usuario',
            withoutMaia: {
              header: 'Pasiva',
              detail: 'No personalizada'
            },
            withMaia: {
              header: 'Interactiva y personalizada',
              detail: 'Adaptada al visitante'
            }
          },
          conversion: {
            title: 'Conversión',
            withoutMaia: {
              header: 'Baja',
              detail: 'Alto abandono'
            },
            withMaia: {
              header: 'Alta',
              detail: 'Menos abandono'
            }
          },
          actionableInfo: {
            title: 'Información accionable',
            withoutMaia: {
              header: 'Limitada',
              detail: 'Solo datos básicos'
            },
            withMaia: {
              header: 'Insights concretos',
              detail: 'Inteligencia comercial'
            }
          }
        }
      },
      finalCTA: {
        title: '¿Listo para transformar tus recorridos virtuales?',
        description: 'Convierte tus propiedades en máquinas de venta automáticas. Consigue más leads calificados y aumenta tus conversiones.',
        button: '¡Quiero probarlo!'
      }
    },
    en: {
      title: 'How to convert your virtual tours into <span class="text-primary-500 relative">sales machines<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>?',
      description: 'We explain, step by step, how to integrate our AI agent that guides visitors, captures their data, and analyzes their behavior so you can sell more without lifting a finger.',
      processTitle: 'This is the process of adding Maia to your sales team:',
      steps: [
        {
          title: 'You provide the necessary images and documentation',
          description: 'We need 360° photos or renders and all relevant information. Maia will be as good as the information it receives.'
        },
        {
          title: 'We rebuild the tour and integrate Maia',
          description: 'We set up the tour on our platform and integrate the AI agent that will guide visitors, answer questions, and highlight the most relevant features.'
        },
        {
          title: 'You define what data you want to capture',
          description: 'ID, name, email, interests... you choose. We capture it naturally and without friction.'
        },
        {
          title: 'You publish the tour wherever you want',
          description: 'On your website, a landing page, social media, or even WhatsApp. Wherever it has the most impact.'
        },
        {
          title: 'Visitors interact with Maia',
          description: 'They explore the property, ask questions, and get real-time answers. As if they were talking to your best salesperson.'
        },
        {
          title: 'You receive leads enriched with context and behavior',
          description: 'We provide reports with key data and commercial insights so you can close more sales.'
        }
      ],
      prevStep: 'Previous step',
      nextStep: 'Next step',
      whatMaiaCanDo: {
        title: 'What can Maia do?',
        features: [
          {
            title: 'Expert assistance',
            description: 'Responds like an expert sales advisor, always available for your customers.'
          },
          {
            title: 'Smart recommendations',
            description: 'Highlights relevant attributes based on each visitor\'s specific interests.'
          },
          {
            title: 'Visual focus',
            description: 'Highlights key project features in each view of the virtual tour.'
          },
          {
            title: 'Natural data capture',
            description: 'Captures data without friction through natural and fluid conversations.'
          },
          {
            title: 'Behavior analysis',
            description: 'Analyzes visitor behavior within the virtual tour.'
          },
          {
            title: 'Commercial insights',
            description: 'Detects interests, patterns, and common objections to optimize your strategy.'
          }
        ]
      },
      whyUseMaia: {
        title: 'Why use Maia?',
        comparison: {
          features: 'Features',
          withoutMaia: 'Without Maia',
          withMaia: 'With Maia',
          dataCapture: {
            title: 'Data capture',
            withoutMaia: {
              header: 'Static form',
              detail: 'High friction'
            },
            withMaia: {
              header: 'Natural conversation',
              detail: 'No friction'
            }
          },
          information: {
            title: 'Information obtained',
            withoutMaia: {
              header: 'Basic',
              detail: 'Contact data only'
            },
            withMaia: {
              header: 'Complete + behavior',
              detail: 'Data + insights'
            }
          },
          userExperience: {
            title: 'User experience',
            withoutMaia: {
              header: 'Passive',
              detail: 'Not personalized'
            },
            withMaia: {
              header: 'Interactive and personalized',
              detail: 'Adapted to visitor'
            }
          },
          conversion: {
            title: 'Conversion',
            withoutMaia: {
              header: 'Low',
              detail: 'High abandonment'
            },
            withMaia: {
              header: 'High',
              detail: 'Less abandonment'
            }
          },
          actionableInfo: {
            title: 'Actionable information',
            withoutMaia: {
              header: 'Limited',
              detail: 'Only basic data'
            },
            withMaia: {
              header: 'Concrete insights',
              detail: 'Business intelligence'
            }
          }
        }
      },
      finalCTA: {
        title: 'Ready to transform your virtual tours?',
        description: 'Convert your properties into automatic sales machines. Get more qualified leads and increase your conversions.',
        button: 'I want to try it!'
      }
    }
  },

  // FAQ Page (preguntas-frecuentes)
  faq: {
    es: {
      title: 'Preguntas <span class="text-primary-500 relative">Frecuentes<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>',
      description: 'Todo lo que necesitas saber sobre cómo implementar Maia en tus proyectos',
      questions: [
        {
          question: '¿Qué pasa si no tengo un recorrido virtual?',
          answer: 'Podemos ayudarte a producir las imágenes 360 necesarias para crear tu recorrido virtual desde cero.'
        },
        {
          question: '¿Qué necesito entregar para comenzar?',
          answer: 'Las imágenes 360° de la propiedad (ya sean renders o fotos) y toda la información clave del proyecto: especificaciones técnicas, manuales de ventas, precios, formas de financiamiento, atributos diferenciadores, servicios y zonas aledañas, etc. Mientras más completa sea la información, mejor será la experiencia que Maia podrá ofrecer.'
        },
        {
          question: '¿Cuánto se demora la integración?',
          answer: 'Alrededor de una semana desde que recibimos las imágenes e información completa del proyecto.'
        },
        {
          question: '¿Qué datos puede captar Maia?',
          answer: 'Nombre, correo, RUT, intereses específicos, preguntas frecuentes y comportamiento detallado dentro del recorrido, incluyendo zonas de mayor interés y tiempo de permanencia.'
        },
        {
          question: '¿Maia reemplaza al formulario tradicional?',
          answer: 'Sí. Maia captura más información, de forma más fluida y natural mediante conversación, eliminando los puntos de fuga típicos de los formularios tradicionales.'
        },
        {
          question: '¿Cómo se entregan los leads?',
          answer: 'Nos adaptamos a lo que más te convenga: correo electrónico, archivo compartido o cualquier otra vía que funcione mejor para tu equipo comercial. Estamos trabajando en la integración con CRMs.'
        },
        {
          question: '¿Cuándo se entregan los leads?',
          answer: 'Tú eliges la frecuencia: diaria, semanal, mensual o personalizada.'
        },
        {
          question: '¿Puedo usar Maia en varios proyectos a la vez?',
          answer: 'Sí. Puedes tener todas las propiedades que quieras activas simultáneamente, cada una con su configuración personalizada.'
        },
        {
          question: '¿Tienen integración con CRMs?',
          answer: 'Estamos trabajando en eso, ¡cuéntanos cuál usas y podremos avanzar más rápido!'
        },
        {
          question: '¿Ofrecen otros servicios asociados, cómo sitios web o renders?',
          answer: 'Por supuesto, podemos ayudarte a desarrollar todo para potenciar tus recorridos y sitios al máximo, escríbenos y conversemos.'
        }
      ]
    },
    en: {
      title: 'Frequently Asked <span class="text-primary-500 relative">Questions<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>',
      description: 'Everything you need to know about implementing Maia in your projects',
      questions: [
        {
          question: 'What if I don\'t have a virtual tour?',
          answer: 'We can help you produce the 360° images needed to create your virtual tour from scratch.'
        },
        {
          question: 'What do I need to provide to get started?',
          answer: 'The 360° images of the property (either renders or photos) and all the key information about the project: technical specifications, sales manuals, prices, financing options, differentiating attributes, services, and surrounding areas, etc. The more complete the information, the better the experience Maia will be able to offer.'
        },
        {
          question: 'How long does the integration take?',
          answer: 'About a week from when we receive the complete images and information for the project.'
        },
        {
          question: 'What data can Maia capture?',
          answer: 'Name, email, ID, specific interests, frequently asked questions, and detailed behavior within the tour, including areas of most interest and dwell time.'
        },
        {
          question: 'Does Maia replace the traditional form?',
          answer: 'Yes. Maia captures more information, in a more fluid and natural way through conversation, eliminating the typical dropout points of traditional forms.'
        },
        {
          question: 'How are leads delivered?',
          answer: 'We adapt to what works best for you: email, shared file, or any other method that works better for your sales team. We are working on integration with CRMs.'
        },
        {
          question: 'When are leads delivered?',
          answer: 'You choose the frequency: daily, weekly, monthly, or custom.'
        },
        {
          question: 'Can I use Maia on multiple projects at once?',
          answer: 'Yes. You can have as many properties active simultaneously as you want, each with its own custom configuration.'
        },
        {
          question: 'Do you have CRM integration?',
          answer: 'We are working on it. Tell us which one you use and we can move faster!'
        },
        {
          question: 'Do you offer other associated services, such as websites or renders?',
          answer: 'Absolutely, we can help you develop everything to maximize your tours and sites, write to us and let\'s talk.'
        }
      ]
    }
  },

  // Blog Page
  blog: {
    es: {
      title: 'Blog de <span class="text-primary-500 relative">Maia<span class="absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10"></span></span>',
      description: '¿Tienes propiedades para vender?<br />Esto te puede ayudar. Cada miércoles, sin falta.',
      author: 'Maia',
      posts: [
        {
          slug: 'render-vs-recorrido-virtual',
          title: '¿Render o recorrido? Cuándo conviene usar cada uno para vender mejor',
          excerpt: 'Los renders son ideales para destacar atributos visuales en etapas tempranas, mientras que los recorridos virtuales son más efectivos cuando se quiere generar conexión emocional y captar leads calificados.',
          date: 'Mayo 2025'
        }
      ]
    },
    en: {
      title: "Maia's <span class='text-primary-500 relative'>Blog<span class='absolute bottom-1 left-0 w-full h-2 bg-secondary-200 opacity-50 -z-10'></span></span>",
      description: 'Do you have properties to sell?<br />This can help you. Every Wednesday, without fail.',
      author: 'Maia',
      posts: [
        {
          slug: 'render-vs-recorrido-virtual',
          title: 'Render or tour? When to use each one to sell better',
          excerpt: 'Renders are ideal for highlighting visual attributes in early stages, while virtual tours are more effective when you want to generate an emotional connection and capture qualified leads.',
          date: 'May 2025'
        }
      ]
    }
  }
};

export default translations; 