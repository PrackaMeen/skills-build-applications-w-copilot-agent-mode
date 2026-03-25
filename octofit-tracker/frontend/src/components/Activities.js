import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setActivities(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  const difficultyBadge = (type) => {
    const colours = { Running: 'success', Cycling: 'info', Swimming: 'primary', Yoga: 'warning', Weightlifting: 'danger' };
    return colours[type] || 'secondary';
  };

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <i className="bi bi-activity"></i> Activities
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
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">No activities found.</td>
                  </tr>
                ) : (
                  activities.map((activity, index) => (
                    <tr key={activity._id || activity.id || index}>
                      <td>{index + 1}</td>
                      <td><strong>{activity.user}</strong></td>
                      <td><span className={`badge bg-${difficultyBadge(activity.activity_type)}`}>{activity.activity_type}</span></td>
                      <td>{activity.duration} min</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted small">
        {activities.length} activit{activities.length !== 1 ? 'ies' : 'y'} · <a href={apiUrl} target="_blank" rel="noreferrer" className="link-secondary">API</a>
      </div>
    </div>
  );
}

export default Activities;
