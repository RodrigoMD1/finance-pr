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
            <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30 shadow-lg">
              <h2 className="flex items-center gap-3 mb-4 text-3xl font-bold text-black">
                <FaBook className="text-4xl text-amber-400" />
                Bienvenido a FinancePR
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-black">
                FinancePR es tu plataforma integral para la gestión de inversiones y finanzas personales. 
                Este manual te guiará paso a paso para aprovechar al máximo todas las funcionalidades.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg glass-effect border-emerald-500/30">
                  <h3 className="mb-2 text-xl font-semibold text-emerald-400">🎯 Objetivos</h3>
                  <ul className="space-y-1 text-sm text-black">
                    <li>• Gestionar tu portafolio de inversiones</li>
                    <li>• Monitorear el rendimiento de tus activos</li>
                    <li>• Acceder a noticias financieras actualizadas</li>
                    <li>• Generar reportes e informes detallados</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg glass-effect border-cyan-500/30">
                  <h3 className="mb-2 text-xl font-semibold text-cyan-400">⚡ Características</h3>
                  <ul className="space-y-1 text-sm text-black">
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
            <h2 className="flex items-center gap-3 text-3xl font-bold text-black">
              <FaUserPlus />
              Registro y Autenticación
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-emerald-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-3 text-xl font-semibold text-emerald-400">
                  <FaUserPlus />
                  Crear una cuenta nueva
                </h3>
                <ol className="space-y-2 text-sm text-black list-decimal list-inside">
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
                  <li>Haz clic en <strong className="text-black">"Registrarse"</strong></li>
                </ol>
                <div className="p-3 mt-4 border-l-4 rounded bg-amber-500/10 border-amber-500">
                  <p className="text-sm text-black"><strong className="text-amber-400">Nota:</strong> Recibirás un email de confirmación para activar tu cuenta.</p>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-cyan-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-3 text-xl font-semibold text-cyan-400">
                  <FaSignInAlt />
                  Iniciar sesión
                </h3>
                <ol className="space-y-2 text-sm text-black list-decimal list-inside">
                  <li>Ingresa tu email registrado</li>
                  <li>Introduce tu contraseña</li>
                  <li>Haz clic en <strong>"Iniciar Sesión"</strong></li>
                  <li>Serás redirigido automáticamente al panel principal</li>
                </ol>
                <div className="p-3 mt-4 border-l-4 rounded bg-orange-500/10 border-orange-500">
                  <p className="text-sm text-black"><strong className="text-orange-400">Importante:</strong> Tu sesión expirará automáticamente por seguridad. El sistema te desconectará cuando el token expire.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
              <FaHome />
              Panel Principal (Inicio)
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/20 shadow-lg">
                <h3 className="mb-3 text-xl font-semibold text-black">🏠 Vista General</h3>
                <p className="mb-4 text-black">El panel principal es tu centro de control donde puedes:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <h4 className="mb-2 font-semibold text-emerald-400">📊 Resumen Financiero</h4>
                    <p className="text-sm text-black">Visualiza un resumen de tu portafolio y rendimiento general</p>
                  </div>
                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <h4 className="mb-2 font-semibold text-cyan-400">🔔 Notificaciones</h4>
                    <p className="text-sm text-black">Recibe alertas importantes sobre tus inversiones</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <h4 className="mb-2 font-semibold text-amber-400">📈 Gráficos Rápidos</h4>
                    <p className="text-sm text-black">Consulta gráficos básicos de rendimiento</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <h4 className="mb-2 font-semibold text-purple-400">🚀 Accesos Rápidos</h4>
                    <p className="text-sm text-black">Enlaces directos a las funciones más utilizadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'finanzas':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-black">
              <FaChartLine />
              Gestión Financiera
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-emerald-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-emerald-400">
                  <FaPlus />
                  Agregar Inversiones
                </h3>
                <ol className="space-y-2 text-black list-decimal list-inside">
                  <li>Ve a la sección <strong>"Finanzas"</strong> desde el menú principal</li>
                  <li>Haz clic en el botón <strong>"Agregar Nueva Inversión"</strong></li>
                  <li>Completa el formulario:
                    <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
                      <li><strong className="text-black">Símbolo:</strong> Código del activo (ej: AAPL, TSLA)</li>
                      <li><strong className="text-black">Cantidad:</strong> Número de acciones/unidades</li>
                      <li><strong className="text-black">Precio de compra:</strong> Precio pagado por unidad</li>
                      <li><strong className="text-black">Fecha de compra:</strong> Cuándo realizaste la inversión</li>
                    </ul>
                  </li>
                  <li>Haz clic en <strong className="text-black">"Guardar"</strong></li>
                </ol>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-orange-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-orange-400">
                  <FaEdit />
                  Editar y Gestionar
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaEdit className="mt-1 text-cyan-400" />
                    <div>
                      <h4 className="font-semibold text-black">Editar inversión</h4>
                      <p className="text-sm text-black">Haz clic en el ícono de edición para modificar cantidad, precio o fecha</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaTrash className="mt-1 text-red-400" />
                    <div>
                      <h4 className="font-semibold text-black">Eliminar inversión</h4>
                      <p className="text-sm text-black">Usa el ícono de papelera para remover inversiones de tu portafolio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEye className="mt-1 text-purple-400" />
                    <div>
                      <h4 className="font-semibold text-black">Ver detalles</h4>
                      <p className="text-sm text-black">Haz clic en cualquier fila para ver información detallada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-cyan-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-cyan-400">
                  <FaCalculator />
                  Cálculos Automáticos
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30">
                    <h4 className="font-semibold text-emerald-400">💰 Ganancia/Pérdida</h4>
                    <p className="text-sm text-black">Se calcula automáticamente basado en el precio actual vs precio de compra</p>
                  </div>
                  <div className="p-3 rounded bg-cyan-500/10 border border-cyan-500/30">
                    <h4 className="font-semibold text-cyan-400">📊 Rendimiento %</h4>
                    <p className="text-sm text-black">Porcentaje de ganancia o pérdida de cada inversión</p>
                  </div>
                  <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30">
                    <h4 className="font-semibold text-amber-400">💎 Valor Total</h4>
                    <p className="text-sm text-black">Valor actual total de tu portafolio</p>
                  </div>
                  <div className="p-3 rounded bg-purple-500/10 border border-purple-500/30">
                    <h4 className="font-semibold text-purple-400">🎯 Diversificación</h4>
                    <p className="text-sm text-black">Distribución porcentual de tus activos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'estadisticas':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-black">
              <FaFileAlt />
              Estadísticas e Informes
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/20 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-black">📈 Tipos de Gráficos</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg border-emerald-500/30 bg-emerald-500/5">
                    <h4 className="mb-2 font-semibold text-emerald-400">Gráfico de Líneas</h4>
                    <p className="text-sm text-black">Muestra la evolución temporal de tu portafolio</p>
                  </div>
                  <div className="p-4 border rounded-lg border-cyan-500/30 bg-cyan-500/5">
                    <h4 className="mb-2 font-semibold text-cyan-400">Gráfico de Barras</h4>
                    <p className="text-sm text-black">Compara el rendimiento entre diferentes activos</p>
                  </div>
                  <div className="p-4 border rounded-lg border-amber-500/30 bg-amber-500/5">
                    <h4 className="mb-2 font-semibold text-amber-400">Gráfico Circular</h4>
                    <p className="text-sm text-black">Visualiza la distribución de tu portafolio</p>
                  </div>
                  <div className="p-4 border rounded-lg border-purple-500/30 bg-purple-500/5">
                    <h4 className="mb-2 font-semibold text-purple-400">Métricas Clave</h4>
                    <p className="text-sm text-black">ROI, volatilidad, diversificación y más</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-cyan-500/30 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-cyan-400">📋 Generar Reportes</h3>
                <ol className="space-y-2 text-black list-decimal list-inside">
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
            <h2 className="flex items-center gap-3 text-3xl font-bold text-black">
              <FaNewspaper />
              Noticias Financieras
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-cyan-500/30 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-cyan-400">🔄 Noticias en Tiempo Real</h3>
                <p className="mb-4 text-black">La sección de noticias te mantiene informado sobre:</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30">
                    <h4 className="font-semibold text-emerald-400">📈 Mercados Financieros</h4>
                    <p className="text-sm text-black">Últimas tendencias y movimientos del mercado</p>
                  </div>
                  <div className="p-3 rounded bg-cyan-500/10 border border-cyan-500/30">
                    <h4 className="font-semibold text-cyan-400">🏢 Empresas</h4>
                    <p className="text-sm text-black">Noticias corporativas y earnings reports</p>
                  </div>
                  <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30">
                    <h4 className="font-semibold text-amber-400">🌍 Economía Global</h4>
                    <p className="text-sm text-black">Eventos económicos mundiales relevantes</p>
                  </div>
                  <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
                    <h4 className="font-semibold text-orange-400">💱 Criptomonedas</h4>
                    <p className="text-sm text-black">Precios y noticias del mundo crypto</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-emerald-500/30 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-emerald-400">🎯 Cómo usar la sección</h3>
                <ol className="space-y-2 text-black list-decimal list-inside">
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
            <h2 className="flex items-center gap-3 text-3xl font-bold text-black">
              <FaLightbulb />
              Consejos y Mejores Prácticas
            </h2>
            
            <div className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-emerald-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-emerald-400">
                  <FaLightbulb />
                  Tips para Inversiones Exitosas
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 rounded bg-emerald-500/10 border-emerald-500">
                    <h4 className="font-semibold text-black">1. 🎯 Diversifica tu portafolio</h4>
                    <p className="text-sm text-black">No pongas todos los huevos en la misma canasta. Invierte en diferentes sectores y tipos de activos.</p>
                  </div>
                  <div className="p-3 border-l-4 rounded bg-cyan-500/10 border-cyan-500">
                    <h4 className="font-semibold text-black">2. 📚 Investiga antes de invertir</h4>
                    <p className="text-sm text-black">Utiliza la sección de noticias y estudia las empresas antes de comprar acciones.</p>
                  </div>
                  <div className="p-3 border-l-4 rounded bg-amber-500/10 border-amber-500">
                    <h4 className="font-semibold text-black">3. ⏰ Piensa a largo plazo</h4>
                    <p className="text-sm text-black">Las mejores inversiones suelen requerir paciencia. Evita decisiones impulsivas.</p>
                  </div>
                  <div className="p-3 border-l-4 rounded bg-purple-500/10 border-purple-500">
                    <h4 className="font-semibold text-black">4. 📊 Monitorea regularmente</h4>
                    <p className="text-sm text-black">Usa las estadísticas para revisar el rendimiento de tu portafolio mensualmente.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-orange-500/30 shadow-lg">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-orange-400">
                  <FaExclamationTriangle />
                  Errores Comunes a Evitar
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">❌</span>
                    <p className="text-sm text-black">Invertir dinero que necesitas a corto plazo</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">❌</span>
                    <p className="text-sm text-black">Seguir consejos de inversión sin investigar</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">❌</span>
                    <p className="text-sm text-black">Vender en pánico durante caídas del mercado</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">❌</span>
                    <p className="text-sm text-black">No tener un plan de inversión claro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <h2 className="flex items-center gap-3 text-3xl font-bold text-black">
              <FaQuestionCircle />
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg collapse collapse-arrow bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="text-xl font-medium text-black collapse-title">
                  ¿Cómo puedo cambiar mi contraseña?
                </div>
                <div className="text-black collapse-content">
                  <p>Actualmente la función de cambio de contraseña está en desarrollo. Próximamente estará disponible en la sección de configuración de usuario.</p>
                </div>
              </div>

              <div className="border rounded-lg collapse collapse-arrow bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium text-black collapse-title">
                  ¿Los datos de precios son en tiempo real?
                </div>
                <div className="text-black collapse-content">
                  <p>Sí, los precios se actualizan en tiempo real utilizando APIs financieras confiables. Sin embargo, puede haber un pequeño retraso de algunos minutos.</p>
                </div>
              </div>

              <div className="border rounded-lg collapse collapse-arrow bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium text-black collapse-title">
                  ¿Qué diferencia hay entre los planes gratuito y premium?
                </div>
                <div className="text-black collapse-content">
                  <p>El plan gratuito incluye funcionalidades básicas de seguimiento. Los planes premium ofrecen reportes avanzados, más noticias, y funciones de análisis profundo. Próximamente estará disponible el sistema de suscripciones.</p>
                </div>
              </div>

              <div className="border rounded-lg collapse collapse-arrow bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium text-black collapse-title">
                  ¿Mis datos están seguros?
                </div>
                <div className="text-black collapse-content">
                  <p>Sí, utilizamos encriptación de datos y tokens JWT para la autenticación. Tus datos financieros están protegidos con los más altos estándares de seguridad.</p>
                </div>
              </div>

              <div className="border rounded-lg collapse collapse-arrow bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium text-black collapse-title">
                  ¿Puedo exportar mis datos?
                </div>
                <div className="text-black collapse-content">
                  <p>Esta funcionalidad está planificada para futuras actualizaciones. Podrás exportar tus reportes e informes en formatos PDF y Excel.</p>
                </div>
              </div>

              <div className="border rounded-lg collapse collapse-arrow bg-gradient-to-br from-charcoal/90 to-charcoal/50 border-amber-500/30">
                <input type="radio" name="faq-accordion" />
                <div className="text-xl font-medium text-black collapse-title">
                  ¿Cómo contacto soporte técnico?
                </div>
                <div className="text-black collapse-content">
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
    <div className="min-h-screen bg-gradient-to-br from-industrial-charcoal via-industrial-iron to-industrial-charcoal">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Header mejorado */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg">
            <FaBook className="inline mr-3 text-amber-400" />
            Manual de Usuario - FinancePR
          </h1>
          <p className="text-lg text-black">
            Guía completa para aprovechar al máximo tu plataforma de inversiones
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Navigation mejorado */}
          <div className="lg:w-1/4">
            <div className="sticky p-6 border rounded-xl top-4 glass-effect border-amber-500/20 shadow-xl">
              <h3 className="mb-4 text-lg font-bold text-black">📑 Índice de Contenidos</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 text-left rounded-lg transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 transform scale-105'
                          : 'hover:bg-industrial-iron/50 text-black hover:text-amber-600 border border-transparent hover:border-amber-500/30'
                      }`}
                    >
                      <IconComponent className="text-lg flex-shrink-0" />
                      <span className="font-medium">{section.title}</span>
                      {activeSection === section.id && (
                        <FaArrowRight className="ml-auto text-sm animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content mejorado */}
          <div className="lg:w-3/4">
            <div className="p-8 border rounded-xl glass-effect border-amber-500/20 shadow-xl animate-fade-in">
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Footer mejorado */}
        <div className="p-6 mt-8 text-center border rounded-xl glass-effect border-amber-500/20 shadow-lg animate-fade-in">
          <p className="text-sm text-black">
            ¿Necesitas ayuda adicional? Este manual se actualiza constantemente. 
            <br />
            <span className="font-bold text-amber-400">Versión 1.0 - Última actualización: Octubre 2025</span>
          </p>
        </div>
      </div>
    </div>
  );
};
