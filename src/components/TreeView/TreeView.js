import React, { PropTypes } from 'react'
import styled from 'styled-components'

const TreeViewChildren = styled.div`
  padding-left: 10px;
  margin-bottom: 10px;
`


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
        <TreeViewChildren style={childrenStyle} >
          {typeof children === 'function'
            ? (collapsed ? null : children(collapsed))
            : children
          }
        </TreeViewChildren>
      )
    }

    return (
      <div>
        <div>
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
