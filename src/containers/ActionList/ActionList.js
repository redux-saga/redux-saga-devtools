import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ListView from 'components/ListView'
import { JSObject } from 'components/JSValue'
import Collapse from 'components/Collapse'
import './ActionList.css'

class ActionEntry extends React.Component {

  onSelect = () => this.props.onSelectionChange(this.props.action)

  render() {
    const {action } = this.props

    return (
      <div onClick={this.onSelect}>
        <JSObject
          data={action.action}
          renderLabel={(onClick, collapsed)=> {
            return (
              <div className={action.isSagaAction ? 'action_saga' : ''}>
                <Collapse
                  onClick={onClick}
                  collapsed={collapsed}
                />
                {action.action.type}
              </div>
            )
          }}
        />
      </div>
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
