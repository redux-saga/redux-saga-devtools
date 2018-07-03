import styled from 'styled-components'

export const SagaMonitorContainer = styled.div`
  font-family: monospace;
  font-size: 13px;
  color: ${props => props.theme.fontColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};

  & * {
    box-sizing: border-box;
  }

  & [hidden] {
    visibility: hidden;
  }
`

export const SagaMonitorHeader = styled.section`
  background-color: ${props => props.theme.headerBackground};
  border-bottom: 1px solid ${props => props.theme.border};
  position: relative;
  flex: none;

  & hr {
    background-color: ${props => props.theme.selectedHeader};
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    border: none;
    height: 2px;
    margin: 0;
    position: absolute;
    bottom: -1px;
    transition: .2s ease-in-out;
  }
`

export const SagaMonitorOption = styled.div`
  padding: 5px 10px;
  width: 80px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.headerHighlight};
  }
`

export const SagaMonitorBody = styled.section`
  display: flex;
  flex-direction: column;
  flex: auto;
  margin-top: 10px;
`
