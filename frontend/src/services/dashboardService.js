import API from './api';

function getFriendlyErrorMessage(error, fallbackMessage) {
  if (error.response) {
    return (
      error.response.data?.message ||
      error.response.data?.error ||
      fallbackMessage
    );
  }

  if (error.request) {
    return 'Unable to reach the server. Please check your connection and try again.';
  }

  return fallbackMessage;
}

export async function getDashboardStats() {
  try {
    const response = await API.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    throw new Error(
      getFriendlyErrorMessage(error, 'Unable to load dashboard statistics. Please try again.')
    );
  }
}
