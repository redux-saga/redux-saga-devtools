import React, { PropTypes } from 'react'
import { IconFold, IconUnfold } from '../Icons'
import './Collapse.css'

function Collapse({collapsed, onClick, ...rest}) {
  return (
    <div className='collapse' onClick={onClick} {...rest}>
      { collapsed ? <IconUnfold /> : <IconFold /> }
    </div>
  )
}

Collapse.propTypes = {
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Collapse
