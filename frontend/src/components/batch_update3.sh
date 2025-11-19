#!/bin/bash
# Batch update script part 3 - Shared, Discount, Kitchen, Manager

FILES=$(find . -type f -name "*.jsx" \( -path "*/Shared/*" -o -path "*/Discount/*" -o -path "*/Kitchen/*" -o -path "*/Manager/*" \) ! -name "*.bak" ! -path "*/UserPages/*")

for file in $FILES; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Create backup if not exists
        if [ ! -f "$file.bak" ]; then
            cp "$file" "$file.bak"
        fi
        
        # Apply all styling replacements
        sed -i 's/className="bg-white rounded-xl border border-gray-200 shadow-sm/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl shadow-lg/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl shadow-2xl/className="macos-modal macos-animate/g' "$file"
        sed -i 's/className="bg-white rounded-xl/className="macos-card/g' "$file"
        sed -i 's/className="bg-white rounded-lg shadow/className="macos-card macos-animate/g' "$file"
        sed -i 's/className="bg-white p-6 rounded-xl/className="macos-card p-6/g' "$file"
        sed -i 's/className="bg-white p-4 rounded-xl/className="macos-card p-4/g' "$file"
        
        # Table styling
        sed -i 's/className="bg-gray-50 border-b border-gray-200/className="macos-table-header/g' "$file"
        sed -i 's/className="bg-gray-50"/className="macos-table-header"/g' "$file"
        sed -i 's/border-b hover:bg-gray-50/border-b macos-table-row/g' "$file"
        sed -i 's/hover:bg-gray-50 transition-colors/macos-table-row/g' "$file"
        sed -i 's/hover:bg-gray-50 transition/macos-table-row/g' "$file"
        
        # Status messages
        sed -i 's/className="bg-red-50 border border-red-200/className="macos-error/g' "$file"
        sed -i 's/className="bg-green-50 border border-green-200/className="macos-success/g' "$file"
        sed -i 's/className="bg-yellow-50 border border-yellow-200/className="macos-warning/g' "$file"
        
        # Buttons
        sed -i 's/bg-sky-500 text-white rounded-lg hover:bg-sky-600/macos-btn text-white/g' "$file"
        sed -i 's/bg-indigo-600 text-white rounded-lg hover:bg-indigo-700/macos-btn text-white/g' "$file"
        sed -i 's/bg-blue-600 text-white rounded-lg hover:bg-blue-700/macos-btn text-white/g' "$file"
        sed -i 's/bg-green-600 text-white rounded-lg hover:bg-green-700/macos-btn text-white/g' "$file"
        
        # Inputs
        sed -i 's/w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2/macos-input w-full/g' "$file"
        sed -i 's/w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2/macos-input w-full/g' "$file"
        sed -i 's/px-3 py-2 border border-gray-300 rounded-lg/macos-input/g' "$file"
        sed -i 's/px-4 py-2 border border-gray-300 rounded-lg/macos-input/g' "$file"
        
        # Filter bars
        sed -i 's/className="bg-white rounded-xl border border-gray-200 p-6 mb-6/className="macos-filter-bar mb-6 macos-animate/g' "$file"
        
        # Stats cards
        sed -i 's/bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-blue/g' "$file"
        sed -i 's/bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-green/g' "$file"
        sed -i 's/bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-purple/g' "$file"
        sed -i 's/bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg/macos-stat-card macos-gradient-orange/g' "$file"
        
        echo "Updated: $file"
    fi
done

echo "Batch update part 3 complete!"
