import React, { useState } from "react";
import "../../../assets/styles/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Checkout() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        paymentMethod: "creditCard",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Thông tin thanh toán:", formData);
    };

    const products = [
        {
            id: 1,
            name: "Sản phẩm 1",
            price: 100000,
            quantity: 2,
            image: "https://via.placeholder.com/100",
        },
        {
            id: 2,
            name: "Sản phẩm 2",
            price: 200000,
            quantity: 1,
            image: "https://via.placeholder.com/100",
        },
    ];

    const calculateTotal = () => {
        return products.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container py-5">
            <div className="row">
                {/* Hiển thị sản phẩm */}
                <div className="col-md-6">
                    <p className="mb-4 font-semibold" style={{color: "#8c5e58", fontSize: "30px"}}>Sản phẩm của bạn</p>
                    <div className="list-group">
                        {products.map(item => (
                            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src={item.image} alt={item.name} className="img-thumbnail me-3" style={{ width: "100px", height: "100px" }} />
                                    <div>
                                        <p style={{color: "#8c5e58"}}>{item.name}</p>
                                        <p className="mb-0" style={{color: "#8c5e58"}}>{item.price.toLocaleString("vi-VN")} VND x {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 font-semibold" style={{color: "#8c5e58"}}>Tổng: {calculateTotal().toLocaleString("vi-VN")} VND</p>
                </div>

                {/* Form thông tin người dùng */}
                <div className="col-md-6">
                    <p className="mb-4 font-semibold" style={{color: "#8c5e58", fontSize: "30px"}}>Thông tin thanh toán</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label font-semibold" style={{color: "#8c5e58"}}>Họ và Tên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-semibold" style={{color: "#8c5e58"}}>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-semibold" style={{color: "#8c5e58"}}>Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label font-semibold" style={{color: "#8c5e58"}}>Số điện thoại</label>
                            <input
                                type="number"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Phương thức thanh toán với icon */}
                        <div className="mb-4">
                            <label className="form-label font-semibold" style={{color: "#8c5e58"}}>Phương thức thanh toán</label>
                            <div className="d-flex">
                                <div className="form-check me-3">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="creditCard"
                                        checked={formData.paymentMethod === "creditCard"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" style={{color: "#8c5e58"}}>
                                        <i className="fas fa-credit-card fa-2x"></i> Thẻ tín dụng
                                    </label>
                                </div>

                                <div className="form-check me-3">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="momo"
                                        checked={formData.paymentMethod === "momo"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" style={{color: "#8c5e58"}}>
                                        <i className="fab fa-gg-circle fa-2x"></i> Momo
                                    </label>
                                </div>
                                <div className="form-check me-3">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="cashOnDelivery"
                                        checked={formData.paymentMethod === "cashOnDelivery"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" style={{color: "#8c5e58"}}>
                                        <i className="fas fa-money-bill fa-2x"></i> Thanh toán khi nhận hàng
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="vnPay"
                                        checked={formData.paymentMethod === "vnPay"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" style={{color: "#8c5e58"}}>
                                        <i className="fab fa-cc-visa fa-2x"></i> VNPay
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary font-bold text-center" style={{
                                padding: '14px',
                                fontSize: '13px',
                                color: '#442e2b'
                            }}>Xác nhận thanh toán
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
