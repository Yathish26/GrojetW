import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, List, LogOut , User} from 'lucide-react';

export default function Admin() {
    const [inventoryCount, setInventoryCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admintoken');

        if (!token) {
            localStorage.removeItem('admintoken');
            navigate('/admin/login');
            return;
        }

        const fetchInventoryCount = async () => {
            try {
                const response = await fetch('http://192.168.1.35:5000/inventory/count', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setInventoryCount(data.count);
                } else {
                    setError('Failed to fetch count: ' + (data.message || 'Unknown error'));
                }
            } catch (e) {
                setError('Error fetching inventory count: ' + e.message);
                console.error('Fetch error:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchInventoryCount();
    }, [navigate]);

    const handleAddInventoryClick = () => {
        navigate('/admin/add-inventory');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('admintoken');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
  <div className="bg-white p-8  shadow-md border border-gray-100 w-full max-w-md">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500">Manage your inventory and system settings</p>
    </div>

    {/* User Info & Logout */}
    <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 ">
      <div className="flex items-center">
        <div className="bg-green-100 p-2 rounded-full mr-3">
          <User className="text-green-600" size={20} />
        </div>
        <span className="font-medium text-gray-700">Admin</span>
      </div>
      <button 
        onClick={handleLogoutClick}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50  hover:bg-red-100 transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>

    {/* Stats Card */}
    <div className="mb-8 p-5 bg-gradient-to-r from-green-50 to-green-50  border border-green-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Inventory Summary</h3>
          <p className="text-sm text-gray-500">Current stock overview</p>
        </div>
        <Package className="text-green-400" size={20} />
      </div>
      
      <div className="mt-4">
        {loading && (
          <div className="flex items-center justify-center h-12">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}
        {inventoryCount !== null && !loading && !error && (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-800">{inventoryCount}</span>
            <span className="text-gray-500">items in stock</span>
          </div>
        )}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="space-y-3">
      <button
        onClick={handleAddInventoryClick}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4  hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm"
      >
        <Plus size={18} />
        Add New Inventory Item
      </button>
      <button
        onClick={() => navigate('/admin/inventory')}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 px-4  border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors shadow-sm"
      >
        <List size={18} />
        View Full Inventory
      </button>
    </div>
  </div>
</div>
    );
}
