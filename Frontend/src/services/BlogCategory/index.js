import request from '../../api';

const URL_Search = 'admin/blogCategory/search';
export const getBlogCategory = () => {
    return request({
        method: 'GET',
        path: 'admin/blogcategory'
    });
};

export const getOneBlogCategory = (id) => {
    return request({
        method: 'GET',
        path: `admin/blogcategory/${id}`
    });
};

export const postBlogCategory = (data) => {
    return request({
        method: 'POST',
        path: 'admin/blogcategory',
        data
    });
};

export const updateBlogCategory = (id, data) => {
    return request({
        method: 'PUT',
        path: `admin/blogcategory/${id}`,
        data
    });
};

export const deleteBlogCategory = (id) => {
    return request({
        method: 'DELETE',
        path: `admin/blogcategory/${id}`
    });
};
// Hàm tìm kiếm danh mục bài viết
export const searchCateBlog = (query) => {
    return request({
        method: 'GET',
        path: `${URL_Search}?query=${query}`,
    });
};