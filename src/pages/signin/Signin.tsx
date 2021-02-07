import React, { FC, memo } from 'react'
// import Theme from '../../shared/styles/theme/Theme'
import { TColor, TVariant } from '../../shared/styles/theme/Types'
// import Theme from '@styles/theme/Theme'
import { Typography, Paper } from '../../shared/components/index'

// import { BrowserRouter, Route, Switch, Link } from "react-router-dom"

// import './App.css'

const Signin: FC = memo(() => {
  const variant: TVariant[] = ['h1', 'h2', 'h3', 'body', 'overline']
  const color: TColor[] = ['primary', 'active', 'default']
  return (
    <React.Fragment>
      <Paper style={{ width: 340, margin: 64 }}>
        <Typography
          variant={'h1'}
          style={{ color: 'white', textAlign: 'center', marginBottom: 16 }}
        >{`Шрифты`}</Typography>
        {variant.map(va => {
          return color.map(cl => {
            return (
              <Typography variant={va} color={cl}>{`${va} - ${cl}`}</Typography>
            )
          })
        })}
      </Paper>
    </React.Fragment>
  )
})

export default Signin
