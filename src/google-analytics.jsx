/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReactGA from 'react-ga';

const GoogleAnalyticsWrapper = ({ children }) => {
  const { location } = window;
  const { googleAnalyticsEnabled } = useSelector((state) => state.ui);

  // This should be done in a effect to get the children component rendered so
  // we've the final document.title setted
  useEffect(() => {
    if (googleAnalyticsEnabled && process.env.NODE_ENV === 'production') {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location.pathname, location.search, googleAnalyticsEnabled]);

  return children;
};

GoogleAnalyticsWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GoogleAnalyticsWrapper;
