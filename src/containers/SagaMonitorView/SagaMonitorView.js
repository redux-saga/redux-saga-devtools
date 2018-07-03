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
import { ThemeProvider } from 'styled-components';

const EFFECT_VIEW = 'Effects'
const ACTION_VIEW = 'Actions'

const OPTION_WIDTH = 80
const OPTION_STYLE = { width: OPTION_WIDTH }

const lightTheme = {
  background: 'white',
  border: 'rgb(240, 240, 240)',
  fontColor: 'rgb(36, 36, 36)',
  effectType: 'rgb(28,0,207)',
  headerBackground: 'rgb(243, 243, 243)',
  headerHighlight: 'rgb(220, 220, 220)',
  identifier: 'rgb(136,18,128)',
  selectedHeader: 'rgb(56, 121, 217)',
  unquoted: 'rgb(28, 0, 207)'

}

const darkTheme = {
  background: 'rgb(36, 36, 36)',
  border: 'rgb(105,105,105)',
  fontColor: 'white',
  effectType: 'rgb(154, 127, 213)',
  headerBackground: 'rgb(75,75,75)',
  headerHighlight: 'rgb(105,105,105)',
  identifier: 'rgb(242, 151, 102)',
  selectedHeader: 'rgb(242, 151, 102)',
  unquoted: 'rgb(189, 198, 207)'
}

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
      <ThemeProvider theme={this.props.darkTheme ? darkTheme : lightTheme}>
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
      </ThemeProvider>
    );
  }
}

SagaMonitorView.propTypes = {
  rootEffectIds: PropTypes.array.isRequired,
  darkTheme: PropTypes.boolean
}

export default connect(
  (state, ownProps) => ({
    darkTheme: ownProps.darkTheme,
    rootEffectIds: state.rootEffectIds
  })
)(SagaMonitorView)
