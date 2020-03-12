import React from 'react'
import classnames from 'classnames'
import "./Icon.scss"

const Icon = ({icon, className}) => (
  <i className={classnames(icon, className)}></i>
)


export default Icon
