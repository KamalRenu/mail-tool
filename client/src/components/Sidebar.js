import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Link to="/compose"><button className="sidebar_compose">
          <span className="material-icons">add</span>
          compose
        </button></Link>
        <div className="sidebarOption sidebarOption_active">
          <span className="material-icons">near_me</span>
          <h3>Send</h3>
        </div>
      </div>
    </>
  )
}

export default Sidebar