import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class MainPage extends React.Component {
    render() {
        const { data } = this.props;
        // const { totalPage, currentPage } = this.props.pageContext
        const { edges: posts } = data.allMarkdownRemark;
        console.log('\n posts posts posts posts posts: \n',posts);
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
                    !!!!!!!
                </section>
            </Layout>
        )
    }
}

MainPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export const pageQuery = graphql`
  query IndexQuery  {  #分页必备：($skip: Int!, $limit: Int!) 
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    #   limit: $limit #分页必备
    #   skip: $skip #分页必备
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




// // 数据来源是 createPage 注入的上下文变量
// const { totalPage, currentPage } = this.props.pageContext

// ······

// <div>
//   {currentPage - 1 > 0 && (
//     <Link
//       to={'/blog/' + (currentPage - 1 === 1 ? '' : currentPage - 1)}
//       rel="prev"
//     >
//       ← 上一页
//     </Link>
//   )}
// </div>
// <div>
//   {currentPage + 1 <= totalPage && (
//     <Link to={'/blog/' + (currentPage + 1)} rel="next">
//       下一页 →
//     </Link>
//   )}
// </div>