const _l = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    return graphql(`
    {
      allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
        ) {
        edges {
          node {
            id
            fields {
              slug
            }
            html
            headings {
              value
              depth
            }
            frontmatter {
              title
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        //内容详情页
        posts.forEach(edge => {
            const id = edge.node.id
            createPage({
                path: edge.node.fields.slug,
                tags: edge.node.frontmatter.tags,
                component: path.resolve(
                    `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
                ),
                context: {
                    id,
                },
            })
        });

        // 分页列表页 start
        const postsPerPage = 5;
        const numPages = Math.ceil(posts.length / postsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/` : `/page/${i + 1}`,
                component: path.resolve(`src/templates/blog-list.js`),
                context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1
                },
            });

        });

        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
            if (_l.get(edge, `node.frontmatter.tags`)) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })


        // Eliminate duplicate tags
        tags = _l.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
            const tagPath = `/tags/${_l.kebabCase(tag)}/`

            createPage({
                path: tagPath,
                component: path.resolve(`src/templates/tags.js`),
                context: {
                    tag,
                },
            })
        });

    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}
