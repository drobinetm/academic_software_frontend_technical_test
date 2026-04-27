import { useContext } from 'react';
import { FeedbackContext } from '../context/feedback/FeedbackContext';

export const useFeedback = () => useContext(FeedbackContext);
