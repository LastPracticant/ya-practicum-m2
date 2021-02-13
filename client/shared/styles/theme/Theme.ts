import { typography, TTypography } from './Typography'
import { colors, TColors } from './Color'

interface ISpace {
  (multi: number): Function
}

const space: ISpace = multi => {
  return (x: number): number => {
    return x * multi
  }
}

interface ITheme {
  backgroundColor: string
  colors: TColors
  radius: number
  space: Function
  shadow: string
  typography: TTypography
}

const Theme: ITheme = {
  backgroundColor: '#424242',
  colors,
  radius: 8,
  space: space(4),
  shadow:
    '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
  typography
}

export default Theme
