import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MenuForm = ({ currentForm, setCurrentForm, errors, onImageUpload }) => {
  const { t } = useTranslation();
  const [imageSource, setImageSource] = useState('url'); // 'url' or 'file'
  const [imagePreview, setImagePreview] = useState(null);

  // Sync preview with currentForm.image ONLY when opening the form (not during typing)
  useEffect(() => {
    // Only sync if currentForm.image exists and doesn't start with data: (not base64)
    if (currentForm.image && !currentForm.image.startsWith('data:')) {
      setImagePreview(currentForm.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentForm._id]); // Only trigger when editing a different item

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create local preview for display only
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload file and get server path
      if (onImageUpload) {
        const imagePath = await onImageUpload(file);
        if (imagePath) {
          // IMPORTANT: Only set the server path, never the base64 data
          setCurrentForm({ ...currentForm, image: imagePath });
        }
      }
    }
  };

  const handleUrlChange = (url) => {
    // For URLs, both preview and form value are the same
    setCurrentForm({ ...currentForm, image: url });
    setImagePreview(url);
  };

  return (
    <>
      {/* Image Upload Section */}
      <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('menu.itemImage')}
        </label>

        {/* Image Source Selector */}
        <div className="flex gap-4 mb-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="url"
              checked={imageSource === 'url'}
              onChange={(e) => setImageSource(e.target.value)}
              className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
            />
            <span className="text-sm text-gray-700">{t('menu.imageURL')}</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="file"
              checked={imageSource === 'file'}
              onChange={(e) => setImageSource(e.target.value)}
              className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
            />
            <span className="text-sm text-gray-700">{t('menu.uploadFromDevice')}</span>
          </label>
        </div>

        {/* URL Input */}
        {imageSource === 'url' && (
          <input
            type="text"
            value={currentForm.image || ''}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full macos-input"
            placeholder="https://example.com/image.jpg"
          />
        )}

        {/* File Upload */}
        {imageSource === 'file' && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full macos-input"
          />
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">{t('menu.preview')}:</p>
            <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setCurrentForm({ ...currentForm, image: null });
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('menu.itemName')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={currentForm.itemName || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, itemName: e.target.value })}
          className={`macos-input w-full focus:outline-none focus:ring-2 ${
            errors.itemName ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder={t('menu.enterItemName')}
          required
        />
        {errors.itemName && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span> {errors.itemName}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('menu.itemCategory')} <span className="text-red-500">*</span>
          </label>
          <select
            value={currentForm.category || 'snacks'}
            onChange={(e) => setCurrentForm({ ...currentForm, category: e.target.value })}
            className={`macos-input w-full focus:outline-none focus:ring-2 ${
              errors.category ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
            }`}
            required
          >
            <option value="snacks">{t('menu.snacks')}</option>
            <option value="beverages">{t('menu.beverages')}</option>
            <option value="meals">{t('menu.meals')}</option>
            <option value="desserts">{t('menu.desserts')}</option>
            <option value="breakfast">{t('menu.breakfast')}</option>
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.category}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('menu.itemType')} <span className="text-red-500">*</span>
          </label>
          <select
            value={currentForm.itemType || 'homemade'}
            onChange={(e) => setCurrentForm({ ...currentForm, itemType: e.target.value })}
            className={`macos-input w-full focus:outline-none focus:ring-2 ${
              errors.itemType ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
            }`}
            required
          >
            <option value="homemade">{t('menu.homemade')}</option>
            <option value="packaged">{t('menu.packaged')}</option>
          </select>
          {errors.itemType && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.itemType}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('menu.itemPrice')} <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={currentForm.price || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, price: parseFloat(e.target.value) })}
          className={`macos-input w-full focus:outline-none focus:ring-2 ${
            errors.price ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="0.00"
          min="0.01"
          step="0.01"
          required
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <span>⚠️</span> {errors.price}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('menu.itemDescription')}
        </label>
        <textarea
          value={currentForm.description || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, description: e.target.value })}
          className="w-full macos-input"
          rows="3"
          placeholder={t('menu.enterDescription')}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('menu.allergens')}
        </label>
        <input
          type="text"
          value={currentForm.allergens || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, allergens: e.target.value })}
          className="w-full macos-input"
          placeholder={t('menu.allergenExample')}
        />
      </div>

      {/* Stock & Expiry - Optional for homemade, required for packaged */}
      <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            {currentForm.itemType === 'packaged' ? t('menu.stockExpiryRequired') : t('menu.stockExpiryOptional')}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('menu.stockQuantity')} {currentForm.itemType === 'packaged' && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              value={currentForm.stockQuantity || ''}
              onChange={(e) => setCurrentForm({ ...currentForm, stockQuantity: parseInt(e.target.value) || 0 })}
              className={`macos-input w-full focus:outline-none focus:ring-2 ${
                errors.stockQuantity ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
              }`}
              placeholder={currentForm.itemType === 'homemade' ? t('common.optional') : t('validation.required')}
              min="0"
            />
            {errors.stockQuantity && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.stockQuantity}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('menu.lowStockAlert')}
            </label>
            <input
              type="number"
              value={currentForm.lowStockThreshold || 10}
              onChange={(e) => setCurrentForm({ ...currentForm, lowStockThreshold: parseInt(e.target.value) || 10 })}
              className="w-full macos-input"
              placeholder="10"
              min="0"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('menu.expiryDate')} {currentForm.itemType === 'packaged' && <span className="text-red-500">*</span>}
          </label>
          <input
            type="date"
            value={currentForm.expiryDate ? new Date(currentForm.expiryDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setCurrentForm({ ...currentForm, expiryDate: e.target.value ? new Date(e.target.value) : null })}
            className={`macos-input w-full focus:outline-none focus:ring-2 ${
              errors.expiryDate ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
            }`}
          />
          {errors.expiryDate && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span> {errors.expiryDate}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {currentForm.itemType === 'homemade' ? t('menu.expiryOptional') : t('menu.expiryRequired')}
          </p>
        </div>
      </div>


      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={currentForm.available !== false}
            onChange={(e) => setCurrentForm({ ...currentForm, available: e.target.checked })}
            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
          />
          <span className="text-sm font-medium text-gray-700">{t('menu.available')}</span>
        </label>
      </div>
    </>
  );
};

export default MenuForm;
