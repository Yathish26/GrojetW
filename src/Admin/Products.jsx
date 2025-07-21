import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import ChipInput from '../Components/ChipInput';


Modal.setAppElement('#root');

const DEFAULT_VARIANT = { label: '', price: 0, mrp: 0, stock: 0, unit: '', image: '' };

function EditInput({ label, name, value, onChange, type = 'text', disabled, required = false, step, min, max }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        required={required}
        step={step}
        min={min}
        max={max}
      />
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorylist, setCategorylist] = useState([]);
  const [filters, setFilters] = useState({ category: '', status: 'all' });

  const navigate = useNavigate();
  const token = localStorage.getItem('admintoken');

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      toast.error(error.message);
      if (error.message.includes('Unauthorized')) {
        localStorage.removeItem('admintoken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/admin/categories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategorylist(data.categories || []);
    } catch (error) {
      toast.error('Failed to load categories. Please refresh the page.');
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('admintoken');
      navigate('/admin/login');
      return;
    }
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories, token, navigate]);

  // Memoized categories for filter dropdown
  const categories = useMemo(() => {
    return [
      ...new Map(
        products
          .filter(p => p.category) // Only products with a category
          .map(p => [p.category._id, p.category.name])
      ).entries()
    ].map(([id, name]) => ({ id, name }));
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filters.category ||
        (product.category && product.category._id === filters.category);
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' && product.isActive) ||
        (filters.status === 'inactive' && !product.isActive);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, filters]);

  // Delete product
  const handleDelete = async () => {
    if (!productIdToDelete) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/admin/products/${productIdToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConfirmDeleteVisible(false);
      setProductIdToDelete(null);
    }
  };

  // Edit modal handlers
  const openEditModal = (product) => {
    // Defensive copy for editing
    setEditProduct(JSON.parse(JSON.stringify(product)));
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditProduct(null);
  };

  // Edit input change handler (supports nested fields)
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct(prev => {
      let updated = { ...prev };
      if (name === 'category') {
        const selectedCategory = categorylist.find(cat => cat._id === value);
        updated.category = selectedCategory || null;
      } else if (name.includes('.')) {
        const keys = name.split('.');
        let obj = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          obj[keys[i]] = obj[keys[i]] ? { ...obj[keys[i]] } : {};
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
      } else {
        updated[name] = type === 'checkbox' ? checked : value;
      }
      return updated;
    });
  };

  // Variant handlers
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const fieldName = name.replace(`variants[${index}].`, '');
    setEditProduct(prev => {
      const variants = prev.variants ? [...prev.variants] : [];
      variants[index] = { ...variants[index], [fieldName]: value };
      return { ...prev, variants };
    });
  };
  const addVariant = () => {
    setEditProduct(prev => ({
      ...prev,
      variants: [...(prev.variants || []), { ...DEFAULT_VARIANT }]
    }));
  };
  const removeVariant = (index) => {
    setEditProduct(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  // Save product
  const handleSave = async () => {
    if (!editProduct || !editProduct._id) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/admin/products/${editProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }
      toast.success('Product updated successfully');
      fetchProducts();
      closeEditModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />

      {/* Delete Modal */}
      <Modal
        isOpen={confirmDeleteVisible}
        onRequestClose={() => setConfirmDeleteVisible(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white  shadow-xl p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setConfirmDeleteVisible(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300  text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600  text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">Product Management</h1>
        <button
          onClick={() => navigate('/admin/products/add')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2  shadow flex items-center gap-2 self-end md:self-auto"
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      < div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4" >
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div >

      {/* Loading */}
      {
        loading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            <p className="ml-3 text-gray-600">Loading products...</p>
          </div>
        )
      }

      {/* No products */}
      {
        !loading && products.length === 0 && (
          <div className="bg-white  shadow overflow-hidden border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No products found. Add your first product!</p>
          </div>
        )
      }

      {/* Product Table */}
      {
        !loading && filteredProducts.length > 0 && (
          <div className="bg-white  shadow overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.thumbnail && (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 " src={product.thumbnail} alt={product.name} />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.sku || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category_string || 'Uncategorized'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {product.stock?.quantity ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        ₹{product.pricing?.sellingPrice?.toFixed(2) ?? '0.00'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setProductIdToDelete(product._id);
                            setConfirmDeleteVisible(true);
                          }}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      {/* Edit Modal */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        className="relative bg-white  p-6 shadow-xl max-w-4xl mx-auto my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2 z-10">
          <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
          <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {editProduct && (
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 p-4 ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditInput
                  label="Product Name*"
                  name="name"
                  value={editProduct.name}
                  onChange={handleEditChange}
                  disabled={isSaving}
                  required
                />
                <EditInput
                  label="SKU*"
                  name="sku"
                  value={editProduct.sku}
                  onChange={handleEditChange}
                  disabled={isSaving}
                  required
                />
                <EditInput
                  label="Brand"
                  name="brand"
                  value={editProduct.brand}
                  onChange={handleEditChange}
                  disabled={isSaving}
                />
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={editProduct.category?._id || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isSaving}
                  >
                    <option value="">Select Category</option>
                    {categorylist.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <EditInput
                  label="Barcode"
                  name="barcode"
                  value={editProduct.barcode}
                  onChange={handleEditChange}
                  disabled={isSaving}
                />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={!!editProduct.isActive}
                      onChange={handleEditChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      disabled={isSaving}
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      name="isFeatured"
                      checked={!!editProduct.isFeatured}
                      onChange={handleEditChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      disabled={isSaving}
                    />
                    <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                      Featured
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 p-4 ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <EditInput
                  label="MRP (₹)*"
                  name="pricing.mrp"
                  value={editProduct.pricing?.mrp}
                  onChange={handleEditChange}
                  type="number"
                  step="0.01"
                  min="0"
                  disabled={isSaving}
                  required
                />
                <EditInput
                  label="Selling Price (₹)*"
                  name="pricing.sellingPrice"
                  value={editProduct.pricing?.sellingPrice}
                  onChange={handleEditChange}
                  type="number"
                  step="0.01"
                  min="0"
                  disabled={isSaving}
                  required
                />
                <EditInput
                  label="Discount Percent"
                  name="pricing.discountPercent"
                  value={editProduct.pricing?.discountPercent}
                  onChange={handleEditChange}
                  type="number"
                  min="0"
                  max="100"
                  disabled={isSaving}
                />
                <EditInput
                  label="Offer Tag"
                  name="pricing.offerTag"
                  value={editProduct.pricing?.offerTag}
                  onChange={handleEditChange}
                  disabled={isSaving}
                />
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Tax</label>
                  <div className="grid grid-cols-2 gap-4">
                    <EditInput
                      label="GST Rate (%)"
                      name="tax.gstRate"
                      value={editProduct.tax?.gstRate}
                      onChange={handleEditChange}
                      type="number"
                      min="0"
                      max="100"
                      disabled={isSaving}
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includedInPrice"
                        name="tax.includedInPrice"
                        checked={!!editProduct.tax?.includedInPrice}
                        onChange={handleEditChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        disabled={isSaving}
                      />
                      <label htmlFor="includedInPrice" className="ml-2 text-sm text-gray-700">
                        Included in Price
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock & Delivery Section */}
            <div className="bg-gray-50 p-4 ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Stock & Delivery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditInput
                  label="Stock Quantity*"
                  name="stock.quantity"
                  value={editProduct.stock?.quantity}
                  onChange={handleEditChange}
                  type="number"
                  min="0"
                  disabled={isSaving}
                  required
                />
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Stock Status</label>
                  <select
                    name="stock.status"
                    value={editProduct.stock?.status}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isSaving}
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="limited">Limited Stock</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isInstant"
                    name="delivery.isInstant"
                    checked={!!editProduct.delivery?.isInstant}
                    onChange={handleEditChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    disabled={isSaving}
                  />
                  <label htmlFor="isInstant" className="ml-2 text-sm text-gray-700">
                    Instant Delivery
                  </label>
                </div>
                <EditInput
                  label="Delivery Time (minutes)"
                  name="delivery.deliveryTimeInMinutes"
                  value={editProduct.delivery?.deliveryTimeInMinutes}
                  onChange={handleEditChange}
                  type="number"
                  min="0"
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Media Section */}
            <div className="bg-gray-50 p-4 ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Thumbnail URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={editProduct.thumbnail}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isSaving}
                    placeholder="https://example.com/image.jpg"
                  />
                  {editProduct.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={editProduct.thumbnail}
                        alt="Thumbnail preview"
                        className="h-20 object-contain border "
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Image+not+found'; }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Image URLs (comma separated)</label>
                  <textarea
                    name="images"
                    value={editProduct.images?.join(', ') || ''}
                    onChange={(e) => setEditProduct({
                      ...editProduct,
                      images: e.target.value.split(',').map(url => url.trim()).filter(Boolean)
                    })}
                    className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isSaving}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows={3}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editProduct.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Product ${index}`}
                        className="h-12 object-contain border "
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Image+not+found'; }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Variants Section */}
            <div className="bg-gray-50 p-4 ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Variants</h3>
              {editProduct.variants?.map((variant, index) => (
                <div key={index} className="mb-4 p-3 border ">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <EditInput
                      label="Label"
                      name={`variants[${index}].label`}
                      value={variant.label}
                      onChange={(e) => handleVariantChange(index, e)}
                      disabled={isSaving}
                    />
                    <EditInput
                      label="Price (₹)"
                      name={`variants[${index}].price`}
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, e)}
                      type="number"
                      step="0.01"
                      disabled={isSaving}
                    />
                    <EditInput
                      label="MRP (₹)"
                      name={`variants[${index}].mrp`}
                      value={variant.mrp}
                      onChange={(e) => handleVariantChange(index, e)}
                      type="number"
                      step="0.01"
                      disabled={isSaving}
                    />
                    <EditInput
                      label="Stock"
                      name={`variants[${index}].stock`}
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, e)}
                      type="number"
                      disabled={isSaving}
                    />
                    <EditInput
                      label="Unit"
                      name={`variants[${index}].unit`}
                      value={variant.unit}
                      onChange={(e) => handleVariantChange(index, e)}
                      disabled={isSaving}
                    />
                    <EditInput
                      label="Image URL"
                      name={`variants[${index}].image`}
                      value={variant.image}
                      onChange={(e) => handleVariantChange(index, e)}
                      disabled={isSaving}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="mt-2 text-red-500 text-sm hover:text-red-700"
                    disabled={isSaving}
                  >
                    Remove Variant
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addVariant}
                className="mt-2 text-green-600 hover:text-green-800 flex items-center text-sm"
                disabled={isSaving}
              >
                <Plus size={16} className="mr-1" />
                Add Variant
              </button>
            </div>

            {/* Content Section */}
            <div className="bg-gray-50 p-4 ">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Content</h3>
              <div className="space-y-4">
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                    <span className="text-xs text-gray-500">
                      {100 - (editProduct.description?.length || 0)} / 100
                    </span>
                  </div>
                  <textarea
                    name="description"
                    value={editProduct.description || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isSaving}
                    rows={4}
                    maxLength={100}
                  />

                </div>
                <ChipInput
                  label="Tags"
                  values={editProduct.tags || []}
                  setValues={vals => setEditProduct({ ...editProduct, tags: vals })}
                  disabled={isSaving}
                  maxTags={10}
                  placeholder="Add tag and press Enter or comma"
                />
                <ChipInput
                  label="Highlights"
                  values={editProduct.highlights || []}
                  setValues={vals => setEditProduct({ ...editProduct, highlights: vals })}
                  disabled={isSaving}
                  maxTags={3}
                  placeholder="Add highlight and press Enter or comma"
                />
                <ChipInput
                  label="Search Keywords"
                  values={editProduct.searchKeywords || []}
                  setValues={vals => setEditProduct({ ...editProduct, searchKeywords: vals })}
                  disabled={isSaving}
                  maxTags={10}
                  placeholder="Add keyword and press Enter or comma"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6 sticky bottom-0 bg-white py-3 border-t">
          <button
            onClick={closeEditModal}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300  text-gray-800"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2  text-white ${isSaving ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2" size={16} />
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </div>
      </Modal>
    </div >
  );
}