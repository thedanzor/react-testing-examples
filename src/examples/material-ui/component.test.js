import React from 'react'
import {cleanup} from '@testing-library/react'
import getStyleFromReact from '../../../helpers/react-style-checker/getStyleFromReact'
// Component
import Component from './component'

//
// TESTING STARTS BELOW HERE:
//

// aftereach - is included with JEST (global)
// cleanup - is included by react-testing-library, it will reset the testing enviorment after each test.
// So the tests can run in isolation and not pollute each other.
let container
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})
afterEach(() => {
  document.body.removeChild(container)
  container = null
  cleanup()
})

// test - is included with JEST (global)
// It accepts a string explaining the test, followed by a function to execute with our test init.
test('Test that the elements have the correct styling', () => {
  // Render - is included by react-testing-library, it will return the container of the component as well as:
  // numerious helper query methods, please consult the documentation for more information:
  // https://testing-library.com/docs/react-testing-library/api#render
  const styles = getStyleFromReact(<Component />, 'button')
  console.log('asdasdasdasdsadsad', styles)
})