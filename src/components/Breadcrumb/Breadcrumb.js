import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'
import { Row, Cell } from '../Layout'


function ifSelected(ifTrue, ifNot) {
  return p => p.selected ? ifTrue : ifNot
}

const BreadcrumbContainer = styled.div`
  font-size: 90%;
  display: block;
`

const BreadcrumbElement = styled.div`
  cursor: pointer;
  padding: 5px;
  color: ${ ifSelected('white')};
  background-color: ${ ifSelected(props => props.theme.selectedHeader, props => props.theme.headerBackground)};
  border-left: 1px solid rgb(204, 204, 204);
  position: relative;

  &:hover {
    background-color: ${ ifSelected('rgb(56, 121, 217)', 'rgb(220, 220, 220)')};
  }
`

function Breadcrumb({ selectedIdx, nodes }) {
  return (
    <Row>
      <BreadcrumbContainer>
        {
          nodes.map((node, idx) => (
            <Cell key={idx}>
              <BreadcrumbElement selected={idx === selectedIdx}>
                {node}
              </BreadcrumbElement>
            </Cell>
          ))
        }
      </BreadcrumbContainer>
    </Row>
  )
}

Breadcrumb.propTypes = {
  selectedIdx: PropTypes.number.isRequired,
  nodes: PropTypes.array.isRequired,
}

export default Breadcrumb
