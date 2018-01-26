(function () {
    'use strict';

    angular.module('app.session')
    .controller('sessionListCtrl', ['$scope', '$location', '$route', '$mdBottomSheet', 'sessionService', sessionListCtrl])
    .controller('sessionDetailCtrl', ['$scope', '$location', '$route', '$mdBottomSheet', 'sessionService', sessionDetailCtrl]);

    function sessionListCtrl($scope, $location, $route, $mdBottomSheet, sessionService) {

        $scope.query = angular.extend({page:1, limit: 20}, $location.search());

        $scope.getSessions = function() {
            $scope.promise = sessionService.query($scope.query).$promise.then(function(sessions) {
                $scope.sessions = sessions;
            });
        };

        $scope.getSessions();

        $scope.search = function () {
            // delete $scope.query.page;
            // delete $scope.query.limit;
            $location.search($scope.query);
        }

        $scope.showDetail = function (session) {
            $location.url('session/' + session._id);
        }

        $scope.saveSession = function (session) {
            session.$save();
        }

        $scope.getFirstQuestion = function (session) {
            return session.messages.filter(function (message) {
                return message.hitsQa;
            })[0] || {};
        }

        $scope.getFirstAnswers = function (session) {
            return session.messages.filter(function (message) {
                return message.qas;
            })[0] || {};
        }
    }

    function sessionDetailCtrl($scope, $location, $route, $mdBottomSheet, sessionService) {
        $scope.session = sessionService.get({id: $route.current.params.id});
        
        $scope.saveSession = function () {
            $scope.session.$save();
        }

        $scope.$watch('session', function (newValue, oldValue) {
            if (oldValue.$resolved) {
                $scope.sessionChanged = true;
            }
        }, true)
    }

})(); 



