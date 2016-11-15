import React, { PropTypes } from 'react'
import { Row, Cell } from 'components/Layout'
import './Breadcrumb.css'

function Breadcrumb({selectedIdx, nodes}) {
  return (
    <Row className='breadcrumb'>
    {
      nodes.map((node, idx) => {
        const clsSelected = idx === selectedIdx ?'breadcrumb-element_selected' : ''
        return (
          <Cell key={idx} className={`breadcrumb-element ${clsSelected}`}>
            {node}
          </Cell>
        )
      })
    }
    </Row>
  )
}

Breadcrumb.propTypes = {
  selectedIdx: PropTypes.number.isRequired,
  nodes: PropTypes.array.isRequired,
}

export default Breadcrumb
