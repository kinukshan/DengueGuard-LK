import './FilterBar.css';

const DISTRICTS = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
];

const RISK_LEVELS = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Resolved'];

export default function FilterBar({ filters, onFilterChange, onClearFilters }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = filters.district || filters.riskLevel || filters.status;

  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <div className="filter-bar__group">
          <label htmlFor="filter-district" className="filter-bar__label">
            District
          </label>
          <select
            id="filter-district"
            className="filter-bar__select"
            value={filters.district}
            onChange={(e) => handleChange('district', e.target.value)}
          >
            <option value="">All Districts</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-bar__group">
          <label htmlFor="filter-risk-level" className="filter-bar__label">
            Risk Level
          </label>
          <select
            id="filter-risk-level"
            className="filter-bar__select"
            value={filters.riskLevel}
            onChange={(e) => handleChange('riskLevel', e.target.value)}
          >
            <option value="">All Risk Levels</option>
            {RISK_LEVELS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-bar__group">
          <label htmlFor="filter-status" className="filter-bar__label">
            Status
          </label>
          <select
            id="filter-status"
            className="filter-bar__select"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="filter-bar__clear"
            onClick={onClearFilters}
            id="clear-filters-button"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
