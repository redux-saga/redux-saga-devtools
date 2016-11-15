import React, { PropTypes } from 'react'
import { withCapture } from 'utils'
import { connect } from 'react-redux'
import { SET_SHARED_REF } from 'store/constants'
import './SagaRef.css'

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
    const className = `saga-ref ${object === sharedRef ? 'saga-ref_highlighted' : ''}`
    return (
      <div
        title='Click to highlight all references of this object'
        className={className}
        onMouseDown={this.onMouseDown}
      >
        {children}
      </div>
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
