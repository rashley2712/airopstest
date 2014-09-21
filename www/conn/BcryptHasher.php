<?php
/**
 * Part of the Sentry package. 
 *
 * @package    Sentry
 * @version    2.0.0
 * @author     Cartalyst LLC
 * @license    BSD License (3-clause)
 * @copyright  (c) 2011 - 2013, Cartalyst LLC
 * @link       http://cartalyst.com
 */

class BcryptHasher {

	/**
	 * Hash strength.
	 *
	 * @var int
	 */
	public $strength = 8;

	/**
	 * Salt length.
	 *
	 * @var int
	 */
	public $saltLength = 22;

	/**
	 * Hash string.
	 *
	 * @param  string  $string
	 * @return string
	 */
	public function hash($string)
	{
		// Format strength
		$strength = str_pad($this->strength, 2, '0', STR_PAD_LEFT);

		// Create salt
		$salt = $this->createSalt();

		//create prefix; $2y$ fixes blowfish weakness
		$prefix = PHP_VERSION_ID < 50307 ? '$2a$' : '$2y$';

		return crypt($string, $prefix.$strength.'$'.$salt.'$');
	}

	/**
	 * Check string against hashed string.
	 *
	 * @param  string  $string
	 * @param  string  $hashedString
	 * @return bool
	 */
	public function checkhash($string, $hashedString)
	{
		return $this->slowEquals(crypt($string, $hashedString), $hashedString);
	}

	/**
	 * Create a random string for a salt.
	 *
	 * @return string
	 */
	public function createSalt()
	{
		$pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		return substr(str_shuffle(str_repeat($pool, 5)), 0, $this->saltLength);
	}

	/**
	 * Compares two strings $a and $b in length-constant time.
	 *
	 * @param  string  $a
	 * @param  string  $b
	 * @return boolean
	 */
	public function slowEquals($a, $b)
	{
		$diff = strlen($a) ^ strlen($b);

		for($i = 0; $i < strlen($a) && $i < strlen($b); $i++)
		{
			$diff |= ord($a[$i]) ^ ord($b[$i]);
		}

		return $diff === 0;
	}

}
