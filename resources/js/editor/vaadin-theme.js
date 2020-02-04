/**
 * External dependencies
 */
const { assign, has } = lodash;

/**
 * WordPress dependencies
 */
const { addFilter } = wp.hooks;

const {
    TextControl,
    ExternalLink
} = wp.components;

const { __ } = wp.i18n;

const {
    hasBlockSupport,
} = wp.blocks;

const {
    createHigherOrderComponent,
    compose
} = wp.compose;

const {
    withSelect
} = wp.data;

/**
 * Internal dependencies
 */
const { InspectorAdvancedControls }	= wp.editor;

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export function addAttribute( settings ) {
    // allow blocks to specify their own attribute definition with default values if needed.
    /*
    if ( has( settings.attributes, [ 'vaadinTheme', 'type' ] ) ) {
        return settings;
    }
    */

    if ( hasBlockSupport( settings, 'vaadinTheme' ) ) {
        // Use Lodash's assign to gracefully handle if attributes are undefined
        settings.attributes = assign( settings.attributes, {
            vaadinTheme: {
                type: 'string',
                source: 'attribute',
                attribute: 'datavaadintheme',
                selector: '*',
            },
        } );
    }

    return settings;
}

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the vaadinTheme ID, if block supports vaadinTheme.
 *
 * @param {WPComponent} BlockEdit Original component.
 *
 * @return {WPComponent} Wrapped component.
 */
export const withInspectorControl = createHigherOrderComponent(
    ( BlockEdit ) => {
        return ( props ) => {

            const { name, clientId, attributes, setAttributes, isSelected } = props;

            const { vaadinTheme } = attributes;

            const hasAnchor = hasBlockSupport( props.name, 'vaadinTheme' );

            if ( hasAnchor && props.isSelected ) {
                return (
                    <>
                        <BlockEdit { ...props } />
                        <InspectorAdvancedControls>
                            <TextControl
                                className="html-vaadinTheme-control"
                                label={ __( 'Vaadin Theme' ) }
                                help={
                                    <>
                                        { __(
                                            'Enter a word or two — without spaces — to make a unique web address just for this heading, called an “vaadinTheme.” Then, you’ll be able to link directly to this section of your page.'
                                        ) }

                                        <ExternalLink
                                            href={
                                                'https://wordpress.org/support/article/page-jumps/'
                                            }
                                        >
                                            { __( 'Learn more about vaadinThemes' ) }
                                        </ExternalLink>
                                    </>
                                }
                                value={ props.attributes.vaadinTheme || '' }
                                /*
                                onChange={ ( nextValue ) => {
                                    nextValue = nextValue.replace(
                                        ANCHOR_REGEX,
                                        '-'
                                    );
                                    props.setAttributes( {
                                        vaadinTheme: nextValue,
                                    } );
                                } }
                                */
                                onChange={ ( nextValue ) => {

                                    nextValue = nextValue.replace(
                                        ANCHOR_REGEX,
                                        '-'
                                    );
                                    //console.log(nextValue);
                                    console.log(vaadinTheme);
                                    console.log(nextBlockClientId);

                                    setAttributes( {
                                        vaadinTheme: nextValue,
                                    } );

                                    const nextBlockClientId = wp.data
                                        .select( 'core/block-editor' )
                                        .getNextBlockClientId( clientId );

                                    if ( nextBlockClientId ) {
                                        wp.data
                                            .dispatch( 'core/block-editor' ).updateBlockAttributes( nextBlockClientId, {
                                            vaadinTheme: nextValue
                                        } );
                                    }
                                } }

                            />
                        </InspectorAdvancedControls>
                    </>
                );
            }

            return <BlockEdit { ...props } />;
        };
    },
    'withInspectorControl'
);

/**
 * Override props assigned to save component to inject vaadinTheme ID, if block
 * supports vaadinTheme. This is only applied if the block's save result is an
 * element and not a markup string.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps( extraProps, blockType, attributes ) {
    if ( hasBlockSupport( blockType, 'vaadinTheme' ) ) {
        //extraProps['vaadin-theme'] = attributes.vaadinTheme === '' ? null : attributes.vaadinTheme;
    }

    return extraProps;
}

addFilter( 'blocks.registerBlockType', 'cxl/ui/block/vaadinTheme/attribute', addAttribute );
addFilter(
    'editor.BlockEdit',
    'cxl/ui/block/vaadinTheme/with-inspector-control',
    withInspectorControl
);
addFilter(
    'blocks.getSaveContent.extraProps',
    'cxl/ui/block/vaadinTheme/save-props',
    addSaveProps
);

const enhance = compose(
    /**
     * For blocks whose block type doesn't support `multiple`, provides the
     * wrapped component with `originalBlockClientId` -- a reference to the
     * first block of the same type in the content -- if and only if that
     * "original" block is not the current one. Thus, an inexisting
     * `originalBlockClientId` prop signals that the block is valid.
     *
     * @param {Function} WrappedBlockEdit A filtered BlockEdit instance.
     *
     * @return {Function} Enhanced component with merged state data props.
     */
    withSelect( ( select ) => {
        return {
            selected: select( 'core/block-editor' ).getSelectedBlock(),
            select,
        };
    } )
);

const addEditorBlockAttributes = createHigherOrderComponent( ( BlockListBlock ) => {

    return enhance( ( { select, ...props } ) => {

        let wrapperProps = props.wrapperProps;

        let customData = {};

        const attributes = select( 'core/block-editor' ).getBlock( props.clientId )
            .attributes;

        const blockName = select( 'core/block-editor' ).getBlockName( props.clientId );

        const withVaadinTheme = hasBlockSupport( blockName, 'vaadinTheme' );

        if ( withVaadinTheme ) {

            const { vaadinTheme } = attributes;

            if ( typeof vaadinTheme !== 'undefined' && vaadinTheme ) {
                customData = Object.assign( customData, {
                    'datavaadintheme': vaadinTheme,
                } );
            }

        }

        if ( withVaadinTheme ) {
            wrapperProps = {
                ...wrapperProps,
                ...customData,
            };
        }

        console.log(wrapperProps);

        return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
    } );
}, 'addEditorBlockAttributes' );

addFilter(
    'editor.BlockListBlock',
    'cxl/ui/addEditorBlockAttributes',
    addEditorBlockAttributes
);
