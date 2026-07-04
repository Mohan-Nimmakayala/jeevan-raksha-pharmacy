import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Pharmacy</h2>

      <Link to="/">Dashboard</Link>

      <Link to="/medicines">Medicines</Link>

      <Link to="/suppliers">Suppliers</Link>

      <Link to="/customers">Customers</Link>

      <Link to="/inventory">Inventory</Link>

      

      <Link to="/orders">Orders</Link>


     


      <Link to="/top-spenders">Top Spenders</Link>

      <Link to="/reports">
  Reports
</Link>

<Link to="/search">
  Search
</Link>
    </div>
  );
}

export default Sidebar;
