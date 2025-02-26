import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import MainLayout from '../layout/MainLayout';
import { useCart } from '../../contexts/CartContext';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();
  
  // Use cart items from context
  const [orderItems, setOrderItems] = useState([]);
  
  // Load cart items when component mounts
  useEffect(() => {
    if (cartItems.length === 0) {
      // Redirect to cart if there are no items
      navigate('/cart');
    } else {
      // Add default weight property to cart items if not present
      setOrderItems(cartItems.map(item => ({
        ...item,
        weight: item.weight || 300 // default weight in grams if not specified
      })));
    }
  }, [cartItems, navigate]);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    notes: '',
    alternateAddress: false,
    paymentMethod: 'cod' // default to COD
  });

  // Promo code state
  const [promoCode, setPromoCode] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method
    });
  };

  // Handle promo code application
  const handleApplyPromoCode = () => {
    // Implement promo code logic here
    console.log('Applying promo code:', promoCode);
  };

  // Handle order submission
  const handleSubmitOrder = () => {
    // Implement order submission logic here
    console.log('Submitting order with data:', formData);
    console.log('Order items:', orderItems);
    
    try {
      // Validate form data
      if (!formData.fullName || !formData.phone || !formData.address || !formData.province || !formData.district || !formData.ward) {
        alert('Vui lòng điền đầy đủ thông tin giao hàng');
        return;
      }
      
      // In a real application, you would send this data to your backend
      // For now, just show an alert and clear the cart
      alert('Đặt hàng thành công!');
      
      // Clear the cart after successful order
      clearCart();
      
      // Navigate to homepage or order confirmation page
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    }
  };

  // Get subtotal from cart context
  const subtotal = getSubtotal();
  const shipping = 0; // Free shipping or calculate based on address and weight
  const total = subtotal + shipping;
  const totalWeight = orderItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);

  return (
    <MainLayout>
      <div className="payment-page">
        <Container>
          <div className="payment-header">
            <h1>Thanh toán</h1>
          </div>
          
          <Row>
            <Col md={8}>
              <div className="customer-info-section">
                <div className="section-header">
                  <h2><FaUser className="section-icon" /> Thông tin mua hàng</h2>
                  {!formData.email && (
                    <div className="login-prompt">
                      <span><FaUser /> Đăng nhập</span>
                    </div>
                  )}
                </div>
                
                <Form onSubmit={handleSubmitOrder}>
                  <Form.Group className="mb-3">
                    <Form.Control 
                      type="email" 
                      placeholder="Email (tùy chọn)" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Control 
                      type="text" 
                      placeholder="Họ và tên" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        <img src="/vietnam-flag.png" alt="Vietnam" className="country-flag" />
                      </InputGroup.Text>
                      <Form.Control 
                        type="tel" 
                        placeholder="Số điện thoại" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Control 
                      type="text" 
                      placeholder="Địa chỉ" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Select 
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Tỉnh/thành</option>
                          <option value="hanoi">Hà Nội</option>
                          <option value="hcm">TP. Hồ Chí Minh</option>
                          {/* Add more provinces */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Select 
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.province}
                        >
                          <option value="">Quận/huyện</option>
                          {/* Districts will be populated based on selected province */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Select 
                          name="ward"
                          value={formData.ward}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.district}
                        >
                          <option value="">Phường/xã</option>
                          {/* Wards will be populated based on selected district */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      id="alternate-address"
                      label="Giao hàng đến địa chỉ khác"
                      name="alternateAddress"
                      checked={formData.alternateAddress}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Ghi chú (tùy chọn)" 
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <div className="shipping-section">
                    <h3><FaMapMarkerAlt className="section-icon" /> Vận chuyển</h3>
                    <div className="shipping-option">
                      <div className="shipping-info">
                        <p>Vui lòng nhập thông tin giao hàng</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="payment-methods-section">
                    <h3><FaCreditCard className="section-icon" /> Thanh toán</h3>
                    
                    <div className={`payment-method-option ${formData.paymentMethod === 'vnpay' ? 'selected' : ''}`}>
                      <Form.Check 
                        type="radio"
                        id="payment-vnpay"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'vnpay'}
                        onChange={() => handlePaymentMethodChange('vnpay')}
                        label={
                          <div className="payment-method-label">
                            <span>Thanh toán qua VNPAY</span>
                            <img src="/vnpay-logo.png" alt="VNPAY" className="payment-logo" />
                          </div>
                        }
                      />
                    </div>
                    
                    <div className={`payment-method-option ${formData.paymentMethod === 'vnpay-qr' ? 'selected' : ''}`}>
                      <Form.Check 
                        type="radio"
                        id="payment-vnpay-qr"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'vnpay-qr'}
                        onChange={() => handlePaymentMethodChange('vnpay-qr')}
                        label={
                          <div className="payment-method-label">
                            <span>Thanh toán qua VNPAY-QR</span>
                            <img src="/vnpay-logo.png" alt="VNPAY-QR" className="payment-logo" />
                          </div>
                        }
                      />
                    </div>
                    
                    <div className={`payment-method-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <Form.Check 
                        type="radio"
                        id="payment-cod"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => handlePaymentMethodChange('cod')}
                        label={
                          <div className="payment-method-label">
                            <span>Thanh toán khi giao hàng (COD)</span>
                            <div className="payment-icon">
                              <FaMoneyBillWave size={20} color="#38a169" />
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="order-summary-section">
                <div className="order-header">
                  <h3>Đơn hàng ({orderItems.length} sản phẩm)</h3>
                </div>
                
                <div className="order-items">
                  {orderItems.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-image-container">
                        <div className="item-quantity-badge">{item.quantity}</div>
                        <img src={item.image} alt={item.name} className="item-image" />
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-price">{item.price.toLocaleString('vi-VN')}đ</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="promo-code-section">
                  <Form.Control 
                    type="text" 
                    placeholder="Nhập mã giảm giá" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button 
                    variant="success" 
                    className="apply-promo-btn"
                    onClick={handleApplyPromoCode}
                  >
                    Áp dụng
                  </Button>
                </div>
                
                <div className="order-summary-details">
                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>{shipping > 0 ? `${shipping.toLocaleString('vi-VN')}đ` : '-'}</span>
                  </div>
                  <div className="summary-row weight-row">
                    <span>Tổng khối lượng</span>
                    <span>{totalWeight}g</span>
                  </div>
                </div>
                
                <div className="order-total">
                  <div className="total-row">
                    <span>Tổng cộng</span>
                    <span className="total-amount">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <Link to="/cart" className="back-to-cart-btn">
                    <FaArrowLeft /> Quay về giỏ hàng
                  </Link>
                  <Button 
                    variant="success" 
                    className="place-order-btn"
                    onClick={handleSubmitOrder}
                  >
                    ĐẶT HÀNG
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Payment;