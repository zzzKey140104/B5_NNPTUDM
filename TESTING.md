# API Testing Guide - Postman

## Base URL
```
http://localhost:3000/api/v1
```

---

## 1. ROLE ENDPOINTS

### 1.1 Create Role
**Method:** POST  
**URL:** `http://localhost:3000/api/v1/roles`  
**Body (JSON):**
```json
{
  "name": "Admin",
  "description": "Administrator role with full permissions"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Role created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Admin",
    "description": "Administrator role with full permissions",
    "isDeleted": false,
    "createdAt": "2024-03-12T10:00:00.000Z",
    "updatedAt": "2024-03-12T10:00:00.000Z"
  }
}
```

---

### 1.2 Get All Roles
**Method:** GET  
**URL:** `http://localhost:3000/api/v1/roles`  
**Body:** None

**Expected Response:**
```json
{
  "success": true,
  "message": "Roles retrieved successfully",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Admin",
      "description": "Administrator role with full permissions",
      "isDeleted": false,
      "createdAt": "2024-03-12T10:00:00.000Z",
      "updatedAt": "2024-03-12T10:00:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "User",
      "description": "Regular user role",
      "isDeleted": false,
      "createdAt": "2024-03-12T10:01:00.000Z",
      "updatedAt": "2024-03-12T10:01:00.000Z"
    }
  ]
}
```

---

### 1.3 Get Role by ID
**Method:** GET  
**URL:** `http://localhost:3000/api/v1/roles/{roleId}`  
**Example:** `http://localhost:3000/api/v1/roles/65a1b2c3d4e5f6g7h8i9j0k1`  
**Body:** None

---

### 1.4 Update Role
**Method:** PUT  
**URL:** `http://localhost:3000/api/v1/roles/{roleId}`  
**Example:** `http://localhost:3000/api/v1/roles/65a1b2c3d4e5f6g7h8i9j0k1`  
**Body (JSON):**
```json
{
  "name": "Admin Updated",
  "description": "Updated admin description"
}
```

---

### 1.5 Delete Role (Soft Delete)
**Method:** DELETE  
**URL:** `http://localhost:3000/api/v1/roles/{roleId}`  
**Example:** `http://localhost:3000/api/v1/roles/65a1b2c3d4e5f6g7h8i9j0k1`  
**Body:** None

**Expected Response:**
```json
{
  "success": true,
  "message": "Role deleted successfully"
}
```

---

## 2. USER ENDPOINTS

### 2.1 Create User
**Method:** POST  
**URL:** `http://localhost:3000/api/v1/users`  
**Body (JSON):**
```json
{
  "username": "johndoe",
  "password": "Password123!",
  "email": "john.doe@example.com",
  "fullName": "John Doe",
  "role": "65a1b2c3d4e5f6g7h8i9j0k1"
}
```

**Note:** Replace `role` with actual Role ID from Role creation

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "username": "johndoe",
    "password": "Password123!",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "avatarUrl": "https://i.sstatic.net/l60Hf.png",
    "status": false,
    "role": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Admin",
      "description": "Administrator role with full permissions",
      "isDeleted": false,
      "createdAt": "2024-03-12T10:00:00.000Z",
      "updatedAt": "2024-03-12T10:00:00.000Z"
    },
    "loginCount": 0,
    "isDeleted": false,
    "createdAt": "2024-03-12T10:05:00.000Z",
    "updatedAt": "2024-03-12T10:05:00.000Z"
  }
}
```

---

### 2.2 Get All Users
**Method:** GET  
**URL:** `http://localhost:3000/api/v1/users`  
**Body:** None

---

### 2.3 Get User by ID
**Method:** GET  
**URL:** `http://localhost:3000/api/v1/users/{userId}`  
**Example:** `http://localhost:3000/api/v1/users/65a1b2c3d4e5f6g7h8i9j0k3`  
**Body:** None

---

### 2.4 Update User
**Method:** PUT  
**URL:** `http://localhost:3000/api/v1/users/{userId}`  
**Example:** `http://localhost:3000/api/v1/users/65a1b2c3d4e5f6g7h8i9j0k3`  
**Body (JSON):**
```json
{
  "fullName": "John Doe Updated",
  "email": "john.newemail@example.com"
}
```

---

### 2.5 Delete User (Soft Delete)
**Method:** DELETE  
**URL:** `http://localhost:3000/api/v1/users/{userId}`  
**Example:** `http://localhost:3000/api/v1/users/65a1b2c3d4e5f6g7h8i9j0k3`  
**Body:** None

---

### 2.6 Enable User (Set Status to True)
**Method:** POST  
**URL:** `http://localhost:3000/api/v1/users/enable`  
**Body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "username": "johndoe"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User enabled successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "status": true,
    ...
  }
}
```

---

### 2.7 Disable User (Set Status to False)
**Method:** POST  
**URL:** `http://localhost:3000/api/v1/users/disable`  
**Body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "username": "johndoe"
}
```

---

### 2.8 Get Users by Role ID
**Method:** GET  
**URL:** `http://localhost:3000/api/v1/users/role/{roleId}`  
**Example:** `http://localhost:3000/api/v1/users/role/65a1b2c3d4e5f6g7h8i9j0k1`  
**Body:** None

**Expected Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "username": "johndoe",
      "email": "john.doe@example.com",
      "fullName": "John Doe",
      "status": true,
      "role": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "Admin",
        ...
      },
      ...
    }
  ]
}
```

---

## STEP-BY-STEP TESTING FLOW

1. **Create a Role**
   - POST `/api/v1/roles` → Get role ID

2. **Create Users** (with that role ID)
   - POST `/api/v1/users` → Get user IDs

3. **Get All Users**
   - GET `/api/v1/users`

4. **Enable a User**
   - POST `/api/v1/users/enable`

5. **Get Users by Role**
   - GET `/api/v1/users/role/{roleId}`

6. **Update a User**
   - PUT `/api/v1/users/{userId}`

7. **Delete a User**
   - DELETE `/api/v1/users/{userId}`

---

## Headers Required
```
Content-Type: application/json
```

---

## Notes
- All responses include `success` and `message` fields
- Error responses include error details
- Soft delete sets `isDeleted: true` (data still exists in DB)
- User `status` field: `false` = disabled, `true` = enabled
- All timestamps are in ISO 8601 format
- Role and email are unique fields
- Password is stored without encryption (for demo - should hash in production)
