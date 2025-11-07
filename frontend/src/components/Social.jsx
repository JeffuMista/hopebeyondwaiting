    import { FaFacebook, FaTwitter, FaInstagram, FaLink, FaLinkedin, FaTiktok, FaMedium } from 'react-icons/fa';

    export default function SocialMediaLinks() {
      return (
        <div className="flex space-x-4 px-6">
          <FaFacebook size={30} />
          <FaTwitter size={30} />
          <FaInstagram size={30} />
          <FaLinkedin size={30} />
          <FaTiktok size={30} />
          <FaMedium size={30} />
        </div>
      );
    }