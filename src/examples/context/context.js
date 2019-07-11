import React, {useState} from 'react'

const ComponentContext = React.createContext([{}, () => {}])

const ComponentProvider = ({children}) => {
  const [state, setState] = useState({})

  return (
    <ComponentContext.Provider value={[state, setState]}>
      {children}
    </ComponentContext.Provider>
  )
}

export { ComponentContext, ComponentProvider }