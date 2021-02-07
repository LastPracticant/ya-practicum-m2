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
  backgroundColor:
    //   'rgba(255, 255, 255, 0.12)',
    'linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), rgba(18, 18, 18, 0.62)',
  //   'linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), rgba(18, 18, 18, 0.8)',
  colors,
  radius: 4,
  space: space(4),
  shadow:
    // '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
  typography
}

export default Theme
