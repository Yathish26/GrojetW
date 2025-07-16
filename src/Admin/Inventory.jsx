import React, { useEffect, useState } from 'react';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem('admintoken');
      if (!token) {
        setError('Admin token missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://192.168.1.35:5000/inventory/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setInventory(data.inventory);
        } else {
          setError('Failed to load inventory');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Inventory List</h1>

      {loading && <p className="text-center text-blue-600 font-medium">Loading inventory...</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <th className="py-3 px-4 text-left">Item Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Price (₹)</th>
                <th className="py-3 px-4 text-center">Added At</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id} className="border-t text-sm text-gray-700 hover:bg-gray-50">
                  <td className="py-2 px-4">{item.itemName}</td>
                  <td className="py-2 px-4">{item.category}</td>
                  <td className="py-2 px-4 text-center">{item.stockquantity}</td>
                  <td className="py-2 px-4 text-center">{item.price}</td>
                  <td className="py-2 px-4 text-center">
                    {new Date(item.addedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {inventory.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
