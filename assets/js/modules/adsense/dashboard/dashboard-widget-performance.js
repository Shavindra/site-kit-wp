/**
 * AdSensePerformanceWidget component.
 *
 * Site Kit by Google, Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { TYPE_MODULES } from 'GoogleComponents/data';
import DataBlock from 'GoogleComponents/data-block.js';
import PreviewBlock from 'GoogleComponents/preview-block';

/**
 * Internal dependencies
 */
import { isDataZeroAdSense } from '../util';
import withData from '../../../components/higherorder/withdata';
import {
	getTimeInSeconds,
	readableLargeNumber,
} from '../../../../../assets/js/util';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { isUndefined } from 'lodash';

class AdSensePerformanceWidget extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			twentyEightDays: false,
			prev28Days: false,
		};
	}

	// When additional data is returned, componentDidUpdate will fire.
	componentDidUpdate() {
		this.processCallbackData();
	}

	componentDidMount() {
		this.processCallbackData();
	}

	/**
	 * Process callback data received from the API.
	 */
	processCallbackData() {
		const {
			data,
			requestDataToState,
		} = this.props;

		if ( data && ! data.error && 'function' === typeof requestDataToState ) {
			this.setState( requestDataToState );
		}
	}

	render() {
		const {
			twentyEightDays,
			prev28Days,
		} = this.state;

		const dataBlocks = twentyEightDays.totals ? [
			{
				className: 'googlesitekit-data-block--page-rpm',
				title: __( 'Page RPM', 'google-site-kit' ),
				datapoint: readableLargeNumber( twentyEightDays.totals[ 1 ] ),
				change: ( ! isUndefined( prev28Days.totals ) ) ? prev28Days.totals[ 1 ] : 0,
				changeDataUnit: '%',
			},
			{
				className: 'googlesitekit-data-block--impression',
				title: __( 'Impressions', 'google-site-kit' ),
				datapoint: readableLargeNumber( twentyEightDays.totals[ 2 ] ),
				change: ! isUndefined( prev28Days.totals ) ? prev28Days.totals[ 2 ] : 0,
				changeDataUnit: '%',
			},
		] : [];

		return (
			<section className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					{ dataBlocks.map( ( block, i ) => {
						return (
							<div key={ i } className="
								mdc-layout-grid__cell
								mdc-layout-grid__cell--align-top
								mdc-layout-grid__cell--span-2-phone
								mdc-layout-grid__cell--span-2-tablet
								mdc-layout-grid__cell--span-4-desktop
							">
								<DataBlock
									stat={ i }
									className={ block.className }
									title={ block.title }
									datapoint={ block.datapoint }
									change={ block.change }
									changeDataUnit={ block.changeDataUnit }
									context={ block.context }
									selected={ block.selected }
									handleStatSelection={ block.handleStatSelection }
								/>
							</div>
						);
					} ) }
				</div>
			</section>
		);
	}
}

export default withData(
	AdSensePerformanceWidget,
	[
		{
			type: TYPE_MODULES,
			identifier: 'adsense',
			datapoint: 'earnings',
			data: {
				dateRange: 'last-28-days',
			},
			priority: 1,
			maxAge: getTimeInSeconds( 'day' ),
			context: [ 'Single', 'Dashboard' ],
			toState( state, { data } ) {
				if ( ! state.twentyEightDays ) {
					return {
						twentyEightDays: data,
					};
				}
			},
		},
		{
			type: TYPE_MODULES,
			identifier: 'adsense',
			datapoint: 'earnings',
			data: {
				dateRange: 'prev-28-days',
			},
			priority: 1,
			maxAge: getTimeInSeconds( 'day' ),
			context: [ 'Single', 'Dashboard' ],
			toState( state, { data } ) {
				if ( ! state.prev28Days ) {
					return {
						prev28Days: data,
					};
				}
			},
		},
	],
	<PreviewBlock width="100%" height="250px" />,
	{},
	isDataZeroAdSense
);

