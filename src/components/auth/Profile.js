import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthController.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    AuthController.logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <div>Đang tải thông tin...</div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h4" className="text-center">Thông tin cá nhân</Card.Header>
        <Card.Body>
          <div className="mb-3">
            <strong>Họ tên:</strong> {user.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-3">
            <strong>Vai trò:</strong> {user.isAdmin() ? 'Admin' : 'Người dùng'}
          </div>
          <div className="text-center mt-4">
            <Button 
              variant="danger" 
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile; 