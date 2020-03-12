import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
})

export const actions = {
  setLanguage: createAction('set language', language => ({ language }))
}

export const reducer = createReducer({
}, initialState)


export const selectors = {
}
