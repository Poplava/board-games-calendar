define(function(require) {
  'use strict';

  var angular = require('angular'),
      template = require('text!./calendar.tpl.html'),
      controller = require('./calendar.controller'),
      $ = require('jquery');

  require('fullcalendar');

  return function () {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      controllerAs: 'dgCalendarIns',
      scope: {
      },
      controller: controller,
      link: link
    };

    function link(scope, element, attr, ctrl) {
      $(element).fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title'
        },
        editable: true,
        eventLimit: true,
        events: ctrl.loadEvents,
        dayClick: ctrl.onDayClick,
        eventClick: ctrl.onEventClick
      });
    }
  };
});