import React from 'react'
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const navigate = useNavigate()
  let logoutHandler = () => {
    localStorage.removeItem('my_token');
    navigate('/')
  }
  return (
    <>
      <div className="header">
        <div className="header_left">
          <span className="material-icons">
            menu
          </span>
          <img src="https://www.nicepng.com/png/detail/207-2076661_email-logo-transparent-www-mail-logo-png-transparent.png" alt="" />
        </div>
        <div className="header_middle">
          <span className="material-icons">search</span>
          <input type="text" placeholder="Search Mail" />
          <span className="material-icons">arrow_drop_down</span>
        </div>
        <div className="header_right">
          <span onClick={logoutHandler} className="material-icons">account_circle</span>
        </div>
      </div>
    </>
  )
}

export default Topbar