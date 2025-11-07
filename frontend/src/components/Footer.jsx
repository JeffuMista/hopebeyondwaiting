import SocialMediaLinks from "./Social";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between p-4 bg-purple-600 text-white p-4">
      <div className="block py-2">
        <p className="py-2">© 2025 Hope Beyond Waiting. All rights reserved.</p>
        <SocialMediaLinks />
      </div>
    </footer>
  );
}
