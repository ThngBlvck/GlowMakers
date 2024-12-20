<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cho phép tất cả người dùng thực hiện yêu cầu này
    }

    public function rules()
    {
        return [
            'cart_ids' => 'required|array',
            'address' => 'required|string|max:255', // Địa chỉ là bắt buộc và tối đa 255 ký tự
            'status' => 'integer', // Trạng thái phải là số nguyên và bắt buộc
            'payment_method' => 'nullable|max:50',
            'phone' => 'required|string|max:15',
            'order_id' => 'required|string|unique:orders,order_id',
        ];
    }

    public function messages()
    {
        return [
            'address.required' => 'Địa chỉ là bắt buộc.',
            'address.string' => 'Địa chỉ phải là chuỗi ký tự.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'status.integer' => 'Trạng thái phải là một số nguyên hợp lệ.',
            'payment_method.required' => 'Vui lòng chọn phương thức thanh toán.',
            'phone.required' => 'Vui lòng nhập số điện thoại.',
            'order_id.required' => 'Vui lòng nhập mã đơn hàng.',
            'order_id.unique' => 'Mã đơn hàng là duy nhất.',

        ];
    }
}
