"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuDotsIcon, ViewedMailIcon, UnreadMailIcon } from "@/icons";
import { cn } from "@/utils";
import MailDetail from "@/components/mail/MailDetail";
import { Drawer } from "@/components/ui/modal/Drawer";
import { useLayoutStore } from "@/store/useLayoutStore";

const MOCK_MAILS = [
  {
    id: "1",
    sender: "Trần Thị Mai",
    time: "10 phút trước",
    title: "Cập nhật lệnh nhập kho #000200346",
    snippet: "Lệnh nhập kho đã được cập nhật trạng thái thành công. Vui lòng kiểm tra và xác nhận.",
    content:
      "Chào bạn,\n\nLệnh nhập kho #000200346 đã được hệ thống cập nhật trạng thái thành công.\n\nChi tiết:\n- Người thực hiện: Nguyễn Văn A\n- Thời gian: 09:30\n- Trạng thái: Hoàn tất\n\nVui lòng kiểm tra lại thông tin trong mục quản lý kho.",
    isRead: false,
  },
  {
    id: "2",
    sender: "Trần Thị Mai",
    time: "15 phút trước",
    title: "Thông báo hệ thống bảo trì",
    snippet: "Hệ thống sẽ bảo trì vào 20:00 tối nay. Thời gian dự kiến 2 giờ.",
    content:
      "Bảo trì hệ thống CHXD ngày 15/12\n\nHệ thống CHXD Petrolimex sẽ thực hiện bảo trì định kỳ nhằm nâng cấp hiệu suất và đảm bảo an toàn dữ liệu.\n\nThời gian bảo trì:\n02:00 – 03:00 ngày 15/12\n\nNội dung cập nhật:\n• Nâng cấp bảo mật API và hệ thống xác thực\n• Tối ưu tốc độ đồng bộ dữ liệu giữa POS và máy chủ\n• Cải thiện độ ổn định khi xử lý giao dịch giờ cao điểm\n\nẢnh hưởng:\n• Tạm ngừng toàn bộ giao dịch online trong khung giờ bảo trì\n• Chức năng xuất hóa đơn điện tử có thể bị gián đoạn\n• Đồng bộ dữ liệu sẽ tự động thực hiện sau khi bảo trì hoàn tất\n\nLưu ý cho cửa hàng:\n• Vui lòng hoàn tất giao dịch trước 02:00\n• Kháng thực hiện đối soát hoặc xuất hóa đơn trong thời gian bảo trì\n• Nếu phát sinh lỗi sau bảo trì, liên hệ bộ phận kỹ thuật để được hỗ trợ",
    isRead: false,
  },
  {
    id: "3",
    sender: "Hệ thống",
    time: "1 giờ trước",
    title: "Yêu cầu phê duyệt lệnh xuất kho",
    snippet: "Có 3 lệnh xuất kho đang chờ phê duyệt từ bạn. Vui lòng xem xét.",
    content:
      "Có 3 lệnh xuất kho đang chờ phê duyệt từ bạn. Vui lòng xem xét các yêu cầu từ chi nhánh POS 2.",
    isRead: true,
  },
];

const MailDropdown: React.FC = () => {
  const router = useRouter();
  const { addTab } = useLayoutStore();
  const [activeTab, setActiveTab] = useState("all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState<(typeof MOCK_MAILS)[0] | null>(null);

  const handleSeeAll = () => {
    addTab({
      id: "mail-inbox",
      title: "Hộp thư",
      path: "/mail",
      componentKey: "MailInbox",
    });
    router.push("/mail");
  };

  const handleOpenDetail = (mailId: string) => {
    const mail = MOCK_MAILS.find((m) => m.id === mailId);
    if (mail) {
      setSelectedMail(mail);
      setIsDetailOpen(true);
    }
  };

  const tabs = [
    { id: "all", label: "Tất cả", count: 35 },
    { id: "unread", label: "Chưa đọc", count: 1 },
    { id: "read", label: "Đã đọc", count: 34 },
  ];

  return (
    <>
      <div className={cn(
        "fixed md:absolute top-[64px] md:top-full left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 mt-2 w-auto md:w-[400px] max-w-[calc(100vw-32px)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200"
      )}>
        {/* Header */}
        <div className="px-4 py-2 flex items-center justify-between">
          <h3 className="text-normal font-bold tracking-normal-plus text-blue-dark dark:text-white">
            Hộp thư
          </h3>
          <button className="flex-shrink-0 p-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500">
            <MenuDotsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-4 flex items-center gap-6 border-b border-gray-100 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-sm font-semibold tracking-tight transition-all relative flex items-center gap-1.5",
                activeTab === tab.id
                  ? "text-brand-500 dark:text-brand-400"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-theme-xs font-normal",
                  activeTab === tab.id
                    ? "bg-stat-1 text-white"
                    : "bg-blue-bg dark:bg-gray-700 text-grayscale-50 dark:text-gray-400"
                )}
              >
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
          {MOCK_MAILS.map((mail) => (
            <div
              key={mail.id}
              onClick={() => handleOpenDetail(mail.id)}
              className={cn(
                "p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer transition-colors flex gap-4 border-b border-gray-50 dark:border-gray-700/50 last:border-0 relative group",
                !mail.isRead ? "bg-white" : "bg-[#F0F0F0]"
              )}
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-soft border border-gray-50 dark:border-gray-700 relative">
                {mail.isRead ? (
                  <ViewedMailIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <UnreadMailIcon className="w-5 h-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-theme-sm font-semibold tracking-tight text-grayscale-30 dark:text-gray-100 line-clamp-1 leading-5">
                    {mail.title}
                  </p>
                  {!mail.isRead && (
                    <div className="flex-shrink-0 w-2.5 h-2.5 bg-brand-500 rounded-full mt-1.5"></div>
                  )}
                </div>
                <p className="text-theme-sm font-normal tracking-tight text-grayscale-30/80 dark:text-gray-400 line-clamp-2 leading-5 mt-1">
                  {mail.snippet}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-theme-xs font-normal tracking-tighter text-grayscale-40 dark:text-gray-500">
                    {mail.sender}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#E2E5EA] dark:bg-gray-600"></span>
                  <span className="text-theme-xs font-normal tracking-tighter text-grayscale-40 dark:text-gray-500">
                    {mail.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleSeeAll}
            className="w-full py-2.5 text-theme-sm font-semibold tracking-tight text-blue-custom hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all rounded-xl"
          >
            Xem tất cả hộp thư
          </button>
        </div>
      </div>

      <Drawer
        isOpen={isDetailOpen && !!selectedMail}
        onClose={() => setIsDetailOpen(false)}
        width="w-full md:w-[450px] lg:w-[500px]"
      >
        <MailDetail mail={selectedMail} onClose={() => setIsDetailOpen(false)} isOpen={true} />
      </Drawer>
    </>
  );
};

export default MailDropdown;
