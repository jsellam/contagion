import { put } from 'redux-saga/effects'
import { actions as TranslationActions } from './translation/redux'

export default function* init() {
  yield put(TranslationActions.setLanguage('en'))
}
