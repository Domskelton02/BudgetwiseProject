import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/authSlice'; // Adjust the path as needed

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Budgetwise</h1>
        <nav>
          {isLoggedIn ? (
            <Link to="/dashboard">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <section>
          <h2>About Budgetwise</h2>
          <p>Manage your finances effectively and efficiently with Budgetwise.</p>
          {/* Include more sections as necessary */}
        </section>
      </main>
      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default HomePage;
