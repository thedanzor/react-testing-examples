import React, {useState} from 'react'
import {cleanup, render, fireEvent} from '@testing-library/react'

// For styled components
import renderer from 'react-test-renderer'
import 'jest-styled-components'

// The component import
import Component, {ChildComponent} from './component'

// context
import {ComponentProvider} from './context'

//
// TESTING STARTS BELOW HERE:
//

// aftereach - is included with JEST (global)
// cleanup - is included by react-testing-library, it will reset the testing enviorment after each test.
// So the tests can run in isolation and not pollute each other.
afterEach(cleanup)

// Build generic test
// This function exposes a test, allowing us to reuse the text logic multuple times.
const GenericTestCase = Container => {
  // test - is included with JEST (global)
  // It accepts a string explaining the test, followed by a function to execute with our test init. 
  test('Test the component does what we expect it too', () => {
    const {container, getByText} = render(Container)
    const changeButton = container.querySelector('button')
    const defaultValue = getByText('not clicked')

    // Expect initial state
    expect(defaultValue)

    // When clicking the buttong we expect it to change
    fireEvent.click(changeButton)
    expect(getByText('clicked'))
  })
}

// Run our tests through the main component and the child
GenericTestCase(<Component />)
GenericTestCase(<ComponentProvider><ChildComponent /></ComponentProvider>)

// Other test cases
test('Test that the component has the correct styling', () => {
  // renderer - comes from react-test-renderer, it is a useful rendering engine that can help
  // with Styled Components, which are views are. Allowing to check on the styling values of our components.
  const wrapperContainer = renderer.create(<Component />).toJSON()

  // Test styling
  expect(wrapperContainer).toHaveStyleRule('padding', '20px')
})