import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-[#111827] py-4 text-center">
      <div className="flex items-center justify-center mb-4">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl mr-4"
        >
          <FaFacebook color="#111827" size={18} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl mr-4"
        >
          <FaInstagram color="#111827" size={18} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl mr-4"
        >
          <FaTwitter color="#111827" size={18} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl"
        >
          <FaYoutube color="#111827" size={18} />
        </a>
      </div>
      <div className="flex gap-6 items-center justify-center mb-4">
        <p className="font-semibold text-sm">Condition of Use</p>
        <p className="font-semibold text-sm">Privacy & Policy</p>
        <p className="font-semibold text-sm">Press Room</p>
      </div>
      <p className="text-sm font-semibold">
        © 2021 MovieBox by Adriana Eka Prayudha
      </p>
    </footer>
  );
};

export default Footer;
