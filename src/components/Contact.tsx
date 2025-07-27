import React, { useState } from 'react';
import { FaEnvelope, FaLifeRing, FaQuestionCircle, FaCheckCircle, FaBug, FaLightbulb, FaClock, FaShieldAlt } from 'react-icons/fa';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('rodrigo.martinez224@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactReasons = [
    {
      icon: FaBug,
      title: "Problemas Técnicos",
      description: "Errores, bugs o funcionalidades que no funcionan correctamente",
      color: "red"
    },
    {
      icon: FaQuestionCircle,
      title: "Dudas de Uso",
      description: "Preguntas sobre cómo usar las funcionalidades de la plataforma",
      color: "blue"
    },
    {
      icon: FaLightbulb,
      title: "Sugerencias",
      description: "Ideas para mejorar la plataforma o nuevas funcionalidades",
      color: "yellow"
    },
    {
      icon: FaLifeRing,
      title: "Ayuda General",
      description: "Cualquier otro tipo de consulta o problema que tengas",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Estamos Aquí Para Ayudarte
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            ¿Tienes problemas, dudas o sugerencias? Contáctame directamente y te responderé lo antes posible.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contacto Directo</h2>
              <p className="text-gray-600 text-lg">
                Soy Rodrigo, el desarrollador de FinancePR. Te responderé personalmente.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mr-4">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Email Principal</h3>
                  <p className="text-gray-600">Respuesta garantizada en 24 horas</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-lg font-mono text-gray-800 break-all">
                    rodrigo.martinez224@gmail.com
                  </p>
                </div>

                <div className="flex gap-3">
                  <a 
                    href="mailto:rodrigo.martinez224@gmail.com?subject=Consulta%20FinancePR&body=Hola%20Rodrigo,%0A%0ATengo%20una%20consulta%20sobre%20FinancePR:%0A%0A[Describe%20tu%20consulta%20aquí]%0A%0AInformación%20adicional:%0A•%20Navegador:%20_____%0A•%20Sección:%20_____%0A•%20¿Qué%20estaba%20haciendo?:%20_____%0A%0A¡Gracias!"
                    className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Abrir Email
                  </a>
                  <button
                    onClick={copyEmail}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      copiedEmail 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {copiedEmail ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaClock className="text-green-600 text-xl mr-3" />
                <h3 className="font-semibold text-green-800">Tiempo de Respuesta</h3>
              </div>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3 text-sm" />
                  Problemas urgentes: 2-6 horas
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3 text-sm" />
                  Consultas generales: 12-24 horas
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3 text-sm" />
                  Sugerencias: 24-48 horas
                </li>
              </ul>
            </div>
          </div>

          {/* Email Template */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Template de Email</h3>
            <p className="text-gray-600 mb-6">
              Copia este template para que pueda ayudarte más rápido:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 font-mono text-sm">
              <div className="text-gray-700">
                <p className="font-semibold mb-4 text-blue-600">Asunto: Consulta FinancePR - [Tipo de consulta]</p>
                
                <p className="mb-3">Hola Rodrigo,</p>
                
                <p className="mb-3">Tengo una consulta sobre FinancePR:</p>
                
                <p className="mb-4 text-gray-500 bg-white p-3 rounded border-l-4 border-blue-400">
                  [Describe detalladamente tu problema o consulta aquí]
                </p>
                
                <p className="mb-2 font-medium">Información técnica:</p>
                <ul className="text-gray-600 ml-4 mb-4 space-y-1">
                  <li>• Navegador: Chrome/Firefox/Safari/Edge</li>
                  <li>• Dispositivo: PC/Mac/Móvil/Tablet</li>
                  <li>• Sección donde ocurre: _______</li>
                  <li>• ¿Qué estaba haciendo?: _______</li>
                  <li>• ¿Hay algún mensaje de error?: _______</li>
                </ul>
                
                <p className="mb-2">¡Gracias por tu tiempo!</p>
                <p className="text-gray-500">[Tu nombre]</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <FaShieldAlt className="text-blue-600 mr-3" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Privacidad garantizada</p>
                  <p>No comparto tu información con terceros</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Reasons Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ¿En Qué Te Puedo Ayudar?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactReasons.map((reason, index) => {
              const colors = getColorClasses(reason.color);
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-16 h-16 ${colors.bg} ${colors.text} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    <reason.icon className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Preguntas Frecuentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿La plataforma es completamente gratuita?
                </h3>
                <p className="text-gray-600">
                  Sí, todas las funcionalidades principales son gratuitas. No hay costos ocultos ni suscripciones obligatorias.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Mis datos financieros están seguros?
                </h3>
                <p className="text-gray-600">
                  Absolutamente. Los datos se almacenan localmente en tu navegador y usamos encriptación para todas las comunicaciones.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Puedo usar la plataforma en móvil?
                </h3>
                <p className="text-gray-600">
                  Sí, la plataforma está optimizada para funcionar en cualquier dispositivo: PC, tablet o móvil.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Cómo funciona el sistema educativo?
                </h3>
                <p className="text-gray-600">
                  Tenemos 8 módulos interactivos que van desde conceptos básicos hasta estrategias avanzadas de inversión.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Los precios de activos son en tiempo real?
                </h3>
                <p className="text-gray-600">
                  Sí, utilizamos APIs de CoinGecko y Yahoo Finance para obtener precios actualizados cada 30 segundos.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Hay límite en la cantidad de activos?
                </h3>
                <p className="text-gray-600">
                  No, puedes agregar tantos activos como desees a tu portfolio de seguimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
