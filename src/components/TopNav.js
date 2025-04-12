


export default function Header() {
  return (
    <header className="m-4 w-auto flex items-center justify-between px-4 py-5 bg-gray-100 rounded-xl shadow">
      {/* Search Bar */}
      <div className="relative flex-1 mr-4">
  {/* Search icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
  </svg>

  {/* Input field with padding to fit the icon */}
  <input
    type="text"
    placeholder="Search pathology results"
    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      {/* User & Notification */}
      <div className="flex items-center space-x-2">
       
       <div className="border rounded-full p-1 border-gray-300"> <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bell-dot-icon"
        >
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665" />
          <circle cx="18" cy="8" r="3" />
        </svg></div>

        {/* <div className="w-8 h-8 bg-gray-300 rounded-full text-center" ><span className="">OB</span></div> */}
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-purple-700 font-semibold">
  <span>OB</span>
</div>

        <div className="text-left">
          <div className="text-sm font-medium text-gray-800">Ola Boluwatife</div>
          <div className="text-xs text-purple-700 font-semibold">PATIENT</div>
        </div>
      </div>
    </header>
  );
}
