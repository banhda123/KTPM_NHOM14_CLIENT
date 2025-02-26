import axios from 'axios';

const API_URL = '/v1/products';

class ProductService {
  // Lấy sản phẩm theo category slug
  async getProductsByCategory(slug, params = {}) {
    try {
      const { page = 1, limit = 12, sort = 'newest' } = params;
      const response = await axios.get(`${API_URL}/category/${slug}`, {
        params: { page, limit, sort }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error.response?.data?.message || 'Không thể lấy danh sách sản phẩm';
    }
  }

  // Lấy sản phẩm theo subcategory slug
  async getProductsBySubCategory(slug, params = {}) {
    try {
      const { page = 1, limit = 12, sort = 'newest' } = params;
      const response = await axios.get(`${API_URL}/subcategory/${slug}`, {
        params: { page, limit, sort }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
      throw error.response?.data?.message || 'Không thể lấy danh sách sản phẩm';
    }
  }

  // Lấy chi tiết sản phẩm theo productId
  async getProductById(productId) {
    try {
      const response = await axios.get(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error.response?.data?.message || 'Không thể lấy thông tin sản phẩm';
    }
  }

  // Lấy danh sách sản phẩm với filter
  async getProducts(params = {}) {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error.response?.data?.message || 'Không thể lấy danh sách sản phẩm';
    }
  }
}

export default new ProductService();
