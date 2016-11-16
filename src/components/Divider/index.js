import React from 'react'
import styled from 'styled-components'

export const DividerContainer = styled.div`
  position: absolute;
  z-index: 2;
  opacity: 0;
  user-select: none;
`

const HORIZONTAL = Symbol('DIVIDER_HORIZONTAL')
const VERTICAL = Symbol('DIVIDER_VERTICAL')

class Divider extends React.Component {

  isResizing = false

  getPos(e) {
    return this.props.orientation === HORIZONTAL ? e.clientY : e.clientX
  }

  getDelta(e) {

  }

  onMouseDown = e => {
    //e.preventDefault()
    this.startPos = this.getPos(e)
    this.isResizing = true
    this.props.onResizeStart()
  }

  onMouseUp = e => {
    //e.preventDefault()
    this.isResizing = false
    this.props.onResizeEnd()
  }

  onMouseMove = e => {
    if(this.isResizing) {
      e.preventDefault()
      this.endPos = this.getPos(e)
      this.scheduleResize()
    }
  }

  scheduleResize() {
    if(!this.resizeScheduled) {
      this.resizeScheduled = true
      requestAnimationFrame(() => {
        this.resizeScheduled = false
        this.props.onResize(this.startPos - this.endPos)
      })
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  }


  render() {
    return (
      <DividerContainer
        style={this.props.style}
        onMouseDown={this.onMouseDown}
      />
    )
  }
}

Divider.HORIZONTAL = HORIZONTAL
Divider.VERTICAL = VERTICAL

export default Divider
