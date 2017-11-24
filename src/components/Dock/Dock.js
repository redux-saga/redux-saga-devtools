import React from 'react'
import Divider from '../Divider'
import {
    cssResize,
    DockContainer,
    DockOverlay,
    DockToggle,
    DockPanel,
    DockPanelBody
} from './styles'

const KEY_CODE_F9=120

class Dock extends React.Component {

    node = null

    state = {
        visible: false,
        width: 500,
        isResizing: false
    }

    handleKeyUp = (e) => ((e.keyCode === KEY_CODE_F9) ? this.onToggleDock() : null)  //F9

    componentDidMount = () => document.addEventListener('keyup', this.handleKeyUp)

    componentWillUnmount = () => document.removeEventListener('keyup', this.handleKeyUp)

    onToggleDock = () => {
        this.setState(state => {
            return {visible: !state.visible}
        })
    }

    onResizeStart = () => {
        this.widthOrigin = this.state.width
        this.setState({isResizing: true})
    }

    onResizeEnd = e => {
        this.setState({isResizing: false})
    }

    onResize = deltaX => {
        this.setState(state => {
            return {
                width: Math.max(0, this.widthOrigin + deltaX)
            }
        })
    }

    render() {
        const style = {
            width: this.state.visible ? this.state.width : 0
        }

        return (
            <DockContainer>
                <DockPanel resizing={this.state.isResizing} style={style}>
                    <DockOverlay />
                    {this.state.visible ? <DockToggle onClick={this.onToggleDock}>Toggle</DockToggle> : null}
                    <Divider
                        css={cssResize}
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
