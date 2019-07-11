import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'

import {ComponentProvider, ComponentContext} from './context'

// Our styled component
const StyledComponent = styled.div`
  display: block;
  padding: 20px;
`

export const ContextConsumer = (props) => {
  const [context, setContext] = useContext(ComponentContext)

  return <StyledComponent>
    <button onClick={() => setContext({value: 'clicked', clicked: 'true'})}> Click me </button>
  </StyledComponent>
}

export const ChildComponent = () => {
  const [context, setContext] = useContext(ComponentContext)
  useEffect(() => {
    if (!context || !context.value) {
      setContext({value: 'not clicked'})
    }
  }, [context, setContext])

  return <StyledComponent>
    {context && context.value && <div> {context.value} </div>}
    <ContextConsumer />
  </StyledComponent>
}

// Our presentational component
const ComponentWrapper = (props) => {
  return <ComponentProvider>
    <ChildComponent />
  </ComponentProvider>
}
export default ComponentWrapper