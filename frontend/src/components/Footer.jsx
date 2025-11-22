import SocialMediaLinks from "./Social";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between p-4 bg-blue-600 text-white p-4 mt-10">
      <div className="block py-2">
        <p className="py-2">© {new Date().getFullYear()} Hope Beyond Waiting • Accelerating Cancer Care in Kenya</p>
        <SocialMediaLinks />
      </div>
    </footer>
  );
}
