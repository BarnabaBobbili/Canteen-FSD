# PowerShell script to apply macOS styling to all component files

$files = @(
    "Menu\MenuManagement.jsx", "Menu\MenuTable.jsx", "Menu\MenuForm.jsx", "Menu\MenuAnalytics.jsx", "Menu\MenuAlertBanners.jsx",
    "Inventory\InventoryManagement.jsx", "Inventory\InventoryForm.jsx", "Inventory\InventoryAnalytics.jsx",
    "StaffManagement.jsx", "Staff\StaffForm.jsx", "Staff\StaffTable.jsx", "Staff\StaffHeader.jsx", "Staff\StaffAnalytics.jsx", "Staff\StaffLogin.jsx", "Staff\StaffSignup.jsx",
    "SupplierManagement.jsx", "Supplier\SupplierTable.jsx", "Supplier\SupplierHeader.jsx", "Supplier\SupplierStats.jsx",
    "Feedback\FeedbackManagement.jsx", "Feedback\FeedbackTable.jsx", "Feedback\FeedbackDetailModal.jsx", "Feedback\FeedbackFilters.jsx", "Feedback\FeedbackStats.jsx", "Feedback\FeedbackQualityMetrics.jsx",
    "Payments\PaymentManagement.jsx", "Payments\PaymentTable.jsx", "Payments\PaymentDetailModal.jsx", "Payments\PaymentFilters.jsx", "Payments\PaymentStats.jsx", "Payments\PaymentMethodBreakdown.jsx",
    "ActivityLog.jsx"
)

foreach ($file in $files) {
    $filePath = "D:\CanteenNew\frontend\src\components\$file"
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Common replacements
        $content = $content -replace 'className="bg-white rounded-xl border border-gray-200 shadow-sm', 'className="macos-card macos-animate'
        $content = $content -replace 'className="bg-white rounded-xl shadow-lg', 'className="macos-card macos-animate'
        $content = $content -replace 'className="bg-white rounded-xl', 'className="macos-card'
        $content = $content -replace 'className="bg-gray-50 border-b border-gray-200', 'className="macos-table-header'
        $content = $content -replace 'className="bg-gray-50', 'className="macos-table-header'
        $content = $content -replace 'hover:bg-gray-50 transition-colors', 'macos-table-row'
        $content = $content -replace 'className="bg-red-50 border border-red-200', 'className="macos-error'
        $content = $content -replace 'className="bg-green-50 border border-green-200', 'className="macos-success'
        
        Set-Content $filePath $content -NoNewline
        Write-Host "Updated: $file"
    }
}
