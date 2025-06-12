import React from "react";
import { FaHome, FaUpload, FaTachometerAlt, FaCog, FaTimes } from "react-icons/fa";

/**
 * @param {{ isOpen: boolean, toggle: () => void }} props
 */
export default function Sidebar({ isOpen, toggle }) {
  return (
    <>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-900 text-white transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <span className="text-lg font-semibold">Dashboard</span>
          <FaTimes className="cursor-pointer" onClick={toggle} />
        </div>
        <nav className="mt-4 space-y-2">
          {[
            { icon: FaHome, label: 'Home' },
            { icon: FaUpload, label: 'Upload Image' },
            { icon: FaTachometerAlt, label: 'Training' },
            { icon: FaCog, label: 'Settings' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <Icon className="mr-3" />
              <span>{label}</span>
            </div>
          ))}
        </nav>
      </aside>
      {isOpen && <div className="fixed inset-0 bg-black opacity-40 z-30" onClick={toggle} />}
    </>
  );
}