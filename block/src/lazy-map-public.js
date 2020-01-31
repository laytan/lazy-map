/**
 * Loads the scripts google maps needs and calls initMap on load
 */
function lazyMapLoadGoogle() {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = `https://maps.googleapis.com/maps/api/js?key=${lazyMapGetApiKey()}&callback=lazyMapInitMap`;
	document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Renders the google maps map with our custom marker
 */
function lazyMapInitMap() {
	const mapEl = document.querySelector('#map');
	const { lat, lng, marker, markerCustom, markerTooltip, markerZoom } = mapEl.dataset;
	
	const center = {
		lat: Number(lat), lng: Number(lng)
	};
	const map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: Number(markerZoom),
			center
		}
	);
	if(marker === "true") {
		if(markerCustom !== "false") {
			const icon = {
				url: markerCustom,
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 0) // anchor
			};

			new google.maps.Marker({
				position: center,
				map: map,
				icon,
				title: markerTooltip,
			});
		} else {
			new google.maps.Marker({
				position: center,
				map: map,
				title: markerTooltip,
			});
		}
	}
}

/**
 * Set up an intersection observer for when the map needs to be loaded
 */
function lazyMapSetUpMap() {
	// Load google without intersection observer if it is not supported (ie)
	if ('IntersectionObserver' in window) {
		const observeOpts = {
			threshold: 0,
			rootMargin: '0px',
		};
	
		const observer = new IntersectionObserver((entries) => {
			if(entries[0] && entries[0].isIntersecting === true) {
				lazyMapLoadGoogle();
				observer.disconnect();
			}
		}, observeOpts);
		
		observer.observe(document.querySelector("#map"));
	} else {
		lazyMapLoadGoogle();
	}
}

/**
 * Retrieve the Google Maps JS API key from the dataset of the map
 */
function lazyMapGetApiKey() {
	const map = document.getElementById('map');
	if(map) {
		return map.dataset.key;
	}
}

window.onload = () => {
	if(document.getElementById('map')) {
		lazyMapSetUpMap();
	}
}