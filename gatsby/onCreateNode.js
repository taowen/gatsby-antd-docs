// import { replacePath } from './utils'
const replacePath = require('./utils')
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  console.log('node.internal.type', node.internal.type)
  if (node.internal.type === `MarkdownRemark`) {
    console.log('add MarkdownRemark')
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: replacePath(slug),
    })
  } else if (node.internal.type === 'Mdx') {
    console.log('add Mdx')

    const value = createFilePath({ node, getNode })
    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // Generated value based on filepath with "blog" prefix
      // value: `/blog${value}`,
      value,
    })
  }
}
