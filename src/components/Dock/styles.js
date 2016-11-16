import styled from 'styled-components'

export const DockContainer = styled.div`
  position: fixed;
  width: 0px;
  height: 0px;
  top: 0px;
  left: 0px;
  z-index: 99999999;
`

export const DockOverlay = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 0;
  background: rgba(0, 0, 0, 0);
  opacity: 1;
  pointer-events: none;
`

export const DockToggle = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  margin: 5px;
`

export const DockPanel = styled.div`
  position: fixed;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.298039) 0px 0px 4px;
  background: white;
  right: 0;
  top: 0px;
  width: 40%;
  height: 100%;
  border-left: ${p => p.resizing ? '1px solid rgb(200,200,200)' : 'none' };
  transition: ${p => p.resizing ? 'width 0.1s ease-out' : 'none'};
`

export const DockPanelBody = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
