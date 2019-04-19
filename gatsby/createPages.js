const replacePath = require('./utils')
const path = require('path')

module.exports = exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const Template = path.resolve(`src/templates/Template.tsx`)
  // sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000
  return graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    console.log('result', JSON.stringify(result, null, 4))
    result.data.allMdx.edges.forEach(({ node }) => {
      console.log('create page', node.fields.slug)
      createPage({
        path: replacePath(node.fields.slug),
        component: Template,
        context: { id: node.id }, // additional data can be passed via context
      })
    })
  })
}
