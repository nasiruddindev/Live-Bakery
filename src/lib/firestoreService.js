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
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: "pending",
      createdAt: serverTimestamp(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const subscribeOrders = (callback) => {
  try {
    const q = query(collection(db, "orders"));
    return onSnapshot(q, (snapshot) => {
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    }, (err) => {
      console.warn("Orders subscribe fallback:", err);
    });
  } catch (err) {
    console.error("Error in subscribeOrders:", err);
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
