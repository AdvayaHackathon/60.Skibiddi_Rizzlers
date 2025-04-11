import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image src="/image.png" alt="Cultura Logo" width={25} height={25} />
              <span className="ml-2 text-2xl font-semibold text-[#FF3967]">cultura</span>
            </div>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, enim.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#FF3967]">
                <Image src="/youtube-icon.svg" alt="YouTube" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF3967]">
                <Image src="/twitter-icon.svg" alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF3967]">
                <Image src="/facebook-icon.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF3967]">
                <Image src="/instagram-icon.svg" alt="Instagram" width={24} height={24} />
              </Link>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-[#FF3967]">Home</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-[#FF3967]">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#FF3967]">Features</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-[#FF3967]">Gallery</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#FF3967]">View map</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#FF3967]">Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Image src="/location-icon.svg" alt="Address" width={16} height={16} />
                <span className="ml-2 text-gray-600">Address : Lorem</span>
              </li>
              <li className="flex items-center">
                <Image src="/email-icon.svg" alt="Email" width={16} height={16} />
                <span className="ml-2 text-gray-600">Email : xyz@mail.com</span>
              </li>
              <li className="flex items-center">
                <Image src="/phone-icon.svg" alt="Phone" width={16} height={16} />
                <span className="ml-2 text-gray-600">Phone : 00022200222</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        {/* <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-4">Subscribe to the free newsletter and stay up to date</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF3967]"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#FF3967] text-white rounded-full hover:bg-[#E02E55] transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div> */}

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-600">
          © 2025. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
