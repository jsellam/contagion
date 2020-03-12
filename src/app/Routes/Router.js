import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {config} from './index'

const Router = () => (
  <BrowserRouter>
    <Switch>
    {
      config.map(e => (
        <Route exact={e.exact === true} path={e.path} component={e.component}/>
      ))
    }
    </Switch>
  </BrowserRouter>
)

export default Router



