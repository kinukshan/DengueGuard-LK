import { useState } from 'react';
import { createReport } from '../services/reportCreateService';
import './ReportForm.css';

const DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
];

const LOCATION_TYPES = [
  'Stagnant Water', 'Blocked Drain', 'Discarded Containers',
  'Construction Site', 'Abandoned Tyres', 'Garbage Area', 'Other',
];

const RISK_LEVELS = ['Low', 'Medium', 'High'];

const INITIAL_FORM = {
  reporterName: '',
  district: '',
  area: '',
  locationType: '',
  riskLevel: '',
  description: '',
};

function validate(form) {
  const errors = {};

  if (!form.reporterName.trim() || form.reporterName.trim().length < 2) {
    errors.reporterName = 'Please enter your name.';
  }

  if (!form.district) {
    errors.district = 'Please select a district.';
  }

  if (!form.area.trim() || form.area.trim().length < 2) {
    errors.area = 'Please enter the affected area.';
  }

  if (!form.locationType) {
    errors.locationType = 'Please select a location type.';
  }

  if (!form.riskLevel) {
    errors.riskLevel = 'Please select a risk level.';
  }

  if (!form.description.trim() || form.description.trim().length < 10) {
    errors.description = 'Description must contain at least 10 characters.';
  }

  return errors;
}

function ReportForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [apiError, setApiError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user corrects input
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Clear api-level messages on new input
    if (successMsg) setSuccessMsg('');
    if (apiError) setApiError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setApiError('');
    setSuccessMsg('');

    try {
      const trimmedData = {
        reporterName: form.reporterName.trim(),
        district: form.district,
        area: form.area.trim(),
        locationType: form.locationType,
        riskLevel: form.riskLevel,
        description: form.description.trim(),
      };

      await createReport(trimmedData);
      setSuccessMsg('Dengue risk report submitted successfully.');
      setForm(INITIAL_FORM);
    } catch (err) {
      setApiError(
        err.message || 'Unable to submit the report. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="report-form" onSubmit={handleSubmit} noValidate>
      <h2 className="report-form__heading">Breeding Site Details</h2>

      {/* Success Message */}
      {successMsg && (
        <div className="report-form__message report-form__message--success">
          ✅ {successMsg}
        </div>
      )}

      {/* API Error Message */}
      {apiError && (
        <div className="report-form__message report-form__message--error">
          ⚠️ {apiError}
        </div>
      )}

      {/* Reporter Name */}
      <div className="report-form__group">
        <label htmlFor="reporterName" className="report-form__label">
          Reporter Name
        </label>
        <input
          type="text"
          id="reporterName"
          name="reporterName"
          className={`report-form__input ${errors.reporterName ? 'report-form__input--error' : ''}`}
          placeholder="Enter your full name"
          value={form.reporterName}
          onChange={handleChange}
        />
        {errors.reporterName && (
          <span className="report-form__field-error">{errors.reporterName}</span>
        )}
      </div>

      {/* District */}
      <div className="report-form__group">
        <label htmlFor="district" className="report-form__label">
          District
        </label>
        <select
          id="district"
          name="district"
          className={`report-form__select ${errors.district ? 'report-form__input--error' : ''}`}
          value={form.district}
          onChange={handleChange}
        >
          <option value="">Select District</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.district && (
          <span className="report-form__field-error">{errors.district}</span>
        )}
      </div>

      {/* Area */}
      <div className="report-form__group">
        <label htmlFor="area" className="report-form__label">
          Area
        </label>
        <input
          type="text"
          id="area"
          name="area"
          className={`report-form__input ${errors.area ? 'report-form__input--error' : ''}`}
          placeholder="Enter the affected area"
          value={form.area}
          onChange={handleChange}
        />
        {errors.area && (
          <span className="report-form__field-error">{errors.area}</span>
        )}
      </div>

      {/* Location Type */}
      <div className="report-form__group">
        <label htmlFor="locationType" className="report-form__label">
          Location Type
        </label>
        <select
          id="locationType"
          name="locationType"
          className={`report-form__select ${errors.locationType ? 'report-form__input--error' : ''}`}
          value={form.locationType}
          onChange={handleChange}
        >
          <option value="">Select Location Type</option>
          {LOCATION_TYPES.map((lt) => (
            <option key={lt} value={lt}>{lt}</option>
          ))}
        </select>
        {errors.locationType && (
          <span className="report-form__field-error">{errors.locationType}</span>
        )}
      </div>

      {/* Risk Level */}
      <div className="report-form__group">
        <label htmlFor="riskLevel" className="report-form__label">
          Risk Level
        </label>
        <select
          id="riskLevel"
          name="riskLevel"
          className={`report-form__select ${errors.riskLevel ? 'report-form__input--error' : ''}`}
          value={form.riskLevel}
          onChange={handleChange}
        >
          <option value="">Select Risk Level</option>
          {RISK_LEVELS.map((rl) => (
            <option key={rl} value={rl}>{rl}</option>
          ))}
        </select>
        {errors.riskLevel && (
          <span className="report-form__field-error">{errors.riskLevel}</span>
        )}
      </div>

      {/* Description */}
      <div className="report-form__group">
        <label htmlFor="description" className="report-form__label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`report-form__textarea ${errors.description ? 'report-form__input--error' : ''}`}
          placeholder="Describe the location and potential breeding conditions (at least 10 characters)"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <span className="report-form__field-error">{errors.description}</span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="report-form__submit"
        disabled={submitting}
      >
        {submitting ? 'Submitting…' : 'Submit Report'}
      </button>
    </form>
  );
}

export default ReportForm;
