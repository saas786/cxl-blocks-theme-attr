/**
 * Block Registration Filter.
 *
 * Adds a filter on `editor.BlockEdit` and adds custom inspector controls to
 * any blocks that has custom design settings.
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Imports the design setting fields.
import fields from './block-controls/fields';

// Imports the assign function from lodash.
import assign from 'lodash.assign';

const { addFilter } = wp.hooks;

/**
 * Filter on the block registration process to add custom attributes.
 *
 * @since  2.1.0
 * @access public
 * @param  object  Settings for the block.
 * @param  string  Block name.
 * @return object
 */
addFilter( 'blocks.registerBlockType', 'cxl/ui/block/register', ( settings, name ) => {

	fields.forEach( field => {

		// If a given field is registered for the current block, add the
		// attributes for the field.
		if ( field.blocks.includes( name ) ) {

		    //console.log(field.name);
            //console.log(field.attributes);
			settings.attributes = assign( settings.attributes, {
				[ field.name ] : field.attributes
                /*{
					type:    field.type,
					default: field.default
				}
				*/
			} );

            //console.log(settings.attributes);
		}
	} );

	return settings;
} );
