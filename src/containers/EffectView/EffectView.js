import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { isParentOf } from 'store/selectors'
import EffectList from 'containers/EffectList'
import EffectPath from './EffectPath'
import './EffectView.css'


class EffectView extends React.Component {

  state = { selectedEffectId: -1, pinnedEffectId: -1 }

  handleSelectionChange = effectId => {
    const pinnedEffectId = this.state.pinnedEffectId
    if(
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
      <div className='effect-view'>
        <section className='effect-view-body'>
          <EffectList
            rootEffectIds={rootEffectIds}
            selectedEffectId={selectedEffectId}
            onSelectionChange={this.handleSelectionChange}
            pinnedEffectId={pinnedEffectId}
            onPin={this.handlePin}
            onUnpin={this.handleUnpin}
          />
        </section>
        <footer className='effect-view-footer'>
        <EffectPath
          rootEffectIds={rootEffectIds}
          selectedEffectId={selectedEffectId}
          onSelectionChange={this.handleSelectionChange}
        />
        </footer>
      </div>
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
