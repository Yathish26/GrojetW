import React, { useState, useEffect } from 'react';
import { Package, Plus, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddInventory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    stockQuantity: '',
    price: '',
    category: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      itemName: formData.itemName,
      stockquantity: parseInt(formData.stockQuantity, 10),
      price: parseFloat(formData.price),
      category: formData.category,
    };

    try {
      const response = await fetch('http://192.168.1.35:5000/inventory/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `"${formData.itemName}" added successfully!`,
          icon: <CheckCircle className="w-5 h-5" />
        });
        setFormData({
          itemName: '',
          stockQuantity: '',
          price: '',
          category: ''
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to add item. Please try again.',
          icon: <XCircle className="w-5 h-5" />
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection.',
        icon: <XCircle className="w-5 h-5" />
      });
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admintoken');
    if (!token) {
      localStorage.removeItem('admintoken');
      navigate('/admin/login');
    }
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 mr-3 transition-colors"
          >
            <ArrowLeft className="text-gray-600" size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Item
          </h2>
        </div>

        {message && (
          <div
            className={`flex items-start p-4 mb-6 rounded-lg border ${message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
              }`}
          >
            <span className="mr-2 mt-0.5">{message.icon}</span>
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="itemName"
                name="itemName"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Organic Apples"
                required
              />
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="100"
                required
                min="0"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="2.99"
                  required
                  min="0"
                  step="0.01"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat">Meat</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Adding Item...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add to Inventory</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}