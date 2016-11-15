import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPathToEffect, getEffectName } from '../../store/selectors'
import { pathHasChanged } from './helpers'
import Breadcrumb from '../../components/Breadcrumb'

class EffectPath extends React.Component {

  currentPath = null

  shouldComponentUpdate({selectedEffectId, rootEffectIds, state}) {
    return (
      this.props.selectedEffectId !== selectedEffectId ||
      this.props.rootEffectIds !== rootEffectIds
    )
  }

  render() {
    let {state, selectedEffectId, rootEffectIds, onSelectionChange} = this.props
    let path = selectedEffectId < 0 ? null : getPathToEffect(state, selectedEffectId, rootEffectIds)

    if(!path) {
      return <span></span>
    }

    if(pathHasChanged(this.currentPath, path)) {
      this.currentPath = path
    } else {
      path = this.currentPath
    }
    let selectedIdx = -1
    const nodes = (
      path.map((effectId, idx) => {
        if(selectedEffectId === effectId) {
          selectedIdx = idx
        }
        return (
          <PathNode
            key={effectId}
            effectId={effectId}
            text={getEffectName(state, effectId)}
            onSelect={onSelectionChange}
          />
        )
      })
    )

    return (
      <Breadcrumb selectedIdx={selectedIdx} nodes={nodes} />
    )
  }
}

class PathNode extends React.Component {

  onSelect = () => this.props.onSelect(this.props.effectId)

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div onMouseDown={this.onSelect}>
        {this.props.text}
      </div>
    )
  }
}

EffectPath.propTypes = {
  // Provided by the parent Component
  rootEffectIds: PropTypes.array.isRequired,
  selectedEffectId: PropTypes.number,
  onSelectionChange: PropTypes.func.isRequired,
  // Injected by Redux
  state: PropTypes.object.isRequired,
}

export default connect(
  (state => ({state})), null, null,
  { pure: false } // We'll provide our own shouldComponentUpdate
)(EffectPath)
