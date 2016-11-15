import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import EffectView from 'containers/EffectView'
import { getReactions } from 'store/selectors'
import './Reactions.css'

const NoSelectedAction = (
  <h1 className='reactions-empty-msg'>
    Select an action from the top panel to view its Reactions
  </h1>
)

const NoReactions =  ({action}) => (
  <h1 className='reactions-empty-msg'>
    No reactions was found to {action.action.type}
  </h1>
)

class Reactions extends React.Component {

  render() {
    const { action, reactions } = this.props

    return (
      <div className='reactions'>
        {
          !action ? NoSelectedAction
          : reactions && reactions.length ? <EffectView rootEffectIds={reactions} />
          : <NoReactions action={action} />
        }
      </div>
    )
  }
}

Reactions.propTypes = {
  // Provided by the parent Component
  action: PropTypes.object,
  // Injected by Redux
  reactions: PropTypes.array,
}

export default connect(
  (state, props) => ({
    reactions: props.action ? getReactions(state, props.action.action) : null
  })
)(Reactions)
