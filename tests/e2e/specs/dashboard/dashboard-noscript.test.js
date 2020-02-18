/**
 * WordPress dependencies
 */
import { visitAdminPage } from '@wordpress/e2e-test-utils';

describe( 'Site Kit noscript message', () => {

	beforeEach( async () => {
		await visitAdminPage( 'admin.php', 'page=googlesitekit-splash' );
	} );

	describe('When Javascript is enabled', () => {
		it('Should not display noscript message when javascript is ', async () => {
			const noscript = await page.$( '#wpbody-content' );
			await expect(noscript).not.toMatchElement('.googlesitekit-noscript__title')
		});
	})

	describe('When Javascript is disabled', () => {
		beforeAll( async () => {
			page.setJavaScriptEnabled( false );
		} );
	
		afterAll( async () => {
			page.setJavaScriptEnabled( true );
		} );
	
		it( 'Should display noscript message when javascript is ', async () => {
			const noscript = await page.waitForSelector('.googlesitekit-noscript', {
				visible: true,
			  })
			await expect( noscript ).toMatchElement( '.googlesitekit-noscript__title', { text: 'The Site Kit by Google plugin requires JavaScript to be enabled in your browser.' } );
		} );
	})
} );
