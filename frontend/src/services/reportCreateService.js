import API from './api';

/**
 * Submit a new dengue breeding-site report.
 *
 * @param {Object} reportData
 * @param {string} reportData.reporterName
 * @param {string} reportData.district
 * @param {string} reportData.area
 * @param {string} reportData.locationType
 * @param {string} reportData.riskLevel
 * @param {string} reportData.description
 * @returns {Promise<Object>} The created report from the server
 */
export async function createReport(reportData) {
  try {
    const response = await API.post('/reports', reportData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a non-2xx status
      const serverMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        'Unable to submit the report. Please try again.';
      throw new Error(serverMessage);
    } else if (error.request) {
      // Request was made but no response received (network failure)
      throw new Error(
        'Unable to reach the server. Please check your connection and try again.'
      );
    } else {
      throw new Error('Unable to submit the report. Please try again.');
    }
  }
}
