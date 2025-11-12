import API_BASE_URL from '../../config/api';

/**
 * Fetch all feedbacks from the API
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} Array of feedback objects
 */
export const fetchFeedbacks = async (token) => {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch feedbacks: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch feedback statistics from the API
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Feedback statistics object
 */
export const fetchStats = async (token) => {
  const response = await fetch(`${API_BASE_URL}/feedback/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Submit a response to a feedback
 * @param {string} feedbackId - Feedback ID
 * @param {string} responseText - Response text
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated feedback object
 */
export const submitFeedbackResponse = async (feedbackId, responseText, token) => {
  const response = await fetch(`${API_BASE_URL}/feedback/${feedbackId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ response: responseText })
  });

  if (!response.ok) {
    throw new Error(`Failed to submit response: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
