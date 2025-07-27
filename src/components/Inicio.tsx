import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaShieldAlt, FaGraduationCap, FaBitcoin, FaNewspaper, FaUsers, FaRocket, FaLightbulb, FaArrowRight, FaCheckCircle, FaStar, FaPlay, FaWallet, FaBookOpen, FaMobile, FaEnvelope, FaQuestionCircle, FaLifeRing } from 'react-icons/fa';
import finanzasImg from '../assets/img/finance235.jpg';

export default function Inicio() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    users: 1500,
    transactions: 25000,
    savings: 15
  });

  // Función para obtener clases de color de forma segura
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        check: 'text-blue-500',
        gradient: 'from-blue-500 to-blue-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        check: 'text-green-500',
        gradient: 'from-green-500 to-green-600'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        check: 'text-purple-500',
        gradient: 'from-purple-500 to-purple-600'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        check: 'text-orange-500',
        gradient: 'from-orange-500 to-orange-600'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        check: 'text-red-500',
        gradient: 'from-red-500 to-red-600'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        check: 'text-indigo-500',
        gradient: 'from-indigo-500 to-indigo-600'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const testimonials = [
    {
      name: "María González",
      role: "Emprendedora",
      content: "FinancePR me ayudó a organizar mis finanzas personales y de mi negocio. Ahora ahorro 25% más cada mes.",
      rating: 5
    },
    {
      name: "Carlos Rodriguez",
      role: "Estudiante de Ingeniería",
      content: "La sección de educación financiera es increíble. Aprendí a invertir desde cero y ya tengo mi primer portfolio.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Profesional IT",
      content: "El sistema de activos en tiempo real es fantástico. Puedo seguir mis criptos y acciones en un solo lugar.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    // Animación de números
    const interval = setInterval(() => {
      setStats(prev => ({
        users: Math.min(prev.users + Math.floor(Math.random() * 3), 2500),
        transactions: Math.min(prev.transactions + Math.floor(Math.random() * 50), 50000),
        savings: Math.min(prev.savings + (Math.random() < 0.3 ? 1 : 0), 30)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <FaRocket className="mr-2" />
                  ¡Nuevo! Sistema de activos en tiempo real
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Tu <span className="text-blue-600">Futuro Financiero</span><br />
                  Comienza Aquí
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Plataforma integral para gestionar tus finanzas, invertir inteligentemente y 
                  aprender sobre mercados. Más de <strong className="text-blue-600">10,000 activos</strong> en tiempo real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/finance" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  <FaRocket className="mr-2" />
                  Comenzar Gratis
                </Link>
                <Link 
                  to="/education" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <FaPlay className="mr-2" />
                  Ver Demo
                </Link>
              </div>

              {/* Stats en vivo */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.users.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Usuarios Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.transactions.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600">Transacciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.savings}%</div>
                  <div className="text-sm text-gray-600">Ahorro Promedio</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src={finanzasImg}
                  alt="Dashboard FinancePR"
                  className="rounded-2xl shadow-2xl border-4 border-white"
                />
                {/* Elementos flotantes */}
                <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
                  <FaChartLine className="inline mr-2" />
                  +25% ROI
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  <FaBitcoin className="inline mr-2" />
                  Live Prices
                </div>
              </div>
              {/* Efectos de fondo */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-green-400 to-blue-500 rounded-2xl transform -rotate-3 scale-110 opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en una plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde gestión básica hasta trading avanzado con más de 10,000 activos en tiempo real
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaWallet,
                title: "Gestión Inteligente",
                description: "Controla ingresos, gastos y presupuestos con análisis automático de patrones",
                features: ["Categorización automática", "Alertas inteligentes", "Reportes personalizados"],
                color: "blue"
              },
              {
                icon: FaChartLine,
                title: "Inversiones en Tiempo Real",
                description: "Acceso a +10,000 criptomonedas y miles de acciones con precios actualizados",
                features: ["APIs CoinGecko & Yahoo", "Portafolios diversificados", "Alertas de precio"],
                color: "green"
              },
              {
                icon: FaGraduationCap,
                title: "Educación Financiera",
                description: "Aprende desde conceptos básicos hasta estrategias avanzadas de inversión",
                features: ["8 módulos completos", "Calculadoras interactivas", "Análisis técnico"],
                color: "purple"
              },
              {
                icon: FaNewspaper,
                title: "Noticias Financieras",
                description: "Mantente informado con noticias actualizadas del mundo financiero",
                features: ["Múltiples fuentes", "Filtros personalizados", "Análisis de sentimiento"],
                color: "orange"
              },
              {
                icon: FaShieldAlt,
                title: "Seguridad Avanzada",
                description: "Tus datos protegidos con cifrado de grado bancario y autenticación segura",
                features: ["Cifrado end-to-end", "Autenticación 2FA", "Backups automáticos"],
                color: "red"
              },
              {
                icon: FaMobile,
                title: "Multiplataforma",
                description: "Accede desde cualquier dispositivo con sincronización en tiempo real",
                features: ["Responsive design", "PWA support", "Offline mode"],
                color: "indigo"
              }
            ].map((feature, index) => {
              const colors = getColorClasses(feature.color);
              return (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.bg} ${colors.text} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <FaCheckCircle className={`${colors.check} mr-3 text-xs`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Números que hablan por sí solos
            </h2>
            <p className="text-xl text-blue-100">
              Únete a miles de usuarios que ya transformaron sus finanzas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Activos Disponibles", icon: FaBitcoin },
              { number: "2,500+", label: "Usuarios Registrados", icon: FaUsers },
              { number: "50,000+", label: "Transacciones", icon: FaChartLine },
              { number: "30%", label: "Ahorro Promedio", icon: FaLightbulb }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all duration-200">
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Historias reales de personas que cambiaron su situación financiera
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl mr-1" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para transformar tus finanzas?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Únete a miles de usuarios que ya están construyendo su libertad financiera
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/finance" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              <FaRocket className="mr-2" />
              Comenzar Ahora - Gratis
            </Link>
            <Link 
              to="/education" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <FaBookOpen className="mr-2" />
              Explorar Educación
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center">
              <FaCheckCircle className="text-green-300 mr-3 text-xl" />
              <span>Sin costos ocultos</span>
            </div>
            <div className="flex items-center justify-center">
              <FaCheckCircle className="text-green-300 mr-3 text-xl" />
              <span>Datos 100% seguros</span>
            </div>
            <div className="flex items-center justify-center">
              <FaCheckCircle className="text-green-300 mr-3 text-xl" />
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Gestión Financiera", link: "/finance", icon: FaWallet, desc: "Control total de tu dinero" },
              { title: "Noticias Financieras", link: "/news", icon: FaNewspaper, desc: "Mantente informado" },
              { title: "Educación", link: "/education", icon: FaGraduationCap, desc: "Aprende a invertir" },
              { title: "Manual de Usuario", link: "/manual", icon: FaBookOpen, desc: "Guías completas" }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.link}
                className="group p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:shadow-lg"
              >
                <item.icon className="text-3xl text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                <div className="flex items-center text-blue-600 font-medium text-sm">
                  Explorar <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Necesitas Ayuda?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para apoyarte en tu camino hacia la libertad financiera. 
              Contáctanos si tienes preguntas, problemas técnicos o necesitas orientación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contacto Directo</h3>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email de Soporte</h4>
                    <p className="text-gray-600">Respuesta en 24 horas</p>
                  </div>
                </div>
                <a 
                  href="mailto:rodrigo.martinez224@gmail.com?subject=Consulta%20FinancePR&body=Hola%20Rodrigo,%0A%0ATengo%20una%20consulta%20sobre%20FinancePR:%0A%0A[Describe%20tu%20consulta%20aquí]%0A%0AGracias!"
                  className="block bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  rodrigo.martinez224@gmail.com
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mr-4">
                    <FaLifeRing className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tipos de Consulta</h4>
                    <p className="text-gray-600">Te ayudamos con todo</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <FaQuestionCircle className="text-blue-500 mr-3 text-sm" />
                    Problemas técnicos y errores
                  </li>
                  <li className="flex items-center">
                    <FaQuestionCircle className="text-blue-500 mr-3 text-sm" />
                    Dudas sobre funcionalidades
                  </li>
                  <li className="flex items-center">
                    <FaQuestionCircle className="text-blue-500 mr-3 text-sm" />
                    Sugerencias de mejora
                  </li>
                  <li className="flex items-center">
                    <FaQuestionCircle className="text-blue-500 mr-3 text-sm" />
                    Consultas sobre educación financiera
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form Preview */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mensaje Rápido</h3>
              <p className="text-gray-600 mb-6">
                Copia y pega este template en tu email para que pueda ayudarte más rápido:
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">Asunto: Consulta FinancePR</p>
                  <p className="mb-3">Hola Rodrigo,</p>
                  <p className="mb-2">Tengo una consulta sobre FinancePR:</p>
                  <p className="mb-2 text-gray-500">[Describe tu problema o consulta aquí]</p>
                  <p className="mb-2">Información adicional:</p>
                  <ul className="text-gray-500 ml-4 mb-3">
                    <li>• Navegador que uso: _______</li>
                    <li>• ¿En qué sección ocurre?: _______</li>
                    <li>• ¿Qué estaba haciendo?: _______</li>
                  </ul>
                  <p>¡Gracias por tu ayuda!</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  <span className="text-sm font-medium text-gray-700">Respuesta garantizada en 24 horas</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-8">Preguntas Frecuentes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <FaQuestionCircle className="text-blue-500 text-2xl mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 mb-2">¿Es gratis la plataforma?</h4>
                <p className="text-sm text-gray-600">Sí, todas las funciones básicas son completamente gratuitas.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <FaQuestionCircle className="text-blue-500 text-2xl mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 mb-2">¿Mis datos están seguros?</h4>
                <p className="text-sm text-gray-600">Usamos encriptación y no almacenamos información sensible.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <FaQuestionCircle className="text-blue-500 text-2xl mx-auto mb-4" />
                <h4 className="font-medium text-gray-900 mb-2">¿Cómo funciona la educación?</h4>
                <p className="text-sm text-gray-600">Tenemos 8 módulos interactivos desde básico hasta avanzado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">FinancePR</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Tu plataforma integral para gestión financiera, inversiones inteligentes y educación económica. 
                Construyendo el futuro financiero de Argentina.
              </p>
              <div className="flex space-x-4">
                <FaBitcoin className="text-orange-400 text-2xl" />
                <FaChartLine className="text-green-400 text-2xl" />
                <FaGraduationCap className="text-blue-400 text-2xl" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/finance" className="hover:text-white transition-colors">Finanzas</Link></li>
                <li><Link to="/education" className="hover:text-white transition-colors">Educación</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">Noticias</Link></li>
                <li><Link to="/manual" className="hover:text-white transition-colors">Manual</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#help" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                <li><a href="mailto:rodrigo.martinez224@gmail.com?subject=Consulta%20FinancePR" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FinancePR. Desarrollado con ❤️ para tu tranquilidad financiera.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}