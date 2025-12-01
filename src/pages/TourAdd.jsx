import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TourAdd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    duration: "",
    available: "",
    category: "Tour nội địa",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price),
        available: Number(formData.available),
      };

      await axios.post("http://localhost:3000/tours", dataToSend);
      alert("Thêm tour thành công!");
      navigate("/tours");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm thất bại!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Thêm Tour Mới
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Tên Tour</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Nhập tên tour..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="0"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Số chỗ (Available)
            </label>
            <input
              type="number"
              name="available"
              value={formData.available}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="10"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Thời lượng
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ví dụ: 3 ngày 2 đêm"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Danh mục
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="Tour nội địa">Tour nội địa</option>
              <option value="Tour quốc tế">Tour quốc tế</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Link Ảnh</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Mô tả chi tiết về tour..."
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            id="activeCheck"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="activeCheck" className="ml-2 text-gray-700 font-bold">
            Hiển thị tour này (Active)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Thêm Tour Mới
        </button>
      </form>
    </div>
  );
};

export default TourAdd;
