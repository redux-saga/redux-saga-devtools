import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { Row, Cell } from '../../components/Layout'
import EffectView from '../EffectView'
import ActionView from '../ActionView'
import {
  SagaMonitorContainer,
  SagaMonitorHeader,
  SagaMonitorOption,
  SagaMonitorBody
} from './styles'

const EFFECT_VIEW = 'Effects'
const ACTION_VIEW = 'Actions'

const OPTION_WIDTH = 80
const OPTION_STYLE = { width: OPTION_WIDTH }

class SagaMonitorView extends React.Component {

  state = {
    currentView: EFFECT_VIEW,
    currentViewIndex: 0
  }

  viewHandlers = {
    [EFFECT_VIEW]: () => this.setState({ currentView: EFFECT_VIEW, currentViewIndex: 0 }),
    [ACTION_VIEW]: () => this.setState({ currentView: ACTION_VIEW, currentViewIndex: 1 })
  }

  renderCurrentView() {
    switch (this.state.currentView) {
      case EFFECT_VIEW:
        return <EffectView rootEffectIds={this.props.rootEffectIds} />
      case ACTION_VIEW:
        return <ActionView />
      default:
        return 'Unknown View!'
    }
  }

  renderViewOption(view) {
    return (
      <Cell>
        <SagaMonitorOption
          style={OPTION_STYLE}
          onMouseDown={this.viewHandlers[view]}
        >
          {view}
        </SagaMonitorOption>
      </Cell>
    )
  }

  render() {
    return (
      <SagaMonitorContainer>
        <SagaMonitorHeader>
          <Row>
            {this.renderViewOption(EFFECT_VIEW)}
            {this.renderViewOption(ACTION_VIEW)}
            <hr style={{ width: OPTION_WIDTH, left: OPTION_WIDTH * this.state.currentViewIndex }} />
          </Row>
        </SagaMonitorHeader>
        <SagaMonitorBody>
          {this.renderCurrentView()}
        </SagaMonitorBody>
      </SagaMonitorContainer>
    );
  }
}

SagaMonitorView.propTypes = {
  rootEffectIds: PropTypes.array.isRequired,
  useDock: PropTypes.boolean
}

export default connect(
  (state, ownProps) => ({
    rootEffectIds: state.rootEffectIds,
    useDock: ownProps.useDock
  })
)(SagaMonitorView)
