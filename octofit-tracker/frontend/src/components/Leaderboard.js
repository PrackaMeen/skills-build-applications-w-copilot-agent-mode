import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setEntries(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const medalColour = (rank) => {
    if (rank === 1) return 'warning';   // gold
    if (rank === 2) return 'secondary'; // silver
    if (rank === 3) return 'danger';    // bronze
    return 'light';
  };

  const medalText = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <i className="bi bi-trophy-fill"></i> Leaderboard
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        {loading && !error && (
          <div className="d-flex justify-content-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-3">No leaderboard data found.</td>
                  </tr>
                ) : (
                  entries.map((entry, index) => (
                    <tr key={entry._id || entry.id || index}>
                      <td>
                        <span className={`badge bg-${medalColour(entry.rank)} text-dark`}>
                          {medalText(entry.rank)}
                        </span>
                      </td>
                      <td><strong>{entry.team}</strong></td>
                      <td>
                        <span className="badge bg-primary fs-6">{entry.points}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {entries.length} entr{entries.length !== 1 ? 'ies' : 'y'} · <a href={apiUrl} target="_blank" rel="noreferrer" className="link-secondary">API</a>
      </div>
    </div>
  );
}

export default Leaderboard;
