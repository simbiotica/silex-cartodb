'use strict';

define([
  'backbone',
  'text!../../../styles/cartocss/countries.css'
], function(Backbone, cartocss) {

  var CountriesLayerView = Backbone.View.extend({

    options: {
      user_name: sessionStorage.getItem('CARTODBUSER'),
      type: 'cartodb',
      sublayers: [{
        sql: 'SELECT * FROM countries',
        cartocss: cartocss
      }]
    },

    createLayer: function(map) {
      var self = this;

      this.map = map;

      function errorCallback(err) {
        console.log(err);
      }

      function successCallback(layer) {
        var sublayer = layer.getSubLayer(0);

        console.log(sublayer);
      }

      if (this.map && !this.layer) {
        this.layer = cartodb.createLayer(this.map, this.options);

        this.layer
          .addTo(self.map)
          .on('done', successCallback)
          .on('error', errorCallback);
      }
    }

  });

  return CountriesLayerView;

});
