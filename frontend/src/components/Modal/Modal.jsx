import React from 'react'

const Modal = ({ children, visible, setVisible }) => {
  return (
    <div
      className={visible ? 'modal active' : 'modal'}
      onClick={() => setVisible(false)}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
        <button
          className="btn btn__red btn__modal-close"
          onClick={() => setVisible(false)}
        >
          &#10006;
        </button>
      </div>
    </div>
  )
}

export default Modal
