import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import * as is from "@redux-saga/is";
import { Row, Cell } from "../Layout";
import SagaValue from "../SagaValue";
import Result from "./Result";

const EffectType = styled.span`
  color: ${props => props.theme.effectType};
  margin-right: 5px;
`;

/* eslint-disable no-cond-assign */
class Effect extends React.Component {
  effectId = this.props.effect.effectId;

  renderResult(status, result, error, winner) {
    return (
      <Result status={status} result={result} error={error} winner={winner} />
    );
  }

  render() {
    const { effect, isRoot } = this.props;
    const { status, result, error, winner } = effect;

    let nodes = [];
    let data;

    if (isRoot) {
      nodes = nodes.concat(
        renderFuncCall(effect.effect.saga, effect.effect.args),
        this.renderResult(status, result, error)
      );
    } else {
      const sagaEffect = effect.effect;

      if (is.array(sagaEffect)) {
        nodes = nodes.concat(renderEffectType("all"));
      } else if (is.iterator(sagaEffect)) {
        nodes = nodes.concat(
          renderEffectType(sagaEffect.payload.name),
          this.renderResult(status, result, error, winner)
        );
      } else {
        switch (sagaEffect.type) {
          case "ACTION_CHANNEL":
            nodes = nodes.concat(
              renderEffectType("actionChannel"),
              <SagaValue
                value={sagaEffect.payload.action}
                isIdentifier={true}
              />,
              this.renderResult(status, result, error, winner)
            );
            break;
          case "ALL":
            nodes = nodes.concat(
              renderEffectType("all"),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "CALL":
            nodes = nodes.concat(
              renderEffectType("call"),
              renderFuncCall(sagaEffect.payload.fn, sagaEffect.payload.args),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "CANCEL":
            nodes = nodes.concat(
              renderEffectType("cancel"),
              <SagaValue
                value={data}
                isIdentifier={true}
                label={sagaEffect.payload}
              />
            );
            break;

          case "CANCELLED":
            nodes = nodes.concat(
              renderEffectType("cancelled(?)"),
              this.renderResult(status, result, error, winner)
            );
            break;
          case "CPS":
            nodes = nodes.concat(
              renderEffectType("cps"),
              renderFuncCall(
                sagaEffect.payload.payload.fn,
                sagaEffect.payload.payload.args
              ),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "FLUSH":
            nodes = nodes.concat(
              renderEffectType("flush"),
              renderFuncCall(sagaEffect.payload.payload),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "FORK":
            nodes = nodes.concat(
              renderEffectType("fork"),
              renderFuncCall(sagaEffect.payload.fn, sagaEffect.payload.args),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "GET_CONTEXT":
            nodes = nodes.concat(
              renderEffectType("getContext"),
              <SagaValue value={sagaEffect.payload} isIdentifier={true} />,
              this.renderResult(status, result, error, winner)
            );
            break;
          case "JOIN":
            nodes = nodes.concat(
              renderEffectType("join"),
              <SagaValue
                value={sagaEffect.payload}
                isIdentifier={true}
                label={sagaEffect.payload.name}
              />,
              this.renderResult(status, result, error, winner)
            );
            break;

          case "PUT":
            nodes = nodes.concat(
              renderEffectType("put"),
              <SagaValue
                value={sagaEffect.payload.channel || sagaEffect.payload.action}
                label={sagaEffect.payload.action.type}
                isIdentifier={true}
              />
            );
            break;

          case "RACE":
            nodes = nodes.concat(
              renderEffectType("race"),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "SELECT":
            nodes = nodes.concat(
              renderEffectType("select"),
              renderFuncCall(
                sagaEffect.payload.selector,
                sagaEffect.payload.args
              ),
              this.renderResult(status, result, error, winner)
            );
            break;

          case "SET_CONTEXT":
            nodes = nodes.concat(
              renderEffectType("setContext"),
              renderFuncCall({ name: "" }, [sagaEffect.payload])
            );
            break;
          case "TAKE":
            nodes = nodes.concat(
              renderEffectType("take"),
              <SagaValue
                value={sagaEffect.payload.pattern || sagaEffect.payload.channel}
                isIdentifier={true}
              />,
              this.renderResult(status, result, error, winner)
            );
            break;

          default:
            nodes = nodes.concat(
              renderEffectType("Unknown"),
              this.renderResult(status, result, error, winner)
            );
        }
      }
    }
    return renderEffect(effect, status, nodes);
  }
}

function renderEffect(effect, status, nodes) {
  return (
    <Row>
      {nodes.map((node, idx) => (
        <Cell key={idx}>{node}</Cell>
      ))}
    </Row>
  );
}

function renderEffectType(type) {
  return <EffectType>{type}</EffectType>;
}

function renderFuncCall(fn, args) {
  if (!args.length) {
    return <span>{fn.name}()</span>;
  }

  return [<span>{fn.name}(</span>, ...renderFuncArgs(args), <span>)</span>];
}

function renderFuncArgs(args) {
  const elements = [];
  args.forEach((arg, idx) => {
    elements.push(<SagaValue value={arg} />);
    if (idx < args.length - 1) {
      elements.push(<span>, </span>);
    }
  });
  return elements;
}

Effect.propTypes = {
  effect: PropTypes.object.isRequired
};

export default Effect;
