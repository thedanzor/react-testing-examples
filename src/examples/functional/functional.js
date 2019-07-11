import React, {useState} from 'react'
import styled from 'styled-components'

// Our styled component
const StyledComponent = styled.div`
  display: block;
  padding: 20px;
`

// Our component logic
export const multiplyByTwo = int => {
  return (int * 2)
}

export const dividedByTwo = int => {
  return (int / 2)
}

export const addToItself = int => {
  return (int + int)
}

// Our presentational component
const ComponentWrapper = (props) => {
  const [state, setState] = useState({value: 1})

  return <StyledComponent>
    <button data-type='plus' onClick={() => setState({value: addToItself(state.value)})} />
    <button data-type='multiply' onClick={() => setState({value: multiplyByTwo(state.value)})} />
    <button data-type='divied' onClick={() => setState({value: dividedByTwo(state.value)})} />

    <div> {state.value} </div>
  </StyledComponent>
}
export default ComponentWrapper