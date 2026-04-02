import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ChatAdapter } from './chat-adapter';
import { ChatQuickReply, ChatReply, ChatReplyDraft, ChatRequest } from './chat.models';

@Injectable({
  providedIn: 'root'
})
export class LocalFaqChatAdapter implements ChatAdapter {
  readonly adapterName = 'local-faq';

  private readonly defaultQuickReplies: ChatQuickReply[] = [
    { id: 'quote', label: 'Quiero una cotización', action: 'message', payload: 'Quiero una cotización' },
    { id: 'services', label: 'Ver servicios', action: 'navigate-services', payload: 'Ver servicios' },
    { id: 'works', label: 'Ver trabajos', action: 'navigate-works', payload: 'Ver trabajos' },
    { id: 'whatsapp', label: 'Hablar por WhatsApp', action: 'whatsapp', payload: 'Hablar por WhatsApp' }
  ];

  getWelcomeMessages(): ChatReplyDraft[] {
    return [
      {
        sender: 'bot',
        text: 'Hola. Soy el asistente del portafolio y puedo ayudarte con servicios web, tiempos estimados, SEO, mantenimiento y trabajos recientes.'
      },
      {
        sender: 'bot',
        text: 'Si quieres, también puedo capturar tus datos básicos para continuar la conversación por WhatsApp.',
        quickReplies: this.defaultQuickReplies
      }
    ];
  }

  getDefaultQuickReplies(): ChatQuickReply[] {
    return this.defaultQuickReplies;
  }

  respond(request: ChatRequest): Observable<ChatReply> {
    const text = this.normalize(request.message);
    const reply = this.buildReply(text);

    return of(reply).pipe(delay(650));
  }

  private buildReply(text: string): ChatReply {
    if (this.matchesAny(text, ['cotizacion', 'cotizar', 'presupuesto', 'precio'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'Claro. Para orientarte mejor puedo tomar tres datos rápidos y dejarte listo el salto a WhatsApp.'
          },
          {
            sender: 'bot',
            text: 'Empecemos por tu nombre.',
            quickReplies: this.defaultQuickReplies
          }
        ],
        askForLeadField: 'name'
      };
    }

    if (this.matchesAny(text, ['servicios', 'servicio', 'web', 'pagina'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'Trabajo en diseño web, responsive design, SEO, mantenimiento, sitios autoadministrables y apoyo en marketing digital.'
          },
          {
            sender: 'bot',
            text: 'Si quieres, puedo llevarte directo a la sección de servicios o ayudarte a cotizar.',
            quickReplies: this.defaultQuickReplies
          }
        ]
      };
    }

    if (this.matchesAny(text, ['responsive', 'movil', 'mobile', 'tablet'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'Sí. Cada proyecto se plantea para verse sólido en celular, tablet y desktop, cuidando jerarquía visual, lectura y velocidad.'
          },
          {
            sender: 'bot',
            text: 'Eso ayuda tanto a la experiencia del usuario como al rendimiento general del sitio.',
            quickReplies: this.defaultQuickReplies
          }
        ]
      };
    }

    if (this.matchesAny(text, ['mantenimiento', 'soporte', 'actualizaciones'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'También se puede trabajar mantenimiento continuo: ajustes, nuevas secciones, correcciones, optimización y seguimiento.'
          },
          {
            sender: 'bot',
            text: 'Es una buena opción para negocios que necesitan evolucionar el sitio sin rehacerlo desde cero.',
            quickReplies: this.defaultQuickReplies
          }
        ]
      };
    }

    if (this.matchesAny(text, ['seo', 'google', 'posicionamiento', 'buscadores'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'Se aplican bases de SEO técnico y estructura de contenido: jerarquía semántica, rendimiento, metadata y claridad de navegación.'
          },
          {
            sender: 'bot',
            text: 'Eso deja el sitio mejor preparado para buscadores y campañas de adquisición.',
            quickReplies: this.defaultQuickReplies
          }
        ]
      };
    }

    if (this.matchesAny(text, ['trabajos', 'proyectos', 'portafolio', 'hsbc'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'En el portafolio ya puedes revisar proyectos destacados, incluido el sitio de Promociones HSBC como caso real de experiencia visual y navegación por campañas.'
          },
          {
            sender: 'bot',
            text: 'Si quieres, puedo llevarte a la sección de trabajos o abrir el enlace del proyecto desde la vista previa.',
            quickReplies: this.defaultQuickReplies
          }
        ]
      };
    }

    if (this.matchesAny(text, ['tiempo', 'tiempos', 'entrega', 'duracion'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'Los tiempos varían según alcance, contenido y validaciones, pero una landing suele resolverse en pocos días y un sitio más amplio requiere una planeación mayor.'
          },
          {
            sender: 'bot',
            text: 'Si me cuentas tu necesidad, te sugiero un rango estimado más útil.',
            quickReplies: this.defaultQuickReplies
          }
        ]
      };
    }

    if (this.matchesAny(text, ['contacto', 'whatsapp', 'hablar', 'llamar'])) {
      return {
        messages: [
          {
            sender: 'bot',
            text: 'Perfecto. Puedes continuar por WhatsApp cuando quieras, y si antes me compartes tu nombre, negocio y necesidad, llegarás con el contexto listo.'
          },
          {
            sender: 'bot',
            text: 'Si quieres arrancar ya con esa mini captura, te pido primero tu nombre.',
            quickReplies: this.defaultQuickReplies
          }
        ],
        askForLeadField: 'name'
      };
    }

    return {
      messages: [
        {
          sender: 'bot',
          text: 'Puedo ayudarte con servicios web, diseño responsive, mantenimiento, SEO, tiempos estimados, cotizaciones, contacto y trabajos realizados.'
        },
        {
          sender: 'bot',
          text: 'Dime qué necesitas y te respondo con una guía rápida.',
          quickReplies: this.defaultQuickReplies
        }
      ]
    };
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private matchesAny(text: string, terms: string[]): boolean {
    return terms.some((term) => text.includes(term));
  }
}
