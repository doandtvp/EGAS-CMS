"use client";

import React from "react";
import Image from "next/image";
import HeaderActions from "@/components/layout/header/HeaderActions";
import UserProfileSection from "@/components/layout/header/UserProfileSection";
import { BoxIconLine, DocsIcon, PlugInIcon, BeforePaymentIcon, AfterPaymentIcon } from "@/icons";
import BeforePaymentPanel from "./components/BeforePaymentPanel";
import AfterPaymentPanel from "./components/AfterPaymentPanel";
import NoLiterPanel from "./components/NoLiterPanel";
import OtherGoodsPanel from "./components/OtherGoodsPanel";
import ServicePanel from "./components/ServicePanel";

type StaffNavItem = {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
};

const STAFF_NAV_ITEMS: StaffNavItem[] = [
  {
    id: "before-payment",
    label: "Bơm trước",
    subLabel: "thanh toán sau",
    icon: <BeforePaymentIcon />,
  },
  {
    id: "after-payment",
    label: "Thanh toán",
    subLabel: "trước bơm sau",
    icon: <AfterPaymentIcon />,
  },
  {
    id: "noliter",
    label: "Bán hàng",
    subLabel: "không log bơm",
    icon: <BoxIconLine />,
  },
  {
    id: "other",
    label: "Bán hàng",
    subLabel: "hóa khác",
    icon: <DocsIcon />,
  },
  {
    id: "service",
    label: "Bán dịch vụ",
    subLabel: "",
    icon: <PlugInIcon />,
  },
];



