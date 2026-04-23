import { 
  ColorStationIcon, 
  ColorOilIcon, 
  ColorKTIcon, 
  ColorCategoryIcon 
} from "@/icons";
import { cn } from "@/utils";

interface AppItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const AppItem: React.FC<AppItemProps> = ({ label, icon, active }) => (
  <button className={cn(
    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all group",
    active 
      ? "bg-white dark:bg-gray-800 border-brand-500 shadow-lg shadow-brand-100 dark:shadow-none" 
      : "bg-gray-50/50 dark:bg-gray-700/30 border-transparent hover:bg-white dark:hover:bg-gray-800 hover:border-brand-200 hover:shadow-md"
  )}>
    <div className="w-14 h-14 mb-2 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
      {icon}
    </div>
    <span className={cn(
      "text-[13px] font-bold",
      active ? "text-brand-500" : "text-gray-500 group-hover:text-brand-500"
    )}>{label}</span>
  </button>
);

const AppsDropdown: React.FC = () => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 grid grid-cols-2 gap-3 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top">
      <AppItem 
        label="Bán hàng" 
        icon={<ColorStationIcon className="w-12 h-12" />} 
        active 
      />
      <AppItem 
        label="Hàng hóa" 
        icon={<ColorOilIcon className="w-12 h-12" />} 
      />
      <AppItem 
        label="Kế toán" 
        icon={<ColorKTIcon className="w-12 h-12" />} 
      />
      <AppItem 
        label="Danh mục" 
        icon={<ColorCategoryIcon className="w-12 h-12" />} 
      />
    </div>
  );
};

export default AppsDropdown;
