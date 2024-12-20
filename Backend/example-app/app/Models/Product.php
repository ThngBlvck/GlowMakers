<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'unit_price',
        'sale_price',
        'quantity',
        'purchase_count',
        'image',
        'content',
        'views',
        'status',
        'brand_id',
        'category_id',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getPrice()
    {
        return $this->sale_price ?? $this->unit_price;
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
