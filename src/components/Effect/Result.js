import React from 'react'
import { IconPending, IconOk, IconCancel, IconError } from '../Icons'
import { Row, Cell } from '../Layout'
import JSValue from '../JSValue'
import SagaValue from '../SagaValue'
import {
  STATUS_PENDING, STATUS_RESOLVED, STATUS_REJECTED, STATUS_CANCELLED
} from '../../store/constants'
import './Result.css'

const separator = <span className='result-separator'>→</span>

const pendingIcon = (
  <Cell className='result-pending'>
    <IconPending />
  </Cell>
)

const winnerIcon = (
  <Cell className='result_winner'>
    <IconOk />
  </Cell>
)

const errorIcon = (
  <Cell className='result-error'>
    <IconError />
  </Cell>
)

const cancelIcon = (
  <Cell className='result_cancelled'>
    <IconCancel />
  </Cell>
)

function renderResolved(result, winner) {
  return (
    <div className='result'>
      {separator}
      {winner ? winnerIcon : null}
      <Cell>
        <SagaValue value={result}/>
      </Cell>
    </div>
  )
}

function renderRejected(error) {
  return (
    <div className='result'>
      {separator}
      {errorIcon}
      <JSValue value={error} />
    </div>
  )
}


export default function Result({status, result, error, winner}) {
  switch (status) {
    case STATUS_PENDING:
      return pendingIcon
    case STATUS_RESOLVED:
      return renderResolved(result, winner)
    case STATUS_REJECTED:
      return renderRejected(error)
    case STATUS_CANCELLED:
      return cancelIcon
    default:
  }
}
