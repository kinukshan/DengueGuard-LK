import './StatCard.css';

export default function StatCard({ label, value, icon, variant }) {
  return (
    <div className={`stat-card stat-card--${variant || 'default'}`}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__content">
        <span className="stat-card__label">{label}</span>
        <strong className="stat-card__value">{value}</strong>
      </div>
    </div>
  );
}
