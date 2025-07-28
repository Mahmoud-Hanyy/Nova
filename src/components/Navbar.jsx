// components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <span className="text-2xl font-bold">NOVA</span>
        <div className="flex space-x-6">
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#tech" className="hover:text-gray-300">Technology</a>
        </div>
      </div>
    </nav>
  )
}