# Quick Start Guide - User & Role API

## 1. Start Server
```bash
npm start
```
Expected output:
```
MongoDB Atlas connected
```

---

## 2. Import Postman Collection

1. Download **postman_collection.json** from project root
2. Open Postman
3. Click **Import** → Select the JSON file
4. Collection "E-Commerce API - Users & Roles" will be imported

---

## 3. Test Sequence

### Phase 1: Create Roles ✅

**Request 1:**
- **Method:** POST
- **URL:** http://localhost:3000/api/v1/roles
- **Body:**
```json
{
  "name": "Admin",
  "description": "Administrator role"
}
```
- **Copy the returned `_id` (e.g., `65a1b2c3...`) as `ADMIN_ROLE_ID`**

**Request 2:** Create "User" role
```json
{
  "name": "User",
  "description": "Regular user role"
}
```
- **Copy this `_id` as `USER_ROLE_ID`**

---

### Phase 2: Create Users ✅

**Request 3:**
- **Method:** POST  
- **URL:** http://localhost:3000/api/v1/users
- **Body:**
```json
{
  "username": "admin01",
  "password": "Admin@123",
  "email": "admin@company.com",
  "fullName": "Admin User",
  "role": "ADMIN_ROLE_ID"
}
```
- **Copy returned `_id` as `ADMIN_USER_ID`**

**Request 4:** Create regular user
```json
{
  "username": "user01",
  "password": "User@123",
  "email": "user@company.com",
  "fullName": "Regular User",
  "role": "USER_ROLE_ID"
}
```
- **Copy returned `_id` as `USER_USER_ID`**

---

### Phase 3: Test Status Management ✅

**Request 5: Enable User**
- **Method:** POST
- **URL:** http://localhost:3000/api/v1/users/enable
- **Body:**
```json
{
  "username": "user01",
  "email": "user@company.com"
}
```
- **Response:** status should be `true`

**Request 6: Disable User**
- **Method:** POST
- **URL:** http://localhost:3000/api/v1/users/disable
- **Body:**
```json
{
  "username": "admin01",
  "email": "admin@company.com"
}
```
- **Response:** status should be `false`

---

### Phase 4: Query Relationships ✅

**Request 7: Get Users by Role**
- **Method:** GET
- **URL:** http://localhost:3000/api/v1/users/role/USER_ROLE_ID
- **Response:** All users with that role

---

### Phase 5: CRUD Operations ✅

**Request 8: Get All Users**
- **Method:** GET
- **URL:** http://localhost:3000/api/v1/users
- **Response:** All users (non-deleted)

**Request 9: Update User**
- **Method:** PUT
- **URL:** http://localhost:3000/api/v1/users/USER_USER_ID
- **Body:**
```json
{
  "fullName": "Updated User Name",
  "email": "newemail@company.com"
}
```

**Request 10: Delete User**
- **Method:** DELETE
- **URL:** http://localhost:3000/api/v1/users/USER_USER_ID
- **Response:** Soft deleted (isDeleted=true)

**Request 11: Verify Deletion**
- **Method:** GET
- **URL:** http://localhost:3000/api/v1/users
- **Response:** User should NOT appear in list (isDeleted filtered out)

---

## 4. Key Response Samples

### Success: Create User
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "username": "user01",
    "email": "user@company.com",
    "fullName": "Regular User",
    "status": false,
    "loginCount": 0,
    "role": {
      "_id": "65a1b2c3...",
      "name": "User",
      "description": "Regular user role"
    },
    "createdAt": "2024-03-12T10:00:00.000Z"
  }
}
```

### Error: Duplicate Username
```json
{
  "success": false,
  "message": "Username or email already exists"
}
```

### Error: Role Not Found
```json
{
  "success": false,
  "message": "Role not found"
}
```

---

## 5. Environment Variables (.env)

Your `.env` file should have:
```
DB_USER=khanhhungbadong_db_user
DB_PASSWORD=123456abc
DB_NAME=ecommerce_db
DB_HOST=dbcloud.l33a8xq.mongodb.net
```

---

## 6. Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to connect to MongoDB" | Check `.env` file exists and credentials are correct |
| "Cannot find module" | Run `npm install` |
| Port 3000 already in use | Change PORT in `.env` or kill process using port 3000 |
| "Role not found" error | Use correct role ID from role creation response |
| User not found in list after creation | Check isDeleted=false filter; check email/username fields |

---

## 7. API Endpoints Summary

| Action | Method | URL |
|--------|--------|-----|
| Create Role | POST | `/api/v1/roles` |
| List Roles | GET | `/api/v1/roles` |
| Get Role | GET | `/api/v1/roles/:id` |
| Update Role | PUT | `/api/v1/roles/:id` |
| Delete Role | DELETE | `/api/v1/roles/:id` |
| Create User | POST | `/api/v1/users` |
| List Users | GET | `/api/v1/users` |
| Get User | GET | `/api/v1/users/:id` |
| Update User | PUT | `/api/v1/users/:id` |
| Delete User | DELETE | `/api/v1/users/:id` |
| Enable User | POST | `/api/v1/users/enable` |
| Disable User | POST | `/api/v1/users/disable` |
| Users by Role | GET | `/api/v1/users/role/:roleId` |

---

## 8. Testing Checklist

- [ ] Server starts without errors
- [ ] Can create roles
- [ ] Can create users with role assignment
- [ ] Can list all users and roles
- [ ] Can enable/disable users
- [ ] Can query users by role ID
- [ ] Can update user information
- [ ] Can soft delete (and verify not in list)
- [ ] Duplicate username/email rejected
- [ ] Invalid role ID rejected

---

Done! Your API is ready for testing. 🚀
