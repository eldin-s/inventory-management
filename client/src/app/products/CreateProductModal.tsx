"use client";
import { ChangeEvent, FormEvent, useState } from "react";

import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const [errors, setErrors] = useState({
    price: "",
    stockQuantity: "",
    rating: "",
  });

  console.log(errors);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If there are no errors, submit the form
    if (Object.values(validationErrors).every((error) => error === "")) {
      onCreate(formData);
      onClose();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });

    // Validate the field that was changed
    const validationErrors = validateForm({ ...formData, [name]: value });
    setErrors({
      ...errors,
      price: validationErrors.price,
      stockQuantity: validationErrors.stockQuantity,
      rating: validationErrors.rating,
    });
  };

  const validateForm = (data: ProductFormData) => {
    const { price, stockQuantity, rating } = data;
    const errors = {
      price: price < 0 ? "Price must be a non-negative number" : "",

      stockQuantity:
        stockQuantity < 0 ? "Stock Quantity must be a non-negative number" : "",
      rating:
        rating < 1 || rating > 5
          ? "Rating must be a number between 1 and 5"
          : "",
    };
    return errors;
  };

  if (!isOpen) return null;

  const labelStyles = "block text-sm font-medium text-gray-700 mb-2";
  const inputStyles =
    "block w-full mb-2 p-2 border-gray-50 border-2 rounded-md text-gray-800";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />

        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="name" className={labelStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputStyles}
            required
          />

          {/* PRODUCT PRICE */}
          <label htmlFor="price" className={labelStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className={inputStyles}
            required
          />
          {errors.price !== "" && (
            <p className="text-red-400">{errors.price}</p>
          )}

          {/* PRODUCT STOCK QUANTITY */}
          <label htmlFor="Stock Quantity" className={labelStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputStyles}
            required
          />
          {errors.stockQuantity !== "" && (
            <p className="text-red-400">{errors.stockQuantity}</p>
          )}

          {/* PRODUCT RATING */}
          <label htmlFor="rating" className={labelStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputStyles}
            required
          />
          {errors.rating !== "" && (
            <p className="text-red-400">{errors.rating}</p>
          )}

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-500"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
