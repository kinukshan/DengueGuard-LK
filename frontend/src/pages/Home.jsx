import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__badge">🦟 Community Health Platform</span>
          <h1 className="home-hero__title">DengueGuard LK</h1>
          <p className="home-hero__subtitle">
            Community Dengue Breeding-Site Reporting &amp; Monitoring System
          </p>
          <p className="home-hero__tagline">
            Empowering communities across Sri Lanka to report and monitor
            potential dengue mosquito breeding sites.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="home-problem">
        <div className="home-problem__container">
          <h2 className="home-problem__title">Why This Matters</h2>
          <div className="home-problem__content">
            <div className="home-problem__text">
              <p>
                Dengue continues to affect communities across Sri Lanka.
                Potential mosquito breeding locations such as stagnant water,
                discarded containers, blocked drains, abandoned tyres and
                construction sites can increase community risk.
              </p>
              <p>
                DengueGuard LK provides a simple digital platform that allows
                community members to report potential mosquito breeding
                locations and helps reports to be monitored until action is
                taken.
              </p>
            </div>
            <div className="home-problem__stats">
              <div className="home-problem__stat-card">
                <span className="home-problem__stat-icon">💧</span>
                <h3>Stagnant Water</h3>
                <p>Standing water in containers, ditches and open areas</p>
              </div>
              <div className="home-problem__stat-card">
                <span className="home-problem__stat-icon">🚧</span>
                <h3>Construction Sites</h3>
                <p>Unmonitored construction areas collecting rainwater</p>
              </div>
              <div className="home-problem__stat-card">
                <span className="home-problem__stat-icon">🗑️</span>
                <h3>Waste &amp; Debris</h3>
                <p>Discarded containers, tyres and garbage accumulation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="home-how">
        <div className="home-how__container">
          <h2 className="home-how__title">How It Works</h2>
          <div className="home-how__steps">
            <div className="home-how__step">
              <div className="home-how__step-number">1</div>
              <h3>Spot a Risk</h3>
              <p>Identify a potential mosquito breeding site in your area</p>
            </div>
            <div className="home-how__step-arrow">→</div>
            <div className="home-how__step">
              <div className="home-how__step-number">2</div>
              <h3>Submit a Report</h3>
              <p>Fill in location details, risk level and a description</p>
            </div>
            <div className="home-how__step-arrow">→</div>
            <div className="home-how__step">
              <div className="home-how__step-number">3</div>
              <h3>Track Progress</h3>
              <p>Reports are monitored and updated until action is taken</p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="home-actions">
        <div className="home-actions__container">
          <h2 className="home-actions__title">Get Started</h2>
          <p className="home-actions__description">
            Choose an action below to help keep your community safe.
          </p>
          <div className="home-actions__buttons">
            <button className="home-actions__btn home-actions__btn--primary">
              🦟 Report a Risk
            </button>
            <button className="home-actions__btn home-actions__btn--secondary">
              📋 View Reports
            </button>
            <button className="home-actions__btn home-actions__btn--secondary">
              📊 Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 DengueGuard LK — Community Dengue Breeding-Site Reporting &amp; Monitoring System</p>
      </footer>
    </div>
  );
}

export default Home;
