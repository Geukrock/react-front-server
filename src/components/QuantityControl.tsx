import { useState } from "react";
import "./quantityControl.css"; // 스타일은 아래 참고

export default function QuantityControl() {
  
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="quantity-control">
      <button
        className="arrow-button"
        onClick={handleDecrease}
        disabled={quantity === 1}
      >
        -
      </button>
      <span className="quantity-number">{quantity}</span>
      <button className="arrow-button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}
