import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { tourService } from "../services/api";

const TourForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "Tour nội địa",
    active: true,
  });

  useEffect(() => {
    if (isEdit) {
      tourService.getById(id).then((res) => setFormData(res.data));
    }
  }, [id, isEdit]);

  const validate = () => {
    if (!formData.name) {
      toast.error("Vui lòng nhập tên tour!");
      return false;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      toast.error("Giá phải lớn hơn 0!");
      return false;
    }
    if (!formData.image) {
      toast.error("Vui lòng nhập link ảnh!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        available: Number(formData.available),
      };

      if (isEdit) await tourService.update(id, payload);
      else await tourService.create(payload);

      toast.success(isEdit ? "Sửa thành công!" : "Thêm thành công!");
      navigate("/tours");
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white p-6 shadow-md rounded border">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        {isEdit ? "Sửa Tour" : "Thêm Tour Mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label>Tên Tour (*)</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nhập tên..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Điểm đến</label>
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Thời lượng</label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Giá (*)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Số chỗ</label>
            <input
              type="number"
              name="available"
              value={formData.available}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label>Link Ảnh (*)</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Dán link ảnh..."
          />
          {formData.image && (
            <img
              src={formData.image}
              className="mt-2 h-32 object-contain"
              alt="Preview"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x300?text=Lỗi+Ảnh")
              }
            />
          )}
        </div>

        <div>
          <label>Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Tour nội địa">Tour nội địa</option>
            <option value="Tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        <div>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="w-5 h-5 mr-2"
          />
          <label>Kích hoạt (Active)</label>
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          LƯU DỮ LIỆU
        </button>
      </form>
    </div>
  );
};
export default TourForm;
