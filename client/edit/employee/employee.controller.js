(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "employeeFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    employeeFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.employee_id = $routeParams.id;
    vm.company_id = $routeParams.company_id;
    vm.employee = getEmployee();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getEmployee() {
      employeeFactory.one(vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res;
        return res;
      }
    }


    function edit() {
      var payload = {
        employee: pruneEmpty(vm.employee)
      };
      
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getEmployee();
      }
    }

    function remove(data) {
      employeeFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/company/" + vm.company_id);
      }
    }

    function fail(err) {
      $log.log('Employee Controller XHR Failed: ' + err.data);
    }
  }
})();