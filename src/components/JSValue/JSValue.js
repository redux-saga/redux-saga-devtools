import React, { PropTypes } from 'react'
import { trapMouseDown } from 'utils'
import TreeView from 'components/TreeView'
import Collapse from 'components/Collapse'
import './JSValue.css'

function span(content, className) {
  return (
    <span className={className}>{content}</span>
  )
}

function renderValue(value, isIdentifier, label, onlyPrimitive) {

  if(value === null || value === undefined) {
    return span(String(value), `jsobject-value_${value}`)
  }

  else if(value instanceof RegExp) {
    return span(value, 'jsobject-value_regex')
  }

  const type = typeof value
  if(type === 'string') {
    if(isIdentifier) {
      return span(value, 'jsobject-value_identifier')
    } else {
      return span(`"${value}"`, `jsobject-value_string`)
    }
  }
  if(
    type === 'symbol'   ||
    type === 'number'   ||
    type === 'boolean'
  ) {
    return span(`${String(value)}`, `jsobject-value_${type}`)
  }

  else if(type === 'function') {
    return (
      <span className='jsobject-value_function'>
        <span className='jsobject-value_function-keyword'>function </span>
        {value.name}()
      </span>
    )
  }

  else if(!onlyPrimitive) {
    if(typeof label === 'string') {
      label = span(label, 'jsobject-value_identifier')
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
        <div onClick={!ignoreLabelClick ? onClick : null} className='jsobject-label capture'>
          <Collapse onClick={ignoreLabelClick ? onClick : null} collapsed={collapsed} />
          {preview || getObjectSummary(data)}
        </div>
      )
    }
  }

  return (
    <div className='jsobject' {...trapMouseDown}>
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
        <div key={key} className='jsobject-row' >
          <Collapse hidden={true} />
          <span className='jsobject-key' title={key} >{key}:</span>
          <span className='jsobject-value'>
            {node}
          </span>
        </div>
      )
    } else {
      const renderRowLabel = (onClick, collapsed) => (
        <div className='jsobject-row jsobject-label'  onClick={onClick}>
          <Collapse collapsed={collapsed} />
          <span className='jsobject-key' title={key}>{key}: </span>
          <span className='jsobject-value'>
            {getObjectSummary(value)}
          </span>
        </div>
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
