import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Alert from "../../components/Alert";

function Signup() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "ROLE_PHARMACIST"
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function validate() {
    if (!form.username.trim() || form.username.trim().length < 3) {
      return "Username must be at least 3 characters";
    }
    if (!form.fullName.trim()) {
      return "Full name is required";
    }
    if (!form.password || form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
    if (!form.role) {
      return "Please select a role";
    }
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const result = await register(
      form.username.trim(),
      form.password,
      form.fullName.trim(),
      form.role
    );

    if (result.success) {
      setSuccessMessage("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setErrorMessage(result.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Register to access Jeevan Raksha Pharmacy</p>

        <Alert type="error" message={errorMessage} onClose={() => setErrorMessage("")} />
        <Alert type="success" message={successMessage} />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="ROLE_PHARMACIST">Pharmacist</option>
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_VIEWER">Viewer</option>
          </select>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
