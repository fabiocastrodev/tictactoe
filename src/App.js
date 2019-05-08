import React from 'react'

import Sheltr from '@taito/react-sheltr'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import Home from './screens/Home'
import Choose from './screens/Choose'
import CreateRoom from './screens/CreateRoom'
import EnterRoom from './screens/EnterRoom'
import Awaiting from './screens/Awaiting'
import Room from './screens/Room'

import theme from './config/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Sheltr>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/choose" exact component={Choose} />
            <Route path="/create-room" exact component={CreateRoom} />
            <Route path="/enter-room" exact component={EnterRoom} />
            <Route path="/awaiting/:roomId" exact component={Awaiting} />
            <Route path="/room/:roomId" exact component={Room} />
          </Switch>
        </BrowserRouter>
      </Sheltr>
    </ThemeProvider>
  )
}

export default App
