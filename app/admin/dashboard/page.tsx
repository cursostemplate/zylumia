"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, DollarSign, Users, TrendingUp, LogOut, Calendar, MapPin, Mail, Phone, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface OrderData {
  id: string
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  phone: string
  country: string
  trackingUpdates: boolean
  saveInfo: boolean
  items: any[]
  subtotal: number
  shippingProtection: boolean
  total: number
  timestamp: number
  paypalOrderId?: string
}

interface UserData {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  country?: string
  timestamp: number
  lastUpdated: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderData[]>([])
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
  const [activeTab, setActiveTab] = useState<"orders" | "users">("orders")
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchData = async () => {
    try {
      const response = await fetch("/api/admin/get-data")
      const data = await response.json()

      if (data.orders) {
        setOrders(data.orders)
      }
      if (data.users) {
        setUsers(data.users)
      }
      setLastUpdate(new Date())
      setIsLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching admin data:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("zylumia_admin")
      if (isAdmin !== "true") {
        router.push("/admin")
        return
      }
    }

    // Initial fetch
    fetchData()

    // Poll every 5 seconds for real-time updates
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("zylumia_admin")
    router.push("/admin")
  }

  // Calculate statistics
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0) || 0
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const uniqueCustomers = new Set(orders.map((o) => o.email)).size
  const totalUsers = users.length

  // Chart data - Orders by day
  const ordersByDay = orders.reduce((acc: any, order) => {
    const date = new Date(order.timestamp).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const ordersChartData = Object.entries(ordersByDay)
    .map(([date, count]) => ({
      date,
      orders: count,
    }))
    .slice(-7) // Last 7 days

  // Revenue by day
  const revenueByDay = orders.reduce((acc: any, order) => {
    const date = new Date(order.timestamp).toLocaleDateString()
    acc[date] = (acc[date] || 0) + (order.total || 0)
    return acc
  }, {})

  const revenueChartData = Object.entries(revenueByDay)
    .map(([date, revenue]) => ({
      date,
      revenue: Number(revenue),
    }))
    .slice(-7)

  // Orders by country
  const ordersByCountry = orders.reduce((acc: any, order) => {
    acc[order.country] = (acc[order.country] || 0) + 1
    return acc
  }, {})

  const countryChartData = Object.entries(ordersByCountry).map(([country, count]) => ({
    name: country,
    value: count,
  }))

  const COLORS = ["#8c2a42", "#6b2032", "#4a1622", "#c53b5c", "#a0324a"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-lora text-3xl font-bold text-[#8c2a42]">ZYLUMIA</h1>
            <p className="text-sm text-gray-600">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Live</span>
              <span className="text-xs text-gray-400">Updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8c2a42]"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <Package className="h-5 w-5 text-[#8c2a42]" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                <p className="text-xs text-green-600 mt-1">All time</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <DollarSign className="h-5 w-5 text-[#8c2a42]" />
                </div>
                <p className="text-3xl font-bold text-gray-900">£{(totalRevenue || 0).toFixed(2)}</p>
                <p className="text-xs text-green-600 mt-1">All time</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                  <TrendingUp className="h-5 w-5 text-[#8c2a42]" />
                </div>
                <p className="text-3xl font-bold text-gray-900">£{(averageOrderValue || 0).toFixed(2)}</p>
                <p className="text-xs text-gray-600 mt-1">Per order</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Unique Customers</p>
                  <Users className="h-5 w-5 text-[#8c2a42]" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{uniqueCustomers}</p>
                <p className="text-xs text-gray-600 mt-1">With orders</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Registered Users</p>
                  <UserCircle className="h-5 w-5 text-[#8c2a42]" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-xs text-gray-600 mt-1">Total users</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Orders Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Orders (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={ordersChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#8c2a42" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Revenue (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8c2a42" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Country Distribution */}
            {countryChartData.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
                <h3 className="text-lg font-semibold mb-4">Orders by Country</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={countryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {countryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === "orders"
                        ? "border-[#8c2a42] text-[#8c2a42]"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Orders ({totalOrders})
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === "users"
                        ? "border-[#8c2a42] text-[#8c2a42]"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Registered Users ({totalUsers})
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              {activeTab === "orders" && (
                <>
                  {orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No orders yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orders
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map((order) => (
                              <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(order.timestamp).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                  <div>
                                    {order.firstName} {order.lastName}
                                  </div>
                                  <div className="text-xs text-gray-500">{order.email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                  <div>
                                    {order.city}, {order.state}
                                  </div>
                                  <div className="text-xs text-gray-500">{order.country}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {order.items?.length || 0} item(s)
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  £{(order.total || 0).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <Button
                                    onClick={() => setSelectedOrder(order)}
                                    size="sm"
                                    variant="outline"
                                    className="text-[#8c2a42] border-[#8c2a42] hover:bg-[#8c2a42] hover:text-white"
                                  >
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {activeTab === "users" && (
                <>
                  {users.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                      <UserCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No registered users yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Registered Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Last Updated
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {users
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map((user) => (
                              <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(user.timestamp).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "-"}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.phone || "-"}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{user.country || "-"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(user.lastUpdated).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Customer Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Email:</span>
                    <span>{selectedOrder.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Phone:</span>
                    <span>{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Order Date:</span>
                    <span>{new Date(selectedOrder.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Shipping Address</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">
                        {selectedOrder.firstName} {selectedOrder.lastName}
                      </p>
                      <p>{selectedOrder.address}</p>
                      {selectedOrder.apartment && <p>{selectedOrder.apartment}</p>}
                      <p>
                        {selectedOrder.city}, {selectedOrder.state} {selectedOrder.postalCode}
                      </p>
                      <p>{selectedOrder.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {selectedOrder.items?.map((item: any, index: number) => (
                    <div key={index} className="p-4 flex items-center gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.quantity}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.quantity}</p>
                        <p className="text-xs text-gray-500">{item.supply}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">£{item.price}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantityInCart}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Summary</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>£{(selectedOrder.subtotal || 0).toFixed(2)}</span>
                  </div>
                  {selectedOrder.shippingProtection && (
                    <div className="flex justify-between text-sm">
                      <span>Shipping Protection:</span>
                      <span>£5.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-[#8c2a42]">£{(selectedOrder.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {selectedOrder.trackingUpdates && (
                  <span className="flex items-center gap-1">✓ Tracking updates enabled</span>
                )}
                {selectedOrder.paypalOrderId && <span>PayPal ID: {selectedOrder.paypalOrderId}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
