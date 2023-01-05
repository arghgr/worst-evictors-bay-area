import React from 'react'
import {Link} from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import {getImage} from 'gatsby-plugin-image'
import renderContent from '../utils/contentful-render'
import EvictorImage from './image'

import useIndexQuery from '../queries/index'

const aempLogo = require('../images/AEMP_logo.png')

type EvictorDetails = {
  name: string
  localFile: any
  ebData: {
    evictions: {
      evict_id: number
    }[]
  }
}

type ResponsiveImageProps = {
  fluid: any
  description?: string
  /**
   * If set to `true`, will only show image on on devices smaller than a desktop.
   * If `false`, will only show on desktop.
   */
  showMobileOnly?: boolean
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  fluid,
  description,
  showMobileOnly,
}) => {
  const visibilityClass = showMobileOnly ? 'show-lg' : 'hide-lg'
  return (
    <>
      <BackgroundImage
        className={`background-cover-photo ${visibilityClass}`}
        fluid={fluid}
      />
      {description && (
        <span className={`text-assistive ${visibilityClass}`}>
          Image description: {description}
        </span>
      )}
    </>
  )
}

const LandingPage = () => {
  const {allEvictor, contentfulLandingPage} = useIndexQuery()
  const evictors: EvictorDetails[] = allEvictor.nodes
  const fallback = evictors.filter(
    (evictor) => evictor.localFile?.childImageSharp
  )[0]

  return (
    <div className="homepage">
      <div className="columns bg-primary text-secondary">
        <div className="column col-4 col-lg-12 sticky-column-desktop full-height-container-desktop">
          <div className="full-height-container-desktop d-flex">
            <div>
              <h1 className="immediate-fade-in">
                {renderContent(contentfulLandingPage.openingTitle)}
              </h1>
            </div>
            <div className="subtitle delayed-fade-in">
              {renderContent(contentfulLandingPage.openingSubtitle)}
            </div>
          </div>
          <div className="delayed-fade-in">
            <br />
            <div>Brought to you by</div>
            <img
              className="logo"
              src={aempLogo.default}
              alt="The Anti-Eviction Mapping Project"
            />
            <br />
          </div>
        </div>
        <div className="column col-8 col-lg-12 evictors">
          <div className="columns">
            {evictors.map((evictor: EvictorDetails, i: number) => {
              const image = evictor.localFile?.childImageSharp
                ? getImage(evictor?.localFile)
                : getImage(fallback?.localFile)

              return (
                <EvictorImage
                  i={i}
                  name={evictor.name}
                  image={image}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="columns bg-secondary text-primary">
        <div className="column col-4 col-lg-12 d-flex">
          <div>
            <div>Worst Evictors Map</div>
            <h1>{contentfulLandingPage.mapTitle}</h1>
          </div>
          {contentfulLandingPage.mapBackground && (
            <ResponsiveImage
              showMobileOnly
              {...contentfulLandingPage.mapBackground}
            />
          )}
          <div>
            {renderContent(contentfulLandingPage.mapDescription)}
            <Link to="/map" className="btn btn-secondary">
              {contentfulLandingPage.mapButton}
            </Link>
          </div>
        </div>
        <div className="column col-8 col-lg-12">
          {contentfulLandingPage.mapBackground && (
            <ResponsiveImage
              {...contentfulLandingPage.mapBackground}
            />
          )}
        </div>
      </div>

      <div id="rights" className="columns bg-primary text-secondary">
        <div className="column col-4 col-lg-12 sticky-column-desktop full-height-container-desktop d-flex">
          <div>
            <div>Know your tenant rights </div>
            <h1>{contentfulLandingPage.kyrTitle}</h1>
          </div>
          {contentfulLandingPage.kyrImage && (
            <ResponsiveImage
              showMobileOnly
              {...contentfulLandingPage.kyrImage}
            />
          )}
          <div className="marginless">
            {renderContent(contentfulLandingPage.kyrDescription)}
          </div>
        </div>
        <div className="column col-8 col-lg-12">
          {contentfulLandingPage.kyrImage && (
            <ResponsiveImage {...contentfulLandingPage.kyrImage} />
          )}
        </div>
        <div className="column col-4 col-lg-12"></div>
        <div className="column col-8 col-lg-12">
          {' '}
          <div className="rich-text-bulleted-list">
            {renderContent(contentfulLandingPage.kyrContent)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
