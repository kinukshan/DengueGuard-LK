import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ReportCard from '../components/ReportCard';
import { getReports } from '../services/reportSearchService';
import './Reports.css';

const DEFAULT_FILTERS = {
  district: '',
  riskLevel: '',
  status: '',
};

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const params = {};
      if (search) params.search = search;
      if (filters.district) params.district = filters.district;
      if (filters.riskLevel) params.riskLevel = filters.riskLevel;
      if (filters.status) params.status = filters.status;

      const response = await getReports(params);

      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setReports(list);
    } catch (err) {
      setError(err.message || 'Unable to load reports. Please try again.');
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [search, filters]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSearch = (searchText) => {
    setSearch(searchText);
    if (searchText || filters.district || filters.riskLevel || filters.status) {
      setHasSearched(true);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setHasSearched(true);
  };

  const handleClearFilters = () => {
    setSearch('');
    setFilters(DEFAULT_FILTERS);
    setHasSearched(false);
  };

  const isFiltering = search || filters.district || filters.riskLevel || filters.status;

  return (
    <div className="reports-page">
      <header className="reports-page__header">
        <p className="reports-page__eyebrow">Community Reports</p>
        <h1 className="reports-page__title">Community Dengue Risk Reports</h1>
        <p className="reports-page__subtitle">
          View reported potential mosquito breeding locations across Sri Lankan communities.
        </p>
      </header>

      <section className="reports-page__toolbar">
        <SearchBar onSearch={handleSearch} />
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </section>

      <section className="reports-page__content" aria-live="polite">
        {loading && (
          <div className="reports-page__state">
            <div className="reports-page__spinner" />
            <p>Loading reports...</p>
          </div>
        )}

        {!loading && error && (
          <div className="reports-page__state reports-page__state--error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <button
              type="button"
              className="reports-page__retry"
              onClick={fetchReports}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && reports.length === 0 && !isFiltering && !hasSearched && (
          <div className="reports-page__state reports-page__state--empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <p>No dengue risk reports have been submitted yet.</p>
            <span className="reports-page__hint">
              Reports submitted through the reporting form will appear here.
            </span>
          </div>
        )}

        {!loading && !error && reports.length === 0 && (isFiltering || hasSearched) && (
          <div className="reports-page__state reports-page__state--no-match">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="8" x2="14" y2="14" />
              <line x1="14" y1="8" x2="8" y2="14" />
            </svg>
            <p>No reports match your search or filters.</p>
            <button
              type="button"
              className="reports-page__retry"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {!loading && !error && reports.length > 0 && (
          <>
            <div className="reports-page__results-info">
              <span>
                Showing <strong>{reports.length}</strong>{' '}
                {reports.length === 1 ? 'report' : 'reports'}
              </span>
            </div>
            <div className="reports-page__grid">
              {reports.map((report) => (
                <ReportCard key={report._id || report.id} report={report} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
