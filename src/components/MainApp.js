import React, { useContext } from "react"

import { ThemeContext } from "../context/ThemeContext"

import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"


export default function MainApp(props) {
  const theme = useContext(ThemeContext)

  return (
    <div id="theme-container" className={`theme--${theme}`}>
      <div className="wrapper">
        <Header/>
        <Content/>
        <Footer/>
      </div>
    </div>
  )
}