import React from 'react'
import {cleanup, render, fireEvent} from '@testing-library/react'

// For styled components
import renderer from 'react-test-renderer'
import 'jest-styled-components'

// Component we built for testing
import Component from './regular'

// Views we have that are included by the component (we want to test them also)
import WrapperElement from './views/wrapper'
import ButtonElement from './views/button'
import ButtonStateWrapper from './views/button-state'

//
// TESTING STARTS BELOW HERE:
//

// aftereach - is included with JEST (global)
// cleanup - is included by react-testing-library, it will reset the testing enviorment after each test.
// So the tests can run in isolation and not pollute each other.
afterEach(cleanup)

// test - is included with JEST (global)
// It accepts a string explaining the test, followed by a function to execute with our test init. 
test('Test that we have the correct default state and click state', () => {
  // Render - is included by react-testing-library, it will return the container of the component as well as:
  // numerious helper query methods, please consult the documentation for more information:
  // https://testing-library.com/docs/react-testing-library/api#render
  const {container, getByText} = render(<Component />)
  const getElement = selector => container.querySelector(selector)
  const testCase = 'Button has been clicked'

  // We want to click the button to get the correct state
  // fireEvent - comes from test-react-library and can support all event types (and custom ones)
  fireEvent.click(getElement('button'))

  // We want to grab the element that has the correct text
  const grabTextBeforeClick = getByText(testCase)
  // We want to see if the text matches our testcase
  expect(grabTextBeforeClick.textContent).toBe(testCase)
})

test('Test that the elements have the correct styling', () => {
  // Our containers
  // renderer - comes from react-test-renderer, it is a useful rendering engine that can help
  // with Styled Components, which are views are. Allowing to check on the styling values of our components.
  const wrapperContainer = renderer.create(<WrapperElement />).toJSON()
  const buttonContainer = renderer.create(<ButtonElement />).toJSON()
  const buttonStateContainer = renderer.create(<ButtonStateWrapper />).toJSON()

  // Wrapper Container
  // toHaveStyleRule - comes from jest-styled-components (global)
  // It allows us to easier access the API of styled components for the sake of our tests.
  expect(wrapperContainer).toHaveStyleRule('font-size', '14px')
  expect(wrapperContainer).toHaveStyleRule('padding', '20px')

  // Button container
  expect(buttonContainer).toHaveStyleRule('font-size', '14px')
  expect(buttonContainer).toHaveStyleRule('padding', '20px')

  // Button state container
  expect(buttonStateContainer).toHaveStyleRule('font-size', '22px')
})