import React from 'react'
import Feed from './Feed'
import Header from './Header'
import Sidebar from './Sidebar'
import "./Home.css"
function Home() {
  return (
    <div className='app'>
        <Header />

        <div className='app-body'>

        <Sidebar />
        <Feed />
        </div>
    </div>
  )
}

export default Home