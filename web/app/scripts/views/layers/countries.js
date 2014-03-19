'use strict';

define([
  'underscore',
  'backbone',
  'text!../../../styles/cartocss/countries.css',
  'text!../../../templates/infowindow.handlebars'
], function(_, Backbone, cartocss, tpl) {

  var CountriesLayerView = Backbone.View.extend({

    options: {
      user_name: sessionStorage.getItem('CARTODBUSER'),
      type: 'cartodb',
      sublayers: [{
        sql: 'SELECT * FROM countries',
        cartocss: cartocss,
        interactivity: 'cartodb_id, name'
      }]
    },

    template: tpl,

    createLayer: function(map) {
      var self = this;

      this.map = map;

      function errorCallback(err) {
        console.log(err);
      }

      function successCallback(layer) {
        self.layer = layer;
        self.map.addLayer(layer);
        self.createInfowindow();
      }

      if (this.map && !this.layer) {
        cartodb.createLayer(this.map, this.options)
          .on('done', successCallback)
          .on('error', errorCallback);
      }
    },

    createInfowindow: function() {
      var self = this;

      _.each(this.options.sublayers, function(option) {
        self.infowindow = cdb.vis.Vis.addInfowindow(self.map, self.layer.getSubLayer(0), option.interactivity, {
          infowindowTemplate: self.template,
          templateType: 'handlebars'
        });
      });
    },

    createLegend: function() {}

  });

  return CountriesLayerView;

});
