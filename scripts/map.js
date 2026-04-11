// Balm of Gilead Logistics — Interactive Map
// Leaflet.js with OpenStreetMap tiles

(function () {
  var mapEl = document.getElementById('service-map');
  if (!mapEl) return;

  var map = L.map('service-map', {
    center: [43.8, -85.4],
    zoom: 6,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
  });

  // Clean, light tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  // Primary green pin (Grand Rapids, Kalamazoo, Battle Creek)
  function primaryPin() {
    return L.divIcon({
      className: '',
      html: '<div style="width:18px;height:18px;background:#00D26A;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 10px rgba(0,210,106,0.5),0 0 0 4px rgba(0,210,106,0.15);"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -14],
    });
  }

  // Secondary blue pin (other cities)
  function secondaryPin() {
    return L.divIcon({
      className: '',
      html: '<div style="width:12px;height:12px;background:#0047BA;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,71,186,0.4);"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      popupAnchor: [0, -10],
    });
  }

  var popupOpts = {
    className: 'bog-popup',
    closeButton: false,
  };

  // Primary service hubs
  L.marker([42.9634, -85.6681], { icon: primaryPin() })
    .addTo(map)
    .bindPopup('<div class="bog-popup-inner"><strong>Grand Rapids, MI</strong><br><span>Primary Service Hub</span></div>', popupOpts);

  L.marker([42.2917, -85.5872], { icon: primaryPin() })
    .addTo(map)
    .bindPopup('<div class="bog-popup-inner"><strong>Kalamazoo, MI</strong><br><span>Primary Service Hub</span></div>', popupOpts);

  L.marker([42.3212, -85.1797], { icon: primaryPin() })
    .addTo(map)
    .bindPopup('<div class="bog-popup-inner"><strong>Battle Creek, MI</strong><br><span>Service Area</span></div>', popupOpts);

  // Secondary service cities
  var secondary = [
    { name: 'Detroit, MI', lat: 42.3314, lng: -83.0458 },
    { name: 'Lansing, MI', lat: 42.7325, lng: -84.5555 },
    { name: 'Muskegon, MI', lat: 43.2342, lng: -86.2484 },
    { name: 'Holland, MI', lat: 42.7876, lng: -86.1090 },
    { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
    { name: 'Indianapolis, IN', lat: 39.7684, lng: -86.1581 },
    { name: 'Columbus, OH', lat: 39.9612, lng: -82.9988 },
    { name: 'Cleveland, OH', lat: 41.4993, lng: -81.6944 },
  ];

  secondary.forEach(function (city) {
    L.marker([city.lat, city.lng], { icon: secondaryPin() })
      .addTo(map)
      .bindPopup('<div class="bog-popup-inner"><strong>' + city.name + '</strong><br><span>Service Area</span></div>', popupOpts);
  });

  // Style custom popups
  var style = document.createElement('style');
  style.textContent = [
    '.bog-popup .leaflet-popup-content-wrapper {',
    '  background: #0D1B2A;',
    '  color: #fff;',
    '  border-radius: 8px;',
    '  padding: 0;',
    '  box-shadow: 0 8px 24px rgba(0,0,0,0.3);',
    '  border: 1px solid rgba(0,210,106,0.3);',
    '}',
    '.bog-popup .leaflet-popup-tip { background: #0D1B2A; }',
    '.bog-popup-inner { padding: 10px 14px; font-family: Inter, sans-serif; }',
    '.bog-popup-inner strong { display: block; font-size: 0.85rem; margin-bottom: 2px; color: #fff; }',
    '.bog-popup-inner span { font-size: 0.75rem; color: #00D26A; font-weight: 600; }',
    '.leaflet-control-attribution { font-size: 9px !important; }',
  ].join('');
  document.head.appendChild(style);
})();
