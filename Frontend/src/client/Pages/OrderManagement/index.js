import React from "react";
import "../../../assets/styles/css/style.css";
import "../../../assets/styles/css/bootstrap.min.css";
import {NavLink} from "react-router-dom";

export default function OrderHistory() {
    const orders = [
        {
            id: 1,
            products: [
                { name: "Sản phẩm 1", quantity: 1, price: 100000 },
                { name: "Sản phẩm A", quantity: 1, price: 200000 },
            ],
            total: 300000,
            status: "Đang chờ xác nhận",
            paymentMethod: "Thanh toán khi nhận hàng"
        },
        {
            id: 2,
            products: [
                { name: "Sản phẩm A", quantity: 1, price: 600000 },
                { name: "Sản phẩm B", quantity: 1, price: 400000 },
            ],
            total: 1000000,
            status: "Đang chờ xác nhận",
            paymentMethod: "Thanh toán chuyển khoản"
        },
        {
            id: 3,
            products: [
                { name: "Sản phẩm D", quantity: 1, price: 200000 },
                { name: "Sản phẩm E", quantity: 1, price: 400000 },
            ],
            total: 600000,
            status: "Đang giao",
            paymentMethod: "Thanh toán chuyển khoản"
        },
        {
            id: 4,
            products: [
                { name: "Sản phẩm Abc", quantity: 1, price: 100000 },
                { name: "Sản phẩm Def", quantity: 1, price: 100000 },
            ],
            total: 200000,
            status: "Đang giao",
            paymentMethod: "Thanh toán khi nhận hàng"
        },
    ];

    // Hàm để xác định màu của status
    const getStatusStyle = (status) => {
        if (status === "Đang giao") {
            return { color: "#23bb44" }; // Màu xanh lá cây
        } else if (status === "Đang chờ xác nhận") {
            return { color: "#ff7e6b" }; // Màu cam
        }
        return {};
    };

    return (
        <div className="container mt-5">
            <p className="headingStyle font-semibold">Đơn đã mua</p>
            {orders.map((order) => (
                <div key={order.id} className="order-history-card mb-4 cardStyle">
                    <div className="headerStyle">
                        <div className="headerRowStyle">
                            <strong>ID đơn hàng: {order.id}</strong>
                            <strong>Trạng thái: <span className="statusStyle" style={getStatusStyle(order.status)}>{order.status}</span></strong>
                        </div>
                    </div>
                    <div className="bodyStyle">
                        {order.products.map((product, index) => (
                            <div key={index} className="product-item productRowStyle">
                                <div className="d-flex productDetailsStyle">
                                    <div className="imageContainerStyle">
                                        <NavLink to={`/products/:id`}>
                                            <img
                                                src="https://via.placeholder.com/100"
                                                alt={product.name}
                                                className="imageStyle"
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="product-info">
                                        <NavLink to={`/products/:id`}>
                                            <div className="product-name productNameStyle">
                                                {product.name}
                                            </div>
                                        </NavLink>

                                        <div className="product-quantity quantityStyle">
                                            x {product.quantity}
                                        </div>
                                    </div>
                                </div>
                                <div className="product-price text-right priceStyle">
                                    {product.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="footerStyle d-flex justify-content-between font-semibold">
                        <span>Phương thức thanh toán: <span
                            className="statusStyle">{order.paymentMethod}</span></span>
                        <div>
                            <span style={{marginRight: "10px"}}>Tổng tiền:</span>
                            <span className="totalAmountStyle">{order.total.toLocaleString()} VND</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}