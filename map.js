mapboxgl.accessToken =
  "pk.eyJ1IjoidmluY2VudHZhbmJ1c2tpcmsiLCJhIjoiY2wxOHFjajk2MjFiMjNqbjF1bWxsaWt4YiJ9.RX0gnSYBbgZYKkfiXZ0h2g";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/vincentvanbuskirk/cl3ue8n9r005h14o8313atdpn",
  zoom: 3,
  maxZoom: 9,
  minZoom: 3,
  center: [-85.5, 37.7],
});

map.on("load", function () {
  map.addLayer(
    {
      id: "us_states_elections_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    },
    "waterway-label"
  );
  map.addLayer(
    {
      id: "us_states_elections",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/statesElections.geojson",
      },
      maxzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump",
          "#cf635d",
          "Joseph R Biden Jr",
          "#6193c7",
          "Other",
          "#91b66e",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
        "fill-opacity": ["step", ["get", "WnrPerc"], 0.3, 0.4, 0.5, 0.5, 0.7, 0.6, 0.9],
      },
    },
    "us_states_elections_outline"
  );

  map.addLayer(
    {
      id: "us_counties_elections_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countiesElections.geojson",
      },
      minzoom: 6,
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.25,
      },
    },
    "us_states_elections"
  );
  map.addLayer(
    {
      id: "us_counties_elections",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countiesElections.geojson",
      },
      minzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump",
          "#cf635d",
          "Joseph R Biden Jr",
          "#6193c7",
          "Other",
          "#91b66e",
          "#ffffff",
        ],
        "fill-outline-color": "#000000",
        "fill-opacity": ["step", ["get", "WnrPerc"], 0.3, 0.4, 0.5, 0.5, 0.7, 0.6, 0.9],
      },
    },
    "us_counties_elections_outline"
  );

  // Create the popup
  map.on("click", "us_states_elections", function (e) {
    var stateName = e.features[0].properties.State;
    var winner = e.features[0].properties.Winner;
    var wnrPerc = e.features[0].properties.WnrPerc;
    var totalVotes = e.features[0].properties.Total;
    wnrPerc = (wnrPerc * 100).toFixed(0);
    totalVotes = totalVotes.toLocaleString();
    stateName = stateName.toUpperCase();
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" +
          stateName +
          "</h4>" +
          "<h2>" +
          winner +
          "</h2>" +
          "<p>" +
          wnrPerc +
          "% - (" +
          totalVotes +
          " votes)</p>"
      )
      .addTo(map);
  });
  // Change the cursor to a pointer when the mouse is over the us_states_elections layer.
  map.on("mouseenter", "us_states_elections", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "us_states_elections", function () {
    map.getCanvas().style.cursor = "";
  });

  map.on("click", "us_counties_elections", function (e) {
    var stateName = e.features[0].properties.State;
    var countyName = e.features[0].properties.County;
    var winner = e.features[0].properties.Winner;
    var wnrPerc = e.features[0].properties.WnrPerc;
    var totalVotes = e.features[0].properties.Total;
    wnrPerc = (wnrPerc * 100).toFixed(0);
    totalVotes = totalVotes.toLocaleString();
    stateName = stateName.toUpperCase();
    countyName = countyName.toUpperCase();
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" +
          countyName +
          " - " +
          stateName +
          "</h4>" +
          "<h2>" +
          winner +
          "</h2>" +
          "<p>" +
          wnrPerc +
          "% - (" +
          totalVotes +
          " votes)</p>"
      )
      .addTo(map);
  });
  map.on("mouseenter", "us_counties_elections", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "us_counties_elections", function () {
    map.getCanvas().style.cursor = "";
  });
});
