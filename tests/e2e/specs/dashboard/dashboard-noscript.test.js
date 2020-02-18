/**
 * WordPress dependencies
 */
import { activatePlugin, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { setSiteVerification, resetSiteKit } from '../../utils';

describe( 'Site Kit noscript message', () => {
	beforeAll( async () => {
		await activatePlugin( 'e2e-tests-auth-plugin' );
		await activatePlugin( 'e2e-tests-admin-bar-visibility' );
		await setSiteVerification();
	} );

	beforeEach( async () => {
		page.setJavaScriptEnabled( false );
		await visitAdminPage( 'admin.php', 'page=googlesitekit-dashboard' );
	} );


	afterEach( async () => {
		await resetSiteKit();
	} );

	it( 'Should display noscript message', async () => {
		 await page.$( '.googlesitekit-noscript' );
		// TODO: await expect( noJS ).toMatchElement( '.googlesitekit-dashboard-single-url__title', { text: 'Hello world!' } );
	} );
} );
