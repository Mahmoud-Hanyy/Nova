// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} NOVA Footwear. All rights reserved.</p>
      </div>
    </footer>
  )
}