import React from 'react';

const SupplierForm = ({ currentForm, setCurrentForm, errors }) => {
  return (
    <>
      {/* Supplier Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier Name *
        </label>
        <input
          type="text"
          value={currentForm.supplierName || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, supplierName: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.supplierName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="Enter supplier name"
        />
        {errors.supplierName && <p className="text-red-500 text-xs mt-1">{errors.supplierName}</p>}
      </div>

      {/* Contact Person */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Person *
        </label>
        <input
          type="text"
          value={currentForm.contactPerson || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, contactPerson: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.contactPerson ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="Enter contact person name"
        />
        {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>}
      </div>

      {/* Email and Phone - Two columns */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={currentForm.email || ''}
            onChange={(e) => setCurrentForm({ ...currentForm, email: e.target.value.toLowerCase() })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
            }`}
            placeholder="supplier@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            value={currentForm.phone || ''}
            onChange={(e) => setCurrentForm({ ...currentForm, phone: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
            }`}
            placeholder="+1234567890"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <textarea
          value={currentForm.address || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, address: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="Enter complete address"
          rows="2"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      {/* Supplier Type and Status - Two columns */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Supplier Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Supplier Type *
          </label>
          <select
            value={currentForm.supplierType || ''}
            onChange={(e) => setCurrentForm({ ...currentForm, supplierType: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.supplierType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
            }`}
          >
            <option value="">Select type</option>
            <option value="food">Food</option>
            <option value="beverages">Beverages</option>
            <option value="raw-materials">Raw Materials</option>
            <option value="packaging">Packaging</option>
            <option value="equipment">Equipment</option>
            <option value="other">Other</option>
          </select>
          {errors.supplierType && <p className="text-red-500 text-xs mt-1">{errors.supplierType}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            value={currentForm.status || 'active'}
            onChange={(e) => setCurrentForm({ ...currentForm, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* GST Number and Payment Terms - Two columns */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* GST Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GST Number
          </label>
          <input
            type="text"
            value={currentForm.gstNumber || ''}
            onChange={(e) => setCurrentForm({ ...currentForm, gstNumber: e.target.value.toUpperCase() })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="GST123456"
          />
        </div>

        {/* Payment Terms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Terms
          </label>
          <select
            value={currentForm.paymentTerms || 'net-30'}
            onChange={(e) => setCurrentForm({ ...currentForm, paymentTerms: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="immediate">Immediate</option>
            <option value="net-7">Net 7 days</option>
            <option value="net-15">Net 15 days</option>
            <option value="net-30">Net 30 days</option>
            <option value="net-60">Net 60 days</option>
          </select>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating (1-5)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={currentForm.rating || 3}
            onChange={(e) => setCurrentForm({ ...currentForm, rating: parseFloat(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm font-semibold text-gray-700 bg-sky-100 px-3 py-1 rounded-lg min-w-[3rem] text-center">
            {currentForm.rating || 3} ⭐
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          value={currentForm.notes || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Additional notes about the supplier"
          rows="3"
        />
      </div>
    </>
  );
};

export default SupplierForm;
