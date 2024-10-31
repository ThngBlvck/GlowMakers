import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getOneProduct } from "../../../services/Product";
import { getOneBrand } from "../../../services/Brand";
import { getOneCategory } from "../../../services/Category";
import { addToCart } from "../../../services/Cart";
import { getCommentsByProductId, addComment, deleteComment } from "../../../services/Comment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [brandName, setBrandName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [cart, setCart] = useState({});
    const [userId, setUserId] = useState(null);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [newComment, setNewComment] = useState("");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        fetchOneProduct();
    }, [id]);

    const fetchOneProduct = async () => {
        setLoadingProduct(true);
        try {
            const result = await getOneProduct(id);
            setProduct(result);

            if (result.brand_id) {
                const brandResult = await getOneBrand(result.brand_id);
                setBrandName(brandResult.name);
            }

            if (result.category_id) {
                const categoryResult = await getOneCategory(result.category_id);
                setCategoryName(categoryResult.name);
            }

            const commentsResult = await getCommentsByProductId(id);
            setComments(commentsResult);
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error('Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại sau.');
        } finally {
            setLoadingProduct(false);
            setLoadingComments(false);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 99) {
            setCart(prevCart => ({
                ...prevCart,
                [product.id]: value
            }));
        }
    };

    const handleAddToCart = async (productId, quantity) => {
        console.log(`Adding to cart with data: {product_id: ${productId}, quantity: ${quantity}}`);
        try {
            const response = await addToCart(productId, quantity);
            console.log('Thêm vào giỏ hàng thành công:', response);
            Swal.fire('Thành công', 'Thêm vào giỏ hàng thành công.', 'success');
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };

    const handleBuyNow = async (productId, quantity) => {
        console.log(`Adding to cart with data: {product_id: ${productId}, quantity: ${quantity}}`);
        try {
            const response = await addToCart(productId, quantity);
            Swal.fire('Thành công', 'Thêm vào giỏ hàng thành công.', 'success');
            navigate(`/checkout?productId=${productId}`);
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
    };

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            toast.warn("Bình luận không thể để trống!");
            return;
        }

        if (!token) {
            toast.warn('Bạn cần đăng nhập để bình luận!');
            return;
        }

        const commentData = {
            product_id: id,
            user_id: userId,
            content: newComment,
        };

        try {
            await addComment(commentData);
            setNewComment("");
            toast.success('Bình luận đã được thêm thành công!');

            const commentsResult = await getCommentsByProductId(id);
            setComments(commentsResult);
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Không thể thêm bình luận.");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!token) {
            toast.warn('Bạn cần đăng nhập để xóa bình luận!');
            return;
        }

        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa bình luận này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
        });

        if (result.isConfirmed) {
            try {
                await deleteComment(commentId);
                toast.success('Bình luận đã được xóa thành công');

                const commentsResult = await getCommentsByProductId(id);
                setComments(commentsResult);
            } catch (error) {
                console.error("Error deleting comment:", error);
                toast.error('Bạn không thể xóa bình luận này.');
            }
        }
    };

    return (
        <div className="container my-5">
            <ToastContainer/>
            {loadingProduct ? (
                <div className="d-flex flex-column align-items-center"
                     style={{marginTop: '10rem', marginBottom: '10rem'}}>
                    <FontAwesomeIcon icon={faSpinner} spin style={{fontSize: '4rem', color: '#8c5e58'}}/>
                    <p className="mt-3" style={{color: '#8c5e58', fontSize: '18px'}}>Đang tải...</p>
                </div>
            ) : product ? (
                <div className="row">
                    <div className="col-md-9 d-flex justify-start">
                        <div className="row">
                            <div className="col-md-5">
                                <img src={product.image} alt="Product" className="img-fluid rounded"/>
                            </div>
                            <div className="col-md-7 d-flex flex-column align-content-start">
                                <p className="mb-3" style={{fontSize: "26px", color: "#8c5e58"}}>{product.name}</p>
                                <p className="mb-3" style={{color: "#8c5e58"}}>
                                    {product.unit_price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </p>
                                <p className="mb-3" style={{color: "#8c5e58"}}>{brandName}</p>
                                <p className="mb-3" style={{color: "#8c5e58"}}>{product.weight}</p>

                                <div className="mt-2 d-flex justify-content-start align-items-center mb-3">
                                    <span style={{color: "#8c5e58"}}>Số lượng:</span>
                                    <input
                                        type="number"
                                        value={cart[product.id] || 1}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        max="99"
                                        className="form-control mx-2 rounded"
                                        style={{width: "80px"}}
                                    />
                                </div>

                                <div className="d-flex justify-content-start">
                                    <button className="btn btn-primary mr-2 font-semibold"
                                            style={{padding: '16px', fontSize: '13px', color: '#442e2b'}}
                                            onClick={() => handleBuyNow(product.id, cart[product.id] || 1)}>
                                        <p><i className="fa fa-shopping-cart" aria-hidden="true"
                                              style={{marginRight: "6px"}}></i>Mua ngay</p>
                                    </button>
                                    <button className="btn btn-primary font-semibold"
                                            style={{fontSize: '13px'}}
                                            onClick={() => handleAddToCart(product.id, cart[product.id] || 1)}>
                                        <p><i className="fa fa-shopping-basket" aria-hidden="true"
                                              style={{marginRight: "6px"}}></i>Thêm vào giỏ</p>
                                    </button>
                                </div>
                            </div>

                            <div className="product-details" style={{marginTop: "2rem"}}>
                                <p style={{color: "#8c5e58", fontSize: "20px", marginBottom: "1rem"}}
                                   className="font-bold">Thông tin chi tiết sản phẩm:</p>
                                <ul>
                                    <li style={{color: "#8c5e58", marginBottom: "2px"}}><strong
                                        className="font-semibold">Tên sản phẩm:</strong> {product.name}</li>
                                    <li style={{color: "#8c5e58", marginBottom: "2px"}}><strong
                                        className="font-semibold">Tên thương hiệu:</strong> {brandName}</li>
                                    <li style={{color: "#8c5e58", marginBottom: "2px"}}><strong
                                        className="font-semibold">Tên danh mục:</strong> {categoryName}</li>
                                    <li style={{color: "#8c5e58", marginBottom: "2px"}}><strong
                                        className="font-semibold">Khối lượng:</strong> {product.weight}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <form onSubmit={handleSubmitComment}>
                            <div className="form-group">
                                <label htmlFor="newComment" style={{color: "#8c5e58"}}>Viết bình luận:</label>
                                <textarea
                                    className="form-control"
                                    id="newComment"
                                    value={newComment}
                                    onChange={handleNewCommentChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 font-semibold">Gửi bình luận</button>
                        </form>

                        {loadingComments ? (
                            <div className="d-flex flex-column align-items-center"
                                 style={{marginTop: '10rem', marginBottom: '10rem'}}>
                                <FontAwesomeIcon icon={faSpinner} spin style={{fontSize: '4rem', color: '#8c5e58'}}/>
                                <p className="mt-3" style={{color: '#8c5e58', fontSize: '18px'}}>Đang tải...</p>
                            </div>
                        ) : (
                            <div className="mt-5">
                                <h4 style={{color: "#8c5e58"}}>Bình luận</h4>
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="mb-3">
                                            <p><strong>{comment.user_name}</strong>:</p>
                                            <p>{comment.content}</p>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteComment(comment.id)}>
                                                    Xóa
                                                </button>

                                            <hr/>
                                        </div>
                                    ))
                                ) : (
                                    <p>Không có bình luận nào.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>Sản phẩm không tồn tại.</p>
            )}
        </div>
    );
};

export default ProductDetail;
