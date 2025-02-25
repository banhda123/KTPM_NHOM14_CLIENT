import React from 'react';
import './Detail.css'; // Import CSS file

const Detail = () => {
  // Placeholder data - Replace with actual data fetching later
  const product = {
    name: 'Bộ Lắp Ghép Mô Hình Kỹ Thuật (Dùng Chung Cho Lớp 4, Lớp 5)',
    brand: 'Thiết Bị Trường Học TP...',
    rating: 0,
    reviews: 0,
    price: 82800,
    originalPrice: 92000,
    discount: 10,
    stockStatus: 'Còn hàng',
    sku: '123456789',
    images: [
      '/placeholder-main.jpg', // Main image
      '/placeholder-thumb1.jpg',
      '/placeholder-thumb2.jpg',
      '/placeholder-thumb3.jpg',
      '/placeholder-thumb4.jpg',
    ],
    description: 'Mô tả chi tiết sản phẩm sẽ được hiển thị ở đây...',
    specifications: {
      'Tên danh mục': 'Bộ lắp ghép',
      'Thương hiệu': 'Thiên Long',
      'Phù hợp': 'Sử dụng cho học sinh lớp 4, 5',
      'Dung tích mực': 'N/A',
      'Chất liệu': 'Nhựa an toàn',
      'Tiêu chuẩn': 'TCCS 085:2015/TL-QMBM',
      'Xuất xứ': 'Việt Nam',
      'Sản xuất': 'Trong nước',
      'Khuyến cáo': 'Tránh nguồn nhiệt, hóa chất. Không thích hợp cho trẻ dưới 3 tuổi.',
    },
  };

  const relatedProducts = [
    { id: 1, name: 'Bìa lỗ A4 Flexoffice FO-CS03', price: '1,080đ', originalPrice: '1,200đ', discount: 10, image: '/related-placeholder1.jpg' },
    { id: 2, name: 'Bìa lỗ không viền A4 Flexoffice FO-CS02', price: '900đ', originalPrice: '1,000đ', discount: 10, image: '/related-placeholder2.jpg' },
    { id: 3, name: 'Bút Bi Thiên Long TL-027', price: '5,400đ', originalPrice: '6,000đ', discount: 10, rating: 4.5, reviews: 2269, image: '/related-placeholder3.jpg' },
    { id: 4, name: 'Bút Bi Flexoffice FO-03', price: '4,770đ', originalPrice: '5,300đ', discount: 10, image: '/related-placeholder4.jpg' },
    { id: 5, name: 'Bút Bi Thiên Long TL-079', price: '4,950đ', originalPrice: '5,500đ', discount: 10, image: '/related-placeholder5.jpg' },
  ];

  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(product.images[0]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="product-detail-container">
      {/* Breadcrumbs - Add later if needed */}
      {/* <div className="breadcrumbs">VĂN PHÒNG PHẨM > DỤNG CỤ HỌC SINH > BỘ DỤNG CỤ HỌC TẬP</div> */}

      <div className="product-main-section">
        {/* Image Gallery */}
        <div className="product-images">
          <div className="main-image">
            <img src={selectedImage} alt="Product Main" />
          </div>
          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product Thumbnail ${index + 1}`}
                className={selectedImage === img ? 'active' : ''}
                onClick={() => setSelectedImage(img)}
                // Add +4 overlay for the last visible thumbnail if needed
                style={index === 3 && product.images.length > 4 ? { position: 'relative' } : {}}
              />
              // Add logic here if more than 4 thumbnails to show '+4'
            ))}
             {product.images.length > 4 && (
                 <div className="thumbnail-more" onClick={() => {/* Handle showing more images */}}>+{product.images.length - 4}</div>
             )}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <span>Nhà cung cấp: <strong>Cty Sách & Thiết Bị Giáo Dục Miền Nam</strong></span>
            <span>Thương hiệu: <strong>{product.brand}</strong></span>
            <span>Xuất xứ: <strong>Việt Nam</strong></span>
          </div>
          <div className="product-rating">
            {/* Add star rating component here */}
            <span>({product.reviews} đánh giá)</span>
            <span>|</span>
            <span>Đã bán 1.0k</span> {/* Placeholder */}
          </div>
          <div className="product-price">
            <span className="current-price">{product.price.toLocaleString('vi-VN')}đ</span>
            {product.originalPrice && (
              <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
            )}
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>
          <div className="stock-status">{product.stockStatus}</div>

          {/* Shipping Info */}
          <div className="shipping-info">
            <h4>Thông tin vận chuyển</h4>
            <p>Giao hàng đến <strong>Phường Bến Nghé, Quận 1, Hồ Chí Minh</strong> <button className="change-location-btn">Thay đổi</button></p>
            <p><strong>Giao hàng tiêu chuẩn</strong></p>
            <p>Dự kiến giao <strong>Thứ ba - 29/04</strong></p> {/* Placeholder date */}
          </div>

           {/* Promotions */}
           <div className="promotions">
             <h4>Ưu đãi liên quan <button className="view-all-promo-btn">Xem thêm</button></h4>
             <div className="promo-tags">
               {/* Add promo tags dynamically */}
               <span className="promo-tag">Mã giảm 50k - to...</span>
               <span className="promo-tag">Mã giảm 100k - t...</span>
               <span className="promo-tag">Mã giảm 20k - h...</span>
               <span className="promo-tag">Home credit: Giả...</span>
             </div>
           </div>

          {/* Quantity and Actions */}
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Số lượng:</label>
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <input type="number" id="quantity" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <div className="action-buttons">
              <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
              <button className="buy-now-btn">Mua ngay</button>
            </div>
          </div>

          {/* Policy Info */}
          <div className="policy-info">
             {/* Add policy links/info here */}
             <p>Chính sách ưu đãi của Fahasa</p>
             <p>Thông tin giao hàng và uy tín</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <h2>Sản phẩm cùng loại</h2>
        <div className="related-products-grid">
          {relatedProducts.map(rp => (
            <div key={rp.id} className="related-product-card">
              <img src={rp.image} alt={rp.name} />
              <p className="rp-name">{rp.name}</p>
              <p className="rp-price">
                 <span className="rp-current-price">{rp.price}</span>
                 {rp.originalPrice && <span className="rp-original-price">{rp.originalPrice}</span>}
                 {rp.discount && <span className="rp-discount">-{rp.discount}%</span>}
              </p>
               {/* Add rating if available */}
              <button className="rp-view-btn">XEM NHANH</button>
               {rp.tag && <span className="rp-tag">{rp.tag}</span>} {/* E.g., "Chỉ giao khu vực miền Bắc" */}
            </div>
          ))}
        </div>
         {/* Add navigation arrows if it's a carousel */}
      </div>

      {/* Product Description and Specifications Section */}
      <div className="product-description-specs-section">
        <h2>Mô tả sản phẩm</h2>
        <div className="description-content">
            {/* Display product.description */}
             <p>{product.description}</p>
        </div>
        <h3>Thông số kĩ thuật</h3>
        <table className="specs-table">
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Reviews Section */}
      <div className="product-reviews-section">
        <h2>Đánh giá sản phẩm</h2>
        <div className="review-summary">
          <div className="average-rating">
            <span className="rating-value">0.0</span>
            {/* Stars Component */}
            <span className="review-count">(0 đánh giá)</span>
          </div>
          <div className="rating-distribution">
            {/* Display rating bars */}
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="rating-bar-row">
                 <span>{star} sao</span>
                 <div className="rating-bar-container"><div className="rating-bar" style={{width: '0%'}}></div></div>
                 <span>0</span>
              </div>
            ))}
          </div>
          <div className="write-review">
             <button className="write-review-btn">Viết đánh giá</button>
             {/* Add stars for user to click */}
          </div>
        </div>
        {/* Add list of individual reviews here */}
      </div>

      {/* Brands Section */}
      <div className="brands-section">
         {/* Add brand logos here, potentially in a carousel */}
         <img src="/brand-bizner.png" alt="Bizner"/>
         <img src="/brand-colokit.png" alt="Colokit"/>
         {/* ... other brands */}
      </div>

      {/* Footer Sections (Newsletter, Company Info, Payment, etc.) */}
      <div className="footer-sections">
          {/* Newsletter */}
          <div className="newsletter-signup">
              <h3>ĐĂNG KÝ NHẬN BẢN TIN</h3>
              <input type="email" placeholder="Nhập địa chỉ email"/>
              <button>Đăng ký</button>
          </div>
           {/* Certificates */}
          <div className="certificates">
              <h4>CHỨNG NHẬN</h4>
              <img src="/bo-cong-thuong.png" alt="Bộ Công Thương"/>
          </div>
           {/* Payment Methods */}
          <div className="payment-methods">
              <h4>PHƯƠNG THỨC THANH TOÁN</h4>
              {/* Add payment logos */}
              <img src="/visa.png" alt="Visa"/>
              <img src="/mastercard.png" alt="Mastercard"/>
              {/* ... other payment methods */}
          </div>
          {/* Company Info, Support, Links */}
          <div className="company-info-footer">
             <div className="footer-col">
                <img src="/thien-long-logo-footer.png" alt="Thiên Long"/>
                 <p>Công ty Cổ phần Tập đoàn Thiên Long</p>
                 {/* More address details */}
             </div>
              <div className="footer-col">
                  <h4>ĐỊA CHỈ CÔNG TY</h4>
                  {/* Address */}
              </div>
              <div className="footer-col">
                  <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                  <p>Hotline: 1900 888 819</p>
                  {/* More support links */}
              </div>
              <div className="footer-col">
                  <h4>VỀ THIÊN LONG.VN</h4>
                  {/* About links */}
              </div>
          </div>
      </div>

       {/* Footer bottom bar */}
       <div className="footer-bottom-bar">
          <span>Bằng việc click "Đồng ý", Bạn xác nhận đã đọc và hoàn toàn đồng ý với nội dung Chính sách Bảo Mật và Chính sách Bảo mật Thông tin Cá nhân của website Thienlong.vn</span>
          <button>Đồng ý</button>
       </div>

    </div>
  );
};

export default Detail;
