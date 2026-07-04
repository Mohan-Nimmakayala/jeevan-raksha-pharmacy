import { useEffect, useState } from "react";

import api from "../services/api";

import MedicineCard
from "../components/MedicineCard";
import { Link } from "react-router-dom";
function Medicines() {

  const [medicines, setMedicines] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [supplierId, setSupplierId] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function fetchMedicines() {

    try {

      setLoading(true);

      const response =
        await api.get(
          "/medicines"
        );

      let data = [];

      if (
        Array.isArray(
          response.data.data?.content
        )
      ) {

        data =
          response.data.data.content;

      }

      else if (
        Array.isArray(
          response.data.data
        )
      ) {

        data =
          response.data.data;

      }

      if (search) {

        data = data.filter(
          medicine =>

            medicine.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

        );

      }

      if (category) {

        data = data.filter(
          medicine =>

            medicine.category
              .toLowerCase() ===
            category.toLowerCase()

        );

      }

      if (supplierId) {

        data = data.filter(
          medicine =>

            medicine.supplierId ==
            supplierId

        );

      }

      if (
        minPrice &&
        maxPrice
      ) {

        data = data.filter(
          medicine =>

            medicine.price >=
              Number(minPrice)

            &&

            medicine.price <=
              Number(maxPrice)

        );

      }

      if (sort === "low") {

        data.sort(
          (a, b) =>
            a.price - b.price
        );

      }

      if (sort === "high") {

        data.sort(
          (a, b) =>
            b.price - a.price
        );

      }

      setMedicines(data);

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchMedicines();

  }, [
    search,
    category,
    supplierId,
    minPrice,
    maxPrice,
    sort
  ]);

  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            Medicines
          </h1>

          <p>
            Manage pharmacy medicines
          </p>

        </div>

      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="Search Medicine..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) => {

            setCategory(
              e.target.value
            );

            setSupplierId("");
            setMinPrice("");
            setMaxPrice("");

          }}
        >

          <option value="">
            All Categories
          </option>

          <option value="Tablet">
            Tablet
          </option>

          <option value="Syrup">
            Syrup
          </option>

          <option value="Injection">
            Injection
          </option>

          <option value="Capsule">
            Capsule
          </option>

        </select>

        <input
          type="number"
          placeholder="Supplier ID"
          value={supplierId}
          onChange={(e) => {

            setSupplierId(
              e.target.value
            );

            setCategory("");

          }}
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
        />

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="">
            Sort By Price
          </option>

          <option value="low">
            Low To High
          </option>

          <option value="high">
            High To Low
          </option>

        </select>

      <div>
       <Link to="/add-medicine">
          <button className="add-btn">
            Add Medicine
          </button>
        </Link>
   
      </div>
      </div>

      {
        loading &&
        (
          <h2 className="loading">
            Loading Medicines...
          </h2>
        )
      }

      <div className="cards-grid">

        {
          !loading &&
          medicines.length > 0
          ? (

              medicines.map(medicine => (

                <MedicineCard
                  key={
                    medicine.medicineId
                  }
                  medicine={medicine}
                  fetchMedicines={fetchMedicines}
                />

              ))

            )
          : (
              !loading &&
              (
                <h2 className="empty">

                  No Medicines Found

                </h2>
              )
            )
        }

      </div>

    </div>

  );

}

export default Medicines;