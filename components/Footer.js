export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600">
        © {new Date().getFullYear()} TrendWise. All rights reserved.
      </div>
    </footer>
  );
}