import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import Divider from '../../components/Divider'
import ActionList from '../ActionList'
import Reactions from '../Reactions'
import { SET_SHARED_REF } from '../../store/constants'

const actionListStyle = {
  height: '50%',
  overflow: 'auto'
}

const ActionViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const ReactionListContainer = styled.div`
  flex: 1;
  overflow: auto;
`

const cssResize = css`
  background-color: gray;
  height: 2px;
  cursor: row-resize;
`

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
    let style, topStyle = actionListStyle
    const topHeight = this.state.topHeight
    if(topHeight) {
      topStyle = {...topStyle, height: topHeight}
    }
    style = { cursor: this.state.isResizing ? 'row-resize' : 'default' }

    const action = this.props.currentAction

    return (
      <ActionViewContainer style={style}>
        <div style={topStyle} ref={n => this.topNode = n}>
          <ActionList selectedAction={action} onSelectionChange={this.selectAction} />
        </div>
        <Divider
          orientation={Divider.HORIZONTAL}
          css={cssResize}
          onResizeStart={this.onResizeStart}
          onResize={this.onResize}
          onResizeEnd={this.onResizeEnd}
        />
        <ReactionListContainer>
          <Reactions action={action} />
        </ReactionListContainer>
      </ActionViewContainer>
    )
  }
}

ActionView.propTypes = {
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
