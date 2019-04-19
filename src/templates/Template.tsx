import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { RootLayout as Layout } from '../Layout'

// export default function Template({ data }: any) {
//   const { allMdx } = data // data.markdownRemark holds our post data

//   const { frontmatter, html, id } = data.allMdx.edges.node

//   return (
//     <Layout sidebarRoot={frontmatter.root}>
//       <div className="blog-post-container">
//         <div className="blog-post">
//           {/* <h1>{frontmatter.title}</h1> */}
//           <h5>{frontmatter.date}</h5>
//           <div
//             className="blog-post-content"
//             dangerouslySetInnerHTML={{ __html: html }}
//           />
//         </div>
//       </div>
//     </Layout>
//   )
// }
function PageTemplate({ data: { mdx } }: any) {
  console.log({ mdx })
  return (
    <Layout sidebarRoot={mdx.frontmatter.root}>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
      <div className="blog-post-container">
        <div className="blog-post">
          {/* <h1>{frontmatter.title}</h1> */}
          <h5>{mdx.frontmatter.date}</h5>
        </div>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        root
      }
      code {
        body
      }
    }
  }
`
export default PageTemplate
