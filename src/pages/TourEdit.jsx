import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TourEdit = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    destination: "",
  });

  // Load dữ liệu cũ của Tour cần sửa
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/tours/${id}`);
        setFormData(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dùng PUT để cập nhật
      await axios.put(`http://localhost:3000/tours/${id}`, formData);
      alert("Cập nhật thành công!");
      navigate("/tours");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-yellow-400">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">
        Sửa Tour
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tên Tour</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
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
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
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
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Địa điểm</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition"
        >
          Cập nhật Tour
        </button>
      </form>
    </div>
  );
};

export default TourEdit;
