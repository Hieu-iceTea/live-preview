// ========================================================================
// SCHEDULE LIST - METADATA & REGISTRY
// ========================================================================
//
// File này chứa danh sách TẤT CẢ schedules có sẵn trong hệ thống.
// Đây là "index" hoặc "registry" của tất cả các chuyến đi (để app biết có những schedule nào).
//
// 📋 CẤU TRÚC MỖI ENTRY:
// {
//     key: string          - Schedule key (dùng trong URL param ?schedule=KEY)
//     filePath: string     - Đường dẫn file data (relative to schedules/)
// }
//
// ⚠️ LƯU Ý: File data sẽ được LOAD ĐỘNG khi cần, KHÔNG load static!
//
// 🔄 CÁCH THÊM SCHEDULE MỚI:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BƯỚC 1: Tạo file data mới
//    - Copy file template:
//      cp schedules/ninh-binh-202511.js schedules/da-lat-202512.js
//    
//    - Sửa nội dung trong file mới:
//      • tripInfo: title, subtitle, dates, defaultRegion, totalBudget
//      • schedule: Các ngày và hoạt động
//    
//    - ⚠️ QUAN TRỌNG: 
//      • Giữ nguyên tên biến: const scheduleData = { ... };
//      • KHÔNG thêm <script> tag vào file ".html"
//
// BƯỚC 2: Thêm entry vào SCHEDULE_LIST bên dưới
//    - Thêm object mới vào array:
//      {
//          key: "DaLat202512",              // ← Key dùng trong URL
//          filePath: "da-lat-202512.js"     // ← Tên file (relative path)
//      }
//    
//    - ⚠️ LƯU Ý về key:
//      • Nên dùng PascalCase (VD: DaLat202512, HaNoi202601)
//      • Unique, không trùng
//      • Nên bao gồm địa điểm + năm tháng
//
// BƯỚC 3: Test
//    - Mở URL: index.html?schedule=DaLat202512
//    - Kiểm tra:
//      ✓ Timeline render đúng
//      ✓ Console không có lỗi
//      ✓ Data hiển thị chính xác
//
// 💡 VÍ DỤ HOÀN CHỈNH:
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Thêm chuyến đi "Đà Lạt tháng 12/2025":
//
// 1. Tạo file: schedules/da-lat-202512.js
//    const scheduleData = {
//        tripInfo: {
//            title: "Đà Lạt trip 2025",
//            subtitle: "Chuyến đi của Hiếu | 3 Ngày 2 Đêm",
//            dates: "20-22/12/2025",
//            defaultRegion: "Đà Lạt",
//            totalBudget: undefined
//        },
//        schedule: [ /* ... */ ]
//    };
//
// 2. Update SCHEDULE_LIST trong file này:
//    const SCHEDULE_LIST = [
//        {
//            key: "NinhBinh202511",
//            filePath: "ninh-binh-202511.js"
//        },
//        {
//            key: "DaLat202512",           // ← NEW
//            filePath: "da-lat-202512.js"  // ← NEW
//        },
//    ];
//
// 3. Test: mở URL index.html?schedule=DaLat202512
//
// ========================================================================

const SCHEDULE_LIST = [
    {
        key: "NinhBinh202511",
        filePath: "ninh-binh-202511.js"
    },
    // Thêm schedules mới tại đây...
];