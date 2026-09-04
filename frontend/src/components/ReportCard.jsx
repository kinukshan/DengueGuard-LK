import './ReportCard.css';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getRiskClass(riskLevel) {
  switch (riskLevel) {
    case 'High':
      return 'report-card__badge--high';
    case 'Medium':
      return 'report-card__badge--medium';
    case 'Low':
      return 'report-card__badge--low';
    default:
      return '';
  }
}

function getStatusClass(status) {
  switch (status) {
    case 'Pending':
      return 'report-card__badge--pending';
    case 'In Progress':
      return 'report-card__badge--in-progress';
    case 'Resolved':
      return 'report-card__badge--resolved';
    default:
      return '';
  }
}

export default function ReportCard({ report }) {
  return (
    <article className="report-card">
      <div className="report-card__header">
        <div className="report-card__badges">
          <span className={`report-card__badge ${getRiskClass(report.riskLevel)}`}>
            {report.riskLevel} Risk
          </span>
          <span className={`report-card__badge ${getStatusClass(report.status)}`}>
            {report.status}
          </span>
        </div>
        {report.createdAt && (
          <time className="report-card__date" dateTime={report.createdAt}>
            {formatDate(report.createdAt)}
          </time>
        )}
      </div>

      <h3 className="report-card__title">{report.area}</h3>

      <div className="report-card__details">
        <div className="report-card__detail">
          <span className="report-card__detail-label">District</span>
          <span className="report-card__detail-value">{report.district}</span>
        </div>
        <div className="report-card__detail">
          <span className="report-card__detail-label">Location Type</span>
          <span className="report-card__detail-value">{report.locationType}</span>
        </div>
        {report.reporterName && (
          <div className="report-card__detail">
            <span className="report-card__detail-label">Reported by</span>
            <span className="report-card__detail-value">{report.reporterName}</span>
          </div>
        )}
      </div>

      <p className="report-card__description">{report.description}</p>
    </article>
  );
}
