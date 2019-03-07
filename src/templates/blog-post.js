import React from 'react'
import Helmet from 'react-helmet'
// import Link from 'gatsby-link'
import { pickBy, mapKeys, pick, identity } from 'lodash'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layoutcontent'
import Sidebar from '../components/docs/Sidebar'


const Documentation = styled.main`
  float: left;
  width: 60%;
  margin-left: 20%;
  padding: 2em 4em;

  @media ${props => props.theme.mobile} {
    width: 100%;
    margin: 0;
  }
`

const DocContents = styled.div`
  /**
   * Code 💻
   */
  code {
    background: #f4f7fb;
    padding: 0 0.25em;
    font-size: 0.95em;
    border-radius: 3px;
    font-family: ${props => props.theme.monspace};
  }

  .gatsby-highlight pre {
    background: #f9fbfd;
    border: 1px solid #ececec;
    border-radius: 3px;
    padding: 0.5em 1em;
    overflow: auto;
    margin: 0 0 1em 0;
  }

  .gatsby-highlight code {
    background: none;
    color: inherit;
    padding: 0;
    border-radius: 0;
  }

  /**
   * Tables 
   */
  table {
    border: 1px solid #ececec;
    overflow: hidden;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin: 1em 0;
    border-radius: 3px;
  }

  th {
    font-weight: 600;
  }

  h3 {
    margin: 0.5em 0;
  }

  th:empty {
    display: none;
  }

  td,
  th {
    text-align: left;
    padding: 0.375em 0.75em 0.375em 0.75em;
  }

  td {
    line-height: 1.75em;
    vertical-align: top;
  }

  .bordered-table table {
    border-width: 0 1px 1px 0;
  }

  .bordered-table td,
  .bordered-table th {
    border: 1px solid #ececec;
    border-right: 0;
    border-bottom-width: 0;
  }

  .fixed-table table {
    table-layout: fixed;
  }

  .attributes-table td {
    line-height: 1.5em;
  }

  .attributes-table td:first-child {
    text-align: right;
    line-height: 1em;
  }

  .attributes-table strong {
    white-space: nowrap;
  }

  small {
    color: #888;
    display: block;
    margin-top: 0.25em;
    font-size: 0.875em;
    font-weight: 400;
    line-height: 1em;
  }

  img {
    display: block;
    margin: 2rem auto;
    max-width: 600px;
    width: 98%;
  }
`

const DocHeader = styled.header`
  padding: 0 0 0.25em 0;
  margin-bottom: 1.5em;
  border-bottom: 2px solid #f0f0f0;

  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
`

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const extras = pickBy(
    mapKeys(
      pick(post.frontmatter, ['tests', 'issues', 'edit']),
      (href, text) => {
        switch (text) {
          case 'tests':
            return 'Litmus Tests'

          case 'issues':
            return 'Report a Bug'

          case 'edit':
            return 'Edit this Page'
          default:
            console.log('moren')
        }
      }
    ),
    identity
  )

  return (
     <Layout>
         <div>
      
            <Helmet>
                <title>{post.frontmatter.title} &middot;  Blog </title>
            </Helmet>
        
            <Documentation>
                <DocHeader>
                < h1>{post.frontmatter.title}</h1>
                { post.frontmatter.description ? <p>{post.frontmatter.description}</p> : ''}
                </DocHeader>
                <DocContents dangerouslySetInnerHTML={{ __html: post.html }} />
            </Documentation>
            <Sidebar headings={post.headings} extras={extras}  />
   
        </div>
    </Layout>

  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      headings {
        value
        depth
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`


// import React from 'react'
// import PropTypes from 'prop-types'
// import { kebabCase } from 'lodash'
// import Helmet from 'react-helmet'
// import { graphql, Link } from 'gatsby'
// import Layout from '../components/Layout'
// import Content, { HTMLContent } from '../components/Content'

// export const BlogPostTemplate = ({
//   content,
//   contentComponent,
//   description,
//   tags,
//   title,
// //   helmet,
// }) => {
//   const PostContent = contentComponent || Content

//   return (
//     <section className="section">
//          <Helmet title={`${title} | Blog`} />
//       {/* {helmet || ''} */}
//       <div className="container content">
//         <div className="columns">
//           <div className="column is-10 is-offset-1">
//             <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
//               {title}
//             </h1>
//             {/* <p>{description}</p> */}
//             <PostContent content={content} />
//             {tags && tags.length ? (
//               <div style={{ marginTop: `4rem` }}>
//                 <h4>Tags</h4>
//                 <ul className="taglist">
//                   {tags.map(tag => (
//                     <li key={tag + `tag`}>
//                       <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// BlogPostTemplate.propTypes = {
//   content: PropTypes.node.isRequired,
//   contentComponent: PropTypes.func,
//   description: PropTypes.string,
//   title: PropTypes.string,
// //   helmet: PropTypes.instanceOf(Helmet),
// }

// const BlogPost = ({ data }) => {
//   const { markdownRemark: post } = data

//   return (
//     <Layout>
//       <BlogPostTemplate
//         content={post.html}
//         contentComponent={HTMLContent}
//         description={post.frontmatter.description}
//         // helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
//         tags={post.frontmatter.tags}
//         title={post.frontmatter.title}
//       />
//     </Layout>
//   )
// }

// BlogPost.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.object,
//   }),
// }

// export default BlogPost

// export const pageQuery = graphql`
//   query BlogPostByID($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//         tags
//       }
//     }
//   }
// `