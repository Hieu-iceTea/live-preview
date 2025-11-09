// ========================================================================
// === DỮ LIỆU LỊCH TRÌNH (scheduleData) ===
// ========================================================================
//
// File này chứa dữ liệu lịch trình của chuyến đi.
// Đây là biến chứa TOÀN BỘ dữ liệu cho chuyến đi.
// Dữ liệu này được tách biệt hoàn toàn khỏi HTML và logic code,
// giúp bạn dễ dàng chỉnh sửa lịch trình hoặc TẠO CHUYẾN ĐI MỚI
// chỉ bằng cách thay đổi nội dung của biến trong file này.
//
// ------------------------------------------------------------------------
// 📋 CẤU TRÚC DỮ LIỆU (Phiên bản rút gọn để xem tổng quan)
// ------------------------------------------------------------------------
// tripInfo: Thông tin chung
// schedule: Mảng các ngày
//   dayInfo: Thông tin ngày
//   timelineItems: Mảng các hoạt động
//     timeInfo: startTime (ISO), endTime (ISO)
//     title, summary, iconType
//     details: directions?, places?, budgets?, reason?
//
// ------------------------------------------------------------------------
// 📋 CẤU TRÚC DỮ LIỆU
// ------------------------------------------------------------------------
//
// {
//   "tripInfo": {                          // === THÔNG TIN CHUYẾN ĐI ===
//     "title": string,                     // Tiêu đề chuyến đi (hiển thị ở header và tab title)
//     "subtitle": string,                  // Phụ đề (ai đi, bao nhiêu ngày)
//     "dates": string,                     // Ngày tháng (dạng text tự do: "15-16/11/2025")
//     "defaultRegion": string,             // Vùng/tỉnh mặc định (dùng để tự động tạo Google Maps URL)
//     "totalBudget": number                // Tổng chi phí dự kiến (VNĐ, hiển thị ở subtitle)
//   },
//
//   "schedule": [                          // === DANH SÁCH CÁC NGÀY ===
//     {
//       "dayInfo": {                       // --- Thông tin ngày ---
//         "day": number,                   // Số thứ tự ngày (1, 2, 3, ...)
//         "date": string,                  // Ngày (format: "YYYY-MM-DD", vd: "2025-11-15")
//         "title": string,                 // Tiêu đề ngày (vd: "Ngày 1: Thứ 7, 15/11/2025")
//         "mapUrl": string                 // (Optional) Link Google Maps tổng quan cả ngày
//       },
//
//       "timelineItems": [                 // --- Danh sách hoạt động trong ngày ---
//         {
//           "timeInfo": {                  // • Thông tin thời gian
//             "startTime": string,         //   - Thời gian bắt đầu (ISO 8601: "YYYY-MM-DDTHH:MM:SS")
//             "endTime": string,           //   - Thời gian kết thúc (ISO 8601: "YYYY-MM-DDTHH:MM:SS")
//             "durationText": string       //   - (Optional, TỰ ĐỘNG TÍNH) Thời lượng (vd: "1 giờ 45 phút")
//           },
//
//           "title": string,               // • Tiêu đề hoạt động
//           "summary": string,             // • Tóm tắt ngắn gọn
//           "iconType": string,            // • Loại icon: time | logistics | boat | food | explore | hotel | nightlife | relax | default
//
//           "details": {                   // • Chi tiết (hiển thị khi mở rộng)
//             "directions": {              //   ◦ Thông tin di chuyển (optional)
//               "mapUrl": string,          //     - Link Google Maps Directions (nếu rỗng → tự động tạo từ places)
//               "steps": string[]          //     - Các bước di chuyển (mảng chuỗi)
//             },
//
//             "places": string | [        //   ◦ Địa điểm (có thể là string hoặc mảng object)
//               {
//                 "name": string,          //     - Tên địa điểm
//                 "description": string,   //     - Mô tả
//                 "mapUrl": string         //     - (Optional) Link Google Maps (nếu rỗng → tự động tạo)
//               }
//             ],
//
//             "budgets": [                 //   ◦ Chi phí (optional)
//               {
//                 "name": string,          //     - Tên khoản chi
//                 "amount": number,        //     - Số tiền (VNĐ)
//                 "category": string,      //     - (Optional) Loại: hotel | food | drink | transport | ticket | shopping | relax | other
//                 "note": string,          //     - (Optional) Ghi chú
//                 "isOptional": boolean    //     - (Optional) true = chi phí TÙY CHỌN (không tính vào tổng), false/undefined = tính vào tổng
//               }
//             ],
//
//             "reason": string             //   ◦ Lý do lựa chọn (optional)
//           }
//         }
//       ]
//     }
//   ]
// }
//
// ------------------------------------------------------------------------
// 🔄 CÁCH SỬ DỤNG & TÁI SỬ DỤNG
// ------------------------------------------------------------------------
//
// 1. TẠO CHUYẾN ĐI MỚI:
//
//    BƯỚC 1: Tạo file data mới
//    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//    - Copy file này thành file mới:
//      cp schedules/ninh-binh-202511.js schedules/da-lat-202512.js
//    
//    - Sửa nội dung data trong file mới:
//      • tripInfo: title, subtitle, dates, defaultRegion, totalBudget
//      • schedule: Các ngày và hoạt động trong lịch trình
//    
//    - ⚠️ QUAN TRỌNG: KHÔNG đổi tên biến!
//      • Giữ nguyên: const scheduleData = { ... };
//      • Lý do: File được load động, chỉ 1 file active tại 1 thời điểm
//    
//    - ⚠️ KHÔNG cần export hoặc thêm <script> tag vào HTML
//
//    BƯỚC 2: Update schedules/index.js
//    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//    - Mở file: schedules/index.js
//    - Thêm entry mới vào SCHEDULE_LIST:
//      {
//          key: "DaLat202512",              // Key dùng trong URL
//          filePath: "da-lat-202512.js"     // Tên file data
//      }
//    
//    - ⚠️ KHÔNG cần sửa file ".html", KHÔNG thêm <script> tag!
//
//    BƯỚC 3: Test
//    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//    - Mở trình duyệt với URL: ?schedule=DaLat202512
//    - Hoặc: file:///path/to/index.html?schedule=DaLat202512 (work với file://)
//    - Kiểm tra:
//      ✓ Timeline render đúng
//      ✓ Console không có lỗi
//      ✓ Thông tin chuyến đi hiển thị chính xác
//
// 2. CHỈNH SỬA LỊCH TRÌNH HIỆN TẠI:
//    - Tìm đến phần schedule → tìm ngày cần sửa → tìm item cần sửa
//    - Thay đổi các trường: title, summary, timeInfo, details, ...
//    - Refresh trình duyệt để xem kết quả
//
// 3. LƯU Ý QUAN TRỌNG:
//    ✓ Thời gian (startTime, endTime): Phải dùng định dạng ISO 8601
//      Ví dụ: "2025-11-15T08:30:00" (năm-tháng-ngày T giờ:phút:giây)
//
//    ✓ durationText: KHÔNG CẦN điền thủ công, hệ thống sẽ tự động tính
//      từ startTime và endTime. Ví dụ: 05:30 → 07:15 = "1 giờ 45 phút"
//
//    ✓ mapUrl: Có thể bỏ trống (empty string "") → hệ thống sẽ TỰ ĐỘNG tạo
//      Google Maps URL dựa trên tên địa điểm + defaultRegion
//
//    ✓ iconType: Chọn 1 trong các giá trị sau:
//      - time: đồng hồ (xuất phát, về, chuẩn bị)
//      - logistics: túi đồ (gửi đồ, check-in/out)
//      - boat: thuyền (đi thuyền, tour sông)
//      - food: đồ ăn (ăn sáng, trưa, tối)
//      - explore: bản đồ (tham quan, khám phá)
//      - hotel: giường (nhà nghỉ, khách sạn)
//      - nightlife: trăng sao (chơi đêm, phố đêm)
//      - relax: cafe (nghỉ ngơi, thư giãn)
//      - default: lịch (các hoạt động khác)
//
//    ✓ budgets.category: Chọn 1 trong các giá trị sau (để hiển thị emoji phù hợp):
//      hotel 🏠 | food 🍜 | drink ☕ | transport 🚕 | ticket 🎫 | shopping 🛍️ | relax 💆 | other 💰
//
//    ✓ budgets.isOptional:
//      - true: Chi phí TÙY CHỌN (không tính vào tổng tự động)
//        Ví dụ: "Nhà nghỉ theo giờ (Nếu chọn Option 2)" - có thể có hoặc không
//      - false hoặc undefined: Chi phí CƠ BẢN (tính vào tổng tự động)
//        Ví dụ: "Vé tham quan", "Ăn trưa" - chắc chắn phát sinh
//      - Sử dụng khi có nhiều lựa chọn cho cùng 1 mục, user có thể chọn hoặc không
//
// 4. TÍ MẸO:
//    - Dùng "Công cụ Giả lập thời gian" (ở header) để test lịch trình
//    - Chia sẻ link với tham số ?time=2025-11-15T09:30:00 để xem tại thời điểm cụ thể
//    - Nếu muốn ẩn 1 hoạt động tạm thời: Comment toàn bộ object {...} của item đó
//
// 5. CẤU TRÚC PROJECT (sau khi tách file):
//    NinhBinhTrip202510/
//    ├── v4.html                           ← App logic (main file)
//    └── schedules/                        ← Schedule data folder
//        ├── index.js                      ← Schedule list (metadata)
//        ├── ninh-binh-202511.js           ← Schedule data (file này)
//        └── da-lat-202512.js              ← Schedule data mới (future)
//
// ========================================================================
const scheduleData = {
    "tripInfo": {
        "title": "Ninh Bình trip 2025", // Đổi tiêu đề
        "subtitle": "Hiếu & Chi | 2 Ngày 1 Đêm",
        "dates": "15-16/11/2025",
        "defaultRegion": "Ninh Bình", // Vùng/tỉnh mặc định cho tìm kiếm bản đồ
        "totalBudget": undefined, // Tổng chi phí chuyến đi. (Tổng cho tất cả mọi người). Không điền để tính tự động. Điền để hiển thị số liệu tính toán bằng tay.
        "documentUrl": "https://docs.google.com/spreadsheets/d/1N9SNB6n3YJ2kndi1_ZtQd0aFdE9Ib-UudKnR86DUdbQ"
    },
    "security": {
        "secretCode": "MTQxMQ==",  // Base64 encoded password. Để encode: btoa("your-password"). Ví dụ: btoa("1234") = "MTIzNA=="
        "hint": "Ngày kỷ niệm của \"đôi ta\" là gì?"  // Gợi ý mật khẩu (optional)
    },
    "schedule": [
        // NGÀY 1
        {
            "dayInfo": {
                "day": 1,
                "date": "2025-11-15",
                "title": "Ngày 1: Thứ 7, 15/11 (Tam Cốc, Hoa Lư & Phố đêm)",
                "mapUrl": "https://google.com/maps"
            },
            "timelineItems": [
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T05:30:00",
                        "endTime": "2025-11-15T07:15:00"
                    },
                    "title": "Xuất phát từ Hà Nội & Nghỉ chân/Ăn sáng",
                    "summary": "Lái xe máy, di chuyển đến Trung tâm TP. Ninh Bình. Quãng đường ~90km, đi theo QL1A cũ. Thời gian di chuyển khoảng 1h45p - 2h. Có dừng nghỉ ngơi giữa đường.",
                    "iconType": "time", // 'time' sẽ gọi icon đồng hồ
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/2JXeXZgzNhsD1BXt9",
                            // "mapUrl": "https://maps.app.goo.gl/aqbqJeMUASt33Quj6",
                            // "mapUrl": "https://maps.app.goo.gl/nNN4n58kspyqrgpn9",
                            "steps": [
                                "Di chuyển từ Nhà nghỉ (Hà Nội) -> Trạm nghỉ (VD: Trà Sen Cụ Trưởng An) (~1h 15p).",
                                "Đến Trạm nghỉ, nghỉ ngơi, uống nước, vệ sinh cá nhân (~30p).",
                                "Có thể ăn sáng tự túc nếu muốn (bánh mỳ mang theo)",
                                "Di chuyển Trạm nghỉ -> TTTP Ninh Bình (~30-40 phút)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Nhà Nghỉ Osaka Hà Nội",
                                "description": "Điểm xuất phát.",
                                "mapUrl": "https://maps.app.goo.gl/LM5LRsurRzSausMDA"
                            },
                            {
                                "name": "Trà Sen Cụ Trưởng An",
                                "description": "Điểm dừng chân nghỉ ngơi, uống nước, vệ sinh cá nhân.",
                                "mapUrl": "https://google.com/maps/place/Trà+Sen+Cụ+Trưởng+An/data=!4m6!3m5!1s0x3135c92918e52ab3:0x96b8020e159c128d!8m2!3d20.638379!4d105.9186411!16s"
                            },
                            {
                                "name": "Cầu Đoan Vĩ",
                                "description": "Cầu bắc qua sông Đáy. Là ranh giới Hà Nam/Ninh Bình."
                            },
                            {
                                "name": "Lâu Đài Thành Thắng",
                                "description": "Lâu đài của người nhà giàu"
                            },
                            {
                                "name": "Cổng chào Ninh Bình",
                                "description": "Có thể checkin chụp ảnh ở đây."
                            },
                            {
                                "name": "Phố đi bộ Ninh Bình, Trung tâm TP. Ninh Bình",
                                "description": "Điểm đến (Phố đi bộ Ninh Bình)",
                                "mapUrl": "https://www.google.com/maps/search/Ph%E1%BB%91+%C4%91i+b%E1%BB%99+Ninh+B%C3%ACnh"
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Phòng nghỉ",
                                "amount": 350000,
                                "category": "hotel", // Phân loại. Các giá trị: hotel | food | drink | transport | ticket | shopping | relax | other
                                "note": "Ngủ qua đêm trước chuyến đi. Lựa chọn chỗ gần điểm đến hơn và tránh cụm tắc đường đi đến bến xe Nước Ngầm cuối tuần.",
                                "paidBy": "HiếuND"
                            },
                            {
                                "name": "Xăng xe lượt đi",
                                "amount": 60000,
                                "category": "transport",
                                "note": "Đầy bình xăng xe máy Khoảng 3 lít",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Cafe, trà",
                                "amount": 80000,
                                "category": "drink",
                                "note": "Dừng nghỉ ngơi giữa đường"
                            },
                            {
                                "name": "Ăn sáng",
                                "amount": 50000,
                                "category": "food",
                                "note": "Chi phí bánh mỳ/đồ ăn sáng mang theo chuẩn bị trước",
                                "paidBy": "HiếuND"
                            }
                        ],
                        "reason": "Xuất phát sớm để tránh tắc đường, tận dụng thời gian ban ngày. Nghỉ ngơi giữa đường và ăn sáng tự túc (đã chuẩn bị) để tiết kiệm thời gian."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T07:15:00",
                        "endTime": "2025-11-15T07:45:00"
                    },
                    "title": "Đến Ninh Bình checkin & Chuẩn bị",
                    "summary": "Chụp ảnh check-in nhanh tại Cổng chào/Phố đi bộ. Ăn sáng nhanh (bánh mỳ mang theo). Gửi đồ (tùy chọn))",
                    "iconType": "ticket",
                    "details": {
                        "directions": {
                            "steps": [
                                "Di chuyển trong TTTP & Phố đi bộ.",
                                "Di chuyển đến nhà nghỉ để gửi hành lý (tùy chọn)"
                            ]
                        },
                        "places": [
                            {
                                "name": "Cổng chào Ninh Bình",
                                "description": "Có thể checkin chụp ảnh ở đây (~10p)."
                            },
                            {
                                "name": "Phố đi bộ Ninh Bình",
                                "description": "Chụp ảnh check-in nhanh (~10p). Ăn nhanh bánh mỳ (nếu mang theo mà chưa ăn) (~10p)."
                            },
                            {
                                "name": "Nhà nghỉ (ở TTTP) để gửi đồ (tùy chọn)",
                                "description": "Đến nhà nghỉ (đã liên hệ trước) để gửi đồ (~10p). (tùy chọn)"
                            },
                            {
                                "name": "Quán ăn sáng TTTP (tùy chọn)",
                                "description": "Nếu chưa ăn sáng. Gợi ý Miến Lươn Bà Phấn hoặc quán khác gần đó. (~30p)",
                                "mapUrl": "https://www.google.com/maps/search/Ăn+sáng,+Ninh+Bình"
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Ăn sáng",
                                "amount": 80000,
                                "category": "food",
                                "note": "Miến Lươn Bà Phấn",
                                "isOptional": true
                            }
                        ],
                        "reason": "Dừng nhanh 30 phút để chụp ảnh checkin đầu tiên khi vừa đến Ninh Bình. Bạn mang đồ gọn gàng (để ở xe) và ăn sáng tự túc nên không cần ghé nhà nghỉ gửi đồ, tiết kiệm thời gian."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T07:45:00",
                        "endTime": "2025-11-15T11:30:00"
                    },
                    "title": "Tham quan Cụm Tam Cốc",
                    "summary": "Lái xe ra Tam Cốc (20p). Xếp hàng mua vé (15p). Đi thuyền (2 tiếng). Tham quan Chùa Bích Động (45p). (Option: Đền Thái Vi).",
                    "iconType": "boat",
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/w2HQMmjK7JRuwam87",
                            "steps": [
                                "Di chuyển TTTP -> Bến thuyền Tam Cốc (~7-8km, ~20 phút) (07:45 - 08:05).",
                                "Xếp hàng mua vé (08:05 - 08:20).",
                                "Đi thuyền Tam Cốc (08:20 - 10:20).",
                                "Di chuyển Bến thuyền Tam Cốc -> Chùa Bích Động (~2-3km, ~10 phút) (10:20 - 10:30).",
                                "Tham quan Chùa Bích Động (10:30 - 11:15).",
                                "(Option) Nếu còn sớm, di chuyển Bích Động -> Đền Thái Vi (~1.5km, 5p)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Bến thuyền Tam Cốc",
                                "description": "Ghi chú: Việc mua vé lẻ online Tam Cốc không rõ ràng (chủ yếu là tour), nên ưu tiên mua vé tại quầy (đã dự phòng 15p xếp hàng).",
                                "mapUrl": "https://maps.app.goo.gl/SnVxQrpecRXZKH5N6"
                            },
                            {
                                "name": "Tam Cốc - Bích Động",
                                "description": "Trải nghiệm đi thuyền 2 tiếng trên sông Ngô Đồng, xuyên 3 hang (Cả, Hai, Ba). Cảnh quan núi non hùng vĩ, được mệnh danh là \"Hạ Long trên cạn\".",
                                "mapUrl": "https://maps.app.goo.gl/9dJCr52N1C5QVopC8"
                            },
                            {
                                "name": "Chùa Bích Động",
                                "description": "\"Nam thiên đệ nhị động\". Chùa cổ dựa lưng vào núi, gồm 3 chùa (Hạ, Trung, Thượng). Cổng chùa là điểm check-in nổi tiếng, kinh điển. Leo nhẹ nhàng, miễn phí vé.",
                                "mapUrl": ""
                            },
                            {
                                "name": "Đền Thái Vi (Option)",
                                "description": "Nằm gần Tam Cốc, đền cổ, không gian rất yên tĩnh và đẹp, ít khách du lịch hơn. Miễn phí tham quan. (Nếu đi nhanh 2 điểm trên, có thể ghé qua).",
                                "mapUrl": "https://www.google.com/maps/search/Đền+Thái+Vi,+Ninh+Bình"
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Vé Tam Cốc",
                                "amount": 500000,
                                "category": "ticket",
                                "note": "250k/người x 2. Đã gồm vé thuyền & vé thắng cảnh. Đi thuyền dọc sông Ngô Đồng tham quan các địa điểm thắng cảnh nổi tiếng. Mỗi thuyền khoảng 6-8 người. Có thể ghép hoặc bao thuyền.",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Vé đi xe điện Tam Cốc",
                                "amount": 200000,
                                "category": "ticket",
                                "note": "100k/người x 2. Trung chuyển các điểm tham quan",
                                "isOptional": true
                            },
                            {
                                "name": "Gửi xe máy",
                                "amount": 10000,
                                "category": "transport",
                                "paidBy": "HiếuND"
                            },
                            {
                                "name": "Tip cho người chèo thuyền",
                                "amount": 50000,
                                "category": "other",
                                "note": "Tùy tâm (50k-100k/thuyền) nếu hài lòng",
                                "isOptional": true
                            }
                        ],
                        "reason": "Bắt đầu ngày mới bằng hoạt động thư giãn (đi thuyền). Đây là 2 điểm \"kinh điển\". Hai địa điểm này nằm cùng 1 cụm, rất tiện di chuyển. Đi sáng sớm vắng vẻ, trời mát."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T11:30:00",
                        "endTime": "2025-11-15T13:45:00"
                    },
                    "title": "Ăn trưa & Nghỉ ngơi tại Tam Cốc",
                    "summary": "Ăn trưa (45p) và nghỉ trưa (1.5 giờ) để hồi sức. Ưu tiên thuê nhà nghỉ theo giờ.",
                    "iconType": "food",
                    "details": {
                        "directions": {
                            "mapUrl": "",
                            "steps": [
                                "Di chuyển từ Chùa Bích Động/Đền Thái Vi về khu nhà hàng Tam Cốc (~5-10p).",
                                "Ăn trưa (11:40 - 12:25).",
                                "Nghỉ ngơi (12:25 - 13:45)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Nhà hàng Tam Cốc (Du lịch, Gần)",
                                "description": "Gợi ý: Nhà hàng Chính Thư (cũng có ở Tam Cốc, nổi tiếng).",
                                "mapUrl": "https://maps.app.goo.gl/f4d722wj9TXrpM5T6"
                            },
                            {
                                "name": "Nhà hàng (Địa phương, Gần)",
                                "description": "Gợi ý: Anh Dũng Restaurant (Gà đồi, Cá sông), Minh Tâm Restaurant (Cơm bình dân).",
                                "mapUrl": "https://maps.app.goo.gl/fYqAWtppdzPrfXwA9"
                            },
                            {
                                "name": "Lựa chọn 1: Nhà nghỉ theo giờ (Gần Tam Cốc)",
                                "description": "(Ưu tiên) Thuê nhà nghỉ theo giờ (1.5 tiếng) ngay tại khu Tam Cốc để ngủ trưa, hồi phục sức khỏe cho buổi chiều."
                            },
                            {
                                "name": "Lựa chọn 2: Quán cà phê Tam Cốc (Tùy chọn)",
                                "description": "Nghỉ ngơi 1 tiếng tại quán có view đẹp ra đồng lúa/núi non (nếu không muốn ngủ trưa)."
                            },
                        ],
                        "budgets": [
                            {
                                "name": "Ăn trưa (Dê theo món)",
                                "amount": 500000,
                                "category": "food",
                                "note": "2 người. Có thể ăn thường (Gà 150k, Cá 200k), hoặc ăn Dê núi nếu muốn, giá sẽ cao hơn.",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Nhà nghỉ theo giờ",
                                "amount": 150000,
                                "category": "hotel",
                                "note": "Ưu tiên nghỉ 1.5 giờ. Giúp lấy lại sức khỏe để chuẩn bị cho buổi chiều đi chơi đầy năng lượng"
                            },
                            {
                                "name": "Cà phê/Đồ uống",
                                "amount": 100000,
                                "category": "drink",
                                "note": "Nghỉ ngơi giờ trưa, chọn một quán cafe yên tình và có view đẹp để thư giãn và nghỉ ngơi",
                                "isOptional": true
                            }
                        ],
                        "reason": "Đây là yêu cầu của bạn. Ăn trưa và nghỉ ngơi ngay tại Tam Cốc rất tiện lợi trước khi di chuyển sang cụm Hoa Lư. Ưu tiên 1.5 giờ ngủ trưa tại nhà nghỉ theo giờ là lựa chọn tối ưu để hồi sức sau khi đi xe máy và tham quan buổi sáng. Cung cấp 2 lựa chọn (nghỉ tại chỗ hoặc thuê phòng gần đó)."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T13:45:00",
                        "endTime": "2025-11-15T17:20:00"
                    },
                    "title": "Tham quan Cụm Hoa Lư & Tuyệt Tịnh Cốc",
                    "summary": "Lái xe ra Hoa Lư (25p). Tham quan Cố đô Hoa Lư (1.5 tiếng). (Option: Chùa Nhất Trụ). Tham quan Tuyệt Tịnh Cốc (1.25 tiếng).",
                    "iconType": "explore",
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/ctgRVUdjpRcFn1Xv5",
                            "steps": [
                                "Di chuyển Tam Cốc -> Cố đô Hoa Lư (~10-12km, ~25 phút) (13:45 - 14:10).",
                                "Tham quan Cố đô (14:10 - 15:40).",
                                "(Option) Ghé Chùa Nhất Trụ (ngay cạnh).",
                                "Di chuyển Cố đô -> Tuyệt Tịnh Cốc (~400m, ~5 phút) (15:40 - 15:45).",
                                "Tham quan Tuyệt Tịnh Cốc (Động Am Tiên) (15:45 - 17:05)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Cố đô Hoa Lư",
                                "description": "Kinh đô xưa. Thăm đền Vua Đinh Tiên Hoàng, Vua Lê Đại Hành. Không khí cổ kính. Nên thuê hướng dẫn viên (~100k-200k) hoặc đọc trước lịch sử.",
                                "mapUrl": "https://maps.app.goo.gl/GwmWXKjFid2ztRat5"
                            },
                            {
                                "name": "Chùa Nhất Trụ (Option)",
                                "description": "Ngay cạnh Cố đô. Chùa cổ, nổi tiếng với Cột kinh Phật bằng đá độc đáo. Miễn phí.",
                                "mapUrl": "https://www.google.com/maps/search/Chùa+Nhất+Trụ,+Ninh+Bình"
                            },
                            {
                                "name": "Tuyệt Tịnh Cốc (Động Am Tiên)",
                                "description": "Hồ nước xanh ngọc bích (Ao Giải), vách núi đá vôi bao quanh. 'Động Am Tiên' là chùa/động bên trong, leo 205 bậc thang. Chùa nhỏ trong động phía trên. Cảnh đẹp \"sống ảo\".",
                                "mapUrl": "https://maps.app.goo.gl/FBxPaybsXtsCE5Xq9"
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Vé Cố đô Hoa Lư",
                                "amount": 40000,
                                "category": "ticket",
                                "note": "20k/người x 2. Vé vào cừa, có thể có hướng dẫn viên miễn phí nếu đi theo đoàn",
                                "paidBy": "HiếuND"
                            },
                            {
                                "name": "Vé đi thuyền tham quan Cố đô Hoa Lư",
                                "amount": 200000,
                                "category": "ticket",
                                "note": "100k/người x 2. Vé thuyền VIP (có mái) là 150k/người",
                                "isOptional": true
                            },
                            {
                                "name": "Vé Tuyệt Tịnh Cốc",
                                "amount": 100000,
                                "category": "ticket",
                                "note": "50k/người x 2"
                            },
                            {
                                "name": "Gửi xe máy",
                                "amount": 20000,
                                "category": "transport",
                                "note": "~10k/điểm x 2 điểm. Cố đô Hoa Lư & Tuyệt Tình Cốc",
                                "paidBy": "HiếuND"
                            }
                        ],
                        "reason": "Hai địa điểm này nằm ngay cạnh nhau, gộp thành 1 cụm tham quan buổi chiều là tối ưu nhất. Thời gian này nắng chiều cũng đẹp để chụp ảnh cho Tuyệt Tịnh Cốc."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T17:20:00",
                        "endTime": "2025-11-15T18:40:00"
                    },
                    "title": "Về TTTP ăn tối & Khám phá Ẩm thực",
                    "summary": "Di chuyển 20p từ Hoa Lư về TTTP. Ăn tối 1h tại Phố ẩm thực Cù Chính Lan (Phố 8). (Thêm 4 lựa chọn khác).",
                    "iconType": "food",
                    "details": {
                        "directions": {
                            "steps": [
                                "Di chuyển từ Hoa Lư về TTTP (~20 phút).",
                                "Ăn tối tại Phố 8 (~1 giờ)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Lựa chọn 1: Phố 8 (Cù Chính Lan)",
                                "description": "Khu ẩm thực đêm nổi tiếng nhất TTTP, tập trung nhiều quán lẩu, nướng, ốc, đặc sản địa phương. Rất sầm uất. Đông vui, nhiều lựa chọn.",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 2: Quán Dê núi",
                                "description": "Thử đặc sản dê núi (VD: Dê núi Đức Trọc, Quán Chính Thư...).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 3: Quán ăn địa phương",
                                "description": "Ăn các món dân dã, ngon (VD: Miến lươn Bà Phấn - ăn tối, Bún mọc...).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 4: Đặc sản khác (Vặt/Nhậu)",
                                "description": "Ốc núi luộc/xào (70-100k/đĩa), Gỏi cá nhệch (~300-400k/suất), Chân gà nướng Phố 8 (~15k/cái)."
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Ăn tối (Lẩu dê, hoặc dê nướng)",
                                "amount": 450000,
                                "category": "food",
                                "note": "Ước tính cho 2 người: Dê (150k/món), Lẩu (250-300k/nồi), Ốc núi (70-100k/đĩa).",
                                "paidBy": "HiếuND"
                            }
                        ],
                        "reason": "Yêu cầu của bạn, ăn lẩu/nướng trước khi tắm rửa sẽ hợp lý hơn. Đúng khung giờ ăn tối bạn muốn. Rất tiện vì ở ngay TTTP. Nhiều lựa chọn. Đúng chất \"khám phá ẩm thực\" (lẩu, nướng) địa phương hoặc món ăn no."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T18:40:00",
                        "endTime": "2025-11-15T20:25:00"
                    },
                    "title": "Mua sắm nhanh, Về nhận phòng, Tắm rửa & Thư giãn",
                    "summary": "Gội đầu thư giãn (30p), mua sắm nhanh (20p), về nhận phòng (10p), tắm rửa (45p).",
                    "iconType": "hotel",
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/8ZeLiTqWv1sEv1Te6",
                            "steps": [
                                "Di chuyển từ quán ăn -> Tiệm gội đầu thư giãn (~30-40 phút).",
                                "Mua sắm nhanh (tạp hóa/siêu thị) nếu cần (~20 phút).",
                                "Di chuyển về Nhà nghỉ TTTP, nhận phòng (~10 phút).",
                                "Tắm rửa, nghỉ ngơi, chuẩn bị đi chơi tối (~45 phút)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Tiệm Gội đầu thư giãn (TTTP)",
                                "description": "Gội đầu thư giãn sau khi ăn tối để nghỉ ngơi, tiêu hóa nhanh để còn ăn tiếp."
                            },
                            {
                                "name": "Siêu thị mini / Tạp hóa (TTTP)",
                                "description": "(Nếu cần) Mua nước uống, đồ ăn vặt, vật dụng cần thiết... mang về nhà nghỉ. Yêu cầu của bạn: Mua đồ trước khi về nhà nghỉ sẽ tiện lợi hơn là đi mua lúc đêm muộn."
                            },
                            {
                                "name": "Nhà nghỉ (TTTP)",
                                "description": "Nhận phòng (lấy lại đồ nếu lúc đến sáng gửi), tắm rửa, nghỉ ngơi chuẩn bị đi chơi tối. Gợi ý Chỗ lưu trú (TTTP, giá rẻ): 1. Nhà nghỉ Xuân Hoa (31D Minh Khai, ~200k/đêm). 2. Nhà nghỉ Thành Đạt (141 Trần Hưng Đạo, ~200-300k/đêm). 3. Diệp Minh Hotel (46 Thành Công, ~250-300k/đêm). 4. Cánh Diều Hotel (74 Nguyễn Văn Cừ, ~250-350k/đêm). (Giá tham khảo, cần gọi trước).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Quà lưu niệm (Option)",
                                "description": "Có thể mua tại các cửa hàng đặc sản (Chợ Rồng) trên đường về. Gợi ý: Cơm cháy (100-150k), Rượu Kim Sơn (200-300k), Đồ thêu ren Văn Lâm."
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Gội đầu thư giãn",
                                "amount": 100000,
                                "category": "relax",
                                "note": "50k x 2. Ước tính 30 phút",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Đồ ăn vặt, nước uống, quà",
                                "amount": 150000,
                                "category": "shopping",
                                "note": "Dự phòng mua về nhà nghỉ/làm quà",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Phòng nghỉ 1 đêm",
                                "amount": 350000,
                                "category": "hotel",
                                "note": "Ước tính cho phòng 2 người, mức trung bình. Phòng ở trung tâm TP, Cần đặt trước phòng chủ động"
                            }
                        ],
                        "reason": "Đây là ưu tiên của bạn: ở TTTP để tiện tắm rửa, sạch sẽ trước khi đi chơi tối. Logic: Ăn tối -> Gội đầu thư giãn (tiện đường) -> Nhận phòng muộn hơn -> Tắm rửa."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T20:25:00",
                        "endTime": "2025-11-15T23:00:00"
                    },
                    "title": "Dạo chơi Phố đêm (Phố cổ, Tháp Tứ Ân)",
                    "summary": "Dạo Phố đi bộ. Tham quan Phố cổ Hoa Lư (bao gồm Tháp Tứ Ân, Đền Mẫu). (Option: Chơi khuya).",
                    "iconType": "nightlife",
                    "details": {
                        "directions": {
                            "steps": [
                                "Di chuyển từ nhà nghỉ -> Phố cổ Hoa Lư (~1-2km, ~5-10 phút xe máy).",
                                "Lộ trình đi bộ gợi ý: Gửi xe -> Hồ Kỳ Lân -> Cầu phao -> Tham quan Chùa Bạc, Tháp Tứ Ân, Đền Mẫu -> Dạo quanh các gian hàng và khu ẩm thực Phố cổ."
                            ]
                        },
                        "places": [
                            {
                                "name": "Phố đi bộ (Phố 8)",
                                "description": "Khu vực ăn uống bạn vừa ăn xong, có thể có hoạt động đường phố cuối tuần."
                            },
                            {
                                "name": "Phố cổ Hoa Lư",
                                "description": "Khu phố tái hiện, đèn lồng lung linh, gian hàng thủ công, hoạt động văn nghệ. (Miễn phí vào cổng)."
                            },
                            {
                                "name": "Tháp Tứ Ân & Đền Mẫu (Chùa Bạc)",
                                "description": "Nằm trong khuôn viên Phố cổ Hoa Lư, trên núi Kỳ Lân. Lên đèn buổi tối, có thể lên tham quan."
                            },
                            {
                                "name": "Quà lưu niệm Phố cổ (Option)",
                                "description": "Mua sắm tại các gian hàng: Đèn lồng (50-150k), Tò he (20k), Thư pháp (100k), Đồ thêu ren."
                            },
                            {
                                "name": "Các quán Bar/Pub (Option - Chơi khuya)",
                                "description": "Nếu còn sức (sau 23:00), có thể ghé: Chookie's Beer Garden, King Kong Bar, Bamboo Bar... (Cách TTTP ~1-3km, mở đến 1-2h sáng).",
                                "mapUrl": ""
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Gửi xe",
                                "amount": 10000,
                                "category": "transport",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Đồ uống/Ăn vặt",
                                "amount": 120000,
                                "category": "drink",
                                "note": "Khu vực phố cổ"
                            },
                            {
                                "name": "Mua quà lưu niệm",
                                "amount": 150000,
                                "category": "shopping",
                                "note": "Khu vực phố cổ",
                                "isOptional": true
                            },
                            {
                                "name": "Dịch vụ khác",
                                "amount": 100000,
                                "category": "relax",
                                "note": "Trò chơi, chụp ảnh...",
                                "paidBy": "HiếuND",
                                "isOptional": true
                            },
                            {
                                "name": "Chi phí chơi khuya",
                                "amount": 350000,
                                "category": "relax",
                                "note": "Nếu đi bar/pub (phát sinh)",
                                "isOptional": true
                            }
                        ],
                        "reason": "Đây là các điểm vui chơi tối chính bạn muốn đến. Cực kỳ tiện lợi vì đều nằm ở TTTP. Tháp Tứ Ân & Đền Mẫu nằm ngay trong khuôn viên Phố cổ Hoa Lư, rất dễ kết hợp. Thời gian chơi đã rút gọn để đảm bảo về nghỉ ngơi lúc 23:00."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-15T23:00:00",
                        "endTime": "2025-11-16T07:30:00"
                    },
                    "title": "Về nhà nghỉ",
                    "summary": "Kết thúc Ngày 1, nghỉ ngơi.",
                    "iconType": "hotel",
                    "details": {
                        "directions": {
                            "steps": [
                                "Di chuyển từ Phố cổ về nhà nghỉ (~1-2km, ~5p)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Nhà nghỉ (TTTP)",
                                "description": "Nghỉ ngơi qua đêm.",
                                "mapUrl": ""
                            }
                        ],
                        "reason": "Cố cắng về sớm để đảm bảo sức khỏe. Bạn đã ở TTTP nên về nhà nghỉ lúc tối muộn rất nhanh chóng và an toàn. Ghi chú: Sạc pin, chuẩn bị thuốc/y tế dự phòng. Ngủ sớm giữ sức và đặt báo thức (khoảng 07:00). Tổng thời gian tại phòng là 8.5 tiếng. Trừ 30-45p vệ sinh cá nhân, chuẩn bị đồ... sẽ đảm bảo giấc ngủ sâu khoảng 7.5 - 8 tiếng."
                    }
                }
            ]
        },
        // NGÀY 2
        {
            "dayInfo": {
                "day": 2,
                "date": "2025-11-16",
                "title": "Ngày 2: Chủ Nhật, 16/11 (Tràng An, Bái Đính & Trở về)",
                "mapUrl": ""
            },
            "timelineItems": [
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T07:30:00",
                        "endTime": "2025-11-16T08:15:00"
                    },
                    "title": "Thức dậy, Ăn sáng & Trả phòng",
                    "summary": "Dậy, vệ sinh cá nhân, check-out trả phòng (30p). (Chưa dự phòng 15p ngủ nướng). Ăn sáng nhanh (bánh mỳ, 15p).",
                    "iconType": "food",
                    "details": {
                        "directions": {
                            "steps": [
                                "Vệ sinh cá nhân, dọn đồ, trả phòng (07:30 - 08:00).",
                                "Ăn sáng nhanh (bánh mỳ ăn liền) (08:00 - 08:15).",
                                "Di chuyển (đi bộ/xe máy) đến quán ăn sáng (Tùy chọn, sẽ mất thời gian hơn)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Nhà nghỉ (TTTP)",
                                "description": "Vệ sinh cá nhân, dọn đồ, làm thủ tục Check-out. Mang hành lý theo xe."
                            },
                            {
                                "name": "Quán ăn sáng TTTP",
                                "description": "Gợi ý: 1. (Ưu tiên) Bánh mỳ Pa-tê ven đường (ăn nhanh). 2. (Tùy chọn) Bún chả que tre (Phố 8, ~35k), Bánh cuốn (gần nhà nghỉ, ~30k), Miến lươn Bà Phấn (~40k)."
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Ăn sáng (2 người)",
                                "amount": 80000,
                                "category": "food",
                                "note": "~40k/người. Tùy chọn nếu muốn ăn quán",
                                "paidBy": "ChiBV",
                                "isOptional": true
                            },
                            {
                                "name": "Ăn sáng nhanh (Bánh mỳ)",
                                "amount": 30000,
                                "category": "food",
                                "note": "Ưu tiên ăn nhanh (~15k/người)",
                                "paidBy": "ChiBV"
                            }
                        ],
                        "reason": "Ưu tiên ăn sáng nhanh để tiết kiệm (hoặc ăn sáng đặc sản địa phương). Nhanh chóng di chuyển đến Tràng An."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T08:15:00",
                        "endTime": "2025-11-16T12:30:00"
                    },
                    "title": "Tham quan Cụm Tràng An",
                    "summary": "Lái xe ra Tràng An (20p). Xếp hàng mua vé (15p). Gửi hành lý (10p). Đi thuyền Tràng An (3 tiếng). Gửi hành lý (nếu có & nếu cần)",
                    "iconType": "boat",
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/KdAKf5us5wmeGTEUA",
                            "steps": [
                                "Di chuyển TTTP -> Bến thuyền Tràng An (~7-8km, ~20 phút) (08:15 - 08:35).",
                                "Xếp hàng mua vé (08:35 - 08:50).",
                                "Gửi hành lý tại quầy (08:50 - 09:00).",
                                "Đi thuyền Tràng An (09:00 - 12:00).",
                                "Lấy lại hành lý (12:00 - 12:10)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Khu du lịch sinh thái Tràng An",
                                "description": "Di sản UNESCO. Thuyền đi 6-8 người. Tour kéo dài ~3 tiếng qua hang động, hồ nước, núi đá vôi, thăm đền chùa cổ. Có 3 tuyến. Gợi ý: Tuyến 2 hoặc 3 phù hợp với lịch trình 3 tiếng.\n‣ [Tuyến 1 (Dài nhất 3.5-4h)]: 9 hang, 3 đền (Đền Trình, Đền Trần, Phủ Khống). Chuyên sâu khám phá hang động.\n‣ [Tuyến 2 (Ngắn nhất ~2.5h)]: 4 hang, 3 đền, có Phim trường Kong. Cảnh đẹp, thơ mộng, được yêu thích.\n‣ [Tuyến 3 (Cân bằng ~3h)]: 3 hang, 3 đền, (nhiều hang động dài) có Hang Đột (dài 1000m) + Phim trường Kong.",
                                "mapUrl": "https://maps.app.goo.gl/R7y4EViUgpEW1Gg29"
                            },
                            {
                                "name": "Phòng vé Bến thuyền Tràng An",
                                "description": "Dịch vụ gửi đồ Tràng An: Có quầy trông giữ hành lý (miễn phí hoặc phí nhỏ) an toàn cho khách đi thuyền. Gửi tại khu vực nhà điều hành/bán vé."
                            },
                            {
                                "name": "Đền Trình",
                                "description": "Địa điểm sẽ đi qua khi đi thuyền."
                            },
                            {
                                "name": "Phim Trường Kong Skull Island (Option)",
                                "description": "Địa điểm quay phim King Kong. Nằm trong Tuyến 2 và Tuyến 3.",
                                "mapUrl": "https://maps.app.goo.gl/zaA4Nnoc42kHoHut9"
                            },
                            {
                                "name": "Thung Tối (Hang Tối) (Option)",
                                "description": "Cách Tràng An khoảng 2Km. Hang tối dài khoản 1 km có nhiều thạch nhũ trong hang rất đẹp.",
                                "mapUrl": "https://maps.app.goo.gl/iHQ5oJ8JEW6Zjjs78"
                            },
                            {
                                "name": "Khu Cơm Cháy (Option)",
                                "description": "Trên đường ra bến thuyền, có thể ghé mua cơm cháy đặc sản (nếu muốn)."
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Vé Tràng An",
                                "amount": 500000,
                                "category": "ticket",
                                "note": "250k/người x 2. Giá vé đã bao gồm cả phí đò và phí danh lam",
                                "paidBy": "HiếuND"
                            },
                            {
                                "name": "Gửi hành lý (ước tính)",
                                "amount": 10000,
                                "category": "ticket"
                            },
                            {
                                "name": "Gửi xe máy",
                                "amount": 10000,
                                "category": "transport",
                                "paidBy": "HiếuND"
                            },
                            {
                                "name": "Tip cho người chèo thuyền",
                                "amount": 50000,
                                "category": "other",
                                "note": "Tùy tâm (50k-100k/thuyền) nếu hài lòng",
                                "isOptional": true
                            },
                            {
                                "name": "Hướng dẫn viên khu Tràng An",
                                "amount": 300000,
                                "category": "ticket",
                                "isOptional": true
                            }
                        ],
                        "reason": "Trải nghiệm Di sản UNESCO \"phải đi\" cho bạn gái bạn. Giải pháp gửi đồ tại bến thuyền là tối ưu để bạn đi thuyền 3 tiếng mà không vướng bận hành lý. Ghi chú: Có thể đặt vé online (VD: Klook) để vào trực tiếp, không cần xếp hàng 15 phút."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T12:30:00",
                        "endTime": "2025-11-16T13:30:00"
                    },
                    "title": "Ăn trưa tại Tràng An",
                    "summary": "Ăn trưa (Dê núi, Gà đồi, Cơm cháy, Cơm...) tại nhà hàng khu Tràng An (mang theo hành lý).",
                    "iconType": "food",
                    "details": {
                        "directions": {
                            "steps": ["Di chuyển từ bến Tràng An đến nhà hàng (~5-10p)."]
                        },
                        "places": [
                            {
                                "name": "Lựa chọn 1: Gà đồi",
                                "description": "Gợi ý: Gà đồi (Quán Tùng Gà, gần Tràng An).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 2: Lẩu cá sông / Cơm cá",
                                "description": "Bạn cũng có thể thử Lẩu cá sông (VD: Lẩu cá Minh Phượng).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 3: Dê núi - Nhà hàng khu Tràng An (Du lịch, Gần)",
                                "description": "Gợi ý: Nhà hàng Chính Thư, Thăng Long (ngay gần bến Tràng An, đông vui, nổi tiếng với du khách).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 4: Dê núi - Nhà hàng (Địa phương, Xa hơn)",
                                "description": "Gợi ý: Dê núi Đức Trọc, Quán Ba Cửa (cách 3-4km, dân địa phương đánh giá cao).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lựa chọn 5: Cơm bình dân (Nhanh, Rẻ)",
                                "description": "Gợi ý: Cơm Phở Dũng (gần Tràng An, ~40-60k/suất, no bụng, nhanh gọn).",
                                "mapUrl": ""
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Ăn trưa (Gà đồi / Cá sông / Cơm cá)",
                                "amount": 300000,
                                "category": "food",
                                "note": "Ước tính cho 2 người. Nếu ăn cơm bình dân sẽ rẻ hơn.",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Ăn trưa Dê núi",
                                "amount": 450000,
                                "category": "food",
                                "note": "Ước tính cho bữa Dê núi (150-170k/món).",
                                "isOptional": true,
                                "paidBy": "ChiBV"
                            }
                        ],
                        "reason": "Ăn trưa trước khi đi Bái Đính. Cung cấp nhiều lựa chọn (Dê núi, Gà đồi, Cơm) để bạn quyết định. Các đặc sản nổi tiếng nhất Ninh Bình. Ăn ngay tại khu Tràng An sau khi đi thuyền là tiện nhất, không mất thời gian di chuyển. Bạn sẽ ăn cùng với hành lý đã lấy."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T13:30:00",
                        "endTime": "2025-11-16T16:15:00"
                    },
                    "title": "Tham quan Chùa Bái Đính",
                    "summary": "Tham quan nhanh. Di chuyển (30p). Gửi đồ (15p). Tham quan Khu Chùa Mới (1h 45m). Lấy đồ (15p). Nếu không đi chùa Bái Đính thì chọn một trong hai phương án: (A) Tìm quán cà phê tại TTTP để nghỉ ngơi, hoặc (B) Thuê nhà nghỉ theo giờ để nghỉ ngơi tắm rửa giữ sức chuẩn bị về Hà Nội.",
                    "iconType": "explore",
                    "details": {
                        "directions": {
                            "steps": [
                                "Di chuyển Tràng An -> Chùa Bái Đính (~15-17km, ~30 phút).",
                                "Gửi hành lý tại cổng (14:00 - 14:15).",
                                "Lộ trình tham quan (14:15 - 16:00, 1h 45m): Mua vé combo -> Xe điện vào -> Đi bộ Hành lang La Hán -> Điện Pháp Chủ -> Điện Tam Thế -> (Tùy chọn) Lên Bảo Tháp -> Ra xe điện.",
                                "Lộ trình tham quan (phiên bản cũ để tham khảo): Mua vé xe điện -> Vào (tham quan Chùa Quan Âm, Điện Pháp Chủ) -> [Option: Lên Bảo Tháp (mất phí, 50k)] -> Điện Tam Thế -> Ra xe điện.",
                                "Lấy lại hành lý (16:00 - 16:15)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Chùa Bái Đính",
                                "description": "Quần thể chùa lớn nhất Việt Nam. Rất rộng, đi bộ nhiều. Gợi ý: tập trung vào các điện chính, bỏ qua các điểm nhỏ nếu không đủ giờ. Lộ trình gợi ý (Khu Mới):\n‣ 1. Xe điện vào Cổng Tam Quan.\n‣ 2. Đi bộ qua 'Hành lang La Hán' (500 tượng).\n‣ 3. Tham quan 'Điện Pháp Chủ' (Tượng Phật Thích Ca).\n‣ 4. Tham quan 'Điện Tam Thế' (Điện lớn nhất).\n‣ [Tùy chọn A (Nếu kịp)]: Lên 'Bảo Tháp' (vé 60k, ngắm toàn cảnh).\n‣ [Tùy chọn B (Nên bỏ qua)]: 'Khu Chùa Cổ' (phải leo 300 bậc).",
                                "mapUrl": ""
                            },
                            {
                                "name": "Dịch vụ gửi đồ Bái Đính",
                                "description": "Tại khu vực cổng.",
                                "mapUrl": ""
                            },
                            {
                                "name": "Khu vực xung quanh (Option)",
                                "description": "Trên đường có thể thấy Cổng Tam Quan, nhưng không cần dừng lại nếu vội.",
                                "mapUrl": ""
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Vé xe điện (khứ hồi)",
                                "amount": 200000,
                                "category": "transport",
                                "note": "100k/người x 2",
                                "isOptional": true
                            },
                            {
                                "name": "Combo Xe điện + bảo tháp",
                                "amount": 300000,
                                "category": "transport",
                                "note": "150k/người x 2 (Gói tối ưu nhất)",
                                "paidBy": "HiếuND"
                            },
                            {
                                "name": "Vé xe điện VIP, bao gồm vào bảo tháp",
                                "amount": 500000,
                                "category": "transport",
                                "note": "250k/người x 2",
                                "isOptional": true
                            },
                            {
                                "name": "Xe điện trung chuyển (bao gồm: xe điện trung chuyển các điểm, vé Bảo Tháp, ngâm chân)",
                                "amount": 600000,
                                "category": "transport",
                                "note": "300k/người x 2",
                                "isOptional": true
                            },
                            {
                                "name": "Vé thăm quan Bảo tháp",
                                "amount": 120000,
                                "category": "ticket",
                                "note": "60k/người x 2 (Nếu muốn lên)"
                            },
                            {
                                "name": "Hướng dẫn viên",
                                "amount": 500000,
                                "category": "ticket",
                                "isOptional": true
                            },
                            {
                                "name": "Gửi xe máy",
                                "amount": 15000,
                                "category": "transport",
                                "paidBy": "ChiBV"
                            },
                            {
                                "name": "Gửi hành lý",
                                "amount": 15000,
                                "category": "ticket",
                                "isOptional": true
                            }
                        ],
                        "reason": "Bạn muốn thêm Bái Đính. Lịch trình này cố gắng đi nhanh để kịp giờ về, nhưng sẽ khá mệt và gấp. Nên ưu tiên tập trung vào Khu Chùa Mới. Hoặc bạn có thể bỏ lịch đi chùa này, chuyển sang lịch cafe nghỉ ngơi để hồi sức trước khi về. Vì đã trả phòng, bạn có thể linh hoạt. Nghỉ ngơi tại TTTP sẽ tiện đường ra QL1A hơn là quay lại Tam Cốc."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T16:15:00",
                        "endTime": "2025-11-16T16:45:00"
                    },
                    "title": "Chuẩn bị về",
                    "summary": "Di chuyển ra QL1A (20p). Kiểm tra xăng xe, đảm bảo an toàn (10p).",
                    "iconType": "time",
                    "details": {
                        "directions": {
                            "steps": [
                                "Di chuyển từ Bái Đính ra cây xăng gần QL1A (~15-17km, ~20p)."
                            ]
                        },
                        "places": [
                            {
                                "name": "Cây xăng gần QL1A",
                                "description": "Đổ xăng, kiểm tra xe (lốp, phanh) trước khi về.",
                                "mapUrl": ""
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Xăng xe lượt về (ước tính)",
                                "amount": 60000,
                                "category": "transport",
                                "note": "Đầy bình xăng xe máy Khoảng 3 lít",
                                "paidBy": "HiếuND"
                            }
                        ],
                        "reason": "Ghi chú: Kiểm tra kỹ xăng, lốp, phanh an toàn. Bước chuẩn bị cuối cùng để đảm bảo an toàn cho chặng đường về (về sớm để kịp có mặt tại Hà Nội sớm để hồi sức mai đi làm)."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T16:45:00",
                        "endTime": "2025-11-16T18:15:00"
                    },
                    "title": "Lái xe về Vân Đình",
                    "summary": "Chú ý đổ xăng. Di chuyển từ Ninh Bình đến Vân Đình để ăn tối. Dừng nghỉ giữa đường nếu cần.",
                    "iconType": "time",
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/Qj7romYTkeJWYwwe6",
                            "steps": [
                                "Lộ trình: Ninh Bình (QL1A) -> Phủ Lý -> Đồng Văn -> Vân Đình (Ứng Hòa).",
                                "Quãng đường ~60-70km, ~1h 30p xe máy.",
                                "Cần gọi điện hỏi trước về tình trạng chỗ ngồi và món ăn ở các quán Vịt Vân Đình.",
                            ]
                        },
                        "places": [
                            {
                                "name": "Chùa Bái Đính",
                                "description": "Điểm xuất phát",
                                "mapUrl": ""
                            },
                            {
                                "name": "Lâu Đài Thành Thắng",
                                "description": "Xem lâu đài buổi tối lên đèn, xem có đẹp hơn buổi sáng không.",
                                "mapUrl": ""
                            },
                            {
                                "name": "Cầu Đoan Vĩ",
                                "description": "Cầu bắc qua sông Đáy. Là ranh giới Hà Nam/Ninh Bình.",
                                "mapUrl": ""
                            },
                            {
                                "name": "Cửa hàng Xăng dầu Petrolimex Số 114",
                                "description": "Đổ xăng trước khi đi tiếp về Hà Nội",
                                "mapUrl": ""
                            },
                            {
                                "name": "Tp. Phủ Lý, Hà Nam (Option)",
                                "description": "Có thể dừng nghỉ 5-10p uống nước nếu mệt. Đi đến đây là đã đi được ~35Km, còn lại ~30Km nữa đến Vân Đình ăn tối.",
                                "mapUrl": ""
                            },
                            {
                                "name": "Quán Vịt cỏ Vân Đình",
                                "description": "Điểm đến ăn tối",
                                "mapUrl": ""
                            }
                        ],
                        "reason": "Đây là chặng 1 của đường về, đến đúng địa điểm ăn tối (Vân Đình) vào giờ ăn tối (18:15)."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T18:15:00",
                        "endTime": "2025-11-16T19:15:00"
                    },
                    "title": "Ăn tối Vịt cỏ Vân Đình",
                    "summary": "Dừng chân ăn tối với đặc sản Vịt cỏ Vân Đình. Cần gọi điện hỏi trước về tình trạng chỗ ngồi và món ăn.",
                    "iconType": "food",
                    "details": {
                        "directions": {
                            "steps": [
                                "Chùa Bái Đính -> Vân Đình -> Quán ăn Vịt cỏ.",
                                "Dừng nghỉ 1 tiếng ăn tối tại Vân Đình."
                            ]
                        },
                        "places": [
                            {
                                "name": "Nhà Hàng Vịt Doãn Thọ (có 2 cơ sở)",
                                "description": "Đây là một trong những thương hiệu nổi tiếng và lâu đời nhất (khoảng 30 năm) tại Vân Đình. Quán được đánh giá cao về chất lượng vịt cỏ và tay nghề chế biến.",
                                "mapUrl": "https://maps.google.com/?cid=8180557401541000411&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ&authuser=1"
                            },
                            {
                                "name": "Quán Vịt Khải Lê",
                                "description": "Một địa chỉ rất nổi tiếng và có thâm niên hàng chục năm tại Vân Đình, được nhiều người biết đến và thường xuyên ghé qua.",
                                "mapUrl": "https://maps.google.com/?cid=13958931727172999411&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ&authuser=1"
                            },
                            {
                                "name": "Vịt Quay Doãn Ngọc bé",
                                "description": "Địa điểm được nhiều đánh giá tên Google Map",
                                "mapUrl": "https://maps.app.goo.gl/HBXVEJJHH1PnsUTu6"
                            },
                            {
                                "name": "Nhà Hàng Uyển Linh VTV1",
                                "description": "Hiếu xem trên Google Map thấy bảo được lên VTV1 nên đưa vào danh sách tham khảo xem sao. Hehe.",
                                "mapUrl": "https://maps.app.goo.gl/oprwMcSYpKWe4C7s7"
                            },
                            {
                                "name": "Quán Chè Khánh Huyền",
                                "description": "Có thể ăn vặt sau khi ăn tối. Nhưng hơi ngược đường. Cần chú ý thời gian đi về Hà Nội kẻo muộn",
                                "mapUrl": "https://maps.app.goo.gl/SsuBmSSmMc4cnrgq9"
                            }
                        ],
                        "budgets": [
                            {
                                "name": "Ăn tối Vịt cỏ Vân Đình",
                                "amount": 250000,
                                "category": "food",
                                "note": "Ước tính: Nửa con vịt nướng (~150k), Cháo, Canh măng, Bún, Bánh cuốn.",
                                "paidBy": "ChiBV"
                            }
                        ],
                        "reason": "Thực hiện kế hoạch của bạn là ăn đặc sản trên đường về."
                    }
                },
                {
                    "timeInfo": {
                        "startTime": "2025-11-16T19:15:00",
                        "endTime": "2025-11-16T20:15:00"
                    },
                    "title": "Về đến Hà Nội",
                    "summary": "Lái xe chặng cuối về Hà Nội. Kết thúc chuyến đi!",
                    "iconType": "time",
                    "details": {
                        "directions": {
                            "mapUrl": "https://maps.app.goo.gl/ukeenbRF9PXEhEP26",
                            "steps": [
                                "Di chuyển Vân Đình -> Hà Nội (~30-40km, ~1 tiếng xe máy).",
                                "-> Ng. 55 P. Chính Kinh (Phòng Vân Chi)",
                                "-> Ng. 14 P. Vũ Hữu (Phòng Hiếu iceTea)",
                            ]
                        },
                        "places": [
                            {
                                "name": "Trung tâm Hà Nội",
                                "description": "Điểm kết thúc chuyến đi.",
                                "mapUrl": "https://www.google.com/maps/search/Thanh+Xuân,+Hà+Nội"
                            }
                        ],
                        "reason": "Hoàn thành mục tiêu về đến Hà Nội lúc 20:15, kịp nghỉ ngơi cho ngày làm việc hôm sau."
                    }
                }
            ]
        }
    ]
};
