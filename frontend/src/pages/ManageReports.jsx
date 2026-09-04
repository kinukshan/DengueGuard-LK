import { useEffect, useMemo, useState } from 'react';
import EditReportModal from '../components/EditReportModal';
import StatusSelector from '../components/StatusSelector';
import { deleteReport, updateReport } from '../services/reportManageService';
import API from '../services/api';
import './ManageReports.css';

const DEMO_REPORTS = [
  {
    _id: 'demo-1',
    reporterName: 'Nimal Silva',
    district: 'Colombo',
    area: 'Kollupitiya',
    locationType: 'Blocked Drain',
    riskLevel: 'High',
    status: 'Pending',
    description: 'Several stagnant water pockets are pooling near a blocked drainage channel.',
  },
  {
    _id: 'demo-2',
    reporterName: 'Anusha Perera',
    district: 'Gampaha',
    area: 'Ja-Ela',
    locationType: 'Discarded Containers',
    riskLevel: 'Medium',
    status: 'In Progress',
    description: 'Old containers and tyres were identified near a construction area with standing water.',
  },
];

function getReportIdentifier(report) {
  return report?._id || report?.id || null;
}

export default function ManageReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const totalPending = useMemo(
    () => reports.filter((report) => report.status === 'Pending').length,
    [reports]
  );

  const totalInProgress = useMemo(
    () => reports.filter((report) => report.status === 'In Progress').length,
    [reports]
  );

  const totalResolved = useMemo(
    () => reports.filter((report) => report.status === 'Resolved').length,
    [reports]
  );

  async function loadReports() {
    try {
      setLoading(true);
      setError('');

      const response = await API.get('/reports');
      const payload = response.data;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : [];

      setReports(list.length > 0 ? list : DEMO_REPORTS);
    } catch (error) {
      setReports(DEMO_REPORTS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  const handleOpenEdit = (report) => {
    setSelectedReport(report);
  };

  const handleSaveReport = async (updatedFields) => {
    const reportId = getReportIdentifier(selectedReport);

    if (!reportId) {
      setError('Unable to find the selected report.');
      return;
    }

    try {
      setError('');
      await updateReport(reportId, updatedFields);

      setReports((currentReports) =>
        currentReports.map((report) =>
          getReportIdentifier(report) === reportId
            ? { ...report, ...updatedFields }
            : report
        )
      );

      setSuccessMessage('Report updated successfully.');
      setSelectedReport(null);
    } catch (error) {
      setError(error.message || 'Unable to update the report. Please try again.');
    }
  };

  const handleStatusChange = async (report, nextStatus) => {
    const reportId = getReportIdentifier(report);

    if (!reportId) {
      setError('Unable to update the selected report status.');
      return;
    }

    try {
      setError('');
      await updateReport(reportId, { ...report, status: nextStatus });

      setReports((currentReports) =>
        currentReports.map((item) =>
          getReportIdentifier(item) === reportId
            ? { ...item, status: nextStatus }
            : item
        )
      );

      setSuccessMessage('Report status updated successfully.');
    } catch (error) {
      setError(error.message || 'Unable to update the report status. Please try again.');
    }
  };

  const handleDeleteReport = async (report) => {
    const reportId = getReportIdentifier(report);

    if (!reportId) {
      setError('Unable to find the selected report.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this report?');
    if (!confirmed) {
      return;
    }

    try {
      setError('');
      await deleteReport(reportId);
      setReports((currentReports) =>
        currentReports.filter((item) => getReportIdentifier(item) !== reportId)
      );
      setSuccessMessage('Report deleted successfully.');
    } catch (error) {
      setError(error.message || 'Unable to delete the report. Please try again.');
    }
  };

  return (
    <div className="manage-reports">
      <div className="manage-reports__header">
        <div>
          <p className="manage-reports__eyebrow">Operations</p>
          <h2>Manage Reports</h2>
        </div>
      </div>

      <div className="manage-reports__summary">
        <div className="manage-reports__summary-card">
          <span>Pending</span>
          <strong>{totalPending}</strong>
        </div>
        <div className="manage-reports__summary-card">
          <span>In Progress</span>
          <strong>{totalInProgress}</strong>
        </div>
        <div className="manage-reports__summary-card">
          <span>Resolved</span>
          <strong>{totalResolved}</strong>
        </div>
      </div>

      {successMessage && (
        <div className="manage-reports__message manage-reports__message--success">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="manage-reports__message manage-reports__message--error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="manage-reports__loading">Loading reports...</div>
      ) : (
        <div className="manage-reports__list">
          {reports.length === 0 ? (
            <div className="manage-reports__empty">No reports available for management.</div>
          ) : (
            reports.map((report) => (
              <article key={getReportIdentifier(report)} className="manage-reports__card">
                <div className="manage-reports__meta">
                  <span className="manage-reports__tag">{report.riskLevel}</span>
                  <span className="manage-reports__tag manage-reports__tag--status">{report.status}</span>
                </div>

                <h3>{report.area}</h3>

                <div className="manage-reports__details">
                  <p><strong>District:</strong> {report.district}</p>
                  <p><strong>Location Type:</strong> {report.locationType}</p>
                  <p><strong>Reporter:</strong> {report.reporterName}</p>
                </div>

                <p className="manage-reports__description">{report.description}</p>

                <div className="manage-reports__actions">
                  <button type="button" className="manage-reports__button manage-reports__button--secondary" onClick={() => handleOpenEdit(report)}>
                    Edit
                  </button>

                  <div className="manage-reports__status-wrapper">
                    <StatusSelector
                      id={`status-${getReportIdentifier(report)}`}
                      name="status"
                      value={report.status}
                      onChange={(event) => handleStatusChange(report, event.target.value)}
                    />
                  </div>

                  <button type="button" className="manage-reports__button manage-reports__button--danger" onClick={() => handleDeleteReport(report)}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      <EditReportModal
        report={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        onSave={handleSaveReport}
      />
    </div>
  );
}
