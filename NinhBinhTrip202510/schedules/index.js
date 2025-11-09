// ========================================================================
// SCHEDULE LIST - METADATA & REGISTRY
// ========================================================================
//
// File này chứa danh sách TẤT CẢ các schedules có sẵn trong hệ thống.
// Đây là "index" hoặc "registry" của tất cả các chuyến đi.
//
// 📋 Cấu trúc mỗi entry:
// {
//     key: string          - Schedule key (dùng trong URL param ?schedule=KEY)
//     name: string         - Tên hiển thị (optional, for future features)
//     scheduleData: object - Reference đến schedule data object
// }
//
// 🔄 CÁCH THÊM SCHEDULE MỚI:
// 
// BƯỚC 1: Tạo file data mới
//    - Tạo file: schedules/ten-chuyen-di-YYYYMM.js
//    - Copy structure từ file ninh-binh-202511.js
//    - Sửa data cho chuyến đi mới
//
// BƯỚC 2: Load file data trong v4.html
//    - Mở v4.html
//    - Thêm dòng: <script src="schedules/ten-chuyen-di-YYYYMM.js"></script>
//    - ⚠️ QUAN TRỌNG: Thêm TRƯỚC dòng <script src="schedules/index.js">
//
// BƯỚC 3: Thêm entry vào SCHEDULE_LIST bên dưới
//    - Thêm object mới vào array SCHEDULE_LIST
//    - key: Tên key cho URL
//    - name: Tên hiển thị
//    - scheduleData: Reference đến biến scheduleData_TenChuyenDi
//
// BƯỚC 4: Test
//    - Mở: http://localhost:8000/NinhBinhTrip202510/v4.html?schedule=KEY_MOI
//    - Kiểm tra timeline render OK
//
// 💡 VÍ DỤ:
// Thêm chuyến đi "Đà Lạt tháng 12/2025":
//
// 1. Tạo: schedules/da-lat-202512.js
//    const scheduleData_DaLat202512 = { ... };
//
// 2. Trong v4.html:
//    <script src="schedules/ninh-binh-202511.js"></script>
//    <script src="schedules/da-lat-202512.js"></script>  ← NEW
//    <script src="schedules/index.js"></script>
//
// 3. Thêm vào SCHEDULE_LIST:
//    {
//        key: "DaLat202512",
//        name: "Đà Lạt 2025",
//        scheduleData: scheduleData_DaLat202512
//    }
//
// ========================================================================

const SCHEDULE_LIST = [
    {
        key: "NinhBinh202511",
        scheduleData: scheduleData_NinhBinh202511
    },
    // Thêm schedules mới tại đây...
];