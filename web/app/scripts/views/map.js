'use strict';

define([
  'backbone',
  'views/layers/countries'
], function(Backbone, CountriesLayerView) {

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      map: {
        center: [40.416775, -3.703790],
        zoom: 5
      },
      tiles: {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      }
    },

    initialize: function() {
      this.countriesLayer = new CountriesLayerView({
        el: this.el
      });

      this.createMap();
      this.createTile();

      this.countriesLayer.createLayer(this.map); // Adding a CartoDB Layer
    },

    createMap: function() {
      var map;

      if (!this.map) {
        map = L.map(this.el, this.options.map);
      }

      this.map = map;

      return map;
    },

    createTile: function() {
      var tiles;

      if (this.map && !this.tiles) {
        tiles = L.tileLayer(this.options.tiles.url).addTo(this.map);
      }

      this.tiles = tiles;

      return tiles;
    }

  });

  return MapView;

});
