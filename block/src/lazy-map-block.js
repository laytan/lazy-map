import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

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
            type: 'number',
            source: 'attribute',
            selector: '#map',
            attribute: 'data-lat',
        },
        lng: {
            type: 'number',
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
                    label={ __('Marker tooltip', 'lazy-map') }
                    value={ markerTooltip }
                    onChange={ ( markerTooltip ) => setAttributes( { markerTooltip } ) }
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
                <TextControl
                    label={ __('Starting zoom', 'lazy-map') }
                    type="number"
                    value={ markerZoom }
                    onChange={ ( markerZoom ) => setAttributes( { markerZoom } ) }
                />
                <ToggleControl
                    label={ __('Show a marker?', 'lazy-map') }
                    help={ marker ? 'Shows a marker.' : 'No marker shown.' }
                    checked={ marker }
                    onChange={ () => setAttributes( { marker: !marker } ) }
                />
                <MediaUpload 
                    onSelect={ ( value ) => setAttributes( { markerCustom: value.sizes.full.url } ) }
                    render={ ( { open } ) => {
                        return <button onClick={ open }>
                            Upload marker || { markerCustom ? markerCustom : 'Geen' }
                        </button>
                    }}
                />
                </PanelBody>
            </InspectorControls>
            <div style={{ height: '3rem' }}>Lazy map</div>
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