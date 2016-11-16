import React from 'react'
import styled from 'styled-components'
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
