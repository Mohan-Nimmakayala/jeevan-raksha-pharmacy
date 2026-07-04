import {
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import Dashboard
from "../pages/Dashboard";

import Medicines
from "../pages/Medicines";

import AddMedicine
from "../pages/AddMedicine";

import EditMedicine
from "../pages/EditMedicine";

import Suppliers
from "../pages/Suppliers";

import Customers
from "../pages/Customers";

import Inventory
from "../pages/Inventory";

import Orders
from "../pages/Orders";

import AddOrder
from "../pages/AddOrder";

import OrderDetails
from "../pages/OrderDetails";

import Invoice
from "../pages/Invoice";

import AddCustomer
from "../pages/AddCustomer";

import EditCustomer
from "../pages/EditCustomer";

import CustomerProfile
from "../pages/CustomerProfile";

import TopSpenders
from "../pages/TopSpenders";

import AddSupplier
from "../pages/AddSupplier";

import EditSupplier
from "../pages/EditSupplier";

import SupplierProfile
from "../pages/SupplierProfile";


import Reports
from "../pages/Reports";

import Revenue
from "../pages/Revenue";

import RevenueByPayment
from "../pages/RevenueByPayment";

import InventoryAudit
from "../pages/InventoryAudit";

import ExpiredMedicines
from "../pages/ExpiredMedicines";

import Bestsellers
from "../pages/Bestsellers";

import CustomerMostOrders
from "../pages/CustomerMostOrders";

import Search
from "../pages/Search";

import NotFound
from "../pages/NotFound";


function AppRoutes() {

  return (

    <Routes>

      {/* ───────────── Public routes ───────────── */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ───────────── Protected routes ───────────── */}

      <Route
        path="/"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      <Route
        path="/medicines"
        element={<ProtectedRoute><Medicines /></ProtectedRoute>}
      />

      <Route
        path="/add-medicine"
        element={<ProtectedRoute><AddMedicine /></ProtectedRoute>}
      />

      <Route
        path="/edit-medicine/:medicineId"
        element={<ProtectedRoute><EditMedicine /></ProtectedRoute>}
      />

      <Route
        path="/suppliers"
        element={<ProtectedRoute><Suppliers /></ProtectedRoute>}
      />

      <Route
        path="/customers"
        element={<ProtectedRoute><Customers /></ProtectedRoute>}
      />

      <Route
        path="/inventory"
        element={<ProtectedRoute><Inventory /></ProtectedRoute>}
      />

      <Route
        path="/orders"
        element={<ProtectedRoute><Orders /></ProtectedRoute>}
      />

      <Route
        path="/add-order"
        element={<ProtectedRoute><AddOrder /></ProtectedRoute>}
      />

      <Route
        path="/orders/:orderId"
        element={<ProtectedRoute><OrderDetails /></ProtectedRoute>}
      />

      <Route
        path="/invoice/:orderId"
        element={<ProtectedRoute><Invoice /></ProtectedRoute>}/>


      <Route
        path="/add-customer"
        element={<ProtectedRoute><AddCustomer /></ProtectedRoute>}
      />

      <Route
        path="/edit-customer/:customerId"
        element={<ProtectedRoute><EditCustomer /></ProtectedRoute>}
      />

      <Route
        path="/customer/:customerId"
        element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>}
      />

      <Route
        path="/top-spenders"
        element={<ProtectedRoute><TopSpenders /></ProtectedRoute>}
      />


      <Route
        path="/add-supplier"
        element={<ProtectedRoute><AddSupplier /></ProtectedRoute>}
      />

      <Route
        path="/edit-supplier/:supplierId"
        element={<ProtectedRoute><EditSupplier /></ProtectedRoute>}
      />

      <Route
        path="/supplier/:supplierId"
        element={<ProtectedRoute><SupplierProfile /></ProtectedRoute>}
      />

      <Route
        path="/reports"
        element={<ProtectedRoute><Reports /></ProtectedRoute>}
      />

      <Route
        path="/revenue"
        element={<ProtectedRoute><Revenue /></ProtectedRoute>}
      />

      <Route
        path="/revenue-payment"
        element={<ProtectedRoute><RevenueByPayment /></ProtectedRoute>}
      />

      <Route
        path="/inventory-audit"
        element={<ProtectedRoute><InventoryAudit /></ProtectedRoute>}
      />

      <Route
        path="/expired-medicines"
        element={<ProtectedRoute><ExpiredMedicines /></ProtectedRoute>}
      />


      <Route
        path="/bestsellers"
        element={<ProtectedRoute><Bestsellers /></ProtectedRoute>}
      />

      <Route
        path="/customer-most-orders"
        element={<ProtectedRoute><CustomerMostOrders /></ProtectedRoute>}
      />

      <Route
        path="/search"
        element={<ProtectedRoute><Search /></ProtectedRoute>}
      />

      <Route path="*" element={<NotFound />} />

    </Routes>

  );
}

export default AppRoutes;
