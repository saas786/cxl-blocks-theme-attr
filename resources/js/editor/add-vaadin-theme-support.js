import assign from "lodash.assign";

/**
 * Anchors.
 */

// Variables.
const { addFilter } = wp.hooks;
import includes from 'lodash/includes';

// Add vaadin theme support to these blocks.
const blocks = [
    'core/paragraph',
];

// Attributes.
addFilter(
    'blocks.registerBlockType',
    'cxl/ui/vaadin/theme',
    ( props, name ) => {

        if ( ! includes( blocks, name ) ) {
            return props;
        }

        if ( ! props.supports ) {
            props.supports = {};
        }

        props.supports = Object.assign( props.supports, {
            vaadinTheme: true,
        } );

        /*
        const supports = {
            ...props.supports,
            vaadinTheme: true,
        };

        props = { ...props, supports };

        const attributes = {
            ...props.attributes,
            vaadinTheme: {
                type: 'string',
                source: 'attribute',
                attribute: 'id',
                selector: '*',
            },
        };

        props = { ...props, attributes };
        */

        return props;
    }
);
