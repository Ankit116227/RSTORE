"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("rstore-wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  // Save wishlist
  useEffect(() => {
    try {
      localStorage.setItem(
        "rstore-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlist]);

  // Add product
  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  };

  // Remove product
  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  };

  // Check product
  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = useMemo(() => {
    return wishlist.length;
  }, [wishlist]);

  const value = {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}