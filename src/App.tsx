import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import mainRoutes from './route/main'

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        {mainRoutes.map((route, idx) => <Route {...route} key={idx}/> )}
      </Switch>
    </BrowserRouter>
  )
}
