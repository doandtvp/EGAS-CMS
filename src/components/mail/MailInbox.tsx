"use client";
import React, { useState } from "react";
import { cn } from "@/utils";
import MailItem from "./MailItem";
import MailDetail from "./MailDetail";
import SearchInput from "../common/SearchInput";

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
  {
    id: "4",
    sender: "Admin",
    time: "Hôm qua",
    title: "Báo cáo tồn kho tuần",
    snippet: "Báo cáo tồn kho tuần 50/2025 đã được tạo. Xem chi tiết tại đây.",
    content:
      "Báo cáo tồn kho tuần 50/2025 đã được tạo. Bạn có thể tải xuống tệp đính kèm hoặc xem trực tiếp trên dashboard.",
    isRead: false,
  },
];

interface MailInboxProps {
  initialSelectedMailId?: string | null;
}

const MailInbox: React.FC<MailInboxProps> = ({ initialSelectedMailId = null }) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMailId, setSelectedMailId] = useState<string | null>(initialSelectedMailId);

  const tabs = [
    { id: "all", label: "Tất cả", count: 25 },
    { id: "unread", label: "Chưa đọc", count: 3 },
    { id: "read", label: "Đã đọc", count: 22 },
  ] as const;

  const filteredMails = MOCK_MAILS.filter((mail) => {
    const matchesTab =
      activeTab === "all" ? true : activeTab === "unread" ? !mail.isRead : mail.isRead;

    const matchesSearch =
      mail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const selectedMail = MOCK_MAILS.find((m) => m.id === selectedMailId) || null;

  return (
    <div className="flex h-full min-h-[600px] overflow-hidden relative">
      {/* Inbox List Side */}
      <div
        className={cn(
          "flex-col transition-all duration-500 ease-in-out border-r border-gray-100 dark:border-gray-800",
          selectedMailId ? "hidden lg:flex max-w-[900px] w-full" : "w-full flex"
        )}
      >
        {/* List Header */}
        <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-gray-800 space-y-4">
          <h2 className="text-xl font-bold text-blue-dark dark:text-white">Hộp thư</h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-2 text-sm font-semibold tracking-tight transition-all relative flex items-center gap-1.5",
                    activeTab === tab.id
                      ? "text-brand-500 dark:text-brand-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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

            <SearchInput value={searchQuery} onChange={setSearchQuery} className="w-full sm:w-64" />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-grow overflow-y-auto scrollbar-thin">
          {filteredMails.length > 0 ? (
            filteredMails.map((mail) => (
              <MailItem
                key={mail.id}
                {...mail}
                active={selectedMailId === mail.id}
                onClick={setSelectedMailId}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>Không tìm thấy thông báo nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Side */}
      <div
        className={cn(
          "flex-grow transition-all duration-500 ease-in-out overflow-hidden",
          selectedMailId
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 absolute inset-y-0 right-0 w-0"
        )}
      >
        <MailDetail
          mail={selectedMail}
          isOpen={!!selectedMailId}
          onClose={() => setSelectedMailId(null)}
        />
      </div>
    </div>
  );
};

export default MailInbox;
