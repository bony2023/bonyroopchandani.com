import React from "react"

import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"


export default class MainApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'default'
    }
  }

  componentWillMount() {
    const isDarkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDarkModeEnabled) {
      this.setState({
        theme: "dark"
      })
    } else {
      this.setState({
        theme: "default"
      })
    }
  }

  componentDidMount() {
    window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
      this.setState({ theme: matches ? 'dark' : 'default' })
    })
  }

  render () {
    return (
      <div id="theme-container" className={`theme--${this.state.theme}`}>
        <div className="wrapper">
          <Header/>
          <Content/>
          <Footer/>
        </div>
      </div>
    )
  }
}