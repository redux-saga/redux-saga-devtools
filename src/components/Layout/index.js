import React from 'react'
import './index.css'

export function Row({className, children, ...rest}) {
  return (
    <div className={`row ${className || ''}`} {...rest}>
      {children}
    </div>
  )
}

export function Cell({className, children, ...rest}) {
  return (
    <div className={`cell ${className || ''}`} {...rest}>
      {children}
    </div>
  )
}
