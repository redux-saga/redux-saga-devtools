import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { matchCurrentAction } from '../../store/selectors'
import {
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT
} from '../../utils'
import ListView from '../../components/ListView'
import EffectEntry from '../EffectEntry'

const EffectListContainer = styled.div`
  outline: none;
  cursor: default;
  user-select: none;
`

const cssHighlight = css`
  background-color: rgb(223, 240, 216) !important;
  border-top: 1px solid rgb(70, 136, 71);
  border-bottom: 1px solid rgb(70, 136, 71);
  margin-top: -1px;
`

class EffectList extends React.Component {

  state = {
    collapsedEffects: {}
  }

  isCollapsed = effectId => {
    return this.state.collapsedEffects[effectId]
  }

  collapseEffect = (effectId, collapsed) => {
    this.setState(state => ({
      collapsedEffects: {
        ...state.collapsedEffects,
        [effectId]: collapsed !== undefined ? collapsed : !state.collapsedEffects[effectId]
      }
    }))
  }


  onKeyDown = e => {
    if(e.which === KEY_ARROW_DOWN) {
      this.selectDown(this.props.selectedEffectId)
      e.preventDefault()
    } else if(e.which === KEY_ARROW_UP) {
      this.selectUp(this.props.selectedEffectId)
      e.preventDefault()
    } else if(e.which === KEY_ARROW_LEFT) {
      this.selectLeft(this.props.selectedEffectId)
      e.preventDefault()
    }
    else if(e.which === KEY_ARROW_RIGHT) {
      this.selectRight(this.props.selectedEffectId)
      e.preventDefault()
    }
  }

  selectLeft = effectId => {
    if(!this.isCollapsed(effectId) && this.props.effectsByParentId[effectId]) {
      this.collapseEffect(effectId, true)
    } else {
      const isTop = (
        effectId === this.state.pinnedEffectId ||
        this.props.rootEffectIds.indexOf(effectId) >= 0
      )

      if(!isTop) {
        const parentId = this.props.effectsById[effectId].parentEffectId
        this.props.onSelectionChange(parentId)
      }
    }
  }

  selectRight = effectId => {
    if(this.isCollapsed(effectId)) {
      this.collapseEffect(effectId, false)
    } else {
      if(this.props.effectsByParentId[effectId]) {
        this.selectDown(effectId)
      }
    }
  }

  selectUp = effectId => {
    const idx = this.visuallyOrderedEffects.indexOf(effectId)
    if(idx > 0) {
      const prevEffect = this.visuallyOrderedEffects[idx-1]
      this.props.onSelectionChange(prevEffect)
    }
  }

  selectDown = (effectId, onlyChild) => {
    const idx = this.visuallyOrderedEffects.indexOf(effectId)
    if(idx < this.visuallyOrderedEffects.length - 1) {
      const nextEffect = this.visuallyOrderedEffects[idx+1]
      this.props.onSelectionChange(nextEffect)
    }
  }

  renderEffectList(effectIds, elems, depth = 0, prefix='eff') {
    return effectIds.forEach((effectId, idx) => {
      this.visuallyOrderedEffects.push(effectId)
      const childsEffectsId = this.props.effectsByParentId[effectId]
      const hasChildren = childsEffectsId && childsEffectsId.length
      const highlighed = matchCurrentAction(this.props.state, effectId)

      elems.push(
        <EffectEntry
          id={prefix + String(effectId)}
          css={highlighed ? cssHighlight : null}
          depth={depth}
          effectId={effectId}
          selected={this.props.selectedEffectId === effectId}
          pinned={this.props.pinnedEffectId === effectId}
          collapsed={this.isCollapsed(effectId)}
          onCollapse={this.collapseEffect}
          onPin={this.props.onPin}
          onUnpin={this.props.onUnpin}
          onSelect={this.props.onSelectionChange}
        />
      )

      if(!this.isCollapsed(effectId) && hasChildren) {
        this.renderEffectList(childsEffectsId, elems, depth + 1, prefix)
      }
    })
  }

  render() {
    const elems = []
    this.visuallyOrderedEffects = []

    const pinnedEffectId = this.props.pinnedEffectId
    const rootEffectIds = pinnedEffectId < 0 ? this.props.rootEffectIds : [pinnedEffectId]
    this.renderEffectList(rootEffectIds, elems, 0)
    return (
      <EffectListContainer tabIndex='0' onKeyDown={this.onKeyDown} >
        <ListView nodes={elems} />
      </EffectListContainer>
    )
  }
}

EffectList.propTypes = {
  // passed by the parent Component
  selectedEffectId: PropTypes.number,
  onSelectionChange: PropTypes.func.isRequired,
  rootEffectIds: PropTypes.array.isRequired,
  // Injected by redux
  effectsById: PropTypes.object.isRequired,
  effectsByParentId: PropTypes.object.isRequired,
}

export default connect( state => ({
  state: state,
  effectsById: state.effectsById,
  effectsByParentId: state.effectsByParentId
}))(EffectList)
