#!/bin/bash
# Batch update script part 2 - remaining files

find . -type f -name "*.jsx" \( -path "*/Menu/*" -o -path "*/Inventory/*" -o -path "*/Staff/*" -o -path "*/Supplier/*" -o -path "*/Feedback/*" -o -path "*/Payments/*" -o -name "ActivityLog.jsx" -o -name "StaffManagement.jsx" -o -name "SupplierManagement.jsx" \) ! -name "*.bak" | while read file; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Create backup if not exists
        if [ ! -f "$file.bak" ]; then
            cp "$file" "$file.bak"
        fi
        
        # More comprehensive replacements
        sed -i 's/className="bg-white rounded-lg border border-gray-300 shadow-sm/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-lg shadow/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white p-6 rounded-xl shadow/className="macos-card p-6 macos-animate/g' "$file"
        sed -i 's/className="bg-white p-4 rounded-xl shadow/className="macos-card p-4 macos-animate/g' "$file"
        
        # Button replacements
        sed -i 's/bg-blue-600 text-white rounded-lg hover:bg-blue-700/macos-btn text-white/g' "$file"
        sed -i 's/bg-green-600 text-white rounded-lg hover:bg-green-700/macos-btn text-white/g' "$file"
        sed -i 's/bg-purple-600 text-white rounded-lg hover:bg-purple-700/macos-btn text-white/g' "$file"
        
        # Input field replacements
        sed -i 's/px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[a-z-]*-[0-9]*/macos-input/g' "$file"
        sed -i 's/w-full px-4 py-2 border rounded-lg focus:ring-2/macos-input w-full/g' "$file"
        sed -i 's/w-full px-3 py-2 border rounded-lg/macos-input w-full/g' "$file"
        
        # Table improvements
        sed -i 's/hover:bg-blue-50 transition/macos-table-row/g' "$file"
        sed -i 's/hover:bg-indigo-50 transition/macos-table-row/g' "$file"
        
        # Filter bars
        sed -i 's/className="bg-white rounded-xl border border-gray-200 p-6 mb-6/className="macos-filter-bar mb-6 macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl p-6 mb-6 shadow/className="macos-filter-bar mb-6 macos-animate/g' "$file"
        
        # Stats cards with gradients
        sed -i 's/bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-blue/g' "$file"
        sed -i 's/bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-green/g' "$file"
        sed -i 's/bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-purple/g' "$file"
        sed -i 's/bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-orange/g' "$file"
        sed -i 's/bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-red/g' "$file"
        
        echo "Updated: $file"
    fi
done

echo "Batch update part 2 complete!"
