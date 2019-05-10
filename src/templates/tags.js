import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    const postLinkss = posts.map((post, index) => (
        <div
            className="content "
            key={index}
        >
            <p>
                <Link className="has-text-grey-darker title is-5" to={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                </Link>
           
            </p>
            <p>
                <Link className="has-text-grey " to={post.node.fields.slug}>
                    {post.node.excerpt}
                </Link>
                <br />
                <br />
            </p>
        </div>
      ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    
    // const tagHeader = `${totalCount} post${
    //   totalCount === 1 ? '' : 's'
    // } tagged with “${tag}”`

    const tagHeader = `分类:“${tag}”,共{${totalCount}}篇文章`

    return (
      <Layout>
       
        <Helmet title={`${tag} | ${title}`} />
     
        <section className="container max-width">
            <div 
                className="section is-center"
            >
            <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
            {postLinkss}
            </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)  
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
