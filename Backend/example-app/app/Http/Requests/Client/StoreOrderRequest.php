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
            'address' => 'required|string|max:255', // Địa chỉ là bắt buộc và tối đa 255 ký tự
            'status' => 'integer', // Trạng thái phải là số nguyên và bắt buộc
        ];
    }

    public function messages()
    {
        return [
            'address.required' => 'Địa chỉ là bắt buộc.',
            'address.string' => 'Địa chỉ phải là chuỗi ký tự.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'status.integer' => 'Trạng thái phải là một số nguyên hợp lệ.', // Thay đổi thành số nguyên
        ];
    }
}