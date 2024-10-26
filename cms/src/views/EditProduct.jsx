import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Toastify from "toastify-js";

export default function EditProduct({ base_url }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  async function getProduct() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  async function handleSubmit(
    event,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) {
    event.preventDefault();

    try {
      const body = { name, description, price, imgUrl, stock, categoryId };

      const { data } = await axios.put(
        `${base_url}/apis/branded-things/products/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <>
      <ProductForm
        base_url={base_url}
        formTitle="Edit"
        buttonText="Save Changes"
        handleSubmit={handleSubmit}
        product={product}
      />
    </>
  );
}
