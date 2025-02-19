import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Carousel, Dropdown } from 'react-bootstrap';
import './HomePage.css';
import AuthController from '../../controllers/AuthController';

const HomePage = () => {
  // State for categories from backend
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = AuthController.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthController.logout();
    setCurrentUser(null);
    navigate('/');
  };

  // Fetch categories from backend
  useEffect(() => {
    // This would be replaced with your actual API endpoint
    const fetchCategories = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/categories');
        // const data = await response.json();
        // setCategories(data);
        
        // Mock data for now
        setCategories([
          {
            id: 1,
            name: 'Bút viết',
            icon: 'fas fa-pen',
            slug: 'but-viet',
            subcategories: [
              { id: 11, name: 'Bút bi', slug: 'but-bi' },
              { id: 12, name: 'Bút gel', slug: 'but-gel' },
              { id: 13, name: 'Bút mực', slug: 'but-muc' }
            ]
          },
          {
            id: 2,
            name: 'Văn phòng phẩm',
            icon: 'fas fa-paperclip',
            slug: 'van-phong-pham',
            subcategories: [
              { id: 21, name: 'Kẹp giấy', slug: 'kep-giay' },
              { id: 22, name: 'Ghim bấm', slug: 'ghim-bam' },
              { id: 23, name: 'Cặp tài liệu', slug: 'cap-tai-lieu' }
            ]
          },
          {
            id: 3,
            name: 'Dụng Cụ Học Tập',
            icon: 'fas fa-ruler-combined',
            slug: 'dung-cu-hoc-tap',
            subcategories: [
              { id: 31, name: 'Thước kẻ', slug: 'thuoc-ke' },
              { id: 32, name: 'Compa', slug: 'compa' },
              { id: 33, name: 'Gôm tẩy', slug: 'gom-tay' }
            ]
          },
          {
            id: 4,
            name: 'Mỹ Thuật',
            icon: 'fas fa-paint-brush',
            slug: 'my-thuat',
            subcategories: [
              { id: 41, name: 'Màu vẽ', slug: 'mau-ve' },
              { id: 42, name: 'Bút vẽ', slug: 'but-ve' },
              { id: 43, name: 'Giấy vẽ', slug: 'giay-ve' }
            ]
          },
          {
            id: 5,
            name: 'Giấy In',
            icon: 'fas fa-copy',
            slug: 'giay-in',
            subcategories: [
              { id: 51, name: 'Giấy A4', slug: 'giay-a4' },
              { id: 52, name: 'Giấy photo', slug: 'giay-photo' },
              { id: 53, name: 'Giấy màu', slug: 'giay-mau' }
            ]
          },
          {
            id: 6,
            name: 'Bút cao cấp',
            icon: 'fas fa-pen-fancy',
            slug: 'but-cao-cap',
            subcategories: [
              { id: 61, name: 'Bút Parker', slug: 'but-parker' },
              { id: 62, name: 'Bút Montblanc', slug: 'but-montblanc' },
              { id: 63, name: 'Bút Waterman', slug: 'but-waterman' }
            ]
          },
          {
            id: 7,
            name: 'STEAM & DIY',
            icon: 'fas fa-tools',
            slug: 'steam-diy',
            subcategories: [
              { id: 71, name: 'Đồ chơi STEAM', slug: 'do-choi-steam' },
              { id: 72, name: 'Bộ thí nghiệm', slug: 'bo-thi-nghiem' },
              { id: 73, name: 'Robot học tập', slug: 'robot-hoc-tap' }
            ]
          },
          {
            id: 8,
            name: 'Sách',
            icon: 'fas fa-book',
            slug: 'sach',
            subcategories: [
              { id: 81, name: 'Sách giáo khoa', slug: 'sach-giao-khoa' },
              { id: 82, name: 'Truyện tranh', slug: 'truyen-tranh' },
              { id: 83, name: 'Sách tham khảo', slug: 'sach-tham-khao' }
            ]
          },
          {
            id: 9,
            name: 'Quà tặng - Lifestyle',
            icon: 'fas fa-gift',
            slug: 'qua-tang',
            subcategories: [
              { id: 91, name: 'Quà tặng văn phòng', slug: 'qua-tang-van-phong' },
              { id: 92, name: 'Đồ trang trí', slug: 'do-trang-tri' },
              { id: 93, name: 'Phụ kiện lifestyle', slug: 'phu-kien-lifestyle' }
            ]
          }
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="main-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={3} className="logo-container">
              <Link to="/">
                <h2 className="logo-text">N14 SHOP</h2>
              </Link>
            </Col>
            <Col md={5}>
              <Form className="search-form">
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="search-input"
                  />
                  <Button variant="primary" className="search-button">
                    <i className="fas fa-search"></i>
                  </Button>
                </div>
              </Form>
            </Col>
            <Col md={4} className="d-flex justify-content-end align-items-center">
              <div className="contact-info">
                <div className="phone-number">1900 866 819</div>
                <div className="support-text">Hỗ trợ khách hàng</div>
              </div>

              {currentUser ? (
                <div className="user-account">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-user" className="user-dropdown">
                      <div className="user-avatar">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="user-info">
                        <span>Hi, {currentUser.username}</span>
                        <small>Đăng xuất</small>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">Tài khoản của tôi</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/orders">Đơn hàng của tôi</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="login-btn">
                    <i className="fas fa-user"></i>
                    <span>Đăng nhập</span>
                  </Link>
                  <span className="separator">|</span>
                  <Link to="/register" className="register-btn">
                    Đăng ký
                  </Link>
                </div>
              )}

              <div className="cart-wrapper">
                <Link to="/cart" className="cart-icon">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-count">0</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <div className="page-wrapper">
        {/* Side Navigation Menu */}
        <aside className="side-navigation">
          <div className="category-navigation">
            {loading ? (
              <div className="p-3 text-center">Đang tải danh mục...</div>
            ) : (
              <ul className="category-list">
                {categories.map((category) => (
                  <li key={category.id} className="category-item">
                    <Link to={`/category/${category.slug}`} className="category-link">
                      <i className={category.icon}></i>
                      <span>{category.name}</span>
                    </Link>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="subcategory-menu">
                        <ul className="subcategory-list">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.id} className="subcategory-item">
                              <Link 
                                to={`/category/${category.slug}/${subcategory.slug}`} 
                                className="subcategory-link"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content Area with Footer */}
        <div className="main-content-wrapper">
          {/* Main Content */}
          <main className="main-content">
            <Container>
              {/* Banner Sliders */}
              <section className="banners-section">
                <Row>
                  <Col md={12} className="main-banner">
                    <div className="banner-slider">
                      <Carousel interval={3000} controls={true} indicators={true} fade={true}>
                        <Carousel.Item>
                          <div className="banner-slide">
                            <div className="banner-content">
                              <div className="left-content">
                                <div className="discount-badge">
                                  <div className="top-text">GIẤY IN</div>
                                  <div className="middle-text">VĂN PHÒNG</div>
                                  <div className="bottom-text">GIẢM SÂU QUÁ XỊN</div>
                                </div>
                              </div>
                              <div className="right-content">
                                <div className="product-image-placeholder">
                                  <h3>Giấy In Văn Phòng</h3>
                                  <p>Chất lượng cao, phù hợp cho mọi nhu cầu in ấn</p>
                                </div>
                              </div>
                            </div>
                            <div className="banner-btn">
                              <Button variant="danger" className="buy-now-btn">MUA NGAY</Button>
                            </div>
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="banner-slide" style={{backgroundColor: "#e0f7fa"}}>
                            <div className="banner-content">
                              <div className="left-content">
                                <div className="discount-badge" style={{backgroundColor: "#0097a7"}}>
                                  <div className="top-text">BÚT BI</div>
                                  <div className="middle-text">THIÊN LONG</div>
                                  <div className="bottom-text">MUA 3 TẶNG 1</div>
                                </div>
                              </div>
                              <div className="right-content">
                                <div className="product-image-placeholder">
                                  <h3>Bút Bi Thiên Long</h3>
                                  <p>Viết trơn, mực đẹp, sản phẩm chất lượng cao</p>
                                </div>
                              </div>
                            </div>
                            <div className="banner-btn">
                              <Button variant="danger" className="buy-now-btn">MUA NGAY</Button>
                            </div>
                          </div>
                        </Carousel.Item>
                        <Carousel.Item>
                          <div className="banner-slide" style={{backgroundColor: "#fff8e1"}}>
                            <div className="banner-content">
                              <div className="left-content">
                                <div className="discount-badge" style={{backgroundColor: "#ff8f00"}}>
                                  <div className="top-text">TẬP VỞ</div>
                                  <div className="middle-text">BACK TO SCHOOL</div>
                                  <div className="bottom-text">GIẢM ĐẾN 30%</div>
                                </div>
                              </div>
                              <div className="right-content">
                                <div className="product-image-placeholder">
                                  <h3>Tập Vở Học Sinh</h3>
                                  <p>Chất lượng cao, bìa bền đẹp, phù hợp mọi cấp học</p>
                                </div>
                              </div>
                            </div>
                            <div className="banner-btn">
                              <Button variant="danger" className="buy-now-btn">MUA NGAY</Button>
                            </div>
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    </div>
                  </Col>
                </Row>
              </section>

              {/* Icon Categories */}
              <section className="icon-categories">
                <Row className="justify-content-center">
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/category/cam-nang-uu-dai" className="icon-link">
                      <div className="icon-box">
                        <i className="fas fa-gift"></i>
                      </div>
                      <div className="icon-text">Cảm nang ưu đãi</div>
                    </Link>
                  </Col>
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/category/san-pham-moi" className="icon-link">
                      <div className="icon-box">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="icon-text">Sản phẩm mới</div>
                    </Link>
                  </Col>
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/category/outlet" className="icon-link">
                      <div className="icon-box">
                        <i className="fas fa-store"></i>
                      </div>
                      <div className="icon-text">Outlet chính hãng</div>
                    </Link>
                  </Col>
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/category/giai-phap-in-an" className="icon-link">
                      <div className="icon-box">
                        <i className="fas fa-print"></i>
                      </div>
                      <div className="icon-text">Giải pháp in ấn</div>
                    </Link>
                  </Col>
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/category/van-phong-pham-doanh-nghiep" className="icon-link">
                      <div className="icon-box">
                        <i className="fas fa-briefcase"></i>
                      </div>
                      <div className="icon-text">Văn phòng phẩm doanh nghiệp</div>
                    </Link>
                  </Col>
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/category/top-sale" className="icon-link">
                      <div className="icon-box top-sale-icon">
                        <i className="fas fa-crown"></i>
                      </div>
                      <div className="icon-text">Top sale</div>
                    </Link>
                  </Col>
                  <Col xs={6} sm={4} md={3} lg className="icon-category">
                    <Link to="/track-order" className="icon-link">
                      <div className="icon-box">
                        <i className="fas fa-truck"></i>
                      </div>
                      <div className="icon-text">Kiểm tra đơn hàng</div>
                    </Link>
                  </Col>
                </Row>
              </section>
            </Container>
          </main>

          {/* Footer */}
          <footer className="main-footer">
            <Container>
              <Row>
                <Col md={3}>
                  <h5 className="footer-title">Về chúng tôi</h5>
                  <p>N14 Shop - Cung cấp các sản phẩm văn phòng phẩm, dụng cụ học tập chất lượng cao.</p>
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-youtube"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-tiktok"></i></a>
                  </div>
                </Col>
                <Col md={3}>
                  <h5 className="footer-title">Thông tin liên hệ</h5>
                  <ul className="footer-links">
                    <li><i className="fas fa-map-marker-alt"></i> 123 Đường ABC, Quận XYZ, TP. HCM</li>
                    <li><i className="fas fa-phone"></i> 1900 866 819</li>
                    <li><i className="fas fa-envelope"></i> support@n14shop.com</li>
                  </ul>
                </Col>
                <Col md={3}>
                  <h5 className="footer-title">Chính sách</h5>
                  <ul className="footer-links">
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Chính sách vận chuyển</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>
                    <li><a href="#">Điều khoản dịch vụ</a></li>
                  </ul>
                </Col>
                <Col md={3}>
                  <h5 className="footer-title">Đăng ký nhận tin</h5>
                  <p>Nhận thông tin ưu đãi mới nhất từ N14 Shop.</p>
                  <Form className="subscribe-form">
                    <Form.Control type="email" placeholder="Email của bạn" className="mb-2" />
                    <Button variant="primary" type="submit" className="w-100">
                      Đăng ký
                    </Button>
                  </Form>
                </Col>
              </Row>
              <hr className="footer-divider" />
              <div className="footer-bottom">
                <p className="copyright">© 2023 N14 Shop. Tất cả quyền được bảo lưu.</p>
              </div>
            </Container>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 