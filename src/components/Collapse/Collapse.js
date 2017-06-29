import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'
import { IconFold, IconUnfold } from '../Icons'

const CollapseContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  user-select: none;
`

function Collapse({collapsed, onClick, ...rest}) {
  return (
    <CollapseContainer onClick={onClick} {...rest}>
      { collapsed ? <IconUnfold /> : <IconFold /> }
    </CollapseContainer>
  )
}

Collapse.propTypes = {
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Collapse
