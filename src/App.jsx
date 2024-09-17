import React from "react"

const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
const App2 = () => {
  return (
    <div>
      <p>Hi again</p>
      <Hello />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Everything</h1>

      <Hello />
      <App2 />
    </div>
  )
}


export default App