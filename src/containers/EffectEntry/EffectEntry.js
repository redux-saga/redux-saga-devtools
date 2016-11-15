import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { IconPin, IconUnpin } from 'components/Icons'
import { Row, Cell } from 'components/Layout'
import Collapse from 'components/Collapse'
import Effect from 'components/Effect'
import './EffectEntry.css'


class EffectEntry extends React.Component {

  effectId  = this.props.effectId
  onSelect = () => this.props.onSelect(this.effectId)
  onCollapse = () => this.props.onCollapse(this.effectId)
  onPin = () => this.props.onPin(this.effectId)
  onUnpin = () => this.props.onUnpin(-1)

  render() {
    const {effect, collapsed, pinned, hasChildren} = this.props

    let pinNode
    if(!effect.root) {
      pinNode = (
        pinned
          ? <div onClick={this.onUnpin}><IconUnpin/></div>
          : <div onClick={this.onPin}><IconPin/></div>
        )
    }

    return (
      <div className='effect-entry'>
        <Row onMouseDown={this.onSelect}>
          <Cell>
            <Collapse
              collapsed={collapsed}
              hidden={!hasChildren}
              onClick={this.onCollapse}
            />
          </Cell>
          <Cell>
            <Effect effect={effect}/>
          </Cell>
        </Row>
        {
          effect.root ? null : (
            <span className='effect-entry-toolbar'>
              {pinNode}
            </span>
          )
        }
      </div>
    )
  }
}

EffectEntry.PropTypes = {
  // passed by the parent component
  effectId: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  // injected by Redux store
  effect: PropTypes.object.isRequired,
  hasChildren: PropTypes.bool.isRequired,
}

export default connect(
  (state, {effectId}) =>{
    const effect = state.effectsById[effectId]
    return {
      effect,
      hasChildren: state.effectsByParentId[effectId]
    }
  }
)(EffectEntry)
