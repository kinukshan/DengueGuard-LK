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

export async function getReports(filters = {}) {
  try {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.district) params.append('district', filters.district);
    if (filters.riskLevel) params.append('riskLevel', filters.riskLevel);
    if (filters.status) params.append('status', filters.status);

    const queryString = params.toString();
    const url = queryString ? `/reports?${queryString}` : '/reports';

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    throw new Error(
      getFriendlyErrorMessage(error, 'Unable to load reports. Please try again.')
    );
  }
}

export async function getReportById(id) {
  try {
    const response = await API.get(`/reports/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      getFriendlyErrorMessage(error, 'Unable to load the report. Please try again.')
    );
  }
}
