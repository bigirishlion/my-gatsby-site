import React from 'react'
import Link from "gatsby-link"
import Helmet from 'react-helmet'

class Success extends React.Component {
    render() {
        const siteTitle = this.props.data.site.siteMetadata.title
        const siteDescription = this.props.data.site.siteMetadata.description

        return (
            <div id="main" style={{ display: 'flex' }}>
                <Helmet>
                    <title>{siteTitle}</title>
                    <meta name="description" content={siteDescription} />
                </Helmet>

                <article id="success" className="active timeout">
                    <h2 className="major">Success</h2>
                    <span className="image main"></span>
                    <p>Thank you! I'll be in touch shortly.</p>
                    <Link to="/" className="close"></Link>
                </article>

            </div>
        )
    }
}

export default Success

export const pageQuery = graphql`
  query SuccessQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
