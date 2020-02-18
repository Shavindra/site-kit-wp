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
		page.setJavaScriptEnabled( false );
		await activateSiteKit();
		// await setSiteVerification();
	} );

	beforeEach( async () => {
		await visitAdminPage( 'admin.php', 'page=googlesitekit-splash' );
	} );


	afterEach( async () => {
		await deactivateSiteKit();
		await resetSiteKit();
	} );

	it( 'Should display noscript message', async () => {
		 await page.$( '.googlesitekit-noscript' );
		await expect( noJS ).toMatchElement( '.googlesitekit-googlesitekit-noscript__title', { text: 'HThe Site Kit by Google plugin requires JavaScript to be enabled in your browser.' } );
	} );
} );
