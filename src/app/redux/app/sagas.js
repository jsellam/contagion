import { all, put, call, take, takeLatest } from 'redux-saga/effects'
import { actions as AppActions } from './redux'

export default class AppSagas {

  static* method({payload})
  {

  }

  static* loop() {
    yield all([
      yield takeLatest(AppActions.callMethod, AppSagas.method),
    ])
  }
}
