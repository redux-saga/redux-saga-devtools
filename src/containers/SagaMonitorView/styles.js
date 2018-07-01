import styled from 'styled-components'

export const SagaMonitorContainer = styled.div`
  font-family: monospace;
  font-size: 13px;
  color: rgb(33,33,33);
  height: 100%;
  display: flex;
  flex-direction: column;

  & * {
    box-sizing: border-box;
  }

  & [hidden] {
    visibility: hidden;
  }
`

export const SagaMonitorHeader = styled.section`
  background-color: rgb(243, 243, 243);
  border-bottom: 1px solid rgb(204, 204, 204);
  position: relative;
  flex: none;

  & hr {
    background-color: rgb(56, 121, 217);
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
    background-color: rgb(220, 220, 220);
  }
`

export const SagaMonitorBody = styled.section`
  display: flex;
  flex-direction: column;
  flex: auto;
  margin-top: 10px;
`
