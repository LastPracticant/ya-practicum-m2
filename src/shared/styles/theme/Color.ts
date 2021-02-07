enum Color {
  'primary',
  'default',
  'active'
}

type TColor = keyof typeof Color

type TColors = Record<keyof typeof Color, string>

const colors: TColors = {
  primary: 'rgb(218, 3, 3)',
  active: 'rgb(248, 205, 205)',
  default: 'rgb(204, 204, 204)'
}

export { colors, TColors, TColor }
