import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setUsers(records);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card mb-4">
      <div className="card-header d-flex align-items-center gap-2">
        <i className="bi bi-people-fill"></i> Users
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
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Superhero</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">No users found.</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user._id || user.id || index}>
                      <td>{index + 1}</td>
                      <td><strong>{user.name}</strong></td>
                      <td><a href={`mailto:${user.email}`} className="link-primary">{user.email}</a></td>
                      <td><span className="badge bg-secondary">{user.team}</span></td>
                      <td>
                        {user.is_superhero
                          ? <span className="badge bg-purple text-white" style={{backgroundColor:'#6f42c1'}}>Superhero</span>
                          : <span className="badge bg-light text-dark">No</span>}
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
        {users.length} user{users.length !== 1 ? 's' : ''} · <a href={apiUrl} target="_blank" rel="noreferrer" className="link-secondary">API</a>
      </div>
    </div>
  );
}

export default Users;
