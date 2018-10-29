import React from 'react'
import { map, keys, isEmpty } from 'lodash'
import GithubSlugger from 'github-slugger'
import styled from 'styled-components'
import { Link } from "gatsby"

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  padding: 64px 2em 2em 2em;
  width: 20%;
  overflow: auto;
  right: 0;

  @media ${props => props.theme.mobile} {
    display: none;
  }
`
const List = styled.ul`
  padding: 2rem 0;
  display: block;
  color: #666;
  font-size: 0.875rem;
  list-style: none;
`

const ListItem = styled.li`
  margin: 0 0 0.5rem ${props => props.depth - 2}rem;

  a {
    color: inherit;
    font: inherit;
    text-decoration: none;
  }
`
ListItem.defaultProps = { depth: 2 }

const Divider = styled.li`
  margin: 1em 0 1em 0;
  border-top: 2px dashed #f0f0f0;
`

export default ({ headings, extras, tablecontent }) => {
//   const slugger = new GithubSlugger()
//   const mainHeaders = headings.filter(({ depth }) => depth <= 2)
//   if (mainHeaders.length + keys(extras).length < 2) return <aside />
    
  return (
    <Wrapper>
        {/* {tablecontent} */}
        <div className="content" dangerouslySetInnerHTML={{ __html: tablecontent }}  />
    </Wrapper>
  )
}

