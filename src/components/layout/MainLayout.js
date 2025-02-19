import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import AuthController from '../../controllers/AuthController';

const MainLayout = ({ children }) => {
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

      {/* Main Content */}
      <div className="main-content-area page-content">
        {children}
      </div>

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
  );
};

export default MainLayout; 