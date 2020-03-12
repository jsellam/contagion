import { all, put, call, take, takeLatest } from 'redux-saga/effects'
import { actions as TranslationActions, selectors as TranslationSelectors } from './redux'
import * as locales from '../../locales'


export default class TranslationSagas {
  static* setLanguage({ payload })
  {
    const { language } = payload
    const content = locales[language]
    yield put({ type: 'REDUX_I18N_SET_TRANSLATIONS', translations: { [language]: content } })
    yield put({ type: 'REDUX_I18N_SET_LANGUAGE', lang: language })
    return null
  }

  static* loop() {
    yield all([
      yield takeLatest(TranslationActions.setLanguage.getType(), TranslationSagas.setLanguage),
    ])
  }
}
