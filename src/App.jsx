import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  // Login / Signup pages render full-screen, without the
  // dashboard chrome (sidebar + navbar).
  if (!isAuthenticated) {
    return (
      <main className="auth-main">
        <AppRoutes />
      </main>
    );
  }

  return (
    <div className="app">

      <Sidebar />

      <div className="app-body">
        <Navbar />

        <main className="main-content">
          <AppRoutes />
        </main>
      </div>

    </div>
  );
}

export default App;
