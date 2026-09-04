import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { getDashboardStats } from '../services/dashboardService';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchStats() {
    try {
      setLoading(true);
      setError('');

      const response = await getDashboardStats();
      const data = response?.data || response;
      setStats(data);
    } catch (err) {
      setError(err.message || 'Unable to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <p className="dashboard__eyebrow">Overview</p>
        <h1 className="dashboard__title">DengueGuard LK Dashboard</h1>
        <p className="dashboard__subtitle">
          Monitor community dengue risk report statistics across Sri Lanka.
        </p>
      </header>

      {loading && (
        <div className="dashboard__state">
          <div className="dashboard__spinner" />
          <p>Loading dashboard...</p>
        </div>
      )}

      {!loading && error && (
        <div className="dashboard__state dashboard__state--error">
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
            className="dashboard__retry"
            onClick={fetchStats}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <div className="dashboard__grid">
          <StatCard
            label="Total Reports"
            value={stats.totalReports ?? 0}
            variant="total"
            icon="📊"
          />
          <StatCard
            label="High Risk"
            value={stats.highRisk ?? 0}
            variant="high"
            icon="🔴"
          />
          <StatCard
            label="Pending"
            value={stats.pending ?? 0}
            variant="pending"
            icon="⏳"
          />
          <StatCard
            label="In Progress"
            value={stats.inProgress ?? 0}
            variant="in-progress"
            icon="🔄"
          />
          <StatCard
            label="Resolved"
            value={stats.resolved ?? 0}
            variant="resolved"
            icon="✅"
          />
        </div>
      )}
    </div>
  );
}
