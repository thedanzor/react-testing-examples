import { JSDOM } from 'jsdom'
import { render } from 'react-dom'

const getComputedStyles = (element, selector, selectorType) => {
  const window = (new JSDOM(``, { pretendToBeVisual: true })).window
  const { document } = window || {}

  // Lets make sure JSDOM has setup the enviorment for us.
  if (!document || !document.body || !window || !window.getComputedStyle) {
    console.error('Get Style From React - Window / Document / Body could not be generated')
    return null
  }

  // Let's try and render the component into the DOM we created.
  const wrappingElement = document.createElement('div')
  wrappingElement.id = 'styleExample'
  document.body.appendChild(wrappingElement)

  render(
    element,
    document.getElementById('styleExample')
  )

  // Lets validate the DOM is valid and ready before proceeding.
  const container = document.querySelector('#styleExample')
  if (!container || !container.firstChild) {
    console.error('Get Style From React - No component was rendered')
    return null
  }

  // Default flow, no selector was given, so we care about the parent component styling
  if (!selector) {
    return window.getComputedStyle(container.firstChild)
  }

  // Find all the elements with the selector
  const findElements = container.querySelectorAll(selector)

  if (!findElements || findElements.length === 0) {
    console.error('Get Style From React - QuerySelector could not find any elements')
    return null
  }

  // If we aren't meant to handle all elements, return first.
  //
  // We return the following values:
  // style - computed style array
  // element - we return this so we can do extra checks later on
  if (selectorType !== 'all') {
    return {
      style: window.getComputedStyle(findElements[0]),
      element: findElements[0]
    }
  }

  let computedStyles = []
  findElements.forEach(element => {
    if (element){
      computedStyles.push({
        style: window.getComputedStyle(element),
        element: element
      })
    }
  })

  return computedStyles
}

export default getComputedStyles