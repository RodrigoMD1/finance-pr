import { useState } from 'react';
import { 
  FaBook, 
  FaUserPlus, 
  FaSignInAlt, 
  FaChartLine, 
  FaNewspaper, 
  FaFileAlt, 
  FaQuestionCircle,
  FaLightbulb,
  FaExclamationTriangle,
  FaArrowRight,
  FaHome,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalculator
} from 'react-icons/fa';

export const UserManual = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  const sections = [
    { id: 'inicio', title: 'Introducción', icon: FaBook },
    { id: 'registro', title: 'Registro y Login', icon: FaUserPlus },
    { id: 'dashboard', title: 'Panel Principal', icon: FaHome },
    { id: 'finanzas', title: 'Gestión Financiera', icon: FaChartLine },
    { id: 'estadisticas', title: 'Estadísticas', icon: FaFileAlt },
    { id: 'noticias', title: 'Noticias Financieras', icon: FaNewspaper },
    { id: 'consejos', title: 'Consejos y Tips', icon: FaLightbulb },
    { id: 'faq', title: 'Preguntas Frecuentes', icon: FaQuestionCircle }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
              <h2 className="flex items-center gap-3 mb-4 text-3xl font-bold text-primary">
                <FaBook className="text-4xl" />
                Bienvenido a FinancePR
              </h2>
              <p className="mb-4 text-lg leading-relaxed">
                FinancePR es tu plataforma integral para la gestión de inversiones y finanzas personales. 
                Este manual te guiará paso a paso para aprovechar al máximo todas las funcionalidades.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg bg-base-100 border-primary/20">
                  <h3 className="mb-2 text-xl font-semibold text-primary">🎯 Objetivos</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Gestionar tu portafolio de inversiones</li>
                    <li>• Monitorear el rendimiento de tus activos</li>
                    <li>• Acceder a noticias financieras actualizadas</li>
                    <li>• Generar reportes e informes detallados</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-base-100 border-secondary/20">
                  <h3 className="mb-2 text-xl font-semibold text-secondary">⚡ Características</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Interfaz intuitiva y moderna</li>
                    <li>• Datos en tiempo real</li>
                    <li>• Múltiples planes de suscripción</li>
                    <li>• Seguridad de datos garantizada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'registro':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaUserPlus />
              Registro y Autenticación
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-base-100 border-success/30">
                <h3 className="flex items-center gap-2 mb-3 text-xl font-semibold text-success">
                  <FaUserPlus />
                  Crear una cuenta nueva
                </h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Haz clic en el botón <strong>"Iniciar Sesión"</strong> en la esquina superior derecha</li>
                  <li>En el formulario de login, selecciona <strong>"¿No tienes cuenta? Regístrate"</strong></li>
                  <li>Completa el formulario con:
                    <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
                      <li>Nombre completo</li>
                      <li>Email válido</li>
                      <li>Contraseña segura (mínimo 6 caracteres)</li>
                    </ul>
                  </li>
                  <li>Acepta los términos y condiciones</li>
                  <li>Haz clic en <strong>"Registrarse"</strong></li>
                </ol>
                <div className="p-3 mt-4 border-l-4 rounded bg-info/10 border-info">
                  <p className="text-sm"><strong>Nota:</strong> Recibirás un email de confirmación para activar tu cuenta.</p>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-base-100 border-primary/30">
                <h3 className="flex items-center gap-2 mb-3 text-xl font-semibold text-primary">
                  <FaSignInAlt />
                  Iniciar sesión
                </h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Ingresa tu email registrado</li>
                  <li>Introduce tu contraseña</li>
                  <li>Haz clic en <strong>"Iniciar Sesión"</strong></li>
                  <li>Serás redirigido automáticamente al panel principal</li>
                </ol>
                <div className="p-3 mt-4 border-l-4 rounded bg-warning/10 border-warning">
                  <p className="text-sm"><strong>Importante:</strong> Tu sesión expirará automáticamente por seguridad. El sistema te desconectará cuando el token expire.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaHome />
              Panel Principal (Inicio)
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-base-100 border-primary/20">
                <h3 className="mb-3 text-xl font-semibold">🏠 Vista General</h3>
                <p className="mb-4">El panel principal es tu centro de control donde puedes:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-primary/5">
                    <h4 className="mb-2 font-semibold">📊 Resumen Financiero</h4>
                    <p className="text-sm">Visualiza un resumen de tu portafolio y rendimiento general</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/5">
                    <h4 className="mb-2 font-semibold">🔔 Notificaciones</h4>
                    <p className="text-sm">Recibe alertas importantes sobre tus inversiones</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5">
                    <h4 className="mb-2 font-semibold">📈 Gráficos Rápidos</h4>
                    <p className="text-sm">Consulta gráficos básicos de rendimiento</p>
                  </div>
                  <div className="p-4 rounded-lg bg-info/5">
                    <h4 className="mb-2 font-semibold">🚀 Accesos Rápidos</h4>
                    <p className="text-sm">Enlaces directos a las funciones más utilizadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'finanzas':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaChartLine />
              Gestión Financiera
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 border rounded-lg bg-base-100 border-success/30">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-success">
                  <FaPlus />
                  Agregar Inversiones
                </h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Ve a la sección <strong>"Finanzas"</strong> desde el menú principal</li>
                  <li>Haz clic en el botón <strong>"Agregar Nueva Inversión"</strong></li>
                  <li>Completa el formulario:
                    <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
                      <li><strong>Símbolo:</strong> Código del activo (ej: AAPL, TSLA)</li>
                      <li><strong>Cantidad:</strong> Número de acciones/unidades</li>
                      <li><strong>Precio de compra:</strong> Precio pagado por unidad</li>
                      <li><strong>Fecha de compra:</strong> Cuándo realizaste la inversión</li>
                    </ul>
                  </li>
                  <li>Haz clic en <strong>"Guardar"</strong></li>
                </ol>
              </div>

              <div className="p-6 border rounded-lg bg-base-100 border-warning/30">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-warning">
                  <FaEdit />
                  Editar y Gestionar
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaEdit className="mt-1 text-primary" />
                    <div>
                      <h4 className="font-semibold">Editar inversión</h4>
                      <p className="text-sm">Haz clic en el ícono de edición para modificar cantidad, precio o fecha</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaTrash className="mt-1 text-error" />
                    <div>
                      <h4 className="font-semibold">Eliminar inversión</h4>
                      <p className="text-sm">Usa el ícono de papelera para remover inversiones de tu portafolio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEye className="mt-1 text-info" />
                    <div>
                      <h4 className="font-semibold">Ver detalles</h4>
                      <p className="text-sm">Haz clic en cualquier fila para ver información detallada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-base-100 border-info/30">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-info">
                  <FaCalculator />
                  Cálculos Automáticos
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-3 rounded bg-success/10">
                    <h4 className="font-semibold text-success">💰 Ganancia/Pérdida</h4>
                    <p className="text-sm">Se calcula automáticamente basado en el precio actual vs precio de compra</p>
                  </div>
                  <div className="p-3 rounded bg-primary/10">
                    <h4 className="font-semibold text-primary">📊 Rendimiento %</h4>
                    <p className="text-sm">Porcentaje de ganancia o pérdida de cada inversión</p>
                  </div>
                  <div className="p-3 rounded bg-secondary/10">
                    <h4 className="font-semibold text-secondary">💎 Valor Total</h4>
                    <p className="text-sm">Valor actual total de tu portafolio</p>
                  </div>
                  <div className="p-3 rounded bg-accent/10">
                    <h4 className="font-semibold text-accent">🎯 Diversificación</h4>
                    <p className="text-sm">Distribución porcentual de tus activos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'estadisticas':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaFileAlt />
              Estadísticas e Informes
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-base-100 border-primary/20">
                <h3 className="mb-4 text-xl font-semibold">📈 Tipos de Gráficos</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg border-success/30 bg-success/5">
                    <h4 className="mb-2 font-semibold text-success">Gráfico de Líneas</h4>
                    <p className="text-sm">Muestra la evolución temporal de tu portafolio</p>
                  </div>
                  <div className="p-4 border rounded-lg border-primary/30 bg-primary/5">
                    <h4 className="mb-2 font-semibold text-primary">Gráfico de Barras</h4>
                    <p className="text-sm">Compara el rendimiento entre diferentes activos</p>
                  </div>
                  <div className="p-4 border rounded-lg border-secondary/30 bg-secondary/5">
                    <h4 className="mb-2 font-semibold text-secondary">Gráfico Circular</h4>
                    <p className="text-sm">Visualiza la distribución de tu portafolio</p>
                  </div>
                  <div className="p-4 border rounded-lg border-accent/30 bg-accent/5">
                    <h4 className="mb-2 font-semibold text-accent">Métricas Clave</h4>
                    <p className="text-sm">ROI, volatilidad, diversificación y más</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-base-100 border-info/30">
                <h3 className="mb-4 text-xl font-semibold text-info">📋 Generar Reportes</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Ve a la sección <strong>"Estadísticas"</strong></li>
                  <li>Selecciona el período de tiempo (día, semana, mes, año)</li>
                  <li>Elige el tipo de reporte que necesitas</li>
                  <li>Haz clic en <strong>"Generar Reporte"</strong></li>
                  <li>El reporte se generará automáticamente y podrás descargarlo</li>
                </ol>
              </div>
            </div>
          </div>
        );

      case 'noticias':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaNewspaper />
              Noticias Financieras
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-base-100 border-info/30">
                <h3 className="mb-4 text-xl font-semibold text-info">🔄 Noticias en Tiempo Real</h3>
                <p className="mb-4">La sección de noticias te mantiene informado sobre:</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 rounded bg-primary/10">
                    <h4 className="font-semibold">📈 Mercados Financieros</h4>
                    <p className="text-sm">Últimas tendencias y movimientos del mercado</p>
                  </div>
                  <div className="p-3 rounded bg-secondary/10">
                    <h4 className="font-semibold">🏢 Empresas</h4>
                    <p className="text-sm">Noticias corporativas y earnings reports</p>
                  </div>
                  <div className="p-3 rounded bg-accent/10">
                    <h4 className="font-semibold">🌍 Economía Global</h4>
                    <p className="text-sm">Eventos económicos mundiales relevantes</p>
                  </div>
                  <div className="p-3 rounded bg-success/10">
                    <h4 className="font-semibold">💱 Criptomonedas</h4>
                    <p className="text-sm">Precios y noticias del mundo crypto</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-base-100 border-success/30">
                <h3 className="mb-4 text-xl font-semibold text-success">🎯 Cómo usar la sección</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Ve a <strong>"Recursos" → "Noticias"</strong> desde el menú</li>
                  <li>Las noticias se cargan automáticamente</li>
                  <li>Haz clic en cualquier noticia para leer el artículo completo</li>
                  <li>Usa los filtros para encontrar noticias específicas</li>
                  <li>Las noticias se actualizan periódicamente</li>
                </ol>
              </div>
            </div>
          </div>
        );

      case 'consejos':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaLightbulb />
              Consejos y Mejores Prácticas
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-base-100 border-success/30">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-success">
                  <FaLightbulb />
                  Tips para Inversiones Exitosas
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 rounded bg-success/5 border-success">
                    <h4 className="font-semibold">1. 🎯 Diversifica tu portafolio</h4>
                    <p className="text-sm">No pongas todos los huevos en la misma canasta. Invierte en diferentes sectores y tipos de activos.</p>
                  </div>
                  <div className="p-3 border-l-4 rounded bg-primary/5 border-primary">
                    <h4 className="font-semibold">2. 📚 Investiga antes de invertir</h4>
                    <p className="text-sm">Utiliza la sección de noticias y estudia las empresas antes de comprar acciones.</p>
                  </div>
                  <div className="p-3 border-l-4 rounded bg-warning/5 border-warning">
                    <h4 className="font-semibold">3. ⏰ Piensa a largo plazo</h4>
                    <p className="text-sm">Las mejores inversiones suelen requerir paciencia. Evita decisiones impulsivas.</p>
                  </div>
                  <div className="p-3 border-l-4 rounded bg-info/5 border-info">
                    <h4 className="font-semibold">4. 📊 Monitorea regularmente</h4>
                    <p className="text-sm">Usa las estadísticas para revisar el rendimiento de tu portafolio mensualmente.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-base-100 border-warning/30">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-warning">
                  <FaExclamationTriangle />
                  Errores Comunes a Evitar
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-error/20 text-error">❌</span>
                    <p className="text-sm">Invertir dinero que necesitas a corto plazo</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-error/20 text-error">❌</span>
                    <p className="text-sm">Seguir consejos de inversión sin investigar</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-error/20 text-error">❌</span>
                    <p className="text-sm">Vender en pánico durante caídas del mercado</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-error/20 text-error">❌</span>
                    <p className="text-sm">No tener un plan de inversión claro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-primary">
              <FaQuestionCircle />
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-4">
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="text-xl font-medium collapse-title">
                  ¿Cómo puedo cambiar mi contraseña?
                </div>
                <div className="collapse-content">
                  <p>Actualmente la función de cambio de contraseña está en desarrollo. Próximamente estará disponible en la sección de configuración de usuario.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium collapse-title">
                  ¿Los datos de precios son en tiempo real?
                </div>
                <div className="collapse-content">
                  <p>Sí, los precios se actualizan en tiempo real utilizando APIs financieras confiables. Sin embargo, puede haber un pequeño retraso de algunos minutos.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium collapse-title">
                  ¿Qué diferencia hay entre los planes gratuito y premium?
                </div>
                <div className="collapse-content">
                  <p>El plan gratuito incluye funcionalidades básicas de seguimiento. Los planes premium ofrecen reportes avanzados, más noticias, y funciones de análisis profundo. Próximamente estará disponible el sistema de suscripciones.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium collapse-title">
                  ¿Mis datos están seguros?
                </div>
                <div className="collapse-content">
                  <p>Sí, utilizamos encriptación de datos y tokens JWT para la autenticación. Tus datos financieros están protegidos con los más altos estándares de seguridad.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium collapse-title">
                  ¿Puedo exportar mis datos?
                </div>
                <div className="collapse-content">
                  <p>Esta funcionalidad está planificada para futuras actualizaciones. Podrás exportar tus reportes e informes en formatos PDF y Excel.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium collapse-title">
                  ¿Cómo contacto soporte técnico?
                </div>
                <div className="collapse-content">
                  <p>Próximamente estará disponible un sistema de tickets de soporte. Por ahora, puedes reportar problemas a través del repositorio de GitHub del proyecto.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">
            📖 Manual de Usuario - FinancePR
          </h1>
          <p className="text-lg text-base-content/70">
            Guía completa para aprovechar al máximo tu plataforma de inversiones
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky p-6 rounded-lg top-4 bg-base-100 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold">Índice de Contenidos</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-content shadow-md transform scale-105'
                          : 'hover:bg-base-200 text-base-content'
                      }`}
                    >
                      <IconComponent className="text-lg" />
                      <span className="font-medium">{section.title}</span>
                      {activeSection === section.id && (
                        <FaArrowRight className="ml-auto text-sm" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="p-8 rounded-lg bg-base-100 shadow-xl">
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 mt-8 text-center rounded-lg bg-primary/10">
          <p className="text-sm text-base-content/70">
            ¿Necesitas ayuda adicional? Este manual se actualiza constantemente. 
            <br />
            Versión 1.0 - Última actualización: Julio 2025
          </p>
        </div>
      </div>
    </div>
  );
};
