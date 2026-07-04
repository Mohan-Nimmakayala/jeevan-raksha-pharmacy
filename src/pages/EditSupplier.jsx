import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api
from "../services/api";

import getErrorMessage
from "../utils/getErrorMessage";

import Alert
from "../components/Alert";

function EditSupplier() {

  const { supplierId } =
    useParams();

  const navigate =
    useNavigate();

  const [supplier, setSupplier] =
    useState({
      supplierName:"",
      contactPerson:"",
      phone:""
    });

  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function fetchSupplier() {

    try {

      const response =
        await api.get(
          `/suppliers/${supplierId}`
        );

      setSupplier(
        response.data.data
      );

    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    }

  }

  useEffect(() => {

    fetchSupplier();

  }, []);

  function handleChange(e) {

    setSupplier({

      ...supplier,

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
        `/suppliers/${supplierId}`,
        supplier
      );

      alert(
        "Supplier Updated"
      );

      navigate("/suppliers");

    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    } finally {
      setSubmitting(false);
    }

  }

  return (

    <div className="form-container">

      <h1>
        Edit Supplier
      </h1>

      <Alert
        type="error"
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="supplierName"
          value={supplier.supplierName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contactPerson"
          value={supplier.contactPerson}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          value={supplier.phone}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Supplier"}
        </button>

      </form>

    </div>

  );

}

export default EditSupplier;
