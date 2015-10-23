angular.module('starter.services', [])

.factory('notificationsService', function($http) {
  // Might use a resource here that returns a JSON array



 var notificationsService = {};
 
    notificationsService.getAllNotifications = function(){
      return $http.get('http://notificationsapi.mybluemix.net/api/notifications');
    }
    
    notificationsService.getNotificationById = function(ID){
      return $http.get('http://notificationsapi.mybluemix.net/api/notifications/' + ID);
    }

    notificationsService.getUserDashboard = function () {
        return $http.get('http://notificationsapi.mybluemix.net/api/dashboard');
    }
    
    // notificationsService.getNotification = function(notificationId, allNotifications){
    //     for (var i = 0; i < allNotifications.length; i++) {
    //     if (allNotifications[i]._id === parseInt(allNotifications)) {
    //       return allNotifications[i];
    //         }
    //       }
    //     }
      
     
  return notificationsService;

});


  // remove: function(chat) {
    //   chats.splice(chats.indexOf(chat), 1);
    // },
    // get: function(chatId) {
    //   for (var i = 0; i < chats.length; i++) {
    //     if (chats[i].id === parseInt(chatId)) {
    //       return chats[i];
    //     }
      