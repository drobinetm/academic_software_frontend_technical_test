import React, { useCallback, useMemo, useState } from 'react';
import { FeedbackContext } from './FeedbackContext';

const initialFeedback = {
  open: false,
  severity: 'info',
  message: '',
};

export function FeedbackProvider({ children }) {
  const [feedback, setFeedback] = useState(initialFeedback);

  const showFeedback = useCallback(({ message, severity = 'info' }) => {
    setFeedback({
      open: true,
      severity,
      message,
    });
  }, []);

  const closeFeedback = useCallback(() => {
    setFeedback((current) => ({
      ...current,
      open: false,
    }));
  }, []);

  const value = useMemo(
    () => ({
      feedback,
      showFeedback,
      closeFeedback,
    }),
    [closeFeedback, feedback, showFeedback]
  );

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}
