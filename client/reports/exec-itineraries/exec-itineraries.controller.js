(function () {
  'use strict';

  angular
    .module('app')
    .controller('ExecItinerariesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory
  ) {
    var vm = this;

    vm.years = getYears();

    vm.view = view;
    vm.getItineraries = getItineraries;

    initialize();
    //////////

    function initialize() {
      getEmployees();
    }

    function getEmployees() {
      employeeFactory.executives()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.execs = res.data;
      }
    }

    function getItineraries(isValid) {
      if (isValid) {
        employeeFactory.execItineraries(vm.executive, vm.year)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        vm.itineraries = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.itineraries.length; i++) {
          vm.itineraries[i].start_date = moment(vm.itineraries[i].start_date).format("MMM Do, YYYY");
          vm.itineraries[i].end_date = moment(vm.itineraries[i].end_date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      $location.path('/itinerary/' + id);
    }

    function getYears() {
      // TODO: get years from all as far back as all itineraries go, and as far forward as all itineraries go
      var years = [];

      for (var i = 0; i < 10; i++) {
        // start at 2010 cause why not
        years.push(2010 + i);
      }

      return years;
    }

    function fail(err) {
      $log.log('Exec Itineraries Controller XHR Failed: ', err.data);
    }
  }
})();