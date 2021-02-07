import React, { FC, memo } from 'react'
import './style.css'

interface IProps {
  label: string
  value: string | number
  type: 'password' | 'text' | 'email' | 'file' | 'tel'
}

export const TextField: FC<IProps> = memo(({ label, value, type = 'text' }) => {
  return (
    <div className='inbox'>
      <input
        type={type}
        name='login'
        className='inbox-text'
        required={true}
        placeholder=' '
        // value={value}
      />
      <span className='inbox-placeholder'>{label}</span>
    </div>
  )
})
