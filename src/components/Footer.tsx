export const Footer = () => {
  return (
    <footer className="p-6 footer footer-center text-base-content border-base-300">
      <aside className="flex flex-col items-center gap-2">
        <span className="text-lg font-semibold text-primary">FinancePR</span>
        <p className="text-sm">
          © {new Date().getFullYear()} Rodrigo Martinez Duvivier. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="mailto:rodrigo.martinez224@gmail.com?subject=Consulta%20FinancePR"
            className="link link-hover text-info"
            aria-label="Enviar correo"
          >
            Contacto
          </a>
          <a
            href="https://www.linkedin.com/in/rodrigo-martinez-duvivier-525066252/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover text-info"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </aside>
    </footer>
  );
}