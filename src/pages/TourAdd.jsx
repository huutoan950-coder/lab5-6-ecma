import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TourAdd = () => {
  const navigate = useNavigate(); // Dùng để chuyển trang
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    destination: "",
  });

  // Hàm lấy dữ liệu từ ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm gửi dữ liệu lên Server
  const handleSubmit = async (e) => {
    e.preventDefault(); // Chặn load lại trang
    try {
      await axios.post("http://localhost:3000/tours", formData);
      alert("Thêm tour thành công!");
      navigate("/tours"); // Chuyển hướng về trang danh sách
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Thêm Tour Mới
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tên Tour</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ví dụ: Tour Hà Nội - Sapa"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Giá (VNĐ)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ví dụ: 2000000"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Link Ảnh</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Link ảnh từ mạng..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Địa điểm</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Ví dụ: Sapa"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Thêm Tour
        </button>
      </form>
    </div>
  );
};

export default TourAdd;
