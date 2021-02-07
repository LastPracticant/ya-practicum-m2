import React, { FC, memo, useState } from 'react'
// import Theme from '../../shared/styles/theme/Theme'
import { TColor, TVariant } from '../../shared/styles/theme/Types'
// import Theme from '@styles/theme/Theme'
import { Typography, Paper, TextField } from '../../shared/components/index'

// import { BrowserRouter, Route, Switch, Link } from "react-router-dom"

// import './App.css'

const Signin: FC = memo(() => {
  const [login, setLogin] = useState('login')
  const [password, setPassword] = useState('12342')

  const variant: TVariant[] = ['h1', 'h2', 'h3', 'body', 'overline']
  const color: TColor[] = ['primary', 'active', 'default']

  return (
    <React.Fragment>
      <Paper style={{ width: 340, margin: 'auto', opacity: 0.93 }}>
        <Typography
          variant={'h1'}
          style={{ color: 'white', textAlign: 'center', marginBottom: 16 }}
        >{`Шрифты`}</Typography>

        <TextField label='Логин' type='text' value={login} />
        <TextField label='Пароль' type='password' value={password} />

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
