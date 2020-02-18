/**
 * WordPress dependencies
 */
import { activatePlugin, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { setSiteVerification, setSearchConsoleProperty } from '../../utils';

describe( 'Site Kit noscript message', () => {
	beforeAll( async () => {
		await activatePlugin( 'e2e-tests-auth-plugin' );
		await setSiteVerification();
	} );

	beforeEach( async () => {
		page.setJavaScriptEnabled( false );
		await visitAdminPage( 'admin.php', 'page=googlesitekit-dashboard' );
		
	} );

	it( 'Should display noscript message', async () => {
		const noJS = await page.$( '.googlesitekit-no-js' );
		// TODO: await expect( noJS ).toMatchElement( '.googlesitekit-dashboard-single-url__title', { text: 'Hello world!' } );
	} );
} );
