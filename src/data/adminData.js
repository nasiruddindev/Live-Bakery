// Mock admin data — orders, customers, analytics

export const mockOrders = [
  { id: "ORD-001", customer: "Ayesha Rahman", email: "ayesha@gmail.com", items: ["Classic Pepperoni Pizza", "Butter Croissant"], total: 1530, status: "delivered", date: "2026-11-01", address: "Gulshan-2, Dhaka" },
  { id: "ORD-002", customer: "Tanvir Ahmed", email: "tanvir@gmail.com", items: ["Double Cheese Burger", "Glazed Donuts"], total: 1000, status: "processing", date: "2026-11-01", address: "Dhanmondi, Dhaka" },
  { id: "ORD-003", customer: "Nusrat Jahan", email: "nusrat@gmail.com", items: ["Chocolate Fudge Cake"], total: 1850, status: "pending", date: "2026-11-01", address: "Banani, Dhaka" },
  { id: "ORD-004", customer: "Sabbir Hossain", email: "sabbir@gmail.com", items: ["Strawberry Cheesecake", "Chocolate Chip Cookies"], total: 2000, status: "delivered", date: "2026-10-31", address: "Mirpur, Dhaka" },
  { id: "ORD-005", customer: "Fatema Khatun", email: "fatema@gmail.com", items: ["Creamy Chicken Sandwich", "Butter Croissant"], total: 730, status: "cancelled", date: "2026-10-31", address: "Uttara, Dhaka" },
  { id: "ORD-006", customer: "Rahim Uddin", email: "rahim@gmail.com", items: ["Classic Pepperoni Pizza"], total: 1250, status: "delivered", date: "2026-10-30", address: "Motijheel, Dhaka" },
  { id: "ORD-007", customer: "Sumaiya Akter", email: "sumaiya@gmail.com", items: ["Double Cheese Burger", "Chocolate Chip Cookies"], total: 1030, status: "processing", date: "2026-10-30", address: "Rayer Bazar, Dhaka" },
  { id: "ORD-008", customer: "Karim Sheikh", email: "karim@gmail.com", items: ["Strawberry Cheesecake"], total: 1650, status: "delivered", date: "2026-10-29", address: "Wari, Dhaka" },
  { id: "ORD-009", customer: "Dilara Begum", email: "dilara@gmail.com", items: ["Glazed Donuts", "Butter Croissant"], total: 600, status: "pending", date: "2026-10-29", address: "Mohammadpur, Dhaka" },
  { id: "ORD-010", customer: "Imran Hossain", email: "imran@gmail.com", items: ["Classic Pepperoni Pizza", "Chocolate Fudge Cake"], total: 3100, status: "delivered", date: "2026-10-28", address: "Tejgaon, Dhaka" },
];

export const mockCustomers = [
  { id: "CUS-001", name: "Ayesha Rahman", email: "ayesha@gmail.com", phone: "01711-234567", orders: 12, totalSpent: 18400, joined: "2025-03-15", avatar: "AR" },
  { id: "CUS-002", name: "Tanvir Ahmed", email: "tanvir@gmail.com", phone: "01812-345678", orders: 8, totalSpent: 9600, joined: "2025-05-20", avatar: "TA" },
  { id: "CUS-003", name: "Nusrat Jahan", email: "nusrat@gmail.com", phone: "01913-456789", orders: 15, totalSpent: 24750, joined: "2025-01-10", avatar: "NJ" },
  { id: "CUS-004", name: "Sabbir Hossain", email: "sabbir@gmail.com", phone: "01614-567890", orders: 5, totalSpent: 6200, joined: "2025-08-02", avatar: "SH" },
  { id: "CUS-005", name: "Fatema Khatun", email: "fatema@gmail.com", phone: "01715-678901", orders: 20, totalSpent: 31500, joined: "2024-12-01", avatar: "FK" },
  { id: "CUS-006", name: "Rahim Uddin", email: "rahim@gmail.com", phone: "01816-789012", orders: 7, totalSpent: 8750, joined: "2025-06-18", avatar: "RU" },
  { id: "CUS-007", name: "Sumaiya Akter", email: "sumaiya@gmail.com", phone: "01917-890123", orders: 3, totalSpent: 3090, joined: "2026-09-05", avatar: "SA" },
  { id: "CUS-008", name: "Karim Sheikh", email: "karim@gmail.com", phone: "01618-901234", orders: 11, totalSpent: 16500, joined: "2025-04-22", avatar: "KS" },
];

export const revenueData = [
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 58000 },
  { month: "Jul", revenue: 51000 },
  { month: "Aug", revenue: 67000 },
  { month: "Sep", revenue: 73000 },
  { month: "Oct", revenue: 89000 },
  { month: "Nov", revenue: 34000 },
];

export const topProducts = [
  { name: "Classic Pepperoni Pizza", sold: 248, revenue: 310000, percentage: 92 },
  { name: "Butter Croissant", sold: 312, revenue: 87360, percentage: 78 },
  { name: "Chocolate Fudge Cake", sold: 89, revenue: 164650, percentage: 65 },
  { name: "Double Cheese Burger", sold: 176, revenue: 119680, percentage: 58 },
  { name: "Strawberry Cheesecake", sold: 95, revenue: 156750, percentage: 45 },
];
