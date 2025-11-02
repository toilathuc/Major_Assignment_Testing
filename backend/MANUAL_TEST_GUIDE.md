# 🚀 HƯỚNG DẪN TEST THỦ CÔNG - AUTHENTICATION API

## 📋 CHUẨN BỊ

### Bước 1: Khởi động Spring Boot Application
```powershell
cd e:\Viscode\Pro_Testing\Employee-Management-Fullstack-App\backend
mvn spring-boot:run
```
**Chờ thấy:** `Started EmployeeManagementApplication in X seconds`

### Bước 2: Mở terminal mới để chạy test

---

## ✅ TEST 1: REGISTER - Đăng ký thành công

### PowerShell:
```powershell
$body = @{
    username = "testuser123"
    password = "Test@123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing

Write-Host "Status: $($response.StatusCode)"
Write-Host "Response: $($response.Content)"
```

### EXPECTED:
```
Status: 200
Response: User registered successfully!
```

---

## ✅ TEST 2: REGISTER - Duplicate username

### PowerShell:
```powershell
# Lần 1: Tạo user
$body = @{
    username = "duplicate_test"
    password = "Test@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing

# Lần 2: Thử tạo lại (sẽ lỗi 409)
try {
    Invoke-WebRequest -Uri "http://localhost:8080/register" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -UseBasicParsing
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response: $($reader.ReadToEnd())"
}
```

### EXPECTED:
```
Lần 1: Status 200 - User registered successfully!
Lần 2: Status 409 - Error: Username already exists
```

---

## ✅ TEST 3: LOGIN - Đăng nhập thành công

### PowerShell:
```powershell
# Bước 1: Tạo user
$registerBody = @{
    username = "logintest456"
    password = "Test@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json" `
    -UseBasicParsing

