import React from "react"
import Modal from "react-modal"
import Helmet from "react-helmet"
import MdClose from "react-icons/lib/md/close"
import { navigate, PageRenderer } from "gatsby"
import presets, { colors } from "../utils/presets"

import Navigation from "../components/navigation"
import MobileNavigation from "../components/navigation-mobile"
// 内容区域
import PageWithSidebar from "../components/page-with-sidebar"
import "../css/prism-coy.css"

import mousetrap from "mousetrap"

// Import Futura PT typeface
import "../fonts/Webfonts/futurapt_book_macroman/stylesheet.css"
import "../fonts/Webfonts/futurapt_bookitalic_macroman/stylesheet.css"
import "../fonts/Webfonts/futurapt_demi_macroman/stylesheet.css"
import "../fonts/Webfonts/futurapt_demiitalic_macroman/stylesheet.css"

// Other fonts
import "typeface-spectral"
import "typeface-space-mono"

let windowWidth

class DefaultLayout extends React.Component {
  constructor() {
    super()
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleCloseModal() {
    navigate(this.props.modalBackgroundPath)
  }

  componentDidMount() {
    Modal.setAppElement(`#___gatsby`)

    if (this.props.isModal && window.innerWidth > 750) {
      mousetrap.bind(`left`, this.props.modalPrevious)
      mousetrap.bind(`right`, this.props.modalNext)
      mousetrap.bind(`spacebar`, this.props.modalNext)

      document.querySelector(`html`).style.overflowY = `hidden`
    }
  }

  componentWillUnmount() {
    if (this.props.isModal && window.innerWidth > 750) {
      mousetrap.unbind(`left`)
      mousetrap.unbind(`right`)
      mousetrap.unbind(`spacebar`)

      document.querySelector(`html`).style.overflowY = `auto`
    }
  }

  render() {
    // const {
    //   location = {
    //     pathname: `/starter-showcase`,
    //   },
    // } = this.props // location will be undefined if on 'starter-showcase'
    // const isHomepage = location.pathname === false

    // SEE: template-docs-markdown for why this.props.isSidebarDisabled is here
    const isSidebarDisabled =
      this.props.isSidebarDisabled || !this.props.itemList
    let isModal = false
    if (!windowWidth && typeof window !== `undefined`) {
      windowWidth = window.innerWidth
    }
    if (this.props.isModal && windowWidth > 750) {
      isModal = true
    }

    if (isModal && window.innerWidth > 750) {
      return (
        <React.Fragment>
          <PageRenderer
            location={{ pathname: this.props.modalBackgroundPath }}
          />
          <Modal
            isOpen={true}
            style={{
              content: {
                top: `inherit`,
                left: `inherit`,
                right: `inherit`,
                bottom: `inherit`,
                margin: `0 auto`,
                width: `750px`,
                background: `none`,
                border: `none`,
                padding: `40px 0`,
                overflow: `visible`,
              },
              
              overlay: {
                position: `absolute`,
                top: 0,
                left: 0,
                right: 0,
                bottom: `unset`,
                minHeight: `100%`,
                minWidth: `100%`,
                zIndex: 10,
                overflowY: `auto`,
                backgroundColor: `rgba(255, 255, 255, 0.95)`,
              },
            }}
            onRequestClose={() => navigate(this.props.modalBackgroundPath)}
            contentLabel="Site Details Modal"
          >
            <div
              css={{
                backgroundColor: `#ffffff`,
                borderRadius: presets.radius,
                boxShadow: `0 0 90px -24px ${colors.gatsby}`,
                position: `relative`,
              }}
            >
              <button
                onClick={this.handleCloseModal}
                css={{
                  background: colors.ui.bright,
                  border: 0,
                  borderBottomLeftRadius: presets.radius,
                  borderTopRightRadius: presets.radius,
                  color: colors.gatsby,
                  cursor: `pointer`,
                  position: `absolute`,
                  left: `auto`,
                  right: 0,
                  height: 40,
                  width: 40,
                  "&:hover": {
                    background: colors.gatsby,
                    color: `#fff`,
                  },
                }}
              >
                <MdClose />
              </button>
              {this.props.children}
              {this.props.modalPreviousLink}
              {this.props.modalNextLink}
            </div>
          </Modal>
        </React.Fragment>
      )
    }

    return (
        // {isHomepage ? `is-homepage` : ``}
      <div className= 'is-homepage'>
        <Helmet defaultTitle={`路子-blog`} titleTemplate={`%s | 路子的博客`}>
          <meta name="twitter:site" content="@gatsbyjs" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="ethluz-blog" />
          <link
            rel="canonical"
            href={`https://gatsbyjs.org${this.props.location.pathname}`}
          />
          <html lang="en" />
        </Helmet>
      
        <Navigation pathname={this.props.location.pathname} />
        <div
          className={`main-body`}
          css={{
            paddingTop: presets.bannerHeight,
            [presets.Tablet]: {
              margin: `0 auto`,
            //   paddingTop: isHomepage
            //     ? presets.bannerHeight
            //     : `calc(${presets.bannerHeight} + ${presets.headerHeight})`,
            },
          }}
        >
          <PageWithSidebar
            disable={isSidebarDisabled}
            itemList={this.props.itemList}
            location={this.props.location}
            enableScrollSync={this.props.enableScrollSync}
            renderContent={() => this.props.children}
          />

        </div>
        <MobileNavigation />
      </div>
    )
  }
}

export default DefaultLayout
