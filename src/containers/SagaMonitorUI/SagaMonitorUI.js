import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Cell } from 'components/Layout'
import Dock from 'components/Dock'
import EffectView from 'containers/EffectView'
import ActionView from 'containers/ActionView'
import './SagaMonitorUI.css'

const EFFECT_VIEW = 'Effects'
const ACTION_VIEW = 'Actions'

const OPTION_WIDTH = 80
const OPTION_STYLE = { width: OPTION_WIDTH }

class SagaMonitorUI extends React.Component {

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
        return 'Unkown View!'
    }
  }

  renderViewOption(view) {
    const className = `saga-monitor-option ${view === this.state.currentView ? 'saga-monitor-option_active' : ''}`
    return (
      <Cell
        className={className}
        style={OPTION_STYLE}
        onMouseDown={this.viewHandlers[view]}
      >
        {view}
      </Cell>
    )
  }

  render() {
    return (
      <Dock>
        <div className='saga-monitor'>
          <div className='saga-monitor-header'>
            <Row>
              {this.renderViewOption(EFFECT_VIEW)}
              {this.renderViewOption(ACTION_VIEW)}
              <hr style={{ width: OPTION_WIDTH, left: OPTION_WIDTH * this.state.currentViewIndex }} />
            </Row>
          </div>
          <section className='saga-monitor-body'>
            {this.renderCurrentView()}
          </section>
        </div>
      </Dock>
    )
  }
}

SagaMonitorUI.propTypes = {
  rootEffectIds: PropTypes.array.isRequired,
}

export default connect(
  state => ({
    rootEffectIds: state.rootEffectIds
  })
)(SagaMonitorUI)
