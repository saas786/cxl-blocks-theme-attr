/**
 * Block Design Setting Fields.
 *
 * Returns an array of design setting fields to output in the block editor.
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import block controls.
import ControlVaadinTheme from './control-vaadin-theme';

export default [
	{
		name:    'vaadinTheme',
		type:    'string',
		default: '',
		control: ControlVaadinTheme,
		blocks:  [
			'core/image',
			'core/gallery',
			'core/media-text',
			'core/paragraph'
		]
	}
];
