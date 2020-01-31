import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl, Text } from '@wordpress/components';

registerBlockType( 'lazy-map/lazy-map-block', {
    title: __('Lazy map', 'lazy-map'),
    description: __('A map that is lazy loaded for better SEO and performance', 'lazy-map'),
    icon: 'location-alt',
    category: 'widgets',
    example: {
        attributes: {
            key: 'your_key_here',
            lat: 40.7128,
            lng: 74.0060,
            marker: true,
            markerCustom: 'false',
            markerTooltip: 'New York',
            markerZoom: 10,
        },
    },
    attributes: {
        key: {
            type: 'string',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-key',
        },
        lat: {
            type: 'string',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-lat',
        },
        lng: {
            type: 'string',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-lng',
        },
        marker: {
            type: 'boolean',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-marker',
        },
        markerCustom: {
            type: 'string',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-marker-custom',
            default: 'false',
        },
        markerTooltip: {
            type: 'string',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-marker-tooltip',
        },
        markerZoom: {
            type: 'number',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-marker-zoom',
            default: 10,
        },
    },
    edit({ attributes, setAttributes }) {
        const { key, markerTooltip, lat, lng, markerZoom, markerCustom, marker } = attributes;
        return <div>
            <InspectorControls>
                <PanelBody>
                <TextControl
                    label={ __('Google Maps JS API key', 'lazy-map') }
                    value={ key }
                    onChange={ ( key ) => setAttributes( { key } ) }
                />
                <TextControl
                    label={ __('Marker/Center latitude', 'lazy-map') }
                    type="number"
                    value={ lat }
                    onChange={ ( lat ) => setAttributes( { lat } ) }
                />
                <TextControl
                    label={ __('Marker/Center longtitude', 'lazy-map') }
                    type="number"
                    value={ lng }
                    onChange={ ( lng ) => setAttributes( { lng } ) }
                />
                <RangeControl
                    label={ __('Starting zoom level', 'lazy-map') }
                    value={ markerZoom }
                    onChange={ ( markerZoom ) => setAttributes( { markerZoom } ) }
                    min={ 0 }
                    max={ 19 }
                />
                <ToggleControl
                    label={ __('Show a marker?', 'lazy-map') }
                    help={ marker ? 'Shows a marker.' : 'No marker shown.' }
                    checked={ marker }
                    onChange={ () => setAttributes( { marker: !marker } ) }
                />
                { marker === true &&
                    <>
                        <TextControl
                            label={ __('Marker tooltip', 'lazy-map') }
                            value={ markerTooltip }
                            onChange={ ( markerTooltip ) => setAttributes( { markerTooltip } ) }
                        />
                        <h3 style={{ marginBottom: '0' }}>{ __('Custom marker', 'lazy-map') }</h3>
                        <small>{ __('Leave empty to use the default marker', 'lazy-map') }</small>
                        { markerCustom !== 'false' &&
                            <>
                                <img style={{ display: 'block' }} src={ markerCustom } />
                                <Button style={{ display: 'block' }} isDefault onClick={ () => setAttributes({ markerCustom: 'false' }) }>
                                    { __( 'Reset custom marker', 'lazy-map' ) }
                                </Button>
                            </>
                        }
                        <MediaUpload
                            onSelect={ ( value ) => setAttributes( { markerCustom: value.sizes.full.url } ) }
                            render={ ( { open } ) => {
                                return <Button isDefault onClick={ open }>
                                    { __('Choose image', 'lazy-map' ) }
                                </Button>
                            }}
                        />
                    </>
                }
                </PanelBody>
            </InspectorControls>
            <div>
                <h3>{ __('Edit Lazy Map options in the sidebar', 'lazy-map') }</h3>
            </div>
        </div>;
    },
    save({ attributes }) {
        const { key, markerTooltip, lat, lng, markerZoom, markerCustom, marker } = attributes;
        return <div
                style={{ height: '600px' }}
                id="map" 
                data-key={key}
                data-lat={lat}
                data-lng={lng}
                data-marker={marker}
                data-marker-custom={markerCustom}
                data-marker-tooltip={markerTooltip} 
                data-marker-zoom={markerZoom}>

        </div>;
    },
} );