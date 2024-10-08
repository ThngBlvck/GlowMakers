<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Chức năng tìm kiếm sản phẩm
    public function search(Request $request)
    {
        // Lấy từ khóa tìm kiếm từ request
        $query = $request->input('query');

        // Nếu không có từ khóa tìm kiếm, trả về lỗi
        if (!$query) {
            return response()->json([
                'success' => false,
                'message' => 'Vui lòng cung cấp từ khóa tìm kiếm.',
            ], 400);
        }

        // Tìm kiếm sản phẩm theo tên, nội dung hoặc các thuộc tính khác
        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('content', 'LIKE', "%{$query}%")
            ->orWhere('unit_price', 'LIKE', "%{$query}%")
            ->get();

        // Nếu không tìm thấy sản phẩm
        if ($products->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm nào phù hợp.',
            ], 404);
        }

        // Trả về danh sách sản phẩm phù hợp
        return response()->json([
            'success' => true,
            'products' => $products,
        ], 200);
    }
}
