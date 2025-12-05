import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TourList from "./pages/TourList";
import TourForm from "./pages/TourForm";

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold uppercase">Quản lý Tour Du Lịch</h1>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium">Xin chào, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <span className="text-sm italic">Vui lòng đăng nhập</span>
          )}
        </div>
      </header>

      <main className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TourList />} />
            <Route path="/tours" element={<TourList />} />
            <Route path="/tours/add" element={<TourForm />} />
            <Route path="/tours/edit/:id" element={<TourForm />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
