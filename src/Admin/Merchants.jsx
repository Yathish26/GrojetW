import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Merchants() {
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        businessType: '',
        status: 'all'
    });
    const [expandedCard, setExpandedCard] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admintoken');
        if (!token) {
            localStorage.removeItem('admintoken');
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('admintoken');
        if (!token) return;

        fetch('http://localhost:5000/merchants/enquiries', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setMerchants(data.merchants || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch merchants:', err);
                setLoading(false);
            });
    }, []);

    const filteredMerchants = merchants.filter(merchant => {
        const matchesSearch = merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            merchant.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
            merchant.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesBusinessType = filters.businessType === '' ||
            merchant.businessType === filters.businessType;

        const matchesStatus = filters.status === 'all' ||
            (filters.status === 'pending' && !merchant.approved) ||
            (filters.status === 'approved' && merchant.approved);

        return matchesSearch && matchesBusinessType && matchesStatus;
    });

    const businessTypes = [...new Set(merchants.map(m => m.businessType))];

    const toggleExpandCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Merchant Applications</h1>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search merchants..."
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50">
                                <Filter size={16} />
                                <span>Filters</span>
                            </button>
                            <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-300 shadow-lg z-10 hidden group-hover:block">
                                <div className="p-3 border-b border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                                    <select
                                        className="w-full p-2 border border-gray-300"
                                        value={filters.businessType}
                                        onChange={(e) => setFilters({ ...filters, businessType: e.target.value })}
                                    >
                                        <option value="">All Types</option>
                                        {businessTypes.map((type, i) => (
                                            <option key={i} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full p-2 border border-gray-300"
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredMerchants.length === 0 ? (
                    <div className="bg-white p-8 text-center border border-gray-300">
                        <p className="text-gray-500">No merchant applications found matching your criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredMerchants.map((merchant) => (
                            <div
                                key={merchant._id}
                                className={`bg-white border border-gray-300 ${expandedCard === merchant._id ? 'shadow-md' : ''}`}
                            >
                                <div
                                    className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                                    onClick={() => toggleExpandCard(merchant._id)}
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-900">{merchant.businessName}</h3>
                                        <p className="text-sm text-gray-500">{merchant.businessType}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {expandedCard === merchant._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </div>

                                {expandedCard === merchant._id && (
                                    <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <Briefcase className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Business</p>
                                                    <p className="text-gray-900">{merchant.businessName}</p>
                                                    <p className="text-gray-600 text-sm">{merchant.businessType}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Mail className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Contact</p>
                                                    <p className="text-gray-900">{merchant.contactPerson}</p>
                                                    <p className="text-gray-600 text-sm">{merchant.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <Phone className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                                    <p className="text-gray-900">{merchant.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Address</p>
                                                    <p className="text-gray-900">{merchant.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {merchant.message && (
                                            <div className="md:col-span-2 bg-gray-50 p-3">
                                                <p className="text-sm font-medium text-gray-500 mb-1">Message</p>
                                                <p className="text-gray-700 italic">"{merchant.message}"</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}