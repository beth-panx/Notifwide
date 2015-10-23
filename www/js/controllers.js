angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('notificationsController', function($scope, notificationsService, $interval) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

$scope.test = "heyy";

  notificationsService.getAllNotifications()
  .success(function(notifications){
    $scope.notifications = notifications;
  })
  .error(function(e){
    //do something crazy
  })
  
  $scope.doRefresh = function() {
    notificationsService.getAllNotifications()
  .success(function(notifications){
    $scope.notifications = notifications;
  })
  .error(function(e){
    //do something crazy
  })
  .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    
 }
 
 $interval(
   notificationsService.getAllNotifications()
  .success(function(notifications){
    $scope.notifications = notifications;
  })
  .error(function(e){
    //do something crazy
  }), 9000);
  
  
  
  
  
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
   
})

.controller('notificationDetailController', function($scope, $stateParams, notificationsService) {
  
  notificationsService.getNotificationById($stateParams.notificationId)
  .success(function(notification){
    $scope.notification = notification;
  })
  .error(function(e){
    //do sometim crazy
  })
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
