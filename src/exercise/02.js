// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// functions starting with the `use` prefix are considered custom hooks
// a custom hook just means this function uses react Hooks (either build in or custom ones)
function useLocalStorageState(
  key,
  defaultValue = '',
  // accepting all types of data, not just strings
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    } else {
      // accepting funcitons as default values
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    }
  })

  React.useEffect(() => {
    window.localStorage.getItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
