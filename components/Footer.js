import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white p-6 text-center flex flex-col items-center">
      <p className="mb-3 font-semibold">Connect with us</p>
      
      <div className="flex space-x-6 mb-3">
        <a
          href="https://github.com/Kaniz-Naiba"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaGithub size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/kaniz-naiba"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-400 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      <p className="text-sm text-yellow-300">&copy; {new Date().getFullYear()} My Product</p>
    </footer>
  );
}
