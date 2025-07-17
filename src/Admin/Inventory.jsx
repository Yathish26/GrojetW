import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Plus, Edit, Trash2, X } from 'lucide-react';

Modal.setAppElement('#root');

// Toast Notification Component
const ToastNotification = ({ message, type, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for fade-out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}
    >
      <div
        className={`${bgColor} text-white px-4 py-3  shadow-lg flex items-center min-w-[300px] max-w-md`}
      >
        {type === 'success' ? (
          <CheckCircle className="mr-2 flex-shrink-0" size={20} />
        ) : (
          <XCircle className="mr-2 flex-shrink-0" size={20} />
        )}
        <span className="flex-grow text-sm">{message}</span>
        <button onClick={() => { setIsVisible(false); onDismiss() }} className="ml-2">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={visible}
      onRequestClose={onCancel}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white  shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Action</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300  text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600  text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Input Component for Edit Modal
const EditInput = ({ label, name, value, onChange, type = 'text', disabled }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name} // ✅ ADD THIS LINE
        className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('admintoken');

  useEffect(() => {
    const token = localStorage.getItem('admintoken');
    if (!token) {
      localStorage.removeItem('admintoken');
      navigate('/admin/login');
    }
  }, [navigate]);

  // Memoized fetch function
  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError('Authentication token missing. Please log in again.');
      addNotification('Authentication token missing. Please log in again.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://192.168.1.35:5000/inventory/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch inventory.');
      }

      const data = await response.json();
      setInventory(data.inventory?.filter(Boolean) || []);
    } catch (err) {
      setError('Error fetching inventory: ' + err.message);
      addNotification('Error fetching inventory: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Notification handler
  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Delete handler
  const handleDelete = async () => {
    if (!itemIdToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`http://192.168.1.35:5000/inventory/delete/${itemIdToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete item.');
      }

      const data = await res.json();
      if (data.success) {
        addNotification('Item deleted successfully!', 'success');
        fetchInventory();
      }
    } catch (err) {
      addNotification('Error deleting item: ' + err.message, 'error');
    } finally {
      setLoading(false);
      setConfirmDeleteVisible(false);
      setItemIdToDelete(null);
    }
  };

  // Edit handlers
  const openEditModal = (item) => {
    setEditItem(item);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setEditItem(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editItem || !editItem._id) return;

    setIsSaving(true);
    try {
      const res = await fetch(`http://192.168.1.35:5000/inventory/edit/${editItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editItem,
          stockquantity: parseInt(editItem.stockquantity),
          price: parseFloat(editItem.price),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update item.');
      }

      const data = await res.json();
      if (data.success) {
        addNotification('Item updated successfully!', 'success');
        fetchInventory();
        closeEditModal();
      }
    } catch (err) {
      addNotification('Error updating item: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Notifications */}
      {notifications.map((notification) => (
        <ToastNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onDismiss={() => removeNotification(notification.id)}
        />
      ))}

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={confirmDeleteVisible}
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setItemIdToDelete(null);
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">Inventory Management</h1>
        <button
          onClick={() => navigate('/admin/add-inventory')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2  shadow flex items-center gap-2 self-end md:self-auto"
        >
          <Plus size={18} />
          <span>Add Inventory</span>
        </button>
      </div>

      {/* Loading/Error State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          <p className="ml-3 text-gray-600">Loading inventory...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200  p-4 text-red-600 text-center">
          {error}
        </div>
      )}

      {/* Inventory Table */}
      {!loading && !error && (
        <div className="bg-white  shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.itemName}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.stockquantity}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700 text-center">₹{item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-center space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setItemIdToDelete(item._id);
                            setConfirmDeleteVisible(true);
                          }}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No inventory items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        className="relative bg-white  p-6 shadow-xl max-w-md mx-auto my-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edit Item</h2>
          <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <EditInput
            label="Item Name"
            name="itemName"
            value={editItem?.itemName}
            onChange={handleEditChange}
            disabled={isSaving}
          />
          <EditInput
            label="Category"
            name="category"
            value={editItem?.category}
            onChange={handleEditChange}
            disabled={isSaving}
          />
          <EditInput
            label="Stock Quantity"
            name="stockquantity"
            value={editItem?.stockquantity}
            onChange={handleEditChange}
            type="number"
            disabled={isSaving}
          />
          <EditInput
            label="Price (₹)"
            name="price"
            value={editItem?.price}
            onChange={handleEditChange}
            type="number"
            disabled={isSaving}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
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
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>
    </div>
  );
}