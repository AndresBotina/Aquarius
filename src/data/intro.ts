export interface Phase {
  text: string;
  /** ms to hold this phrase before transitioning to the next */
  duration: number;
  /** reveal the contact button while this phrase is shown */
  showContact?: boolean;
  /** hide the blinking cursor while this phrase is shown */
  hideCursor?: boolean;
}

export const PHASES: Phase[] = [
  { text: 'Hola, soy Andrés', duration: 1500, hideCursor: true },
  { text: 'Este sitio está en construcción', duration: 1500 },
  { text: 'Pero no te preocupes', duration: 1500 },
  { text: 'Puedes comunicarte conmigo', duration: 2000, hideCursor: true },
];

export const CONTACTS = [
  {
    href: 'https://wa.me/573227513539',
    label: 'WhatsApp',
    icon: 'whatsapp',
  },
  {
    href: 'mailto:cacbotina@gmail.com',
    label: 'Gmail',
    icon: 'gmail',
  },
  {
    href: 'https://github.com/AndresBotina',
    label: 'GitHub',
    icon: 'github',
  },
] as const;
