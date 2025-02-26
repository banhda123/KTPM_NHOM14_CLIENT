import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
import ProductService from '../../services/ProductService';
import './SubCategoryProducts.css';

const SubCategoryProducts = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });
  const [sortOption, setSortOption] = useState('newest');

  // Fetch products when component mounts or parameters change
  useEffect(() => {
    fetchProducts();
  }, [slug, pagination.page, sortOption]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products for slug:', slug);
      
      // First try to get products by category
      try {
        console.log('Attempting to fetch by category...');
        const response = await ProductService.getProductsByCategory(slug, {
          page: pagination.page,
          limit: pagination.limit,
          sort: sortOption
        });

        console.log('Category API response:', response);
        if (response && response.success) {
          console.log('Category products found:', response.data.products);
          setProducts(response.data.products);
          setCategory(response.data.category);
          setPagination(response.data.pagination);
          return; // Exit if successful
        }
      } catch (categoryError) {
        console.log('Category not found, trying subcategory...', categoryError);
      }
      
      // If category not found, try subcategory
      console.log('Attempting to fetch by subcategory...');
      const subCategoryResponse = await ProductService.getProductsBySubCategory(slug, {
        page: pagination.page,
        limit: pagination.limit,
        sort: sortOption
      });

      console.log('Subcategory API response:', subCategoryResponse);
      if (subCategoryResponse && (subCategoryResponse.success || subCategoryResponse.statusCode === 200)) {
        console.log('Subcategory products found:', subCategoryResponse.data ? subCategoryResponse.data.products : subCategoryResponse.products);
        
        // Handle different response structures
        if (subCategoryResponse.data && subCategoryResponse.data.products) {
          setProducts(subCategoryResponse.data.products);
          setCategory(subCategoryResponse.data.subCategory);
          setPagination(subCategoryResponse.data.pagination);
        } else if (subCategoryResponse.products) {
          setProducts(subCategoryResponse.products);
          setCategory(subCategoryResponse.subCategory);
          setPagination(subCategoryResponse.pagination);
        }
      } else {
        console.log('No products found for either category or subcategory');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  // Format price with Vietnamese currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Render pagination
  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= pagination.pages; i++) {
      items.push(
        <Pagination.Item 
          key={i} 
          active={i === pagination.page}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev 
          disabled={pagination.page === 1}
          onClick={() => handlePageChange(pagination.page - 1)}
        />
        {items}
        <Pagination.Next 
          disabled={pagination.page === pagination.pages}
          onClick={() => handlePageChange(pagination.page + 1)}
        />
      </Pagination>
    );
  };

  return (
    <Container className="my-4">
      {/* Category Header */}
      <div className="category-header mb-4">
        <h2>{category?.name || 'Sản phẩm'}</h2>
        <p>{category?.description}</p>
      </div>

      {/* Filters and Sort */}
      <Row className="mb-4">
        <Col md={3}>
          <div className="filter-section">
            <h5>LOẠI SẢN PHẨM</h5>
            <Form>
              {['Bút dạ quang', 'Mực bút lông bảng - lông dầu', 'Mực - Ngòi bút máy', 'Bút lông bảng- lông dầu', 'Bút Bi'].map((type, index) => (
                <Form.Check 
                  key={index}
                  type="checkbox"
                  id={`type-${index}`}
                  label={type}
                />
              ))}
            </Form>
            <Button variant="link" className="show-more">Xem thêm</Button>

            <h5 className="mt-4">THƯƠNG HIỆU</h5>
            <Form>
              {['Thiên Long', 'Bizner', 'Colokit', 'Điểm 10'].map((brand, index) => (
                <Form.Check 
                  key={index}
                  type="checkbox"
                  id={`brand-${index}`}
                  label={brand}
                />
              ))}
            </Form>
            <Button variant="link" className="show-more">Xem thêm</Button>
          </div>
        </Col>

        <Col md={9}>
          <div className="sort-section d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Sắp xếp:</h5>
            <div className="d-flex">
              <Button variant="outline-secondary" className={sortOption === 'az' ? 'active' : ''} onClick={() => setSortOption('az')}>Tên A → Z</Button>
              <Button variant="outline-secondary" className={sortOption === 'za' ? 'active' : ''} onClick={() => setSortOption('za')}>Tên Z → A</Button>
              <Button variant="outline-secondary" className={sortOption === 'price-asc' ? 'active' : ''} onClick={() => setSortOption('price-asc')}>Giá tăng dần</Button>
              <Button variant="outline-secondary" className={sortOption === 'price-desc' ? 'active' : ''} onClick={() => setSortOption('price-desc')}>Giá giảm dần</Button>
              <Button variant="outline-secondary" className={sortOption === 'newest' ? 'active' : ''} onClick={() => setSortOption('newest')}>Hàng mới</Button>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-5">Đang tải sản phẩm...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">Không tìm thấy sản phẩm nào</div>
          ) : (
            <Row>
              {products.map((product) => {
                const discountedPrice = product.discount > 0 
                  ? calculateDiscountedPrice(product.price, product.discount) 
                  : null;
                
                return (
                  <Col key={product._id} md={4} className="mb-4">
                    <Card className="product-card h-100">
                      <Link to={`/product/${product.productId}`}>
                        <div className="product-image-container">
                          <Card.Img variant="top" src={product.image} className="product-image" />
                          {product.discount > 0 && (
                            <span className="discount-badge">-{product.discount}%</span>
                          )}
                        </div>
                      </Link>
                      <Card.Body className="d-flex flex-column">
                        <Link to={`/product/${product.productId}`} className="product-title-link">
                          <Card.Title className="product-title">{product.name}</Card.Title>
                        </Link>
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {discountedPrice ? (
                                <>
                                  <div className="discounted-price">{formatPrice(discountedPrice)}đ</div>
                                  <div className="original-price">{formatPrice(product.price)}đ</div>
                                </>
                              ) : (
                                <div className="product-price">{formatPrice(product.price)}đ</div>
                              )}
                            </div>
                            <Button variant="primary" className="view-product-btn">XEM NHANH</Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && renderPagination()}
        </Col>
      </Row>
    </Container>
  );
};

export default SubCategoryProducts;
