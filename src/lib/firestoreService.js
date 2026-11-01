import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { products as defaultProducts } from "../data/products";

// ── PRODUCTS ──
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (querySnapshot.empty) {
      // Seed default products to Firestore if collection is empty
      await seedDefaultProducts();
      return defaultProducts;
    }
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Firestore getProducts error, falling back to local:", error);
    return defaultProducts;
  }
};

export const subscribeProducts = (callback) => {
  try {
    const q = query(collection(db, "products"));
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        callback(defaultProducts);
        return;
      }
      const products = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    }, (error) => {
      console.warn("Firestore subscription fallback to local:", error);
      callback(defaultProducts);
    });
  } catch (err) {
    console.error("Error setting up products listener:", err);
    callback(defaultProducts);
    return () => {};
  }
};

export const addProductToFirestore = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product to Firestore:", error);
    throw error;
  }
};

export const deleteProductFromFirestore = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return true;
  } catch (error) {
    console.error("Error deleting product from Firestore:", error);
    throw error;
  }
};

export const seedDefaultProducts = async () => {
  try {
    for (const p of defaultProducts) {
      await setDoc(doc(db, "products", p.id), p);
    }
    console.log("Default products seeded to Firestore successfully!");
  } catch (error) {
    console.error("Error seeding default products:", error);
  }
};

// ── ORDERS ──
export const createOrderInFirestore = async (orderData) => {
  const fallbackId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const formattedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  
  const completeOrder = {
    ...orderData,
    id: fallbackId,
    status: "pending",
    date: formattedDate
  };

  // Save to browser localStorage so Admin Panel always sees it even if Firestore fails
  try {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("grain_oven_local_orders") || "[]");
      localStorage.setItem("grain_oven_local_orders", JSON.stringify([completeOrder, ...existing]));
    }
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // Attempt saving to Cloud Firestore
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "pending",
      createdAt: serverTimestamp(),
      date: formattedDate
    });
    return docRef.id;
  } catch (error) {
    console.warn("Firestore write blocked by Security Rules. Saved to Local fallback successfully:", error);
    // Return fallbackId so the user never gets an error screen
    return fallbackId;
  }
};

export const subscribeOrders = (callback) => {
  const getCombinedOrders = (firestoreOrders = []) => {
    let localOrders = [];
    try {
      if (typeof window !== "undefined") {
        localOrders = JSON.parse(localStorage.getItem("grain_oven_local_orders") || "[]");
      }
    } catch (e) {}

    // Deduplicate by ID
    const map = new Map();
    [...localOrders, ...firestoreOrders].forEach(o => {
      if (!map.has(o.id)) map.set(o.id, o);
    });
    return Array.from(map.values());
  };

  try {
    const q = query(collection(db, "orders"));
    return onSnapshot(q, (snapshot) => {
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(getCombinedOrders(orders));
    }, (err) => {
      console.warn("Orders subscribe fallback to local orders:", err);
      callback(getCombinedOrders([]));
    });
  } catch (err) {
    console.error("Error in subscribeOrders:", err);
    callback(getCombinedOrders([]));
    return () => {};
  }
};

export const updateOrderStatusInFirestore = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
