import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  appStarted: false
})

export const actions = {
  startApp: createAction('startApp')
}

export const reducer = createReducer({
  [actions.startApp]: state => state.merge({ appStarted: true })
}, initialState)


export const selectors = {
  appStarted: state => state.app.appStarted
}
