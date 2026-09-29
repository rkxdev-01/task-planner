import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="page-shell">
      <h2>Page not found</h2>
      <Link to="/" className="primary-btn link-btn">
        Go home
      </Link>
    </main>
  );
}

export default NotFound;
