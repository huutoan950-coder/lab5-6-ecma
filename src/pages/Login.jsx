import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại! Sai email hoặc mật khẩu.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        Đăng Nhập
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Đăng Nhập
        </button>
      </form>
      <p className="mt-4 text-center">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-500">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};

export default Login;
