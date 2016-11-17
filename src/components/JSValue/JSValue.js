import React, { PropTypes } from 'react'
import { trapMouseDown } from '../../utils'
import TreeView from '../TreeView'
import Collapse from '../Collapse'
import {
  Label, Entry, Key, Value,
  VNull, VQuoted, VUnquoted, VFunction,
  Keyword, Identifier
} from './styles'

const vnull = <VNull />
const vfuncKeyword = <Keyword>function</Keyword>

function renderValue(value, isIdentifier, label, onlyPrimitive) {

  if(value === null || value === undefined) {
    return vnull
  }

  else if(value instanceof RegExp) {
    return <VQuoted>{value}</VQuoted>
  }

  const type = typeof value
  if(type === 'string') {
    if(isIdentifier) {
      return <Identifier>{value}</Identifier>
    } else {
      return <VQuoted>'{value}'</VQuoted>
    }
  }
  if(
    type === 'symbol'   ||
    type === 'number'   ||
    type === 'boolean'
  ) {
    return <VUnquoted>{String(value)}</VUnquoted>
  }

  else if(type === 'function') {
    return (
      <VFunction>
        {vfuncKeyword}
        {value.name}()
      </VFunction>
    )
  }

  else if(!onlyPrimitive) {
    if(typeof label === 'string') {
      <Identifier>{label}</Identifier>
    }
    return (
      <JSObject data={value} preview={label} />
    )
  }
}

function getObjectSummary(obj) {
  return (
    Array.isArray(obj)
      ? `Array[${obj.length}]`
      : obj.constructor.name
  )
}

function JSValue({value, isIdentifier, label}) {
  return renderValue(value, isIdentifier, label, false)
}

JSValue.propTypes = {
  value: PropTypes.any,
  isIdentifier: PropTypes.bool,
  label: PropTypes.any,
}

export function JSObject({data, renderLabel, preview, ignoreLabelClick}) {
  const keys = Object.keys(data)
  if(!keys.length) {
    return renderLabel ? renderLabel() : <span>'{}'</span>
  }

  if(!renderLabel) {
    renderLabel = function defaultRenderLabel(onClick, collapsed) {
      return (
        <Label onClick={!ignoreLabelClick ? onClick : null}>
          <Collapse onClick={ignoreLabelClick ? onClick : null} collapsed={collapsed} />
          {preview || getObjectSummary(data)}
        </Label>
      )
    }
  }

  return (
    <div {...trapMouseDown}>
      <TreeView renderLabel={renderLabel} defaultCollapsed={true} >
      {() => renderObjectDetails(keys, data)}
      </TreeView>
    </div>
  )
}

function renderObjectDetails(keys, data) {
  return keys.map(key => {
    const value = data[key]
    let node = renderValue(value, false, null, true)
    if(node) {
      return (
        <Entry key={key}>
          <Collapse hidden={true} />
          <Key title={key} >{key}:</Key>
          <Value>
            {node}
          </Value>
        </Entry>
      )
    } else {
      const renderRowLabel = (onClick, collapsed) => (
        <Entry onClick={onClick}>
          <Collapse collapsed={collapsed} />
          <Key title={key}>{key}: </Key>
          <Value>
            {getObjectSummary(value)}
          </Value>
        </Entry>
      )
      return (
        <JSObject key={key} data={value} renderLabel={renderRowLabel} />
      )
    }
  })
}

JSObject.propTypes = {
  data: PropTypes.any.isRequired,
  renderLabel: PropTypes.func,
  preview: PropTypes.any,
  ignoreLabelClick: PropTypes.bool,
}

export default JSValue
