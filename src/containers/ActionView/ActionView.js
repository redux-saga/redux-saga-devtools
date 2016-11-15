import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Divider from '../../components/Divider'
import ActionList from '../ActionList'
import Reactions from '../Reactions'
import { SET_SHARED_REF } from '../../store/constants'
import './ActionView.css'

class ActionView extends React.Component {

  state = {}

  onResizeStart = () => {
    this.heightOrigin = this.topNode.offsetHeight
    this.setState({ isResizing: true })
  }

  onResizeEnd = e => {
    this.setState({ isResizing: false })
  }

  onResize = deltaY => {
    this.setState({
      topHeight: Math.max(0, this.heightOrigin - deltaY)
    })
  }

  selectAction = action => {
    this.props.setCurrentAction(action)
  }

  componentWillUnmount() {
    this.props.setCurrentAction(null)
  }

  render() {
    let style, topStyle
    const topHeight = this.state.topHeight
    if(topHeight) {
      topStyle = {height: topHeight}
    }
    style = { cursor: this.state.isResizing ? 'row-resize' : 'default' }

    const action = this.props.currentAction

    return (
      <div className='action-view' style={style}>
        <div className='action-view-actions' style={topStyle} ref={n => this.topNode = n}>
          <ActionList selectedAction={action} onSelectionChange={this.selectAction} />
        </div>
        <Divider
          orientation={Divider.HORIZONTAL}
          className='action-view-resize'
          onResizeStart={this.onResizeStart}
          onResize={this.onResize}
          onResizeEnd={this.onResizeEnd}
        />
        <div className='action-view-reactions'>
          <Reactions action={action} />
        </div>
      </div>
    )
  }
}

ActionView.PropTypes = {
  // Injected by Redux
  currentAction: PropTypes.object,
  setCurrentAction: PropTypes.func.isRequired,
}

export default connect(
  state => ({ currentAction: state.sharedRef.currentAction }),
  dispatch => ({
    setCurrentAction(action) {
      dispatch({
        type: SET_SHARED_REF,
        key: 'currentAction',
        sharedRef: action
      })
    }
  })
)(ActionView)
