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
        self.createInfowindows();
        self.createLegends();
      }

      if (this.map && !this.layer) {
        cartodb.createLayer(this.map, this.options)
          .on('done', successCallback)
          .on('error', errorCallback);
      }
    },

    createInfowindows: function() {
      var self = this;

      _.each(this.options.sublayers, function(option) {
        self.infowindow = cdb.vis.Vis.addInfowindow(self.map, self.layer.getSubLayer(0), option.interactivity, {
          infowindowTemplate: self.template,
          templateType: 'handlebars'
        });
      });
    },

    createLegends: function() {
      var customLegendData, choroplethLegendData, customLegend, choroplethLegend;

      customLegendData = [{
        name: 'Item 1',
        value: '#ff0'
      }, {
        name: 'Item 2',
        value: '#f00'
      }];

      choroplethLegendData = {
        title: 'A choropleth legend',
        left: '0%',
        right: '100%',
        colors: ['#FFFAC0', '#E8C365', '#D08A1B', '#B85D1C', '#983745', '#632969', '#212D6F']
      };

      customLegend = new cdb.geo.ui.Legend({
        title: 'A custom legend',
        type: 'custom',
        data: customLegendData
      });

      choroplethLegend = new cdb.geo.ui.Legend.Choropleth(choroplethLegendData);

      this.legends = new cdb.geo.ui.Legend.Stacked({
        legends: [customLegend, choroplethLegend]
      });

      this.$el.append(this.legends.render().el);
    }

  });

  return CountriesLayerView;

});
