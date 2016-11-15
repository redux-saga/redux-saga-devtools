import React from 'react'
import './Icons.css'


function icon(type) {
  return (
    <span  className={type} />
  )
}

export const IconOk = () => icon('icon-ok')
export const IconCancel = () => icon('icon-cancel')
export const IconPin = () => icon('icon-pin')
export const IconUnpin = () => icon('icon-unpin')
export const IconError = () => icon('icon-error')
export const IconFold = () => icon('icon-fold')
export const IconUnfold = () => icon('icon-unfold')
export const IconPending = () => icon('icon-pending')
