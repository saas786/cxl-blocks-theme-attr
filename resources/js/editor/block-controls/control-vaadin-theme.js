/**
 * Vaadin Theme Control.
 *
 * Outputs a select dropdown control for handling the theme="sometheme othertheme".
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import the class update utility.
import updateClass from './../util/update-class';

// Get the core WP select control.
const { SelectControl } = wp.components;

// Global set via `wp_localize_script()`.
const { labels } = cxlUIEditor;

export default ( props ) => {

	let options = [
		{ label: labels.default,          value: ''     },
		{ label: labels.none,             value: 'none' },
		{ label: labels.sizes.small,      value: 'sm'   },
		{ label: labels.sizes.medium,     value: 'md'   },
		{ label: labels.sizes.large,      value: 'lg'   },
		{ label: labels.sizes.extraLarge, value: 'xl'   }
	];

	// Get the vaadin-theme attribute.
	let { vaadinTheme } = props.attributes;

	return (
		<SelectControl
			key="vaadinTheme"
			label={ labels.theme }
			value={ vaadinTheme }
			options={ options }
			onChange={ ( selected ) => {
				props.setAttributes( {
                    vaadinTheme: selected,
					className: updateClass(
						props.attributes.className,
						selected ? 'theme-' + selected : '',
						options.filter( opt => opt.value ).map( opt => 'theme-' + opt.value )
					)
				} );
			} }
		/>
	);
};
