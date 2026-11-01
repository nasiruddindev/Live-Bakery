"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Store,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Filter,
  BarChart3,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { mockOrders, mockCustomers, revenueData, topProducts } from "../../data/adminData";
import { products as initialProducts } from "../../data/products";
import {
  subscribeProducts,
  subscribeOrders,
  addProductToFirestore,
  deleteProductFromFirestore,
  updateOrderStatusInFirestore
} from "../../lib/firestoreService";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'products' | 'orders' | 'customers'
  const [productsList, setProductsList] = useState(initialProducts);
  const [ordersList, setOrdersList] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // New product modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Subscribe to real-time Firestore updates
  React.useEffect(() => {
    const unsubProd = subscribeProducts((items) => {
      if (items && items.length > 0) setProductsList(items);
    });
    const unsubOrders = subscribeOrders((orders) => {
      if (orders && orders.length > 0) setOrdersList(orders);
    });
    return () => {
      unsubProd && unsubProd();
      unsubOrders && unsubOrders();
    };
  }, []);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "pizza",
    categoryName: "Artisan Pizza",
    price: "",
    rating: 5.0,
    reviews: 1,
    badge: "New",
    badgeColor: "bg-[#F26535] text-white",
    description: "",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    prepTime: "15 min",
    calories: "450 kcal"
  });

  // Calculate stats
  const totalRevenue = ordersList
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = ordersList.filter(o => o.status === "processing" || o.status === "pending").length;
  const totalDelivered = ordersList.filter(o => o.status === "delivered").length;

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    // Optimistic UI update
    setOrdersList(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    try {
      await updateOrderStatusInFirestore(orderId, newStatus);
    } catch (err) {
      console.warn("Could not sync order status to Firestore:", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductsList(prev => prev.filter(p => p.id !== productId));
      try {
        await deleteProductFromFirestore(productId);
      } catch (err) {
        console.warn("Could not delete from Firestore:", err);
      }
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const created = {
      ...newProduct,
      price: Number(newProduct.price)
    };
    setIsAddModalOpen(false);
    try {
      const docId = await addProductToFirestore(created);
      setProductsList([{ ...created, id: docId }, ...productsList]);
    } catch (err) {
      setProductsList([{ ...created, id: "prod-" + Date.now() }, ...productsList]);
    }
    setNewProduct({
      name: "",
      category: "pizza",
      categoryName: "Artisan Pizza",
      price: "",
      rating: 5.0,
      reviews: 1,
      badge: "New",
      badgeColor: "bg-[#F26535] text-white",
      description: "",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      prepTime: "15 min",
      calories: "450 kcal"
    });
  };

  const filteredOrders = ordersList.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatusFilter === "all" || order.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex text-[#2D1B14] font-sans antialiased">
      {/* ── Sidebar ── */}
      <aside className="w-64 bg-[#2D1B14] text-white flex flex-col justify-between shrink-0 shadow-2xl relative z-30 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-white/10 gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F26535] flex items-center justify-center font-serif font-black text-white text-xl shadow-lg shadow-[#F26535]/30">
              G
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-wider text-white block">
                GRAIN & OVEN
              </span>
              <span className="text-[10px] tracking-widest text-[#F26535] uppercase font-semibold">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "orders", label: "Orders", icon: ShoppingBag, badge: activeOrdersCount },
              { id: "products", label: "Menu & Products", icon: Package, badge: productsList.length },
              { id: "customers", label: "Customers", icon: Users },
            ].map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setSearchTerm("");
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === id
                    ? "bg-[#F26535] text-white shadow-lg shadow-[#F26535]/30 font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
                {badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      activeTab === id
                        ? "bg-white text-[#F26535]"
                        : "bg-white/10 text-white/80"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-2">
              <Store size={16} />
              <span>View Public Bakery</span>
            </div>
            <ArrowUpRight size={14} />
          </a>
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 mt-2">
            <div className="w-9 h-9 rounded-full bg-[#F26535] flex items-center justify-center font-bold text-white text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-white">Head Baker Admin</p>
              <p className="text-[10px] text-white/50 truncate">admin@grainoven.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#E7D9C5]/60 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75665B]"
              />
              <input
                type="text"
                placeholder={
                  activeTab === "products"
                    ? "Search products by name or category..."
                    : activeTab === "orders"
                    ? "Search orders by ID, name or email..."
                    : "Search..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#F7EFDF]/60 border border-[#E7D9C5] rounded-full text-xs sm:text-sm focus:outline-none focus:border-[#F26535] transition-colors"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Navigation Tabs */}
            <div className="flex md:hidden items-center gap-1">
              {["dashboard", "orders", "products"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-2.5 py-1 text-xs rounded-lg capitalize ${
                    activeTab === t ? "bg-[#F26535] text-white" : "text-[#75665B]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E7D9C5] text-xs font-semibold hover:bg-[#F7EFDF] transition-colors"
            >
              <Store size={14} className="text-[#F26535]" />
              Storefront
            </a>

            <div className="relative">
              <button className="w-10 h-10 rounded-full border border-[#E7D9C5] flex items-center justify-center hover:bg-[#F7EFDF] transition-colors relative">
                <Bell size={17} className="text-[#2D1B14]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26535] absolute top-2 right-2 border-2 border-white" />
              </button>
            </div>
          </div>
        </header>

        {/* ── View: DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <main className="p-6 sm:p-10 space-y-8 flex-1">
            {/* Header Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D1B14]">
                  Bakery Overview
                </h1>
                <p className="text-xs sm:text-sm text-[#75665B]">
                  Live performance data, order queues, and inventory status.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab("products");
                    setIsAddModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#F26535] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#D84E20] shadow-md shadow-[#F26535]/20 cursor-pointer transition-all"
                >
                  <Plus size={16} /> Add New Dish
                </button>
              </div>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Total Revenue",
                  value: `৳${totalRevenue.toLocaleString()}`,
                  change: "+18.4% vs last week",
                  icon: DollarSign,
                  accent: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                },
                {
                  title: "Active Orders",
                  value: activeOrdersCount,
                  change: `${ordersList.filter(o => o.status === "pending").length} awaiting oven`,
                  icon: Clock,
                  accent: "bg-amber-500/10 text-amber-600 border-amber-500/20"
                },
                {
                  title: "Delivered Today",
                  value: totalDelivered,
                  change: "100% on-time rate",
                  icon: CheckCircle2,
                  accent: "bg-blue-500/10 text-blue-600 border-blue-500/20"
                },
                {
                  title: "Menu Items",
                  value: productsList.length,
                  change: "5 categories active",
                  icon: Package,
                  accent: "bg-[#F26535]/10 text-[#F26535] border-[#F26535]/20"
                }
              ].map(({ title, value, change, icon: Icon, accent }) => (
                <div
                  key={title}
                  className="bg-white rounded-3xl p-6 border border-[#E7D9C5]/80 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-[#75665B]">{title}</span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${accent}`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-[#2D1B14]">{value}</h3>
                    <p className="text-[11px] font-medium text-[#75665B] mt-1 flex items-center gap-1">
                      <TrendingUp size={12} className="text-emerald-500" /> {change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Analytics & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Revenue Chart Visual */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7D9C5]/80 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2D1B14]">Monthly Sales Trend</h3>
                    <p className="text-xs text-[#75665B]">Actual gross revenue in Bangladeshi Taka (BDT)</p>
                  </div>
                  <span className="text-xs font-semibold bg-[#F7EFDF] px-3 py-1 rounded-full text-[#2D1B14]">
                    2026 Season
                  </span>
                </div>

                {/* Simulated Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2">
                  {revenueData.map((d) => {
                    const max = 95000;
                    const heightPct = Math.round((d.revenue / max) * 100);
                    return (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[10px] font-bold text-[#75665B] opacity-0 group-hover:opacity-100 transition-opacity">
                          ৳{(d.revenue / 1000).toFixed(0)}k
                        </div>
                        <div className="w-full bg-[#F7EFDF] rounded-t-xl overflow-hidden h-44 flex items-end">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className="w-full bg-[#F26535] group-hover:bg-[#D84E20] transition-all rounded-t-xl"
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#75665B]">{d.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best-selling Items */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7D9C5]/80 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2D1B14]">Top Performers</h3>
                    <p className="text-xs text-[#75665B]">Customer favorites this month</p>
                  </div>
                  <Flame size={18} className="text-[#F26535]" />
                </div>

                <div className="space-y-4">
                  {topProducts.map((p) => (
                    <div key={p.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#2D1B14] truncate max-w-[180px]">{p.name}</span>
                        <span className="text-[#F26535]">৳{p.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[#F7EFDF] rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#2D1B14] h-2 rounded-full"
                          style={{ width: `${p.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#75665B]">
                        <span>{p.sold} orders baked</span>
                        <span>{p.percentage}% popularity</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders Snapshot */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7D9C5]/80 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D1B14]">Recent Orders</h3>
                  <p className="text-xs text-[#75665B]">Kitchen live orders stream</p>
                </div>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-bold text-[#F26535] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Orders ({ordersList.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E7D9C5] text-[#75665B] text-[11px] uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Order ID</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Items</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7D9C5]/50">
                    {ordersList.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-[#F7EFDF]/30 transition-colors">
                        <td className="py-3.5 font-bold text-[#2D1B14]">{order.id}</td>
                        <td className="py-3.5">
                          <p className="font-medium text-[#2D1B14]">{order.customer}</p>
                          <p className="text-[10px] text-[#75665B]">{order.address}</p>
                        </td>
                        <td className="py-3.5 text-[#75665B] max-w-xs truncate">
                          {order.items.join(", ")}
                        </td>
                        <td className="py-3.5 font-serif font-bold text-[#2D1B14]">
                          ৳{order.total.toLocaleString()}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === "delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "processing"
                                ? "bg-amber-100 text-amber-800"
                                : order.status === "cancelled"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="bg-[#F7EFDF] border border-[#E7D9C5] rounded-xl text-xs px-2.5 py-1 text-[#2D1B14] font-medium focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        )}

        {/* ── View: ORDERS ── */}
        {activeTab === "orders" && (
          <main className="p-6 sm:p-10 space-y-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D1B14]">
                  Orders Management
                </h1>
                <p className="text-xs sm:text-sm text-[#75665B]">
                  Manage delivery queues, dispatch status, and customer payments.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {["all", "pending", "processing", "delivered", "cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                      selectedStatusFilter === st
                        ? "bg-[#2D1B14] text-white shadow-sm"
                        : "bg-white border border-[#E7D9C5] text-[#75665B] hover:text-[#2D1B14]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E7D9C5]/80 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E7D9C5] text-[#75665B] text-[11px] uppercase tracking-wider">
                    <th className="pb-3.5 font-semibold">Order</th>
                    <th className="pb-3.5 font-semibold">Customer</th>
                    <th className="pb-3.5 font-semibold">Ordered Dishes</th>
                    <th className="pb-3.5 font-semibold">Total</th>
                    <th className="pb-3.5 font-semibold">Delivery Address</th>
                    <th className="pb-3.5 font-semibold">Status</th>
                    <th className="pb-3.5 font-semibold text-right">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7D9C5]/50">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F7EFDF]/20 transition-colors">
                      <td className="py-4 font-bold text-[#2D1B14]">
                        {order.id}
                        <span className="block text-[10px] text-[#75665B] font-normal">{order.date}</span>
                      </td>
                      <td className="py-4">
                        <p className="font-semibold text-[#2D1B14]">{order.customer}</p>
                        <p className="text-xs text-[#75665B]">{order.email}</p>
                      </td>
                      <td className="py-4 text-[#75665B] text-xs max-w-xs">
                        {order.items.join(" + ")}
                      </td>
                      <td className="py-4 font-serif font-bold text-[#2D1B14] text-base">
                        ৳{order.total.toLocaleString()}
                      </td>
                      <td className="py-4 text-xs text-[#75665B] max-w-[180px]">
                        {order.address}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "processing"
                              ? "bg-amber-100 text-amber-800"
                              : order.status === "cancelled"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-[#F7EFDF] border border-[#E7D9C5] rounded-xl text-xs px-3 py-1.5 text-[#2D1B14] font-semibold cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="py-12 text-center text-[#75665B]">
                  No orders found matching the filter or search criteria.
                </div>
              )}
            </div>
          </main>
        )}

        {/* ── View: PRODUCTS ── */}
        {activeTab === "products" && (
          <main className="p-6 sm:p-10 space-y-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D1B14]">
                  Menu & Inventory
                </h1>
                <p className="text-xs sm:text-sm text-[#75665B]">
                  Update recipes, prices, descriptions, and catalog items.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#F26535] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#D84E20] shadow-md shadow-[#F26535]/20 cursor-pointer self-start sm:self-auto"
              >
                <Plus size={16} /> Add New Dish
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-4 border border-[#E7D9C5]/80 shadow-xs flex flex-col justify-between group hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F7EFDF] mb-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#2D1B14]/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {p.categoryName}
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[#75665B] font-medium">{p.prepTime}</span>
                        <span className="text-amber-500 font-bold flex items-center gap-0.5">
                          ★ {p.rating}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#2D1B14] line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#75665B] line-clamp-2 mt-1">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#E7D9C5]/50 flex items-center justify-between">
                      <span className="font-serif text-xl font-bold text-[#2D1B14]">
                        ৳{p.price.toLocaleString()}
                      </span>
                      <a
                        href={`/products/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#F26535] hover:underline flex items-center gap-1"
                      >
                        Preview <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ── View: CUSTOMERS ── */}
        {activeTab === "customers" && (
          <main className="p-6 sm:p-10 space-y-6 flex-1">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D1B14]">
                Customer Directory
              </h1>
              <p className="text-xs sm:text-sm text-[#75665B]">
                Registered food lovers and loyalty member statistics.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#E7D9C5]/80 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E7D9C5] text-[#75665B] text-[11px] uppercase tracking-wider">
                    <th className="pb-3.5 font-semibold">Customer</th>
                    <th className="pb-3.5 font-semibold">Contact</th>
                    <th className="pb-3.5 font-semibold">Total Orders</th>
                    <th className="pb-3.5 font-semibold">Total Spent</th>
                    <th className="pb-3.5 font-semibold">Member Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7D9C5]/50">
                  {mockCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F7EFDF]/20 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#F26535]/15 text-[#F26535] font-bold text-xs flex items-center justify-center">
                            {c.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-[#2D1B14]">{c.name}</p>
                            <p className="text-[11px] text-[#75665B]">{c.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-xs">
                        <p className="text-[#2D1B14] font-medium">{c.phone}</p>
                        <p className="text-[#75665B]">{c.email}</p>
                      </td>
                      <td className="py-4 font-bold text-[#2D1B14]">
                        {c.orders} orders
                      </td>
                      <td className="py-4 font-serif font-bold text-emerald-600">
                        ৳{c.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-4 text-xs text-[#75665B]">
                        {c.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        )}
      </div>

      {/* ── Add New Product Modal ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7D9C5] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#2D1B14]">Add New Menu Item</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F7EFDF] hover:bg-[#E7D9C5] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#75665B] block mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Truffle Mushroom Sourdough Pizza"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#F26535]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#75665B] block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => {
                      const catNames = {
                        pizza: "Artisan Pizza",
                        burgers: "Gourmet Burgers",
                        cakes: "Celebration Cakes",
                        pastries: "Handmade Pastries",
                        cookies: "Fresh Cookies"
                      };
                      setNewProduct({
                        ...newProduct,
                        category: e.target.value,
                        categoryName: catNames[e.target.value] || "Bakery Special"
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm focus:outline-none"
                  >
                    <option value="pizza">Artisan Pizza</option>
                    <option value="burgers">Gourmet Burgers</option>
                    <option value="cakes">Celebration Cakes</option>
                    <option value="pastries">Handmade Pastries</option>
                    <option value="cookies">Cookies & Treats</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#75665B] block mb-1">Price (৳ BDT)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#F26535]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#75665B] block mb-1">Image URL (Unsplash)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#F26535]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#75665B] block mb-1">Bake / Prep Time</label>
                  <input
                    type="text"
                    value={newProduct.prepTime}
                    onChange={(e) => setNewProduct({ ...newProduct, prepTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#75665B] block mb-1">Calories</label>
                  <input
                    type="text"
                    value={newProduct.calories}
                    onChange={(e) => setNewProduct({ ...newProduct, calories: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#75665B] block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Ingredients, crust type, flavor notes..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7D9C5] bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#F26535]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7D9C5]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E7D9C5] text-xs font-semibold text-[#75665B] hover:bg-[#F7EFDF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#F26535] text-white text-xs font-semibold hover:bg-[#D84E20] shadow-md shadow-[#F26535]/20 cursor-pointer"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
