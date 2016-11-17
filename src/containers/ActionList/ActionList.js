import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ListView from '../../components/ListView'
import { JSObject } from '../../components/JSValue'
import Collapse from '../../components/Collapse'

const sagaActionStyle = {
  color: 'red'
}

const ActionEntryContainer = styled.div`
  padding: 2px 10px;
  position: relative;
`

class ActionEntry extends React.Component {

  onSelect = () => this.props.onSelectionChange(this.props.action)

  render() {
    const {action } = this.props

    return (
      <ActionEntryContainer onClick={this.onSelect}>
        <JSObject
          data={action.action}
          renderLabel={(onClick, collapsed)=> {
            return (
              <div style={action.isSagaAction ? sagaActionStyle : null}>
                <Collapse
                  onClick={onClick}
                  collapsed={collapsed}
                />
                {action.action.type}
              </div>
            )
          }}
        />
      </ActionEntryContainer>
    )
  }

}

class ActionList extends React.Component {

  render() {
    const { actions, selectedAction, onSelectionChange } = this.props

    const nodes = actions.map(action =>
      <ActionEntry
        id={action.id}
        selected={action === selectedAction}
        action={action}
        selectedAction={selectedAction}
        onSelectionChange={onSelectionChange}
      />
    )

    return (
      <ListView nodes={nodes} />
    )
  }
}

ActionList.propTypes = {
  // passed by the parent Component
  selectedAction: PropTypes.object,
  // Injected by redux
  actions: PropTypes.array.isRequired,
}


export default connect(
  state => ({
    actions: state.dispatchedActions
  })
)(ActionList)
