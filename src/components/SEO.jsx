import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

function SEO({ description, title, url }) {
  return (
    <StaticQuery
      query={siteQuery}
      render={data => {
        const metaDesc = description || data.site.siteMetadata.description
        return (
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={metaDesc} />
            <link rel="canonical" href={url} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDesc} />
          </Helmet>
        )
      }}
    />
  )
}

const siteQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
        url
      }
    }
  }
`

export default SEO
