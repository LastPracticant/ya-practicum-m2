interface IFont {
  fontFamily: string
  fontSize: string
  fontWeight: number
  lineHeight: number
  margin: number
}

enum Variant {
  'h1',
  'h2',
  'h3',
  'body',
  'overline'
}

type TVariant = keyof typeof Variant

type TTypography = Record<TVariant, IFont>

const fontFamily: string = 'Roboto'

const margin = 0
const typography: TTypography = {
  h1: {
    fontFamily,
    fontSize: '2.125rem',
    fontWeight: 400,
    lineHeight: 1.235,
    margin
  },
  h2: {
    fontFamily,
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.334,
    margin
  },
  h3: {
    fontFamily,
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: 1.6,
    margin
  },
  body: {
    fontFamily,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    margin
  },
  overline: {
    fontFamily,
    fontSize: '0.75rem',
    fontWeight: 300,
    lineHeight: 1,
    margin
  }
}

export { typography, TTypography, TVariant }
