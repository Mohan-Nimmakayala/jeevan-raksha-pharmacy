import {
  useState
} from "react";

import api
from "../services/api";

function Search() {

  const [query, setQuery] =
    useState("");

  const [type, setType] =
    useState("all");

  const [results, setResults] =
    useState([]);

  async function handleSearch() {

    try {

      const response =
        await api.get(
          `/search?q=${query}&type=${type}`
        );

      console.log(response.data);

      /* MEDICINES */

      const medicines =
        response?.data?.data?.medicines || [];

      /* SUPPLIERS */

      const suppliers =
        response?.data?.data?.suppliers || [];

      let combinedResults = [];

      if(type === "medicine"){

        combinedResults = medicines;

      }

      else if(type === "supplier"){

        combinedResults = suppliers;

      }

      else{

        combinedResults = [
          ...medicines,
          ...suppliers
        ];

      }

      setResults(combinedResults);

    }

    catch (error) {

      console.log(error);

    }

  }

  return (

    <div>

      {/* HEADER */}

      <div className="page-header">

        <h1>
          Search
        </h1>

      </div>

      {/* SEARCH SECTION */}

      <div className="dashboard-section">

        <div className="api-header">

          <h2>
            🔍 Global Search
          </h2>

          <span className="api-tag">
            GET /api/search
          </span>

        </div>

        <div className="search-layout">

          {/* INPUT */}

          <div className="search-input-box">

            <label>
              Search Keyword *
            </label>

            <input
              type="text"
              placeholder="dolo, apollo..."
              value={query}
              onChange={(e)=>
                setQuery(e.target.value)
              }
            />

          </div>

          {/* TYPE */}

          <div className="search-type-box">

            <label>
              Scope
            </label>

            <select
              value={type}
              onChange={(e)=>
                setType(e.target.value)
              }
            >

              <option value="all">
                All
              </option>

              <option value="medicine">
                Medicine Only
              </option>

              <option value="supplier">
                Supplier Only
              </option>

            </select>

          </div>

          {/* BUTTON */}

          <button
            className="add-btn search-btn"
            onClick={handleSearch}
          >
            🔍 Search
          </button>

        </div>

      </div>

      {/* RESULTS */}

      <div className="cards-grid">

        {
          results.map((item,index) => (

            <div
              className="medicine-card"
              key={index}
            >

              {/* MEDICINE */}

              {
                item.category && (

                  <>

                    <div className="result-badge">

                      Medicine

                    </div>

                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      Category :
                      {" "}
                      {item.category}
                    </p>

                    <p>
                      Price :
                      {" "}
                      ₹{item.price}
                    </p>

                    <p>
                      Stock :
                      {" "}
                      {item.stockQuantity}
                    </p>

                  </>

                )
              }

              {/* SUPPLIER */}

              {
                item.contactPerson && (

                  <>

                    <div className="supplier-badge">

                      Supplier

                    </div>

                    <h2>
                      {item.supplierName}
                    </h2>

                    <p>
                      Contact :
                      {" "}
                      {item.contactPerson}
                    </p>

                    <p>
                      Phone :
                      {" "}
                      {item.phone}
                    </p>

                    <p>
                      Medicines :
                      {" "}
                      {item.medicineCount}
                    </p>

                  </>

                )
              }

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Search;