import React from 'react'
import styled from 'styled-components'
import { IconPending, IconOk, IconCancel, IconError } from '../Icons'
import { Row, Cell } from '../Layout'
import JSValue from '../JSValue'
import SagaValue from '../SagaValue'
import {
  STATUS_PENDING, STATUS_RESOLVED, STATUS_REJECTED, STATUS_CANCELLED
} from '../../store/constants'


const styles = {
  separator: {
    margin: '0 0.5em'
  },
  winner: {
    color: 'rgb(85, 139, 47)'
  },
  cancelled: {
    color: 'rgb(233, 30, 99)'
  },
  error: {
    color: 'rgb(230, 25, 25)'
  },
  pending: {
    fontSize: '0.6em',
    verticalAlign: 'super'
  }
}

const separator = <span style={styles.separator}>→</span>

const pendingIcon = (
  <Cell style={styles.pending}>
    <IconPending />
  </Cell>
)

const winnerIcon = (
  <Cell style={styles.winner}>
    <IconOk />
  </Cell>
)

const errorIcon = (
  <Cell style={styles.error}>
    <IconError />
  </Cell>
)

const cancelIcon = (
  <Cell style={styles.cancelled}>
    <IconCancel />
  </Cell>
)

function renderResolved(result, winner) {
  return (
    <div>
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
    <div>
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
