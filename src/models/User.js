class User {
  constructor(id, name, username, email, token, role) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.token = token;
    this.role = role;
  }

  static fromJson(json) {
    // Check if the data contains a user property (từ cấu trúc server trả về)
    const userData = json.user || json;
    
    return new User(
      userData.id || userData._id,
      userData.name,
      userData.username,
      userData.email,
      json.token, // Token luôn nằm ở cấp cao nhất trong JSON
      userData.role
    );
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

export default User; 