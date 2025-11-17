Feature: Đăng nhập
  Scenario: Đăng nhập thành công với tài khoản đã đăng ký

  # 1. Mở trang Login trực tiếp
    Given driver 'http://localhost:3000/login'

  # 2. Chờ tiêu đề trang Login xuất hiện
    And waitFor("//h2[contains(text(), 'Login')]")

  # 3. Chờ các ô nhập liệu và điền thông tin theo ID (khớp Login.js)
    And waitFor('#username')
    And waitFor('#password')
    Then input('#username', 'karate_user1')
    And input('#password', 'password123')

  # 4. Click nút đăng nhập
    When click('#login-submit-btn')
    And dialog(true)

  # 5. Xác nhận chuyển hướng: chờ Dashboard render tiêu đề
    And retry(40, 500).waitFor("//h1[contains(text(), 'Overview Dashboard')]")
    And match text('h1') contains 'Overview Dashboard'