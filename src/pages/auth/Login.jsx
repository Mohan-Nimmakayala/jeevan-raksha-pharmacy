import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../components/Alert";

function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setErrorMessage("Username and password are required");
      return;
    }

    const result = await login(credentials.username, credentials.password);

    if (result.success) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } else {
      setErrorMessage(result.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Jeevan Raksha Pharmacy</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <Alert type="error" message={errorMessage} onClose={() => setErrorMessage("")} />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            autoComplete="username"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
