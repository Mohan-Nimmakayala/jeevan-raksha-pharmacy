import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import api
from "../services/api";

import SupplierCard
from "../components/SupplierCard";

function Suppliers() {

  const [suppliers, setSuppliers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function fetchSuppliers() {

    try {

      setLoading(true);

      const response =
        await api.get(
          "/suppliers"
        );

      setSuppliers(

        response?.data?.data?.content ||

        response?.data?.data ||

        []

      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchSuppliers();

  }, []);

  const filteredSuppliers =
    suppliers.filter(supplier =>

      supplier.supplierName
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );

  return (

    <div>

      <div className="page-header">

        <h1>
          Suppliers
        </h1>

        <Link
          to="/add-supplier"
          className="add-btn"
        >
          Add Supplier
        </Link>

      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="Search Suppliers"
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
        />

      </div>

      {loading && (
        <p>Loading Suppliers...</p>
      )}

      <div className="cards-grid">

        {
          filteredSuppliers.length > 0
          ? (

              filteredSuppliers.map(
                supplier => (

                  <SupplierCard
                    key={
                      supplier.supplierId
                    }
                    supplier={supplier}
                    fetchSuppliers={
                      fetchSuppliers
                    }
                  />

                )
              )

            )
          : (

              !loading && (
                <p>
                  No suppliers found
                </p>
              )

            )
        }

      </div>

    </div>

  );

}

export default Suppliers;