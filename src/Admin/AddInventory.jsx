import React, { useState } from 'react';

export default function AddInventory() {
  const [itemName, setItemName] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      itemName: itemName,
      stockquantity: parseInt(stockQuantity, 10),
      price: parseFloat(price),
      category: category,
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
        setMessage({ type: 'success', text: `Inventory item "${itemName}" added successfully.` });
        setItemName('');
        setStockQuantity('');
        setPrice('');
        setCategory('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add inventory item. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error or server is unreachable. Please check your connection.' });
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Add New Inventory Item
        </h2>

        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemName" className="block text-gray-700 text-sm font-medium mb-1">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Organic Apples"
              required
            />
          </div>

          <div>
            <label htmlFor="stockQuantity" className="block text-gray-700 text-sm font-medium mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="e.g., 100"
              required
              min="0"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 2.99"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Fruits, Dairy, Vegetables"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? 'Adding Item...' : 'Add Item to Inventory'}
          </button>
        </form>
      </div>
    </div>
  );
}
