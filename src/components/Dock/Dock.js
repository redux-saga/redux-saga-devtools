import React from 'react'
import Divider from '../Divider'
import './Dock.css'


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
      <div className='dock-container'>
        <div className={className} style={style}>
          <div className='dock-overlay'/>
          <button className='dock-toggle' onClick={this.onToggleDock}>Toggle</button>
          <Divider
            className='dock-panel-resize'
            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeEnd={this.onResizeEnd}
          />
          <div className='dock-panel-body' >
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Dock
