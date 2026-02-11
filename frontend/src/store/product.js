import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  // SET PRODUCTS
  setProducts: (products) => set({ products }),

  // CREATE PRODUCT
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product.",
        };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully." };
    } catch (error) {
      return { success: false, message: "Server error." };
    }
  },

  // FETCH PRODUCTS
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        return;
      }

      set({ products: data.data });
    } catch (error) {
      console.error("Fetch products failed:", error);
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message };
      }

      // UI immediately update
      set((state) => ({
        products: state.products.filter(
          (product) => product._id !== pid
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Delete failed." };
    }
  },

  // UPDATE PRODUCT
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Update failed." };
    }
  },
}));
