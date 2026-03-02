import React from "react";
import {
  Home,
  CalendarDays,
  PlusCircle,
  Users,
  Newspaper,
  Phone,
} from "lucide-react";

const MenuPanel = ({ openMenu, setOpenMenu }) => {

  const menuItems = [
    { label: "Trang chủ", icon: <Home size={20}/> },
    { label: "Sự kiện", icon: <CalendarDays size={20}/> },
    { label: "Tạo sự kiện", icon: <PlusCircle size={20}/> },
    { label: "Nhà tổ chức", icon: <Users size={20}/> },
    { label: "Tin tức", icon: <Newspaper size={20}/> },
    { label: "Liên hệ", icon: <Phone size={20}/> },
  ];

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpenMenu(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
        ${openMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[290px] bg-white z-50 shadow-2xl
        transform transition-transform duration-300
        ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="h-[90px] flex items-center justify-between px-6 border-b">
          <h2 className="font-bold text-lg">Menu</h2>

          <button
            onClick={() => setOpenMenu(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col p-4 gap-2">

          {menuItems.map((item, i) => (
            <button
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl
              hover:bg-red-50 hover:text-red-600 transition font-medium"
            >
              <span className="text-gray-600">{item.icon}</span>
              {item.label}
            </button>
          ))}

        </div>
      </div>
    </>
  );
};

export default MenuPanel;
