import React from 'react'
import SagaValue from 'components/SagaValue'

export default function FunctionCall(fn, args) {
  if(!args.length) {
    return <span>{fn.name}()</span>
  }

  const nodes = [fn.name]
  renderFuncArgs(args, nodes)

  return React.createElement(
    'div',
    { style: {display: 'flex', alignItems: 'flex-start'} },
    ...nodes
  )
}

function renderFuncArgs(args, nodes) {
  args.forEach((arg, idx) => {
    nodes.push(<SagaValue value={arg}/>)
    if(idx < args.length - 1) {
      nodes.push(<span>', '</span>)
    }
  })
}
