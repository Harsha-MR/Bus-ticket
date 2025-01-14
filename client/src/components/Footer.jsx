import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About getBus</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>T & C</li>
              <li>Privacy Policy</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Global Sites</h3>
            <ul className="space-y-2">
              <li>India</li>
              <li>Singapore</li>
              <li>Malaysia</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <FaFacebook className="text-2xl" />
              <FaTwitter className="text-2xl" />
              <FaInstagram className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2024 getBus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;