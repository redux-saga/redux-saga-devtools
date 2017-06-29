import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'
import { withCapture } from '../../utils'
import { connect } from 'react-redux'
import { SET_SHARED_REF } from '../../store/constants'


const SsagaRefContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  ${ p => p.highlighted ? 'background-color: rgb(24, 255, 24);' : '' }
`

class SagaRef extends React.Component {

  highlighted = false

  onMouseDown = withCapture(() => {
    const wasHighlighted = this.highlighted
    this.highlighted = !wasHighlighted
    this.props.setSharedRef(wasHighlighted ?  null : this.props.object)
  })

  componentWillUnmount() {
    this.props.setSharedRef(null)
  }

  render() {
    const { object, sharedRef, children } = this.props

    return (
      <SsagaRefContainer
        title='Click to highlight all references of this object'
        highlighted={object === sharedRef}
        onMouseDown={this.onMouseDown}
      >
        {children}
      </SsagaRefContainer>
    )
  }
}

SagaRef.propTypes = {
  object: PropTypes.object.isRequired,
  sharedRef: PropTypes.object,
}

export default connect(
  state => ({sharedRef: state.sharedRef.sagaRef}),
  dispatch => ({
    setSharedRef(sagaRef){
      dispatch({
        type: SET_SHARED_REF,
        key: 'sagaRef',
        sharedRef: sagaRef
      })
    }
  })
)(SagaRef)
