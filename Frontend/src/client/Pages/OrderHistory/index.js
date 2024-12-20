import React, {useEffect, useState} from "react";
import "../../../assets/styles/css/style.css";
import "../../../assets/styles/css/bootstrap.min.css";
import {NavLink} from "react-router-dom";
import {getOrder} from "../../../services/Order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"; // Giả sử bạn đã có API này
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await getOrder();  // Lấy danh sách đơn hàng
                console.log("Danh sách đơn hàng:", response);

                // Kiểm tra dữ liệu đơn hàng
                if (response.data && Array.isArray(response.data)) {
                    setOrders(response.data);  // Cập nhật state orders
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();  // Gọi fetchOrders khi component mount
    }, []);

    // Hàm để xác định màu của status
    const getStatusStyle = (status) => {
        if (status === 3) {
            return {color: "#32cd7d"}; // Màu cam
        } else if (status === 4) {
            return {color: "#cd3232"}; // Màu vàng
        }
        return {};
    };

    const toggleShowAll = (orderId) => {
        setShowAllProducts((prevState) => ({
            ...prevState,
            [orderId]: !prevState[orderId],
        }));
    };

    return (
        <div className="container mt-5">
            <p className="headingStyle font-semibold text-dGreen">Lịch sử đơn hàng</p>
            {loading ? (

                <div className="order-history-card mb-4 cardStyle shadow">
                    <div className="headerStyle">
                        <div className="headerRowStyle">
                            <Skeleton width={200} height={20}/>
                            <Skeleton width={150} height={20}/>
                        </div>
                    </div>
                    <div className="bodyStyle">
                        <Skeleton width={100} height={20}/>
                        <Skeleton width={200} height={100}/>
                        <Skeleton width={200} height={20}/>
                        <Skeleton width={150} height={20}/>
                    </div>
                    <div className="footerStyle font-semibold row">
                        <div className="col-4">
                            <Skeleton width={150} height={20}/>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            <Skeleton width={150} height={30}/>
                        </div>
                        <div className="col-4 text-right">
                            <Skeleton width={150} height={20}/>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {orders.length > 0 ? (
                        // Lọc đơn hàng có status là 3 hoặc 4
                        orders.filter(order => [3, 4].includes(order.status)).length > 0 ? (
                            orders.filter(order => [3, 4].includes(order.status)).map((order) => (

                                <div key={order.id} className="order-history-card mb-4 cardStyle shadow">
                                    <div className="headerStyle">
                                        <div className="headerRowStyle">
                                            <strong className="text-dGreen">Mã đơn hàng: {order.id}</strong>
                                            <strong className="text-dGreen">Trạng thái đơn hàng: <span
                                                className="statusStyle"
                                                style={getStatusStyle(order.status)}>
                                        {order.status === 3 ? 'Đã nhận'
                                            : order.status === 4 ? 'Đã hủy'
                                                : 'Không xác định'}
                                        </span>
                                            </strong>
                                        </div>
                                    </div>
                                    <div className="bodyStyle">
                                        {order.details && order.details.length > 0 ? (
                                            <>
                                                {order.details
                                                    .slice(0, showAllProducts[order.id] ? order.details.length : 2)
                                                    .map((detail) => (
                                                        <div key={detail.product.id}
                                                             className="product-item productRowStyle">
                                                            <div className="d-flex productDetailsStyle">
                                                                <div className="imageContainerStyle">
                                                                    <NavLink to={`/products/${detail.product.id}`}>
                                                                        <img
                                                                            src={detail.product.image || "https://via.placeholder.com/100"}
                                                                            alt={detail.product.name}
                                                                            className="imageStyle"
                                                                        />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="product-info">
                                                                    <NavLink to={`/products/${detail.product.id}`}>
                                                                        <div
                                                                            className="product-name productNameStyle text-dGreen">
                                                                            {detail.product.name}
                                                                        </div>
                                                                    </NavLink>
                                                                    <div
                                                                        className="product-quantity quantityStyle text-dGreen">
                                                                        x {detail.quantity}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-price text-right priceStyle">
                                                                {(detail.price * detail.quantity).toLocaleString("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                {order.details.length > 2 && (
                                                    <div className="toggle-view text-center mt-2">
                                                        <button onClick={() => toggleShowAll(order.id)}
                                                                className="btn-see-more fs-16 rounded">
                                                            {showAllProducts[order.id] ? (
                                                                <>
                                                                    Thu gọn <i
                                                                    className="fa-solid fa-arrows-up-to-line"></i>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Xem thêm <i
                                                                    className="fa-solid fa-arrows-down-to-line"></i>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <p className="font-semibold text-center text-dGreen fs-30"
                                               style={{marginTop: "30px"}}>Không
                                                có
                                                sản phẩm
                                                trong đơn hàng này.</p>
                                        )}
                                    </div>
                                    <div className="footerStyle font-semibold row">
                                        {/* Cột 1 */}
                                        <div className="col-4">
                                            <span className="statusStyle">
                                                {order.payment_method === 1 ? 'Thanh toán khi nhận hàng'
                                                    : order.payment_method === 2 ? 'Thanh toán chuyển khoản'
                                                        : 'Không xác định'}</span>
                                        </div>

                                        {/* Cột 2 */}
                                        <div className="col-4 d-flex align-items-center justify-content-center">
                                            <NavLink to={`/order/${order.id}`}>
                                                <button className="butn p-3 font-semibold fs-16 rounded shadow">
                                                    <p>Xem chi tiết</p>
                                                </button>
                                            </NavLink>
                                        </div>

                                        {/* Cột 3 */}
                                        <div className="col-4 text-right">
                                            <span className="text-dGreen"
                                                  style={{marginRight: "10px"}}>Tổng tiền:</span>
                                            <span className="totalAmountStyle">
                                                {order.total_amount.toLocaleString("vi-VN", {
                                                    style: "currency", currency: "VND",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <p className="text-center text-dGreen fs-20"
                               style={{
                                   marginTop: "30px",
                                   marginBottom: "30px"
                               }}>Chưa có đơn hàng nào.</p>
                        )
                    ) : (
                        <p className="text-center text-dGreen fs-20"
                           style={{marginTop: "30px", marginBottom: "30px"}}>Không
                            có đơn hàng nào.</p>
                    )}
                </>
            )}
        </div>
    );
}