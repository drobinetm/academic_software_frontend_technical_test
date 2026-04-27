import React from 'react';
import { AuthProvider } from '../../context/auth/AuthProvider';
import { CustomerProvider } from '../../context/customer/CustomerProvider';
import { FeedbackProvider } from '../../context/feedback/FeedbackProvider';
import { ThemeProvider } from '../../context/theme/ThemeProvider';
import { FeedbackSnackbar } from '../../components/common/FeedbackSnackbar';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <FeedbackProvider>
        <AuthProvider>
          <CustomerProvider>
            {children}
            <FeedbackSnackbar />
          </CustomerProvider>
        </AuthProvider>
      </FeedbackProvider>
    </ThemeProvider>
  );
}
