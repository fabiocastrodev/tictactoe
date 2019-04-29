import React from 'react'

import Sheltr from '@taito/react-sheltr'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './screens/Home'
import Choose from './screens/Choose'

function App() {
  return (
    <Sheltr>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/choose" exact component={Choose} />
      </BrowserRouter>
    </Sheltr>
  )
}

export default App
