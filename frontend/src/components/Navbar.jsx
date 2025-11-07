export default function Navbar() {
  return (
    <nav className="w-full h-30 flex items-center justify-between p-4 bg-purple-600 text-white p-4">
      <h1 className="text-2xl font-bold">Hope Beyond Waiting</h1>
      <ul className="flex space-x-4">
        <li className="p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer">
          Home
        </li>
        <li className="p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer">
          About
        </li>
        <li className="p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer">
          Contact Us
        </li>
      </ul>
    </nav>
  );
}
