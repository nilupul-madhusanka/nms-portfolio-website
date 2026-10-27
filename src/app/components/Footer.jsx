export default function Footer() {
  return (
    <footer className="border-t border-[#33353F] text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm sm:flex-row sm:px-6 lg:px-12">
        <span>NMS.Dev © {new Date().getFullYear()}</span>
        <p className="text-[#ADB7BE]">All rights reserved.</p>
      </div>
    </footer>
  );
}
