import { useState, useEffect, useContext } from "react";
import { Badge } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AuthContext } from "../../context/auth";
import "./style.css";

function NotificationIcon() {
  const { isLogin, notifications, setNotifications } = useContext(AuthContext);
  const [userNotifications, setUserNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLogin) {
      // Get the current user's ID from localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;

      if (userId && notifications) {
        // Filter notifications for the current user
        const filteredNotifications = notifications.filter(
          notification => notification.to === userId
        );
        
        // Add IDs to notifications if they don't have them
        const notificationsWithIds = filteredNotifications.map((notification, index) => ({
          ...notification,
          id: notification.id || index + 1
        }));
        
        // Sort notifications by date (newest first)
        // Convert DD/MM/YYYY to a sortable format
        const sortedNotifications = [...notificationsWithIds].sort((a, b) => {
          // Parse dates in format DD/MM/YYYY
          const dateA = a.createDate ? a.createDate.split('/').reverse().join('') : '0';
          const dateB = b.createDate ? b.createDate.split('/').reverse().join('') : '0';
          
          // Sort in descending order (newest first)
          return dateB.localeCompare(dateA);
        });
        
        setUserNotifications(sortedNotifications);
        
        // Count unread notifications
        const unreadNotificationsCount = notificationsWithIds.filter(
          notification => notification.read === false
        ).length;
        
        setUnreadCount(unreadNotificationsCount);
      }
    }
  }, [isLogin, notifications]);

  const markAsRead = (notificationId) => {
    // Update the notification in the context
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    );
    
    setNotifications(updatedNotifications);
    
    // Update local state
    setUserNotifications(
      userNotifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    // Get the current user's ID
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user.id;
    
    // Update all notifications for this user in the context
    const updatedNotifications = notifications.map(notification => 
      notification.to === userId 
        ? { ...notification, read: true } 
        : notification
    );
    
    setNotifications(updatedNotifications);
    
    // Update local state
    setUserNotifications(
      userNotifications.map(notification => ({ ...notification, read: true }))
    );
    
    setUnreadCount(0);
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  if (!isLogin) {
    return null;
  }

  return (
    <div className="notification-container">
      <Badge count={unreadCount} overflowCount={99}>
        <div onClick={toggleNotifications} className="notification-icon">
          <IoIosNotificationsOutline style={{ fontSize: 30 }} />
        </div>
      </Badge>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Thông báo</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read" 
                onClick={markAllAsRead}
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>

          <div className="notification-list">
            {userNotifications.length > 0 ? (
              userNotifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon-container">
                    {notification.from === 0 ? (
                      <div className="system-icon">
                        <i className="fas fa-bell"></i>
                      </div>
                    ) : (
                      <div className="user-icon">
                        <img 
                          src="/assets/images/Hinh-gai-xinh-Viet-Nam-ngau.jpg" 
                          alt="user" 
                        />
                      </div>
                    )}
                  </div>
                  <div className="notification-content">
                    <p>{notification.content}</p>
                    <span className="notification-date">{notification.createDate}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-notification">
                <p>Không có thông báo nào</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationIcon;