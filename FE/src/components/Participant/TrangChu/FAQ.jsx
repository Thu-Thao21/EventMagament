import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Làm thế nào để tạo sự kiện?",
    answer: "Bạn chỉ cần đăng nhập, chọn nút Tạo sự kiện, nhập thông tin như tên sự kiện, thời gian, địa điểm và nhấn lưu. Hệ thống sẽ tự động tạo sự kiện cho bạn."
  },
  {
    question: "Gói nào được tạo sự kiện không giới hạn?",
    answer: "Gói Pro và Premium cho phép bạn tạo sự kiện không giới hạn. Gói Basic chỉ hỗ trợ tạo tối đa 3 sự kiện."
  },
  {
    question: "Tôi có thể nâng cấp gói sau không?",
    answer: "Có. Bạn có thể nâng cấp gói bất cứ lúc nào trong phần quản lý tài khoản. Tính năng mới sẽ được mở ngay sau khi thanh toán thành công."
  },
  {
    question: "Hệ thống có hỗ trợ check-in QR không?",
    answer: "Có. Tính năng check-in bằng QR Code được hỗ trợ từ gói Pro trở lên, giúp bạn quản lý người tham gia nhanh chóng và chính xác."
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0); 

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-12 text-center mb-4">
          <h3 className="text-uppercase text-primary fw-bold">
            Câu hỏi thường gặp
          </h3>
          <p className="text-muted fs-6">Giải đáp thắc mắc của bạn</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full px-6 py-4 flex justify-between items-center text-left transition-colors duration-300 ${
                    isOpen ? 'bg-[#dbeafe] text-blue-900' : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium text-[16px]">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 py-4 text-gray-600 leading-relaxed whitespace-pre-line border-t border-gray-100 bg-white">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;