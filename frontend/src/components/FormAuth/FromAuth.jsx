import React from 'react'

const FromAuth = ({ children, title, inputData }) => {
  return (
    <form className="authorization__sign-in">
      <h3 className="sign-in__title">{title}</h3>
      {inputData.map((data, i) => (
        <div className="input__field" key={`${i + data.placeholder}`}>
          <i className={`fas ${data.icon}`} />
          <input
            className="input"
            type={data.type}
            placeholder={data.placeholder}
            name={data?.name}
            value={data.value}
            onChange={(event) => data.setValue(event)}
          />
        </div>
      ))}
      {children}
    </form>
  )
}

export default FromAuth
