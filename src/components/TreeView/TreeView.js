import React, { PropTypes } from 'react'
import './TreeView.css'

class TreeView extends React.Component {

  state = { collapsed: this.props.defaultCollapsed }

  toggleCollapsed = () => {
    this.setState(state => {
      return { collapsed: !state.collapsed }
    })
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      renderLabel,
      children
    } = this.props;

    let treeViewChildren
    if(children) {
      const childrenStyle = collapsed ?  {display: 'none'} : null
      treeViewChildren = (
        <div className='tree-view-children' style={childrenStyle} >
          {typeof children === 'function'
            ? (collapsed ? null : children(collapsed))
            : children
          }
        </div>
      )
    }

    return (
      <div className='tree-view'>
        <div className='tree-view-item'>
          {renderLabel(this.toggleCollapsed, collapsed)}
        </div>
        {treeViewChildren}
      </div>
    )
  }
}

TreeView.propTypes = {
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  renderLabel: PropTypes.func.isRequired,
}

export default TreeView;
