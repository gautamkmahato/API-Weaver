import Sidebar from "./_components/Sidebar";

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 border-r bg-black">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-y-auto hide-scrollbar">
        {children}
      </div>
    </div>
  );
}