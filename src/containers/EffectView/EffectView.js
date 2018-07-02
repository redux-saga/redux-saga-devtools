import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isParentOf } from '../../store/selectors'
import EffectList from '../EffectList'
import EffectPath from './EffectPath'

const EffectViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`

const EffectViewBody = styled.section`
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow: auto;
`

const EffectViewFooter = styled.section`
  background-color: rgb(243, 243, 243);
  border-top: 1px solid rgb(204, 204, 204);
  flex: none;
`

class EffectView extends React.Component {

  state = { selectedEffectId: -1, pinnedEffectId: -1 }

  handleSelectionChange = effectId => {
    const pinnedEffectId = this.state.pinnedEffectId
    if (
      pinnedEffectId >= 0 &&
      isParentOf(this.props.effectsById, effectId, pinnedEffectId)
    ) {
      this.setState({
        selectedEffectId: effectId,
        pinnedEffectId: effectId
      })
    } else {
      this.setState({
        selectedEffectId: effectId
      })
    }

  }

  handlePin = effectId => {
    this.setState({
      pinnedEffectId: effectId
    })
  }

  handleUnpin = () => {
    this.setState({
      pinnedEffectId: -1
    })
  }


  render() {
    const rootEffectIds = this.props.rootEffectIds
    const selectedEffectId = this.state.selectedEffectId
    const pinnedEffectId = this.state.pinnedEffectId

    return (
      <EffectViewContainer>
        <EffectViewBody>
          <EffectList
            rootEffectIds={rootEffectIds}
            selectedEffectId={selectedEffectId}
            onSelectionChange={this.handleSelectionChange}
            pinnedEffectId={pinnedEffectId}
            onPin={this.handlePin}
            onUnpin={this.handleUnpin}
          />
        </EffectViewBody>
        <EffectViewFooter>
          <EffectPath
            rootEffectIds={rootEffectIds}
            selectedEffectId={selectedEffectId}
            onSelectionChange={this.handleSelectionChange}
          />
        </EffectViewFooter>
      </EffectViewContainer>
    )
  }
}

EffectView.propTypes = {
  rootEffectIds: PropTypes.array.isRequired,
  // Inject by Redux
  effectsById: PropTypes.object.isRequired
}

export default connect(
  state => {
    return { effectsById: state.effectsById }
  }
)(EffectView)
