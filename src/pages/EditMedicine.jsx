import {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import getErrorMessage from "../utils/getErrorMessage";
import Alert from "../components/Alert";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function EditMedicine() {

  const { medicineId } =
    useParams();

  const navigate =
    useNavigate();

  const [medicine, setMedicine] =
    useState({
      name: "",
      category: "",
      price: "",
      stockQuantity: "",
      expiryDate: "",
      supplierId: ""
    });

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function fetchMedicine() {

    try {

      const response =
        await api.get(
          `/medicines/${medicineId}`
        );

      setMedicine(
        response.data.data
      );

    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    }

  }

  useEffect(() => {

    fetchMedicine();

  }, []);

  function handleChange(e) {

    setMedicine({
      ...medicine,
      [e.target.name]:
      e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {

      await api.put(
        `/medicines/${medicineId}`,
        {
          ...medicine,
          price: Number(medicine.price),
          stockQuantity: Number(medicine.stockQuantity),
          supplierId: Number(medicine.supplierId)
        }
      );

      alert(
        "Medicine Updated"
      );

      navigate("/medicines");

    } catch (error) {

      // Surfaces backend messages such as:
      // "Supplier with id 99 not found"
      setErrorMessage(getErrorMessage(error));

    } finally {
      setSubmitting(false);
    }

  }

  return (
    <div className="form-container">

      <h1>
        Edit Medicine
      </h1>

      <Alert
        type="error"
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={medicine.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={medicine.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={medicine.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stockQuantity"
          value={medicine.stockQuantity}
          onChange={handleChange}
        />

        <input
          type="date"
          name="expiryDate"
          value={medicine.expiryDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="supplierId"
          value={medicine.supplierId}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn" disabled={submitting}>

          {submitting ? "Updating..." : "Update Medicine"}

        </button>

      </form>

    </div>
  );
}

export default EditMedicine;
