import React, {useState} from 'react'
import ButtonEle from './views/button'
import Wrapper from './views/wrapper'
import ButtonStateWrapper from './views/button-state'

const RegularReactComponent = () => {
  const [buttonState, setButtonState] = useState(false)

  return <Wrapper>
    {buttonState && <ButtonStateWrapper>Button has been clicked</ButtonStateWrapper>}
    <ButtonEle onClick={() => setButtonState(true)}> Click me </ButtonEle>
  </Wrapper>
}

export default RegularReactComponent
