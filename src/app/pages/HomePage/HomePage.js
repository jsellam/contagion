import React from 'react'
import {localize} from 'redux-i18n'

@localize()
class HomePage extends React.Component {

  render() {
    const {t} = this.props
    return (
      <div>{t('homeTitle')}</div>
    )
  }
}

export default HomePage