import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setTeams(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <i className="bi bi-shield-fill"></i> Teams
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
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-3">No teams found.</td>
                  </tr>
                ) : (
                  teams.map((team, index) => (
                    <tr key={team._id || team.id || index}>
                      <td>{index + 1}</td>
                      <td><strong>{team.name}</strong></td>
                      <td className="text-muted">{team.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {teams.length} team{teams.length !== 1 ? 's' : ''} · <a href={apiUrl} target="_blank" rel="noreferrer" className="link-secondary">API</a>
      </div>
    </div>
  );
}

export default Teams;
