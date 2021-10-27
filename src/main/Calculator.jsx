import React, { useState } from "react";
import "./Calculator.css";

import Button from "../components/Button"
import Display from "../components/Display";

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default function Calculator(props) {

  let [state, setState] = useState({ ...initialState })

  function addDigit(digit) {
    if (digit === '.' && state.displayValue.includes(".")) return

    const clearDisplay = state.displayValue === '0' || state.clearDisplay
    const currentValue = clearDisplay ? '' : state.displayValue
    const displayValue = currentValue + digit
    setState(prevState => ({ ...prevState, displayValue, clearDisplay: false }))

    if (digit !== '.') {
      const i = state.current
      const newValue = parseFloat(displayValue)
      const values = state.values
      values[i] = newValue
      setState(prevState => ({ ...prevState, values }))

      //TIRAR
      console.log(values)
    }
  }

  function clearMemory() {
    setState({ ...initialState })
  }

  function setOperation(operation) {
    if (state.current === 0) {
      setState(prevState => (
        { ...prevState, operation: operation, current: 1, clearDisplay: true }
      ))

    } else {
      const equals = operation === '='
      console.log(equals)
      const currentOperation = state.operation

      const values = [...state.values]
      values[0] = resolve(currentOperation, values)
      values[1] = 0

      setState(prevState => ({
        ...prevState,
        clearDisplay: !equals,
        current: equals ? 0 : 1,
        displayValue: values[0],
        operation: equals ? null : operation,
        values: [...values],
      }))
      console.log(state)
    }
  }

  function resolve(op, operands) {
    if (op === '+') return operands[0] + operands[1];
    else if (op === '-') return operands[0] - operands[1];
    else if (op === '*') return operands[0] * operands[1];
    else if (op === '/') {
      if (operands[1] !== 0) {
        return operands[0] / operands[1];
      } else {
        return 'NaN'
      }
    }
  }

  return (
    <div className="calculator">
      <Display value={state.displayValue}></Display>
      <Button label="AC" click={clearMemory} triple ></Button>
      <Button label="/" click={setOperation} operation></Button>
      <Button label="7" click={addDigit} ></Button>
      <Button label="8" click={addDigit} ></Button>
      <Button label="9" click={addDigit} ></Button>
      <Button label="*" click={setOperation} operation></Button>
      <Button label="4" click={addDigit} ></Button>
      <Button label="5" click={addDigit} ></Button>
      <Button label="6" click={addDigit} ></Button>
      <Button label="-" click={setOperation} operation></Button>
      <Button label="1" click={addDigit} ></Button>
      <Button label="2" click={addDigit} ></Button>
      <Button label="3" click={addDigit} ></Button>
      <Button label="+" click={setOperation} operation></Button>
      <Button label="0" click={addDigit} double ></Button>
      <Button label="." click={addDigit} ></Button>
      <Button label="=" click={setOperation} operation></Button>
    </div>
  )
}
