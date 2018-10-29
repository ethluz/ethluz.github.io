import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
// import logo from '../img/logo.svg'

const Navbar = () => (

    <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
        <div className="container">
        <div className="navbar-brand">
            {/* <a className="navbar-item" href="https://ethluz.github.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </a> */}

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
                    <Link className="navbar-item" to="/tags/区块链">
                        区块链
                    </Link>
                    <Link className="navbar-item" to="tags/后端">
                        后端
                    </Link>
                    <Link className="navbar-item" to="tags/react">
                        react
                    </Link>
                  
                    <Link className="navbar-item" to="tags/">
                        全部分类
                    </Link>
                 

            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <a
                        className="navbar-item"
                        href="https://github.com/ethluz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="icon">
                            <img src={github} alt="Github" />
                        </span>
                    </a>
                </div>
            </div>
        </div>
        </div>
    </nav>
)

export default Navbar
