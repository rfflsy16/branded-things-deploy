import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-300 rounded-lg overflow-hidden cursor-pointer"
    >
      <figure>
        <img src={product.imgUrl} alt={product.name} />
      </figure>
      <div className="card-body p-4 flex flex-col justify-between">
        <h2 className="card-title text-black font-semibold">{product.name}</h2>
        <p className="text-gray-700 text-sm">
          {product.description.length > 80
            ? product.description.substring(0, 80) + "..."
            : product.description}
        </p>
        <div className="card-actions justify-between mt-4">
          <span className="text-lg font-bold text-black">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
