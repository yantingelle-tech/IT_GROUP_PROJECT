let notifications = [];

function sendNotification(userId, userType, title, message){
    let newNotification = {
        id: Date.now(),          //use time for message id
        userId: userId,
        userType: userType,
        title: title,
        message: message,
        isRead: false
    }
    notifications.push(newNotification);
    return newNotification;
}

function unreadNotifications(userId, userType) {
    let unread = notifications.filter((notif) => notif.userId === userId && notif.userType === userType && !notif.isRead);
    return unread;
}

function markRead(notificationId) {
    let notif = notifications.find((notif) => notif.id === notificationId);
    if (notif) {
        notif.isRead = true;
        return true;
    }
    return false;
}

function getAllUserNotifications(userId, userType) {
    let notif = notifications.filter((notif) => notif.userId === userId && notif.userType === userType);
    return notif;
}