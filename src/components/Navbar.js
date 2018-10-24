import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = () => (
//   <nav className="navbar is-transparent ">
//     <div className="container is-hidden-mobile">
//       <div className="navbar-brand">
//         <Link to="/" className="navbar-item">
//           <figure className="image">
//             {/* <img src={logo} alt="Kaldi" style={{ width: '88px' }} /> */}
//           </figure>
//         </Link>
//       </div>
//       <div className="navbar-start">
//         <Link className="navbar-item" to="/tags/区块链">
//            区块链
//         </Link>
//         <Link className="navbar-item" to="/tags/服务端">
//            服务端
//         </Link>
//         <Link className="navbar-item" to="/tags/react">
//             react
//         </Link>
//         <Link className="navbar-item" to="/tags/杂记">
//             杂记
//         </Link>
//         <Link className="navbar-item" to="/about">
//           关于我
//         </Link>
//         <Link className="navbar-item" to="/products">
//           提供服务
//         </Link>
//       </div>
//       <div className="navbar-end">
//         <a
//           className="navbar-item"
//           href="https://github.com/ethluz"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <span className="icon">
//             <img src={github} alt="Github" />
//           </span>
//         </a>
//       </div>
      
//     </div>

//     <div className="navbar-start is-hidden-tablet is-fixed-bottom">
//         <Link className="navbar-item" to="/tags/区块链">
//            区块链
//         </Link>
//         <Link className="navbar-item" to="/tags/服务端">
//            服务端
//         </Link>
//         <Link className="navbar-item" to="/about">
//           关于我
//         </Link>
//         <Link className="navbar-item" to="/products">
//           提供服务
//         </Link>
//       </div>
//   </nav>

    <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
        <div className="container">
        <div className="navbar-brand">
            <a className="navbar-item" href="https://ethluz.github.io">
                {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/> */}
            </a>

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

                    <a className="navbar-item">
                    Documentation
                    </a>

                    {/* <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                            About
                            </a>
                            <a className="navbar-item">
                            Jobs
                            </a>
                            <a className="navbar-item">
                            Contact
                            </a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">
                            Report an issue
                            </a>
                        </div>
                    </div> */}
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
