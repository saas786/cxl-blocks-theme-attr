/**
 * Block Edit Filter.
 *
 * Adds a filter on `editor.BlockEdit` and adds custom inspector controls to
 * any blocks that has custom design settings.
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Imports the design setting fields.
import fields   from './block-controls/fields';

// Imports the design settings panel.
import PanelDesignSettings from './block-controls/panel-design-settings';
import classnames from "classnames";

// Assign core WP variables.
const { createHigherOrderComponent } = wp.compose;
const { Fragment }                   = wp.element;
const { InspectorControls }          = wp.blockEditor;
const { addFilter }                  = wp.hooks;

//restrict to specific block names
const allowedBlocks = [ 'core/paragraph' ];

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass( extraProps, blockType, attributes ) {

    const { vaadinTheme } = attributes;

    //check if attribute exists for old Gutenberg version compatibility
    //add class only when visibleOnMobile = false
    //add allowedBlocks restriction
    if ( typeof vaadinTheme !== 'undefined' && vaadinTheme && allowedBlocks.includes( blockType.name ) ) {
        extraProps.className = classnames( extraProps.className, vaadinTheme );
    }

    if ( allowedBlocks.includes( blockType.name ) ) {
        extraProps.theme = vaadinTheme;
    }

    return extraProps;
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'cxl/ui/block/applyExtraClass',
    applyExtraClass
);
