function LowStockCard({ name = "Medicine", quantity = 0 }) {
  return (
    <div className="low-stock-card">
      <h3>Low Stock</h3>
      <p className="low-stock-name">{name}</p>
      <p className="low-stock-quantity">{quantity} left</p>
    </div>
  );
}

export default LowStockCard;
