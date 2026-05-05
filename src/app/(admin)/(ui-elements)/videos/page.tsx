import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VideosExample from "@/components/ui/video/VideosExample";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "EGAS CMS - Trang quản trị hệ thống EGAS ",
  description: "Hệ thống quản trị EGAS CMS - Giải pháp quản lý trạm xăng dầu hiện đại và hiệu quả.",
};

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
