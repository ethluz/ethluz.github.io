import React from "react"
import { Link } from "gatsby"


import presets, { colors } from "../utils/presets"
import typography, { rhythm, scale, options } from "../utils/typography"

const MobileNavItem = ({ linkTo, label, icon }) => (
  <Link
    to={linkTo}
    css={{
      color: colors.gatsby,
      fontSize: scale(-1 / 2).fontSize,
      flexShrink: 0,
      letterSpacing: `0.0075rem`,
      lineHeight: 1,
      padding: `${rhythm(options.blockMarginBottom / 4)} ${rhythm(
        options.blockMarginBottom / 2
      )} ${rhythm(options.blockMarginBottom / 2)} `,
      textDecoration: `none`,
      textAlign: `center`,
    }}
  >
 
    <div>{label}</div>
  </Link>
)

const MobileNavigation = () => (
  <div
    css={{
      position: `fixed`,
      display: `flex`,
      justifyContent: `space-around`,
      alignItems: `center`,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderTop: `1px solid ${colors.ui.light}`,
      background: colors.ui.whisper,
      fontFamily: typography.options.headerFontFamily.join(`,`),
      paddingBottom: `env(safe-area-inset-bottom)`,
      [presets.Tablet]: {
        display: `none`,
      },
    }}
  >

 
    <MobileNavItem linkTo="/" label="首页" />
    <MobileNavItem linkTo="/tags/react/" label="React&gatsbyjs" />
    <MobileNavItem linkTo="/tags/dapp/" label="Dapp" />
    <MobileNavItem linkTo="/tags/服务端/" label="Service&Linux<" />
    <MobileNavItem linkTo="/tags/other/" label="杂记"  />
  </div>
)

export default MobileNavigation
