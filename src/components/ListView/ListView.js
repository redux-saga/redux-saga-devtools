import React, { PropTypes } from 'react'
import './ListView.css'

const DEFAULT_INDENT = 16

class ListView extends React.Component {

  render() {
    const indent = this.props.indent || DEFAULT_INDENT

    return (
      <div className='list-view'>
        { this.props.nodes.map(node => {
          const depth = node.props.depth
          const style = depth ? { marginLeft: depth * indent } : null
          const clsSelected = node.props.selected ? 'list-entry_selected' : ''
          const clsEntry = `list-entry ${clsSelected} ${node.props.itemClass}`

          return (
            <div key={node.props.id} className={clsEntry}>
              <div style={style}>
                {node}
              </div>
            </div>
          )
        }) }
      </div>
    )
  }
}

ListView.propTypes = {
  nodes: PropTypes.array.isRequired,
}

export default ListView
