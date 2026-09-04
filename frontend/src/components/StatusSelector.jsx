const STATUSES = ['Pending', 'In Progress', 'Resolved'];

export default function StatusSelector({ value, onChange, label = 'Status', name = 'status', id = 'status' }) {
  return (
    <div className="status-selector">
      <label htmlFor={id} className="status-selector__label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="status-selector__select"
        value={value || 'Pending'}
        onChange={onChange}
      >
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
