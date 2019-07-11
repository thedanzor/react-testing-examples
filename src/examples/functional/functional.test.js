import React from 'react'
import {cleanup, render, fireEvent} from '@testing-library/react'

// For styled components
import renderer from 'react-test-renderer'
import 'jest-styled-components'

// The component import
import Component, {multiplyByTwo, dividedByTwo, addToItself} from './functional'

//
// TESTING STARTS BELOW HERE:
//

// aftereach - is included with JEST (global)
// cleanup - is included by react-testing-library, it will reset the testing enviorment after each test.
// So the tests can run in isolation and not pollute each other.
afterEach(cleanup)

// test - is included with JEST (global)
// It accepts a string explaining the test, followed by a function to execute with our test init. 
test('Test the component does what we expect it too', () => {
  // Render - is included by react-testing-library, it will return the container of the component as well as:
  // numerious helper query methods, please consult the documentation for more information:
  // https://testing-library.com/docs/react-testing-library/api#render
  const {container, getByText} = render(<Component />)
  const addButton = container.querySelector('[data-type="plus"]')
  const multiplyButton = container.querySelector('[data-type="multiply"]')
  const diviedButton = container.querySelector('[data-type="divied"]')

  // Expect initial state to be 1
  expect(getByText('1'))

  // Lets start clicking the buttons to change the state
  fireEvent.click(addButton)
  expect(getByText('2'))

  fireEvent.click(multiplyButton)
  expect(getByText('4'))

  fireEvent.click(diviedButton)
  expect(getByText('2'))

  fireEvent.click(diviedButton)
  expect(getByText('1'))
})

test('Test the functions as smaller isolated parts', () => {
  let int = 1

  // test the multiply
  int = multiplyByTwo(int)
  expect(int).toBe(2)

  // Lets multiply it again
  int = multiplyByTwo(int)
  expect(int).toBe(4)

  // Lets divide it
  int = dividedByTwo(int)
  expect(int).toBe(2)

  // Lets add it too itself
  int = addToItself(int)
  expect(int).toBe(4)
})

test('Test that the component has the correct styling', () => {
  // renderer - comes from react-test-renderer, it is a useful rendering engine that can help
  // with Styled Components, which are views are. Allowing to check on the styling values of our components.
  const wrapperContainer = renderer.create(<Component />).toJSON()

  // Test styling
  expect(wrapperContainer).toHaveStyleRule('padding', '20px')
})