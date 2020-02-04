/**
 * Block Design Setting Fields.
 *
 * Returns an array of design setting fields to output in the block editor.
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import block controls.
import ControlBoxShadow from './control-box-shadow';

export default [
	{
		name:    'boxShadow',
		type:    'string',
		default: '',
		control: ControlBoxShadow,
		blocks:  [
			'core/image',
			'core/gallery',
			'core/media-text',
			'core/paragraph'
		]
	}
];
