import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Task from './Task'
import Tasks from './Tasks'

const Main = () => (
  <main>
    <Switch>
      <Route path='/tasks' component={Tasks}/>
      <Route exact path='/task/:id' component={Task}/>
      <Redirect from="/" to="/tasks" />
    </Switch>
  </main>
)

export default Main;