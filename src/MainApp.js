import React from "react"

import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"


export default class MainApp extends React.Component {
  render () {
    return (
      <div className="wrapper">
		    <Header/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}