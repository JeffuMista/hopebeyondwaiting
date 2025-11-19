import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTiktok,
  FaMedium,
} from "react-icons/fa";

export default function SocialMediaLinks() {
  return (
    <div className="flex space-x-4 px-6">
      <a href="https://www.facebook.com" target="_blank">
        <FaFacebook size={30} className="cursor-pointer" />
      </a>
      <a href="https://www.x.com" target="_blank">
        <FaTwitter size={30} className="cursor-pointer" />
      </a>
      <a href="https://www.instagram.com" target="_blank">
        <FaInstagram size={30} className="cursor-pointer" />
      </a>
      <a href="https://www.linkedin.com" target="_blank">
        <FaLinkedin size={30} className="cursor-pointer" />
      </a>
      <a href="https://www.tiktok.com" target="_blank">
        <FaTiktok size={30} className="cursor-pointer" />
      </a>
      <a href="https://www.medium.com" target="_blank">
        <FaMedium size={30} className="cursor-pointer" />
      </a>
    </div>
  );
}
