import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import EffectView from '../EffectView'
import { getReactions } from '../../store/selectors'



const ReactionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const EmptyMsg = styled.h1`
  color: rgb(211, 211, 211);
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const NoSelectedAction = (
  <EmptyMsg>
    Select an action from the top panel to view its Reactions
  </EmptyMsg>
)

const NoReactions =  ({action}) => (
  <EmptyMsg>
    No Reaction was found for {action.action.type}
  </EmptyMsg>
)

class Reactions extends React.Component {

  render() {
    const { action, reactions } = this.props

    return (
      <ReactionsContainer>
        {
          !action ? NoSelectedAction
          : reactions && reactions.length ? <EffectView rootEffectIds={reactions} />
          : <NoReactions action={action} />
        }
      </ReactionsContainer>
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
