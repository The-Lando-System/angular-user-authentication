angular.module('myApp').controller('LoginModalCtrl',
function ($scope, $modalInstance) {
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});