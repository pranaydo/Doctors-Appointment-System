"use client";

import Link from "next/link";
import { CalendarPlus } from 'lucide-react';
import { PanelsTopLeft, Users, NotebookTabs, Mails, LogOut, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 min-h-screen hidden md:block m-5 rounded-lg">
      <div className="mb-6">
        <img
          src="logo.jpg" 
          alt="Clinic Logo"
          className="w-60 h-16"
        />
      </div>
      <ul className="space-y-10">
        <li className="flex items-center space-x-2"> <span><PanelsTopLeft /></span> <Link href="#" className="text-gray-700 font-medium h-10">Overview</Link></li>
        <li className="flex items-center space-x-2"> <span><CalendarPlus /></span><Link href="/" className="text-blue-600 font-medium ">Appointments</Link></li>
        <li className="flex items-center space-x-2"> <span><Users /></span><Link href="#" className="text-gray-700">Doctors</Link></li>
        <li className="flex items-center space-x-2"> <span><NotebookTabs /></span><Link href="#" className="text-gray-700">Pathology Results</Link></li>
        <li className="flex items-center space-x-2"> <span><Mails /></span><Link href="#" className="text-gray-700">Chats</Link></li>
        <li className="flex items-center space-x-2"> <span><Settings /></span><Link href="#" className="text-gray-700">Settings</Link></li>
        <li className="flex items-center space-x-2 text-red-500"> <span><LogOut /></span><Link href="#" className="text-red-500">Logout</Link></li>
      </ul>
    </div>
  );
}
