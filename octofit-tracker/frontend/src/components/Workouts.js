import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setWorkouts(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const difficultyVariant = (level) => {
    const map = { Easy: 'success', Medium: 'warning', Hard: 'danger', Expert: 'dark' };
    return map[level] || 'secondary';
  };

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <i className="bi bi-lightning-charge-fill"></i> Workouts
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
                  <th scope="col">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">No workouts found.</td>
                  </tr>
                ) : (
                  workouts.map((workout, index) => (
                    <tr key={workout._id || workout.id || index}>
                      <td>{index + 1}</td>
                      <td><strong>{workout.name}</strong></td>
                      <td className="text-muted">{workout.description}</td>
                      <td>
                        <span className={`badge bg-${difficultyVariant(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
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
        {workouts.length} workout{workouts.length !== 1 ? 's' : ''} · <a href={apiUrl} target="_blank" rel="noreferrer" className="link-secondary">API</a>
      </div>
    </div>
  );
}

export default Workouts;
