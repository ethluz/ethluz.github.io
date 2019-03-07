import React from 'react'
import Helmet from 'react-helmet'
import  { ThemeProvider } from 'styled-components'
import './all.sass'
import './styles.css'
import Navbar from '../components/Navbar'
const theme = {
  monospace: `'Source Code Pro', monospace`,
  tablet: `only screen and (max-width: 800px)`,
  mobile: `only screen and (max-width: 650px)`,
  colors: {
    primary: '#2097e4',
    text: '#333',
  },
}

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet title="luz-blog" />  
        <Navbar />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  )
  
  export default TemplateWrapper