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

export async function updateReport(id, reportData) {
  try {
    const response = await API.put(`/reports/${id}`, reportData);
    return response.data;
  } catch (error) {
    throw new Error(
      getFriendlyErrorMessage(error, 'Unable to update the report. Please try again.')
    );
  }
}

export async function deleteReport(id) {
  try {
    const response = await API.delete(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      getFriendlyErrorMessage(error, 'Unable to delete the report. Please try again.')
    );
  }
}
