import { all, fork, call } from 'redux-saga/effects'
import initSaga from './initSaga'
import AppSagas from './app/sagas'
import TranslationSagas from './translation/sagas'


function* loop() {
  yield all([
    TranslationSagas.loop(),
  ])
 return null
}

export default function* rootSaga() {
  yield fork(loop)
  yield call(initSaga)
}
