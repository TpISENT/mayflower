import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Collapse from '../../animations/Collapse';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import CompHeading from '../../atoms/headings/CompHeading';
import Paragraph from '../../atoms/text/Paragraph';
import Link from '../../molecules/Link';
import GeneralTeaser from '../GeneralTeaser';

import './style.css';

class TeaserListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  };
   handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const teaser = this.props;
    const featuredClasses = ClassNames({
      'ma__teaser-listing__featured-items': true,
      'stacked': teaser.stacked,
      'side-by-side': !teaser.stacked
    });
    const columnCount = (teaser.contained && teaser.gridTwoColumns) ? 2 : 3;
    const itemsClasses = ClassNames({
      'ma__teaser-listing__items': true,
      'ma__teaser-listing__2-col-grid': columnCount == 2,
      'ma__teaser-listing__3-col-grid': columnCount == 3
    });
    const shownNumber = teaser.shownNumber || null;
    const shownItems = shownNumber ? teaser.items.slice(0, shownNumber) : null;
    const invisibleItems = (shownNumber) ? row.items.slice(shownNumber) : [];

    let teaserHeading = 2;
    teaserHeading = ((teaser.compHeading && teaser.compHeading.level) ? teaser.compHeading.level : teaserHeading) + 1;
    teaserHeading = ((teaser.sidebarHeading && teaser.sidebarHeading.level) ? teaser.sidebarHeading.level : teaserHeading) + 1;

    return (
      <section className="ma__teaser-listing">
        <div className="ma__teaser-listing__container">
          {(teaser.compHeading) && (<CompHeading {...teaser.compHeading} />)}
          {(teaser.sidebarHeading) && (<SidebarHeading {...teaser.sidebarHeading} />)}
          {(teaser.description) && (
            <div className="ma__teaser-listing__description">
              <Paragraph { ...teaser.description} />
            </div>
          )}
          {(teaser.featuredItems) && (
            <div className={featuredClasses}>
              {teaser.featuredItems.map((teaser) => (<GeneralTeaser level={teaserHeading} {...teaser} />))}
            </div>
          )}
          {(invisibleItems.length > 0) && (
            <div>
              <ul className={itemsClasses}>
                {shownItems.map((teaser) => (
                  <li className="ma__teaser-listing__item">
                    <GeneralTeaser level={teaserHeading} {...teaser} />
                  </li>
                ))}
              </ul>
              <Collapse in={this.state.open} dimension="height">
                <div className="ma__teaser-listing__extra collapsed">
                  <ul className={itemsClasses}>
                    {invisibleItems.map((teaser) => (
                      <li className="ma__teaser-listing__item">
                        <GeneralTeaser level={teaserHeading} {...teaser} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Collapse>
              <button
                className="ma__content-link ma__content-link--chevron ma__content-link__acordion-toggle js-accordion-link"
                aria-label={(this.state.open) ? teaser.lessLabel : teaser.moreLabel}
                onClick={(e) => this.handleClick(e)}
              >
              {(this.state.open) ?
                (<span className="less">{teaser.lessLabel}</span>) :
                (<span className="more">{teaser.moreLabel}</span>)
              }
              </button>
            </div>
          )}
          {(invisibleItems.length == 0) && (
            <ul className={itemsClasses}>
              {teaser.items.map((teaser) => (<GeneralTeaser {...teaser} />))}
            </ul>
          )}
          {(teaser.more) && (
            <div className="ma__teaser-listing__more">
              <Link {...teaser.more} />
            </div>
          )}
        </div>
      </section>
    );
  }
}

TeaserListing.propTypes = {
  /** Optional CompHeading component */
  compHeading: PropTypes.shape(PropTypes.CompHeading),
  /** Optional SidebarHeading component */
  sidebarHeading: PropTypes.shape(PropTypes.SidebarHeading),
  /** Stacked if true, side-by-side if false. */
  stacked: PropTypes.boolean,
  /** Grid display of secondary items or three column grid. */
  contained: PropTypes.boolean,
  /** Set for an alternative two column layout for large screens. (Both display the same at smaller screen widths) */
  gridTwoColumns: PropTypes.boolean,
  /** Number of items to show. If set, Collapse is used to make an accordion. */
  shownItems: PropTypes.number,
  /** Accordion Label */
  moreLabel: PropTypes.string,
  /** Items Label */
  lessLabel: PropTypes.string,
  /** Array of Featured GeneralTeaser Components. */
  featuredItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.GeneralTeaser)),
  /** Array of GeneralTeaser Componets */
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.GeneralTeaser)),
  /** Optional Link for more. */
  more: PropTypes.shape(PropTypes.Link)
};

TeaserListing.defaultProps = {
  stacked: true,
  contained: false,
  gridTwoColumns: false,
  moreLabel: 'More',
  lessLabel: 'Less',
  items: []
}

export default TeaserListing;
