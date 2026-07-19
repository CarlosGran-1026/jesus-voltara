export const categories = [
  {
    slug: 'fe',
    name: 'Fé',
    icon: '✦',
    description: 'Confiar naquilo que ainda não se vê.',
  },
  {
    slug: 'gratidao',
    name: 'Gratidão',
    icon: '❋',
    description: 'Reconhecer o bem em cada estação da vida.',
  },
  {
    slug: 'perseveranca',
    name: 'Perseverança',
    icon: '⟡',
    description: 'Persistir quando o caminho é longo.',
  },
  {
    slug: 'familia',
    name: 'Família',
    icon: '⌂',
    description: 'O lar como lugar de cuidado e aliança.',
  },
  {
    slug: 'paz',
    name: 'Paz',
    icon: '☾',
    description: 'Descanso para o coração inquieto.',
  },
  {
    slug: 'esperanca',
    name: 'Esperança',
    icon: '✵',
    description: 'Uma certeza que sustenta em meio à espera.',
  },
  {
    slug: 'amor',
    name: 'Amor',
    icon: '♥',
    description: 'O que move e dá sentido a tudo o mais.',
  },
  {
    slug: 'superacao',
    name: 'Superação',
    icon: '↑',
    description: 'Forças renovadas para seguir adiante.',
  },
  {
    slug: 'sabedoria',
    name: 'Sabedoria',
    icon: '❖',
    description: 'Discernimento para viver com propósito.',
  },
  {
    slug: 'confianca',
    name: 'Confiança',
    icon: '⚓',
    description: 'Entregar o caminho a quem já o conhece.',
  },
  {
    slug: 'perdao',
    name: 'Perdão',
    icon: '↺',
    description: 'Soltar o que pesa, para viver mais leve.',
  },
  {
    slug: 'alegria',
    name: 'Alegria',
    icon: '☼',
    description: 'Um contentamento que não depende das circunstâncias.',
  },
  {
    slug: 'oracao',
    name: 'Oração',
    icon: '✝',
    description: 'Conversar com Deus como quem fala com um Pai.',
  },
  {
    slug: 'coragem',
    name: 'Coragem',
    icon: '⚡',
    description: 'Força para agir mesmo com medo.',
  },
  {
    slug: 'generosidade',
    name: 'Generosidade',
    icon: '✤',
    description: 'Dar como quem já recebeu tudo de graça.',
  },
  {
    slug: 'proposito',
    name: 'Propósito',
    icon: '✪',
    description: 'Descobrir para que fomos formados.',
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug)
}
