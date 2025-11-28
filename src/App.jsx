import { Routes, Route, NavLink } from "react-router-dom";
import TourList from "./pages/TourList";
import TourAdd from "./pages/TourAdd"; // Import trang thêm
import TourEdit from "./pages/TourEdit"; // Import trang sửa

function App() {
  return (
    <div>
      <header className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">WEB501 App</h1>
          <nav>
            <ul className="flex space-x-6 text-white font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 underline"
                      : "hover:text-yellow-200"
                  }
                >
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tours"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 underline"
                      : "hover:text-yellow-200"
                  }
                >
                  Danh sách
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tours/add"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 underline"
                      : "hover:text-yellow-200"
                  }
                >
                  Thêm mới
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-8 bg-gray-50 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center text-2xl mt-10">
                Chào mừng đến với WEB501
              </div>
            }
          />
          <Route path="/tours" element={<TourList />} />

          {/* Định nghĩa 2 đường dẫn mới */}
          <Route path="/tours/add" element={<TourAdd />} />
          <Route path="/tours/edit/:id" element={<TourEdit />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
