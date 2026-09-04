import ReportForm from '../components/ReportForm';
import './ReportRisk.css';

function ReportRisk() {
  return (
    <div className="report-risk">
      <section className="report-risk__header">
        <div className="report-risk__header-content">
          <h1 className="report-risk__title">Report a Potential Dengue Breeding Site</h1>
          <p className="report-risk__description">
            Help your community by reporting locations where mosquitoes may
            breed. Submitted reports can later be reviewed and monitored.
          </p>
        </div>
      </section>

      <section className="report-risk__form-section">
        <div className="report-risk__form-container">
          <ReportForm />
        </div>
      </section>
    </div>
  );
}

export default ReportRisk;
