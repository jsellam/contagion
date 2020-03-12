import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18nState } from 'redux-i18n'
import rootSaga from './sagas'
import entities from './entities'


const actions = {}
const selectors = {}
const reducers = {
  i18nState
}

Object.keys(entities)
  .forEach((key) => {
    selectors[key] = entities[key].selectors
    actions[key] = entities[key].actions
    reducers[key] = entities[key].reducer
  })

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware)

const combinedReducers = combineReducers(reducers)

//export const reducer = persistReducer(config.persist.options, combinedReducers)
export const store = createStore(combinedReducers, composeWithDevTools(enhancer))
//export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)


