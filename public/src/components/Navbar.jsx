import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="shadow-lg w-full py-4"
      style={{ backgroundColor: "#8B4513" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <Link to="/" className="relative">
            <h1
              className="text-5xl font-bold text-white transition-transform transform hover:scale-105 hover:shadow-lg"
              style={{
                letterSpacing: "0.1em",
                textShadow: "2px 2px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              PotteryBarn
            </h1>
          </Link>
        </div>
      </div>
    </nav>
  );
}
