import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaWallet, FaGraduationCap, FaUsers, FaPlay, FaCheckCircle, FaArrowRight, FaShieldAlt, FaBitcoin, FaNewspaper, FaRocket, FaStar } from 'react-icons/fa';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    users: 0,
    transactions: 0,
    savings: 0
  });

  // Datos para el carrusel de características
  const features = [
    {
      title: "Control Total de Finanzas",
      description: "Rastrea ingresos, gastos y ahorra dinero de manera inteligente",
      icon: FaWallet,
      color: "blue"
    },
    {
      title: "Educación Financiera",
      description: "Aprende con 8 módulos interactivos desde básico hasta avanzado",
      icon: FaGraduationCap,
      color: "green"
    },
    {
      title: "Datos en Tiempo Real",
      description: "Precios actualizados de +10,000 criptos y acciones globales",
      icon: FaChartLine,
      color: "purple"
    },
    {
      title: "Comunidad Activa",
      description: "Únete a miles de usuarios construyendo su libertad financiera",
      icon: FaUsers,
      color: "orange"
    }
  ];

  // Efecto para cambiar slides automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Animación de números
  useEffect(() => {
    const animateNumber = (target: number, key: keyof typeof animatedNumbers, duration: number = 2000) => {
      let start = 0;
      const increment = target / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setAnimatedNumbers(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setAnimatedNumbers(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 50);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateNumber(2500, 'users');
        animateNumber(15000, 'transactions');
        animateNumber(85, 'savings');
      }
    });

    const heroElement = document.getElementById('hero-section');
    if (heroElement) observer.observe(heroElement);

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div id="hero-section" className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
      {/* Elementos de fondo animados */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16">
            
            {/* Contenido principal */}
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
              
              {/* Lado izquierdo - Contenido */}
              <div className="space-y-8 text-white">
                
                {/* Badge de nuevo */}
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
                  <FaRocket className="mr-2 text-yellow-400" />
                  Nueva versión con +10,000 activos en tiempo real
                </div>

                {/* Título principal */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Controla tus
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Finanzas</span>
                    <br />
                    como un Experto
                  </h1>
                  <p className="text-xl text-blue-100 max-w-2xl">
                    La plataforma más completa de Argentina para gestión financiera, inversiones inteligentes y educación económica. 
                    Gratis, segura y fácil de usar.
                  </p>
                </div>

                {/* Características destacadas */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                    <span className="text-blue-100">100% Gratuito siempre</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                    <span className="text-blue-100">Datos seguros y privados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                    <span className="text-blue-100">Sin registros complicados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                    <span className="text-blue-100">Soporte 24/7 directo</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/finance"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <FaRocket className="mr-2" />
                    Comenzar Gratis Ahora
                  </Link>
                  
                  <Link 
                    to="/education"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200"
                  >
                    <FaPlay className="mr-2" />
                    Ver Demo Interactiva
                  </Link>
                </div>

                {/* Estadísticas animadas */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {animatedNumbers.users.toLocaleString()}+
                    </div>
                    <div className="text-sm text-blue-200">Usuarios Activos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {animatedNumbers.transactions.toLocaleString()}+
                    </div>
                    <div className="text-sm text-blue-200">Transacciones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {animatedNumbers.savings}%
                    </div>
                    <div className="text-sm text-blue-200">Ahorro Promedio</div>
                  </div>
                </div>
              </div>

              {/* Lado derecho - Carrusel de características */}
              <div className="relative">
                
                {/* Carrusel principal */}
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    
                    {/* Indicadores del carrusel */}
                    <div className="flex justify-center space-x-2 mb-6">
                      {features.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Contenido del slide actual */}
                    <div className="text-center space-y-6 min-h-[280px] flex flex-col justify-center">
                      {(() => {
                        const feature = features[currentSlide];
                        const colors = getColorClasses(feature.color);
                        return (
                          <>
                            <div className={`inline-flex items-center justify-center w-20 h-20 ${colors.bg} rounded-2xl mx-auto transform hover:scale-110 transition-transform duration-300`}>
                              <feature.icon className={`text-3xl ${colors.text}`} />
                            </div>
                            
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-4">
                                {feature.title}
                              </h3>
                              <p className="text-blue-100 text-lg leading-relaxed">
                                {feature.description}
                              </p>
                            </div>

                            <div className="flex justify-center">
                              <Link 
                                to={feature.title.includes('Educación') ? '/education' : '/finance'}
                                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200"
                              >
                                Explorar ahora
                                <FaArrowRight className="ml-2 text-sm" />
                              </Link>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Elementos flotantes decorativos */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-bounce">
                  <FaBitcoin className="inline mr-2" />
                  Live Prices
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg">
                  <FaShieldAlt className="inline mr-2" />
                  100% Seguro
                </div>

                <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg shadow-lg transform -rotate-12">
                  <FaStar className="inline mr-1" />
                  4.9/5
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sección de confianza */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <p className="text-blue-200 font-medium">Trusted by thousands of users across Argentina</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Logos/badges simulados */}
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-2">
                <FaNewspaper className="text-2xl text-white mx-auto" />
              </div>
              <span className="text-sm text-blue-200">Noticias</span>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-2">
                <FaGraduationCap className="text-2xl text-white mx-auto" />
              </div>
              <span className="text-sm text-blue-200">Educación</span>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-2">
                <FaChartLine className="text-2xl text-white mx-auto" />
              </div>
              <span className="text-sm text-blue-200">Analytics</span>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-2">
                <FaUsers className="text-2xl text-white mx-auto" />
              </div>
              <span className="text-sm text-blue-200">Community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}