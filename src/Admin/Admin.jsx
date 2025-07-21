import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Plus, List, LogOut, User, Store, ChartBarStacked } from 'lucide-react';

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
                const response = await fetch(`${import.meta.env.VITE_SERVER}/products/count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (data.tokenValid === false) {
                    localStorage.removeItem('admintoken');
                    navigate('/admin/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

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
        navigate('/admin/products/add');
    };

    const handleViewInventoryClick = () => {
        navigate('/admin/products');
    };

    const handleMerchantsClick = () => {
        navigate('/admin/merchants');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('admintoken');
        navigate('/admin/login');
    };

    const handleCategoriesClick = () => {
        navigate('/admin/categories');
    };

    const handleUsersClick = () => {
        navigate('/admin/users');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start md:items-center justify-center p-4 font-sans">
            <div className="bg-white p-6 shadow-md border border-gray-200 w-full max-w-4xl mx-4 my-8 md:my-0">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column - User Info and Stats */}
                    <div className="w-full md:w-1/3">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
                            <p className="text-gray-500">Manage inventory and settings</p>
                        </div>

                        <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 border border-gray-200">
                            <div className="flex items-center">
                                <div className="bg-green-100 p-2 mr-3">
                                    <User className="text-green-600" size={20} />
                                </div>
                                <span className="font-medium text-gray-700">Admin</span>
                            </div>
                            <button
                                onClick={handleLogoutClick}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>

                        <div className="p-5 bg-green-50 border border-green-200 mb-8">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Inventory Summary</h2>
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
                    </div>

                    {/* Right Column - Action Buttons */}
                    <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={handleAddInventoryClick}
                                className="flex items-center justify-start gap-3 bg-green-600 text-white p-4 hover:bg-green-700 transition-colors h-full"
                            >
                                <Plus size={20} />
                                <div>
                                    <h3 className="font-semibold">Add Inventory</h3>
                                    <p className="text-sm text-green-100">Create new item</p>
                                </div>
                            </button>

                            <button
                                onClick={handleViewInventoryClick}
                                className="flex items-center justify-start gap-3 bg-white text-gray-700 p-4 border border-gray-200 hover:bg-gray-50 transition-colors h-full"
                            >
                                <List size={20} />
                                <div>
                                    <h3 className="font-semibold">View Inventory</h3>
                                    <p className="text-sm text-gray-500">All items list</p>
                                </div>
                            </button>

                            <button
                                onClick={handleMerchantsClick}
                                className="flex items-center justify-start gap-3 bg-blue-600 text-white p-4 hover:bg-blue-700 transition-colors h-full"
                            >
                                <Store size={20} />
                                <div>
                                    <h3 className="font-semibold">Merchants</h3>
                                    <p className="text-sm text-blue-100">View enquiries</p>
                                </div>
                            </button>


                            <button
                                onClick={handleUsersClick}
                                className="flex items-center justify-start gap-3 bg-purple-600 text-white p-4 hover:bg-purple-700 transition-colors h-full"
                            >
                                <User size={20} />
                                <div>
                                    <h3 className="font-semibold">Users</h3>
                                    <p className="text-sm text-purple-100">Manage accounts</p>
                                </div>
                            </button>

                            <button
                                className="flex items-center justify-start gap-3 bg-orange-600 text-white p-4 hover:bg-orange-700 transition-colors h-full"
                            >
                                <Package size={20} />
                                <div>
                                    <h3 className="font-semibold">Orders</h3>
                                    <p className="text-sm text-orange-100">View transactions</p>
                                </div>
                            </button>

                            <button
                                className="flex items-center justify-start gap-3 bg-gray-600 text-white p-4 hover:bg-gray-700 transition-colors h-full"
                            >
                                <List size={20} />
                                <div>
                                    <h3 className="font-semibold">Reports</h3>
                                    <p className="text-sm text-gray-100">Generate analytics</p>
                                </div>
                            </button>

                            <button
                                onClick={handleCategoriesClick}
                                className="flex items-center justify-start gap-3 bg-green-600 text-white p-4 hover:bg-green-700 transition-colors h-full"
                            >
                                <ChartBarStacked size={20} />
                                <div>
                                    <h3 className="font-semibold">Categories</h3>
                                    <p className="text-sm text-gray-100">Manage categories</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}