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
	 * @link https://php.net/manual/en/function.filter-input.php
	 * @return mixed                     Value of the requested variable on success,
	 */
	public function get_noscript_html() {

		$no_script = sprintf(
			'<noscript>%s</noscript>',
			esc_html__( 'The Google Site Kit Plugin needs Javascript enabled', 'google-site-kit' )
		);
		
		return apply_filters( 'googlesitekit_noscript_html', $no_script );
	}
}