export default function StaffConsole() {
  const [activeNav, setActiveNav] = React.useState(STAFF_NAV_ITEMS[0].id);


  const renderActivePanel = () => {
    switch (activeNav) {
      case "before-payment":// bơm trước thanh toán sau
        return <BeforePaymentPanel />;
      case "after-payment":// bơm sau thanh toán trước
        return <AfterPaymentPanel />;
      case "noliter": // bơm không log bơm
        return <NoLiterPanel />;
      case "other": // bán hàng hóa khác      
        return <OtherGoodsPanel />;
      case "service": // bán dịch vụ
        return <ServicePanel />;
      default:
        return <BeforePaymentPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEEF2]">
      <header className="h-16 border-b border-gray-300 bg-white px-3 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[12px] text-gray-600">
          <div className="flex items-center gap-2">
            <Image src="/images/logo/egas-logo.svg" alt="EGAS" width={18} height={18} />
            <span className="text-[30px] font-bold text-[#1E7FD8] leading-none tracking-tight">
              EGAS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <ShopIcon />
              <span>Cửa hàng: 211001</span>
            </div>
            <span className="h-4 w-px bg-gray-300" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <SalePointIcon />
              <span>Điểm bán: số 1</span>
            </div>
            <span className="h-4 w-px bg-gray-300" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <ShiftIcon />
              <span>Ca: 25090403</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <HeaderActions />
          <UserProfileSection />
        </div>
      </header>

      <div className="flex h-[calc(100vh-40px)]">
        <aside className="w-[126px] border-r border-gray-300 bg-[#F5F6F8] p-2">
          <div className="space-y-2">
            {STAFF_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full rounded-xl px-1 py-3 text-center text-[11px] leading-4 transition ${activeNav === item.id
                  ? "bg-[#2F92E8] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#2F92E8]/50"
                  }`}
              >
                <div className="mb-1 flex justify-center">
                  <span
                    className={`flex h-5 w-5 items-center justify-center ${activeNav === item.id ? "text-white" : "text-gray-400"
                      }`}
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="font-semibold">{item.label}</div>
                {item.subLabel && <div>{item.subLabel}</div>}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-2">{renderActivePanel()}</main>
      </div>
    </div>
  );
}

export const ShopIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.412 20.6193L17.1756 13.6774C20.2639 9.1751 17.0941 3 11.6942 3C6.29316 3 3.12336 9.1751 6.21289 13.6774L10.9764 20.6193C11.3247 21.1269 12.0637 21.1269 12.412 20.6193Z"
        stroke="#687383"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.75 6.75C13.4069 6.75 14.75 8.09315 14.75 9.75C14.75 11.4069 13.4069 12.75 11.75 12.75C10.0931 12.75 8.75 11.4069 8.75 9.75C8.75 8.09315 10.0931 6.75 11.75 6.75Z"
        fill="#E2E5EA"
        stroke="#687383"
        stroke-width="1.5"
      />
    </svg>
  );
};

export const SalePointIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.2109 13.7439H19.8913C20.5022 13.7439 20.9972 13.2507 20.9972 12.642V6.11958C20.9972 5.8545 20.8425 5.61253 20.6028 5.50002L18.1605 4.35645H16.7979"
        stroke="#687383"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.1562 4.35449V8.70994C18.1562 9.20929 18.563 9.61463 19.0642 9.61463H20.9945"
        stroke="#687383"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.2108 17.6846H4.41016V5.39966C4.41016 4.07422 5.48976 3 6.81839 3H12.8011C14.1312 3 15.2093 4.07422 15.2093 5.39966V17.6846H15.2108Z"
        stroke="#687383"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0048 21.0003H3.61714C3.27686 21.0003 3 20.7244 3 20.3853V18.2985C3 17.9595 3.27686 17.6836 3.61714 17.6836H16.0048C16.345 17.6836 16.6219 17.9595 16.6219 18.2985V20.3853C16.6219 20.7259 16.345 21.0003 16.0048 21.0003Z"
        stroke="#687383"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.2126 5.3418H6.41016V8.79872H13.2126V5.3418Z"
        fill="#E2E5EA"
        stroke="#687383"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const ShiftIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.8863 15.8684V17.9907L14.3226 21.5748H13.3061L10.8164 19.0714L13.2706 16.6019L15.9429 13.9129L16.2525 14.2261L17.3028 15.2813L17.8863 15.8684Z"
        fill="#E2E5EA"
      />
      <path
        d="M15.9404 13.3875C16.0811 13.3877 16.213 13.4447 16.3105 13.5428L16.5996 13.8338C16.6006 13.8348 16.6024 13.8361 16.6064 13.8397C16.6098 13.8427 16.6153 13.8485 16.6211 13.8543L18.2539 15.4959C18.3522 15.5949 18.4062 15.7279 18.4062 15.868V17.9901C18.4062 18.1283 18.3523 18.2631 18.2539 18.3622L14.6914 21.9461C14.5931 22.0451 14.4611 22.1004 14.3213 22.1004H13.3027C13.1649 22.1003 13.031 22.0451 12.9326 21.9461L10.4434 19.4432C10.345 19.3443 10.291 19.2112 10.291 19.0711C10.291 18.9329 10.3449 18.7982 10.4434 18.6991L15.5693 13.5409C15.6677 13.4419 15.8006 13.3875 15.9404 13.3875ZM11.5547 19.0721L13.5195 21.0487H14.1064L17.3623 17.7743V16.0858L15.9424 14.6581L11.5547 19.0721Z"
        fill="#687383"
        stroke="#687383"
        stroke-width="0.2"
      />
      <path
        d="M21.6562 11.1377C21.9455 11.1377 22.1787 11.3736 22.1787 11.6631V13.1572C22.1786 13.4466 21.9454 13.6826 21.6562 13.6826H20.3418C19.8851 13.6827 19.4534 13.8617 19.127 14.1885L19.1279 14.1895L17.6729 15.6523C17.5705 15.7554 17.4366 15.8066 17.3047 15.8066C17.1712 15.8066 17.0362 15.7556 16.9336 15.6523C16.7296 15.4466 16.7294 15.1148 16.9336 14.9092L18.3887 13.4453L18.5928 13.2598C19.0868 12.8522 19.6983 12.6319 20.3418 12.6318H21.1338V12.1885H19.7285C19.2767 12.1885 18.8353 12.3736 18.5156 12.6953L18.5146 12.6943L16.626 14.5977C16.4212 14.8036 16.0906 14.8035 15.8857 14.5977C15.6812 14.3919 15.6813 14.0603 15.8857 13.8545L17.7744 11.9512C18.2887 11.4337 19.0016 11.1377 19.7285 11.1377H21.6562Z"
        fill="#687383"
        stroke="#687383"
        stroke-width="0.2"
      />
      <path
        d="M13.8765 6.69597L13.868 6.86956C13.841 7.37332 13.4283 7.76816 12.9259 7.76816C12.909 7.76816 12.8921 7.76816 12.8752 7.76646C12.8329 7.76476 12.7906 7.75965 12.7483 7.75114C11.7487 7.55883 10.9267 7.4465 10.0016 7.42608C8.92755 7.40395 8.25438 7.55883 7.25479 7.75114C7.19728 7.76305 7.13638 7.76816 7.07718 7.76816C6.85731 7.76816 6.6425 7.68987 6.47506 7.55032C6.2704 7.38183 6.14694 7.13335 6.13341 6.86786L6.12495 6.69597L6.2907 6.65172C7.50003 6.32836 8.74826 6.16498 10.0016 6.16498C11.2532 6.16498 12.5014 6.32836 13.7107 6.65172L13.8765 6.69597Z"
        fill="#E2E5EA"
      />
      <path
        d="M13.8691 4.75359V6.21892L13.6053 6.15255C12.4281 5.85642 11.2154 5.70665 10.001 5.70665C8.78657 5.70665 7.57386 5.85642 6.39497 6.15255L6.13281 6.21892V4.75359C6.13281 3.58269 7.08167 2.62963 8.24533 2.62793H11.7566C12.922 2.62963 13.8691 3.58269 13.8691 4.75359Z"
        fill="#E2E5EA"
      />
      <path
        d="M13.8037 18.166L15.2617 18.4746C15.4532 18.5151 15.5749 18.7027 15.5352 18.8955V18.8975C15.4978 19.0635 15.3522 19.1777 15.1885 19.1777C15.1655 19.1777 15.1401 19.1757 15.1162 19.1709H15.1152L13.6572 18.8623C13.4659 18.8217 13.3441 18.6341 13.3838 18.4414L13.4053 18.373C13.4702 18.2214 13.6346 18.1307 13.8037 18.166Z"
        fill="#687383"
        stroke="#687383"
        stroke-width="0.2"
      />
      <path
        d="M11.6768 12.5352C11.966 12.5352 12.1992 12.771 12.1992 13.0605V14.8594C12.1991 15.1488 11.9659 15.3848 11.6768 15.3848C11.3876 15.3848 11.1544 15.1488 11.1543 14.8594V13.0605C11.1543 12.771 11.3875 12.5352 11.6768 12.5352Z"
        fill="#687383"
        stroke="#687383"
        stroke-width="0.2"
      />
      <path
        d="M11.7578 1.90039C13.3204 1.90226 14.5918 3.18251 14.5938 4.75488V6.81934C14.5938 7.21188 14.4558 7.59401 14.2041 7.89453L14.0117 8.125C14.0191 8.32949 14.0334 8.80153 14.0303 9.31543C14.0269 9.86151 14.0037 10.4647 13.9307 10.8418C13.8031 11.5015 13.3483 12.2644 12.7646 12.8301L12.5078 13.0596C12.2967 13.2337 12.0599 13.3952 11.8066 13.5391C11.1994 13.8835 10.5413 14.0859 10 14.0859C9.62097 14.0859 9.18693 13.9863 8.74023 13.8027V14.7646C8.74006 14.9572 8.63184 15.1299 8.46387 15.2129L8.38867 15.2432L7.56445 15.4902L10.083 17.708C10.1873 17.8003 10.2533 17.9353 10.2559 18.0781L10.248 18.1836C10.2291 18.287 10.1779 18.3828 10.1025 18.457L10.0996 18.46C10.0069 18.5447 9.88965 18.5898 9.7666 18.5898C9.67514 18.5898 9.5874 18.5658 9.51074 18.5195L9.43848 18.4658L6.44336 15.8271L3.37012 16.7559C3.08447 16.8435 2.89113 17.1043 2.88965 17.4062V20.0605C2.89389 20.3356 2.67357 20.5604 2.39941 20.5605C2.36563 20.5605 2.33135 20.5556 2.30078 20.5498V20.5488C2.06629 20.505 1.90039 20.2937 1.90039 20.0518V17.4053C1.89881 16.6675 2.38657 16.0068 3.08887 15.7998L7.75195 14.3926V13.2549L7.49414 13.0596C6.90767 12.5804 6.47352 11.9905 6.22852 11.3379L6.13574 11.0537C6.13574 11.0537 6.13512 11.0529 6.13477 11.0518C6.13403 11.0494 6.13331 11.0457 6.13184 11.041C6.1289 11.0317 6.1244 11.018 6.12012 11.0039C6.1159 10.99 6.11132 10.9744 6.10742 10.96C6.10392 10.947 6.09988 10.9315 6.09766 10.918V10.9189C6.02074 10.5065 5.99207 9.88567 5.9834 9.3291C5.97526 8.8059 5.9848 8.33215 5.99023 8.12793L5.7959 7.89453C5.54589 7.59396 5.40918 7.21365 5.40918 6.82129V4.75391C5.41093 3.18297 6.68337 1.90216 8.24609 1.90039H11.7578ZM9.94629 8.0752C8.99471 8.0752 7.99935 8.20994 6.99121 8.47461V10.0537L6.99512 10.207C7.03475 10.9677 7.41192 11.6423 7.9541 12.1494C8.5322 12.6901 9.29091 13.0333 10.0059 13.0859C10.429 13.0845 11.1715 12.8491 11.8477 12.3135L12.0527 12.1387C12.5347 11.698 13.0194 11.0166 13.0195 10.0537V8.47656L12.5654 8.3877C11.9286 8.25513 11.0714 8.07522 9.94629 8.0752ZM10.0039 6.43457C8.78959 6.43457 7.58 6.59128 6.41113 6.90039C6.43243 7.0728 6.51526 7.23209 6.64844 7.3418H6.64941C6.76989 7.44232 6.92318 7.49707 7.08105 7.49707C7.12676 7.49706 7.16812 7.49269 7.20605 7.48535L7.47949 7.43262C8.27449 7.27773 8.91263 7.15332 9.80273 7.15332C9.87006 7.15332 9.93916 7.15354 10.0098 7.15527H10.0088C10.8751 7.17415 11.685 7.27017 12.8018 7.48535C12.8357 7.49185 12.86 7.49608 12.8838 7.49609H12.8936L12.9082 7.49707H12.9277C13.27 7.49707 13.5532 7.23916 13.5938 6.90039C12.4235 6.59138 11.2162 6.4346 10.0039 6.43457ZM8.06055 2.9082C7.13291 3.00441 6.4043 3.79515 6.4043 4.75391V5.87305C7.582 5.58489 8.79221 5.43652 10.0039 5.43652C11.2174 5.43655 12.4276 5.58315 13.6025 5.87305V4.75391C13.6009 3.73113 12.7737 2.90005 11.7588 2.89844H8.24805L8.06055 2.9082Z"
        fill="#687383"
        stroke="#687383"
        stroke-width="0.2"
      />
    </svg>
  );
};
