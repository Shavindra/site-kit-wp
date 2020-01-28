<?php
/**
 * Class Google\Site_Kit\Core\Authentication\Verification
 *
 * @package   Google\Site_Kit
 * @copyright 2019 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://sitekit.withgoogle.com
 */

namespace Google\Site_Kit\Core\Authentication;

use Google\Site_Kit\Core\Storage\User_Setting;

/**
 * Class representing the status of whether a user is verified as an owner of the site.
 *
 * @since 1.0.0
 * @access private
 * @ignore
 */
final class Verification extends User_Setting {

	/**
	 * User option key.
	 */
	const OPTION = 'googlesitekit_site_verified_meta';

	/**
	 * Flags the user as verified or unverified.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $verified Whether to flag the user as verified or unverified.
	 * @return bool True on success, false on failure.
	 */
	public function set( $verified ) {
		if ( ! $verified ) {
			return $this->delete();
		}

		return parent::set( 'verified' );
	}
}
