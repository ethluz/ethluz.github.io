import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <Layout>
                <section className="container max-width">
                    <div 
                        className="section is-center"
                    >
                        {posts
                            .map(({ node: post }) => (
                                <div
                                    className="content "
                                    key={post.id}
                                >
                                    <p>
                                        <Link className="has-text-grey-darker title is-5" to={post.fields.slug}>
                                            {post.frontmatter.title}
                                        </Link>
                                        {/* <span> &bull; </span>
                                        <small>{post.frontmatter.date}</small> */}
                                    </p>
                                    <p>
                                        <Link className="has-text-grey " to={post.fields.slug}>
                                            {post.excerpt}
                                        </Link>
                                        <br />
                                        <br />
                                        {/* <Link className="button is-small" to={post.fields.slug}>
                                            阅读
                                        </Link> */}
                                    </p>
                                </div>
                            ))}
                    </div>
                </section>
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
