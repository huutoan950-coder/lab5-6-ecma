import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { tourService } from "../services/api";

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const { data } = await tourService.getAll();
      setTours(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        await tourService.delete(id);
        setTours(tours.filter((t) => t.id !== id));
        toast.success("Đã xóa!");
      } catch (error) {
        toast.error("Lỗi xóa!");
      }
    }
  };

  const toggleActive = async (tour) => {
    try {
      const newStatus = !tour.active;
      await tourService.patch(tour.id, { active: newStatus });
      setTours(
        tours.map((t) => (t.id === tour.id ? { ...t, active: newStatus } : t))
      );
      toast.success("Đã đổi trạng thái!");
    } catch (error) {
      toast.error("Lỗi cập nhật!");
    }
  };

  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Quản lý Tour</h2>
        <Link
          to="/tours/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Thêm Tour
        </Link>
      </div>

      <div className="mb-4 bg-gray-100 p-4 rounded">
        <input
          type="text"
          placeholder="Tìm kiếm tour theo tên..."
          className="border p-2 rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border shadow-md bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Tên</th>
              <th className="p-3 border">Hình ảnh</th>
              <th className="p-3 border">Giá</th>
              <th className="p-3 border">Danh mục</th>
              <th className="p-3 border">Trạng thái</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour.id} className="text-center hover:bg-gray-50">
                <td className="p-3 border text-left">{tour.name}</td>
                <td className="p-3 border">
                  <img
                    src={tour.image}
                    alt="anh"
                    className="w-16 h-12 object-cover mx-auto"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                </td>
                <td className="p-3 border text-red-600 font-bold">
                  {Number(tour.price).toLocaleString()}đ
                </td>
                <td className="p-3 border">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {tour.category}
                  </span>
                </td>

                <td className="p-3 border">
                  <input
                    type="checkbox"
                    checked={tour.active}
                    onChange={() => toggleActive(tour)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </td>

                <td className="p-3 border">
                  <Link
                    to={`/tours/edit/${tour.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourList;
