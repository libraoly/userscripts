const css = String.raw
GM_addStyle(css`
  #map-container::after {
    background-image: none !important;
  }

  .premium-calendar #map-container #leaflet-map {
    filter: none !important;
  }
`)
