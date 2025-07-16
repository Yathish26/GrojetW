import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
                    Admin Control Panel
                </h2>

                <div className="mb-8 p-4 bg-blue-50 rounded-md border border-blue-200 text-blue-800">
                    <h3 className="text-lg font-medium mb-2">Total Inventory Overview</h3>
                    <p className="text-sm mb-3">
                        This section displays a summary of your inventory.
                    </p>
                    {loading && (
                        <p className="text-base font-semibold text-blue-600">Loading inventory count...</p>
                    )}
                    {error && (
                        <p className="text-base font-semibold text-red-600">{error}</p>
                    )}
                    {inventoryCount !== null && !loading && !error && (
                        <p className="text-xl font-bold">Current Items in Stock: {inventoryCount}</p>
                    )}
                </div>


                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleAddInventoryClick}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Add New Inventory Item
                    </button>
                    <button
                        onClick={()=>navigate('/admin/inventory')}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Inventory
                    </button>
                </div>
            </div>
        </div>
    );
}
