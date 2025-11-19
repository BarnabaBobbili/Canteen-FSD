#!/bin/bash
# Batch update script for macOS styling

FILES=(
    "Menu/MenuManagement.jsx"
    "Inventory/InventoryManagement.jsx"
    "Feedback/FeedbackDetailModal.jsx"
    "Feedback/FeedbackFilters.jsx"
    "Feedback/FeedbackQualityMetrics.jsx"
    "Feedback/FeedbackTable.jsx"
    "Payments/PaymentDetailModal.jsx"
    "Payments/PaymentFilters.jsx"
    "Payments/PaymentMethodBreakdown.jsx"
    "Payments/PaymentTable.jsx"
    "Staff/StaffForm.jsx"
    "Staff/StaffHeader.jsx"
    "Staff/StaffTable.jsx"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Backup
        cp "$file" "$file.bak"
        
        # Apply replacements
        sed -i 's/className="bg-white rounded-xl border border-gray-200 shadow-sm/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl shadow-lg/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl shadow-2xl/className="macos-modal macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl/className="macos-card/g' "$file"
        sed -i 's/className="bg-gray-50 border-b border-gray-200/className="macos-table-header/g' "$file"
        sed -i 's/className="bg-gray-50"/className="macos-table-header"/g' "$file"
        sed -i 's/border-b hover:bg-gray-50/border-b macos-table-row/g' "$file"
        sed -i 's/hover:bg-gray-50 transition/macos-table-row/g' "$file"
        sed -i 's/className="bg-red-50 border border-red-200/className="macos-error/g' "$file"
        sed -i 's/className="bg-green-50 border border-green-200/className="macos-success/g' "$file"
        sed -i 's/px-[0-9]+ py-[0-9]+ bg-sky-500 text-white rounded-lg hover:bg-sky-600/macos-btn/g' "$file"
        sed -i 's/bg-sky-500 text-white rounded-lg hover:bg-sky-600/macos-btn text-white/g' "$file"
        sed -i 's/bg-indigo-600 text-white rounded-lg hover:bg-indigo-700/macos-btn text-white/g' "$file"
        
        echo "Updated: $file"
    fi
done

echo "Batch update complete!"
