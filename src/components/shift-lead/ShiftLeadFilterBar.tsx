import React, { useState } from "react";
import CustomSelect from "@/components/dashboard/CustomSelect";
import Button from "@/components/common/Button";
import { ConfigIcon, PrintIcon, DataSynchronizationIcon } from "@/icons";

const ShiftLeadFilterBar: React.FC = () => {
  const [invoiceCode, setInvoiceCode] = useState("");
  const [paymentCode, setPaymentCode] = useState("");

  return (
    <div className="bg-gray-bg px-4 py-3 flex flex-wrap items-center gap-2.5">
      {/* Left: Filters */}
      <div className="flex items-center gap-2.5 flex-1 flex-wrap">
        <div className="w-[180px]">
          <CustomSelect
            options={["Tất cả vòi bơm", "Vòi 01", "Vòi 02", "Vòi 03"]}
            value={invoiceCode}
            onChange={setInvoiceCode}
            placeholder="Tất cả vòi bơm"
            width="100%"
            buttonClassName="bg-white font-normal h-10 text-sm"
          />
        </div>
        <div className="w-[200px]">
          <CustomSelect
            options={["Tất cả nhân viên", "Nguyễn Văn A", "Trần Thị B", "Lê Văn C"]}
            value={paymentCode}
            onChange={setPaymentCode}
            placeholder="Tất cả nhân viên"
            width="100%"
            buttonClassName="bg-white font-normal h-10 text-sm"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<ConfigIcon className="w-5 h-5" />}
          className="h-10 px-4 text-sm font-medium bg-white border border-black/10 rounded-lg"
        >
          Cấu hình
        </Button>

        <Button
          variant="gradient-orange"
          size="sm"
          leftIcon={<PrintIcon className="w-5 h-5" />}
          className="h-10 px-4 text-sm font-medium rounded-lg"
        >
          In báo cáo
        </Button>

        <Button
          variant="gradient-orange"
          size="sm"
          leftIcon={<DataSynchronizationIcon className="w-5 h-5" />}
          className="h-10 px-4 text-sm font-medium rounded-lg"
        >
          Đồng bộ dữ liệu
        </Button>
      </div>
    </div>
  );
};

export default ShiftLeadFilterBar;