# Bước 2: Login
$loginBody = @{
    username = "logintest456"
    password = "Test@123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/authenticate" `
    -Method POST `
    -Body $loginBody `
    -ContentType "application/json"

Write-Host "Status: 200 (Success)"
Write-Host "Token: $($loginResponse.token)"
Write-Host "Token starts with 'eyJ': $($loginResponse.token.StartsWith('eyJ'))"
```

### EXPECTED:
```
Status: 200 (Success)
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Token starts with 'eyJ': True
```

---

## ❌ TEST 4: LOGIN - Sai password

### PowerShell:
```powershell
# Tạo user
$registerBody = @{
    username = "wrongpwd789"
    password = "CorrectPass@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json" `
    -UseBasicParsing

# Login với password SAI
$loginBody = @{
    username = "wrongpwd789"
    password = "WrongPassword"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:8080/authenticate" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json"
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response: $($reader.ReadToEnd())"
}
```

### EXPECTED:
```
Status: 401
Response: Error: Invalid username or password
```

---

## ❌ TEST 5: LOGIN - Username không tồn tại

### PowerShell:
```powershell
$loginBody = @{
    username = "nonexistent_user_999"
    password = "Test@123"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:8080/authenticate" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json"
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response: $($reader.ReadToEnd())"
}
```

### EXPECTED:
```
Status: 401
Response: Error: Invalid username or password
```

---

## 🔍 TEST 6: VERIFY USERNAME - User exists

### PowerShell:
```powershell
# Tạo user
$registerBody = @{
    username = "verifytest123"
    password = "Test@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json" `
    -UseBasicParsing

# Verify username
$response = Invoke-WebRequest -Uri "http://localhost:8080/verify-username/verifytest123" `
    -Method GET `
    -UseBasicParsing

Write-Host "Status: $($response.StatusCode)"
Write-Host "Response: $($response.Content)"
```

### EXPECTED:
```
Status: 200
Response: Username exists
```

---

## ❌ TEST 7: VERIFY USERNAME - User not found

### PowerShell:
```powershell
try {
    Invoke-WebRequest -Uri "http://localhost:8080/verify-username/nonexistent_999" `
        -Method GET `
        -UseBasicParsing
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response: $($reader.ReadToEnd())"
}
```

### EXPECTED:
```
Status: 404
Response: Error: Username not found
```

---

## 🔄 TEST 8: RESET PASSWORD - Thành công

### PowerShell:
```powershell
# Bước 1: Tạo user
$registerBody = @{
    username = "resetpwd123"
    password = "OldPass@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json" `
    -UseBasicParsing

# Bước 2: Reset password
$resetBody = @{
    username = "resetpwd123"
    newPassword = "NewPass@456"
} | ConvertTo-Json

$resetResponse = Invoke-WebRequest -Uri "http://localhost:8080/reset-password" `
    -Method POST `
    -Body $resetBody `
    -ContentType "application/json" `
    -UseBasicParsing

Write-Host "Reset Status: $($resetResponse.StatusCode)"
Write-Host "Reset Response: $($resetResponse.Content)"

# Bước 3: Login với password MỚI
$loginBody = @{
    username = "resetpwd123"
    password = "NewPass@456"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/authenticate" `
    -Method POST `
    -Body $loginBody `
    -ContentType "application/json"

Write-Host "Login Status: 200"
Write-Host "Token received: $($loginResponse.token -ne $null)"
```

### EXPECTED:
```
Reset Status: 200
Reset Response: Password reset successfully
Login Status: 200
Token received: True
```

---

## ❌ TEST 9: RESET PASSWORD - User không tồn tại

### PowerShell:
```powershell
$resetBody = @{
    username = "nonexistent_999"
    newPassword = "NewPass@123"
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri "http://localhost:8080/reset-password" `
        -Method POST `
        -Body $resetBody `
        -ContentType "application/json" `
        -UseBasicParsing
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)"
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Response: $($reader.ReadToEnd())"
}
```

### EXPECTED:
```
Status: 404
Response: Error: Username not found
```

---

## 🎯 TEST 10: TOKEN VALIDATION

### PowerShell:
```powershell
# Register và Login
$registerBody = @{
    username = "tokentest_$([DateTimeOffset]::Now.ToUnixTimeMilliseconds())"
    password = "Test@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/register" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json" `
    -UseBasicParsing

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/authenticate" `
    -Method POST `
    -Body $registerBody `
    -ContentType "application/json"

$token = $loginResponse.token
$parts = $token -split '\.'

Write-Host "========================================="
Write-Host "TOKEN FOR MANUAL TESTING:"
Write-Host "Token: $token"
Write-Host "Token parts count: $($parts.Length)"
Write-Host "Valid JWT format: $($parts.Length -eq 3)"
Write-Host "========================================="
```

### EXPECTED:
```
=========================================
TOKEN FOR MANUAL TESTING:
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Token parts count: 3
Valid JWT format: True
=========================================
```

---

## 📊 CHẠY TẤT CẢ TESTS

Copy toàn bộ script dưới đây và paste vào PowerShell:

```powershell
# Script chạy tất cả tests
Write-Host "========================================="
Write-Host "STARTING ALL AUTH TESTS"
Write-Host "========================================="
Write-Host ""

# TEST 1: Register Success
Write-Host "[TEST 1] Register Success..."
try {
    $body = @{ username = "test1_$(Get-Date -Format 'yyyyMMddHHmmss')"; password = "Test@123" } | ConvertTo-Json
    $r = Invoke-WebRequest -Uri "http://localhost:8080/register" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "✅ PASS - Status: $($r.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ FAIL - $_" -ForegroundColor Red
}
Write-Host ""

# TEST 2: Register Duplicate
Write-Host "[TEST 2] Register Duplicate..."
try {
    $body = @{ username = "duplicate_fixed"; password = "Test@123" } | ConvertTo-Json
    Invoke-WebRequest -Uri "http://localhost:8080/register" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction SilentlyContinue | Out-Null
    Invoke-WebRequest -Uri "http://localhost:8080/register" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "❌ FAIL - Should return 409" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 409) {
        Write-Host "✅ PASS - Status: 409" -ForegroundColor Green
    } else {
        Write-Host "❌ FAIL - Wrong status code" -ForegroundColor Red
    }
}
Write-Host ""

# TEST 3: Login Success
Write-Host "[TEST 3] Login Success..."
try {
    $user = "login_$(Get-Date -Format 'yyyyMMddHHmmss')"
    $body = @{ username = $user; password = "Test@123" } | ConvertTo-Json
    Invoke-WebRequest -Uri "http://localhost:8080/register" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing | Out-Null
    $r = Invoke-RestMethod -Uri "http://localhost:8080/authenticate" -Method POST -Body $body -ContentType "application/json"
    if ($r.token -and $r.token.StartsWith("eyJ")) {
        Write-Host "✅ PASS - Token received" -ForegroundColor Green
    } else {
        Write-Host "❌ FAIL - Invalid token" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ FAIL - $_" -ForegroundColor Red
}
Write-Host ""

# TEST 4: Login Wrong Password
Write-Host "[TEST 4] Login Wrong Password..."
try {
    $user = "wrongpwd_$(Get-Date -Format 'yyyyMMddHHmmss')"
    $body1 = @{ username = $user; password = "Correct@123" } | ConvertTo-Json
    $body2 = @{ username = $user; password = "Wrong@123" } | ConvertTo-Json
    Invoke-WebRequest -Uri "http://localhost:8080/register" -Method POST -Body $body1 -ContentType "application/json" -UseBasicParsing | Out-Null
    Invoke-RestMethod -Uri "http://localhost:8080/authenticate" -Method POST -Body $body2 -ContentType "application/json" -ErrorAction Stop
    Write-Host "❌ FAIL - Should return 401" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "✅ PASS - Status: 401" -ForegroundColor Green
    } else {
        Write-Host "❌ FAIL - Wrong status code" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "========================================="
Write-Host "TEST SUMMARY COMPLETE"
Write-Host "========================================="
```

---

## 📚 GHI CHÚ

- Thay `localhost:8080` nếu app chạy port khác
- Kiểm tra app đang chạy: `netstat -an | findstr :8080`
- Xem log app để debug: Check terminal chạy `mvn spring-boot:run`

