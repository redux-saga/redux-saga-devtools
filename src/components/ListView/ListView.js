import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components'

const outline = '1px dotted rgb(33,33,33)'
const bgHover = css`background-color: rgba(56, 121, 217, 0.1)`

const ListViewContainer = styled.div`
  outline: none;
  cursor: default;
  user-select: none;
`

const ListEntry = styled.div`
  border-bottom: 1px solid ${props => props.theme.border};
  outline: ${p => p.selected ? outline : 'none'};
  ${ p => p.selected ? bgHover : ''}
  ${ p => p.css};

  &:hover {
    ${p => !p.selected ? bgHover : ''}
  }
`

const DEFAULT_INDENT = 16

class ListView extends React.Component {

  render() {
    const indent = this.props.indent || DEFAULT_INDENT

    return (
      <ListViewContainer>
        {this.props.nodes.map(node => {
          const depth = node.props.depth
          const style = depth ? { marginLeft: depth * indent } : null

          return (
            <ListEntry
              key={node.props.id}
              selected={node.props.selected}
              css={node.props.css}
            >
              <div style={style}>
                {node}
              </div>
            </ListEntry>
          )
        })}
      </ListViewContainer>
    )
  }
}

ListView.propTypes = {
  nodes: PropTypes.array.isRequired,
}

export default ListView
