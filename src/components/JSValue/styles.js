import styled from 'styled-components'

export const Label = styled.div`
  cursor: pointer;
`

export const Entry = styled.div`
`

export const Key = styled.span`
  display: inline-block;
  max-width: 140px;
  padding-right: 10px;
  vertical-align: top;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  color: ${props => props.theme.identifier};
`

export const Value = styled.div`
  display: inline-block;
  vertical-align: top;
`

export const VNull = styled.span`
  color: rgb(128, 128, 128);
  font-style: italic;
`

export const VQuoted = styled.span`
  color: rgb(233, 63, 59);
  white-space: pre;
`

export const VUnquoted = styled.span`
  color: ${props => props.theme.unquoted};
`

export const VFunction = styled.span`
  font-style: italic;
`

export const Keyword = styled.span`
  color: rgb(242, 85, 217);
`

export const Identifier = styled.span`
  color: ${props => props.theme.identifier};
`
