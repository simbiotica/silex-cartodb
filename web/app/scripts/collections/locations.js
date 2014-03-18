'use strict';

define([
  'backbone',
  'models/location'
], function(Backbone, LocationModel) {

  var LocationCollection = Backbone.Collection.extend({

    model: LocationModel

  });

  return LocationCollection;

});
