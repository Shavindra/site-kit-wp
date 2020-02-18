<?php
/**
 * Trait Google\Site_Kit\Core\Util\Require_Javascript_Trait
 *
 * @package   Google\Site_Kit\Core\Util
 * @copyright 2019 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://sitekit.withgoogle.com
 */

namespace Google\Site_Kit\Core\Util;

/**
 * Trait to display no javascript fallback message.
 *
 * @since 1.1.2
 * @access private
 * @ignore
 */
Trait Require_Javascript_Trait {

	/**
	 * Display fallback message when Javascript is disabled
	 *
	 * @since 1.1.2
	 *
	 * @return string noscript HTML tag,
	 */
	protected function get_noscript_html() {

		$no_script = sprintf('
			<noscript>
				<div class="googlesitekit-noscript googlesitekit-plugin">
					<div class="mdc-layout-grid">
						<div class="mdc-layout-grid__inner">
							<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
								<h3 class="googlesitekit-heading-3 googlesitekit-noscript__title">
									%s
								</h3>
							</div>
						</div>
					</div>
				</div>
			</noscript>',
			esc_html__( 'The Site Kit by Google plugin requires JavaScript to be enabled in your browser.', 'google-site-kit' ),
		);
		
		return apply_filters( 'googlesitekit_noscript_html', $no_script );
	}
}

