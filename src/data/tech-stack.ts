/**
 * Tech stack — se renderiza como un marquee de dos filas.
 *
 * `icon` es el slug de Simple Icons (https://simpleicons.org).
 * El componente lo consume vía https://cdn.simpleicons.org/{slug}/ffffff.
 * Si un slug no existe en Simple Icons, el componente muestra solo el nombre.
 */
export interface Tech {
  name: string;
  /** Slug de Simple Icons */
  icon: string;
}

export const TECH_STACK: Tech[] = [
  { name: 'Python',     icon: 'python'     },
  { name: 'FastAPI',    icon: 'fastapi'    },
  { name: 'LangChain',  icon: 'langchain'  },
  { name: 'Docker',     icon: 'docker'     },
  { name: 'Supabase',   icon: 'supabase'   },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'React',      icon: 'react'      },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Astro',      icon: 'astro'      },
  { name: 'n8n',        icon: 'n8n'        },
  { name: 'Qdrant',     icon: 'qdrant'     },
  { name: 'Twilio',     icon: 'twilio'     },
  { name: 'Node.js',    icon: 'nodedotjs'  },
  { name: 'Git',        icon: 'git'        },
];

/** Fila superior — primeras 7 tecnologías. */
export const ROW_1: Tech[] = TECH_STACK.slice(0, 7);

/** Fila inferior — últimas 7 tecnologías. */
export const ROW_2: Tech[] = TECH_STACK.slice(7);
