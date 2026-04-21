import React from "react";
import Image from "next/image";

const AIAssistantWidget: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-[224px] w-full h-[204px] rounded-lg bg-[#005CAB] relative overflow-hidden shadow-2xl group flex flex-col items-center justify-between p-5">
      {/* Background Layer with Patterns */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ai/bg-ai-argent.png"
          alt="AI background decoration"
          fill
          className="object-cover opacity-100 transition-transform duration-700 group-hover:scale-110"
          priority
        />
        {/* Subtle overlay to ensure text readability if image is too bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-blue-900/30"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center flex-1 space-y-2">
        {/* Title */}
        <h3 className="text-white font-bold text-normal tracking-[0.01em] text-center w-full mb-0">
          Trợ lý AI EGAS
        </h3>

        {/* Centered Robot Icon Container */}
        <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
          <div className="w-[84px] h-[84px] relative transform group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
            <Image
              src="/images/ai/ai-argent-icon.png"
              alt="AI Bot Icon"
              width={48}
              height={48}
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] filter brightness-110"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-10 w-full">
        <button className="w-full py-3 bg-white text-dark-25 rounded-lg text-sm font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:bg-gray-50 transition-all active:scale-[0.97] flex items-center justify-center">
          Thử ngay
        </button>
      </div>
    </div>
  );
};

export default AIAssistantWidget;
