/**
 * Optimize module initialization.
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
import OptimizeSetup from 'GoogleModules/optimize/setup';
/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { fillFilterWithComponent } from '../../../../../assets/js/util';

const slug = 'optimize';

if ( global.googlesitekit.modules.optimize.active ) {
	/**
	 * Add components to the settings page.
	 */
	addFilter( `googlesitekit.ModuleSettingsDetails-${ slug }`,
		'googlesitekit.OptimizeModuleSettingsDetails',
		fillFilterWithComponent( OptimizeSetup, {
			onSettingsPage: true,
		} ) );

	/**
	 * Add component to the setup wizard
	 */
	addFilter( `googlesitekit.ModuleSetup-${ slug }`,
		'googlesitekit.OptimizeModuleSetupWizard',
		fillFilterWithComponent( OptimizeSetup, {
			onSettingsPage: false,
		} ) );

	/**
	 * Add data to the congrats setup Win Notification for display.
	 */
	addFilter( `googlesitekit.SetupWinNotification-${ slug }`,
		'googlesitekit.OptimizeSetupWinNotification', ( winData ) => {
			winData.description = __( 'To set up experiments and see the results, go to ', 'google-site-kit' );
			winData.learnMore.label = 'Optimize';
			winData.learnMore.url = 'https://optimize.withgoogle.com/';
			return winData;
		} );
}

