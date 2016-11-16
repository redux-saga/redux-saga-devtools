import React from 'react'
import Divider from '../Divider'
import {
  DockContainer,
  DockOverlay,
  DockToggle,
  DockPanel,
  DockPanelBody
} from './styles'


const dividerStyle = {
  left: '-5px',
  width: '10px',
  top: 0,
  height: '100%',
  cursor: 'col-resize'
}

class Dock extends React.Component {

  node = null
  state = { visible: true, width: 500, isResizing: false }


  onToggleDock = () => {
    this.setState(state => {
      return { visible: !state.visible }
    })
  }

  onResizeStart = () => {
    this.widthOrigin = this.state.width
    this.setState({ isResizing: true })
  }

  onResizeEnd = e => {
    this.setState({ isResizing: false })
  }

  onResize = deltaX => {
    this.setState(state => {
      return {
        width: Math.max(0, this.widthOrigin + deltaX)
      }
    })
  }

  render() {
    const className = `dock-panel ${this.state.isResizing ? 'dock-panel_resizing' : ''}`

    const style = {
      width: this.state.visible ? this.state.width : 0
    }

    return (
      <DockContainer>
        <DockPanel resizing={this.state.isResizing} style={style}>
          <DockOverlay />
          <DockToggle onClick={this.onToggleDock}>Toggle</DockToggle>
          <Divider
            style={dividerStyle}
            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeEnd={this.onResizeEnd}
          />
          <DockPanelBody>
            {this.props.children}
          </DockPanelBody>
        </DockPanel>
      </DockContainer>
    )
  }
}

export default Dock
