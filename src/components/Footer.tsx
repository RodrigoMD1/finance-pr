import { FaLinkedin, FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold !text-white mb-2">
              FinancePR
            </h3>
            <p className="!text-gray-300 text-sm">
              Gestión inteligente de inversiones
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="font-semibold mb-3 !text-white">¿Necesitas ayuda?</h4>
            <a
              href="mailto:rodrigo.martinez224@gmail.com"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 text-lg"
              aria-label="Enviar email a rodrigo.martinez224@gmail.com"
            >
              rodrigo.martinez224@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-3 !text-white">Síguenos</h4>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="https://www.linkedin.com/in/rodrigo-martinez-duvivier-525066252/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                aria-label="Visitar perfil de LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://github.com/RodrigoMD1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                aria-label="Visitar perfil de GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="font-semibold text-white">Rodrigo Martinez Duvivier</span>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Desarrollado con ❤️ en Argentina 🇦🇷
          </p>
        </div>
      </div>
    </footer>
  );
}