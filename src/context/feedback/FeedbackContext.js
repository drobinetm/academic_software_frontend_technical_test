import React from 'react';

export const FeedbackContext = React.createContext({
  feedback: {
    open: false,
    severity: 'info',
    message: '',
  },
  showFeedback: () => {},
  closeFeedback: () => {},
});
