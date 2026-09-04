import { useEffect, useState } from 'react';
import StatusSelector from './StatusSelector';
import './EditReportModal.css';

const DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
];

const LOCATION_TYPES = [
  'Stagnant Water', 'Blocked Drain', 'Discarded Containers', 'Construction Site',
  'Abandoned Tyres', 'Garbage Area', 'Other',
];

const RISK_LEVELS = ['Low', 'Medium', 'High'];

const EMPTY_FORM = {
  reporterName: '',
  district: '',
  area: '',
  locationType: '',
  riskLevel: 'Medium',
  description: '',
  status: 'Pending',
};

export default function EditReportModal({ report, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    if (report) {
      setFormData({
        reporterName: report.reporterName || '',
        district: report.district || '',
        area: report.area || '',
        locationType: report.locationType || '',
        riskLevel: report.riskLevel || 'Medium',
        description: report.description || '',
        status: report.status || 'Pending',
      });
    }
  }, [report, isOpen]);

  if (!isOpen || !report) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedData = {
      reporterName: formData.reporterName.trim(),
      district: formData.district,
      area: formData.area.trim(),
      locationType: formData.locationType,
      riskLevel: formData.riskLevel,
      description: formData.description.trim(),
      status: formData.status,
    };

    onSave(trimmedData);
  };

  return (
    <div className="edit-report-modal__backdrop" onClick={onClose}>
      <div
        className="edit-report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-report-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-report-modal__header">
          <h3 id="edit-report-title">Edit Report</h3>
          <button
            type="button"
            className="edit-report-modal__close"
            onClick={onClose}
            aria-label="Close edit modal"
          >
            ×
          </button>
        </div>

        <form className="edit-report-modal__form" onSubmit={handleSubmit}>
          <div className="edit-report-modal__field">
            <label htmlFor="reporterName">Reporter Name</label>
            <input
              id="reporterName"
              name="reporterName"
              type="text"
              value={formData.reporterName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-report-modal__field">
            <label htmlFor="district">District</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            >
              <option value="">Select District</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-report-modal__field">
            <label htmlFor="area">Area</label>
            <input
              id="area"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-report-modal__field">
            <label htmlFor="locationType">Location Type</label>
            <select
              id="locationType"
              name="locationType"
              value={formData.locationType}
              onChange={handleChange}
              required
            >
              <option value="">Select Location Type</option>
              {LOCATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-report-modal__field">
            <label htmlFor="riskLevel">Risk Level</label>
            <select
              id="riskLevel"
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Risk Level</option>
              {RISK_LEVELS.map((riskLevel) => (
                <option key={riskLevel} value={riskLevel}>
                  {riskLevel}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-report-modal__field edit-report-modal__field--full">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-report-modal__field edit-report-modal__field--full">
            <StatusSelector
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            />
          </div>

          <div className="edit-report-modal__actions">
            <button type="button" className="edit-report-modal__button edit-report-modal__button--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="edit-report-modal__button edit-report-modal__button--primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
