define(function(require, exports, module) {
  'use strict';

  var angular = require('angular'),
      MocksConfig = require('shared/mocks-config'),
      HandleErrors = require('shared/errors'),
      RoutingConfig = require('shared/routing-config'),
      UtilsModule = require('shared/utils'),
      
      CalendarScreen = require('screens/calendar'),

      //Data layer
      DataLayerModule = require('data-layer'),

      //Modules
      ButtonLoader = require('shared/directives/button-loader'),
      GlobalLoader = require('shared/directives/global-loader'),
      LoadingLocker = require('shared/directives/loading-locker'),
      MainMenu = require('modules/main-menu'),
      CalendarModule = require('modules/calendar'),
      PlayNewModule = require('modules/play/play-new'),
      PlayJoinModule = require('modules/play/play-join'),
      UserMenuModule = require('modules/user/user-menu');

  require('angular-route');
  require('angular-resource');
  require('angular-bootstrap');
  require('angular-datepicker');

  var app = angular.module('Base', [
    CalendarScreen.name,
    UtilsModule.name,
    DataLayerModule.name,
    MainMenu.name,
    CalendarModule.name,
    PlayNewModule.name,
    PlayJoinModule.name,
    ButtonLoader.name,
    LoadingLocker.name,
    GlobalLoader.name,
    UserMenuModule.name
  ])
  .config(RoutingConfig)
  .run(HandleErrors);

  if (module.config().serverMocks) {
    app.config(['$provide', function($provide) {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator); 
    }]);
    app.run(MocksConfig);
  }

  angular.bootstrap(document, [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'datePicker',

    app.name
  ]);
});