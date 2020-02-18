/**
 * WordPress dependencies
 */
import { activatePlugin, visitAdminPage } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { setSiteVerification, resetSiteKit } from '../../utils';

const activateSiteKit = async () => {
	try {
		await activatePlugin( 'google-site-kit' );
	} catch {
		await activatePlugin( 'site-kit-by-google' );
	}
};

const deactivateSiteKit = async () => {
	try {
		await deactivatePlugin( 'google-site-kit' );
	} catch {
		await deactivatePlugin( 'site-kit-by-google' );
	}
};

describe( 'Site Kit noscript message', () => {
	beforeAll( async () => {
		await activateSiteKit();
		// await setSiteVerification();
	} );

	beforeEach( async () => {
		page.setJavaScriptEnabled( false );
		await visitAdminPage( 'admin.php', 'page=googlesitekit-dashboard' );
	} );


	afterEach( async () => {
		await deactivateSiteKit();
		await resetSiteKit();
	} );

	it( 'Should display noscript message', async () => {
		 await page.$( '.googlesitekit-noscript' );
		// TODO: await expect( noJS ).toMatchElement( '.googlesitekit-dashboard-single-url__title', { text: 'Hello world!' } );
	} );
} );
