import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { IconPin, IconUnpin } from '../../components/Icons'
import { Row, Cell } from '../../components/Layout'
import Collapse from '../../components/Collapse'
import Effect from '../../components/Effect'


const EffectEntryContainer = styled.div`
  padding: 2px 40px 2px 10px;
  position: relative;
  
  ${ p => p.error ? css`
      background-color: hsl(0, 100%, 97%);
      border-top: 1px solid hsl(0, 100%, 92%);
      border-bottom: 1px solid hsl(0, 100%, 92%);
      margin-top: -1px;
    ` : ''
  }

  &:hover .effect-entry-toolbar {
    visibility: visible;
  }
`

const Toolbar = styled.span`
  cursor: pointer;
  position: absolute;
  right: 0;
  top:0;
  visibility: hidden;
`


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
      <EffectEntryContainer>
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
            <Toolbar className='effect-entry-toolbar'>
              {pinNode}
            </Toolbar>
          )
        }
      </EffectEntryContainer>
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
