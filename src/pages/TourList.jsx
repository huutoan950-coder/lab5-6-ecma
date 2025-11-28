import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/tours");
        setTours(data);
      } catch (error) {
        console.log("Lỗi call API:", error);
      }
    };
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tour này không?")) {
      try {
        await axios.delete(`http://localhost:3000/tours/${id}`);

        setTours(tours.filter((tour) => tour.id !== id));

        alert("Xóa thành công!");
      } catch (error) {
        console.log("Lỗi khi xóa:", error);
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Danh sách Tour
      </h2>

      {/* Kiểm tra nếu không có tour nào thì báo user */}
      {tours.length === 0 ? (
        <p className="text-center text-red-500">
          Chưa có dữ liệu hoặc chưa chạy server (npm run server)
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3 border">STT</th>
                <th className="px-6 py-3 border">Tên Tour</th>
                <th className="px-6 py-3 border">Hình ảnh</th>
                <th className="px-6 py-3 border">Giá</th>
                <th className="px-6 py-3 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr
                  key={tour.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 border text-center font-bold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border font-medium text-gray-900">
                    <h3 className="text-lg">{tour.name}</h3>
                    <p className="text-xs text-gray-500 italic mt-1">
                      {tour.destination} - {tour.duration}
                    </p>
                  </td>
                  <td className="px-6 py-4 border">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-24 h-16 object-cover rounded border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4 border text-red-600 font-bold">
                    {Number(tour.price).toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-6 py-4 border text-center">
                    <Link to={`/tours/edit/${tour.id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition">
                        Sửa
                      </button>
                    </Link>

                    {/* Nút Xóa gọi hàm handleDelete */}
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TourList;
