import assign from "lodash.assign";

/**
 * Vaading theme.
 */

// Variables.
const { addFilter } = wp.hooks;
import includes from 'lodash/includes';

// Add vaadin theme support to these blocks.
const blocks = [
    'core/paragraph'
];

// Attributes.
addFilter(
    'blocks.registerBlockType',
    'cxl/ui/vaadin/theme',
    ( props, name ) => {

        if ( ! includes( blocks, name ) ) {
            return props;
        }

        props.supports = assign( props.supports, {
            vaadinTheme: true,
        } );

        return props;
    }
);
