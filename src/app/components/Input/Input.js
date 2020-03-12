import React from 'react'


export default ({label, id, onChange, value}) => {

  const onChangeText = (event) => {
    //const v = parseFloat(event.target.value)
    onChange(id,event.target.value)
  }

  return (
    <div className="input-container">
      <div className="wrap-label">
        <label for={id}>{label}</label>
      </div>
      <input type="text" id={id} value={value} onChange={onChangeText}/>
    </div>
  )
}