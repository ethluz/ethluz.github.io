import React from 'react'
import { Link, graphql } from 'gatsby'

// import SEO from '../components/seo'
// import Bio from '../components/Bio'
import Layout from '../components/Layout'
// import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
   
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages - 1
    const prevPage = currentPage - 1 === 1 ? '/' : 'page/'+ (currentPage - 1).toString()
    const nextPage = 'page/'+ (currentPage + 1).toString()
    // console.log(currentPage);
    // console.log(numPages);
    return (
      <Layout >
          
    <section className="container max-width">
        <div 
            className="section is-center"
        >
            {posts
                .map(({ node: post },index) => (
                    
                    <div
                        className="content"
                        key={index}
                    >
                        <p>
                            <Link className="has-text-grey-darker title is-5" to={post.fields.slug}>
                                {post.frontmatter.title}
                            </Link>
                        </p>
                        <p>
                            <Link className="has-text-grey " to={post.fields.slug}>
                                {post.excerpt}
                            </Link>
                            {/* <br />
                            <br /> */}
                           
                        </p>
                    </div>
                ))}
                <ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        listStyle: 'none',
                        padding: 0,
                    }}
                >
                    <li>
                        {!isFirst && (
                            <Link to={prevPage} rel="prev">
                            ← Previous
                            </Link>
                        )}
                    </li>

                    <li>
                        {currentPage}
                    </li>

                    <li>
                        {!isLast && (
                            <Link to={nextPage} rel="next">
                            Next →
                            </Link>
                        )}
                    </li>

                </ul>
            </div>
           
        </section>

      
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: {ne: null } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title,
            tags
          }
        }
      }
    }
  }
`
