export const NOTIFICATION_SHOW = 'notification/NOTIFICATION_SHOW';
export const notification_show = (type, message) => {
    return dispatch => {
        dispatch({
            type: NOTIFICATION_SHOW,
            notificationType: type,
            message
        });
        
        setTimeout(() => {
            dispatch(notification_close());
        }, 3000);
    }
};

export const NOTIFICATION_CLOSE = 'notification/NOTIFICATION_CLOSE';
export const notification_close = () => {
    return dispatch => {
        dispatch({
            type: NOTIFICATION_CLOSE
        });
    }
};