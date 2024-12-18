import request from '../../api';

const URL_Cart = 'admin/cart';
const URL_CartId = 'client/getAllCart';

export const addToCart = (productId, quantity) => {
    return request({
        method: 'POST',
        path: `${URL_Cart}`, // Sửa từ `path` thành `url`
        data: { // Sử dụng `data` thay vì `body`
            product_id: productId,
            quantity: quantity,
        },
    });
};

export const getCart = (query = '') => {
    return request({
        method: 'GET',
        path: `${URL_Cart}`,
    });
};

export const deleteCart = (id) => {
    return request({
        method: 'DELETE',
        path: `${URL_Cart}/${id}`
    });
};

export const updateCart = (id, quantity) => {
    return request({
        method: 'PUT',
        path: `${URL_Cart}/${id}`,
        data: { quantity }
    });
};
export const getCartsByIds = (ids) => {
    const idsParam = ids.join(','); // Nối các id thành một chuỗi, ngăn cách bằng dấu phẩy
    return request({
        method: 'GET',
        path: `${URL_CartId}/${idsParam}`, // Truyền chuỗi các id vào URL path
    });
};

