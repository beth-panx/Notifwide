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
  
  $scope.remove = function (notification) {
      $scope.notifications.splice($scope.notifications.indexOf(notification), 1);
  }; 
  
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
})

.controller('dashboardController', function ($scope, $stateParams, notificationsService) {
    notificationsService.getUserDashboard()
    .success(function (dashboard) {
        $scope.dashboard = dashboard;

        $scope.timeoff = timeOffDisplay(dashboard[0]);
        $scope.paycheck = payCheckData(dashboard[1]);
        $scope.benefits = benefitsDisplay(dasb)
    })
    .error(function (e) {
        //Do Something Crazy...freshmen...freshmen...freshmen
    })
});


function timeOffDisplay(data)
{
    var title = data.app.charAt(0).toUpperCase() + data.app.slice(1);
    var days = Math.floor(data.appdata.timeoff / 60 / 24);
    var hours = Math.floor((data.appdata.timeoff - (days * 24 * 60)) / 60);
    var minutes = Math.floor((data.appdata.timeoff - ((days * 24 * 60) + (hours*60)))) ;

    var display = "Current MyTime Accrued: " + days + " days " + hours + " hours " + minutes + " minutes";
    return {
        "title": title,
        "display": display
    }
}

function payCheckData(data) {
    var ONE_DAY = 1000 * 60 * 60 * 24
    var title = data.app.charAt(0).toUpperCase() + data.app.slice(1);
    var payDay = new Date(data.appdata.nextpaydate);
    var today = new Date();
    var diffDays = Math.round(Math.abs((payDay.getTime() - today.getTime()) / (ONE_DAY)));

    var displayText = "Next Pay Day is in " + diffDays + " days!"

    return {"title": title,
        "display": displayText}
}