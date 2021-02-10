import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Layout} from 'antd'

const App = () => {
  return (
    <Layout>
      <Navbar />
      <Routes />
      <Layout.Footer>by Team Butterfingers</Layout.Footer>
    </Layout>
  )
}

export default App
