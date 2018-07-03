import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from "react-virtualized";

const outline = '1px dotted rgb(33,33,33)'
const bgHover = css`background-color: rgba(56, 121, 217, 0.1)`

const ListViewContainer = styled.div`
  outline: none;
  cursor: default;
  user-select: none;
  flex: auto;
  display: flex;
  flex-direction: column;
`

const ListEntry = styled.div`
  border-bottom: 1px solid rgb(240, 240, 240);
  outline: ${p => p.selected ? outline : 'none'};
  ${ p => p.css};

  &:hover {
    ${p => !p.selected ? bgHover : ''}
  }
`

const DEFAULT_INDENT = 16

class ListView extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._measureCache = new CellMeasurerCache({
      defaultHeight: 20,
      fixedWidth: true
    });
  }

  render() {
    return (
      <ListViewContainer>
        <AutoSizer>
          {({ height, width }) =>
            <List
              rowCount={this.props.nodes.length}
              rowRenderer={this.renderListItem.bind(this)}
              rowHeight={this._measureCache.height}
              height={height}
              width={width}
            />
          }
        </AutoSizer>
      </ListViewContainer>
    )
  }

  renderListItem = (
    { key,
      parent,    // Unique key within array of rows
      index,       // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible,   // This row is visible within the List (eg it is not an overscanned row)
      style }        // Style object to be applied to row (to position it)) {
  ) => {
    const indent = this.props.indent || DEFAULT_INDENT
    const node = this.props.nodes[index];
    const depth = node.props.depth
    const depthStyle = depth ? { marginLeft: depth * indent } : null

    return (
      <CellMeasurer
        cache={this._measureCache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}

      >
        <ListEntry
          key={node.props.id}
          selected={node.props.selected}
          css={node.props.css}
          style={style}
        >
          <div style={depthStyle}>
            {node}
          </div>
        </ListEntry>
      </CellMeasurer>
    )
  }
}

ListView.propTypes = {
  nodes: PropTypes.array.isRequired,
}

export default ListView
