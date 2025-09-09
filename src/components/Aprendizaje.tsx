import React from 'react';
import financeImg2 from '../assets/img/finance55.jpg';
import finanzasImg from '../assets/img/finance235.jpg';

const definiciones = [
  {
    titulo: '¿Qué es el flujo de caja?',
    texto: 'El flujo de caja es el movimiento de dinero dentro y fuera de una empresa. Permite saber si hay liquidez suficiente para operar y crecer.'
  },
  {
    titulo: 'Balance general',
    texto: 'Documento que muestra los activos, pasivos y patrimonio de una empresa en un momento determinado. Es clave para analizar la salud financiera.'
  },
  {
    titulo: 'Estado de resultados',
    texto: 'Informe que resume ingresos, costos y gastos en un periodo. Permite conocer si la empresa tuvo ganancias o pérdidas.'
  },
  {
    titulo: 'Inflación',
    texto: 'Aumento generalizado de los precios. Impacta en el poder de compra y en la planificación financiera de empresas y personas.'
  },
  {
    titulo: 'Capital de trabajo',
    texto: 'Recursos que necesita una empresa para operar día a día. Se calcula como activos corrientes menos pasivos corrientes.'
  },
  {
    titulo: 'Rentabilidad',
    texto: 'Es la capacidad de una empresa para generar ganancias en relación a sus inversiones o ventas.'
  },
  {
    titulo: 'Diversificación',
    texto: 'Estrategia para reducir riesgos invirtiendo en diferentes activos, sectores o mercados.'
  },
  {
    titulo: 'Presupuesto',
    texto: 'Plan financiero que estima ingresos y gastos futuros. Ayuda a controlar el uso de recursos y evitar sorpresas.'
  },
  {
    titulo: 'Activo y pasivo',
    texto: 'El activo es lo que posee la empresa (dinero, bienes, inversiones). El pasivo es lo que debe (deudas, obligaciones).'
  }
];

export default function Aprendizaje() {
  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-10 section">
      <h1 className="mb-8 text-4xl font-bold text-center">Recursos y Aprendizaje</h1>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
        {definiciones.map((def, idx) => (
          <div key={idx} className="card">
            <h3 className="mb-2 text-lg font-semibold">{def.titulo}</h3>
            <p className="text-muted">{def.texto}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-8 mt-8">
        <img src={financeImg2} alt="Aprendizaje" className="object-cover w-full max-w-xs h-40 img-feature" />
        <img src={finanzasImg} alt="Recursos" className="object-cover w-full max-w-xs h-40 img-feature" />
      </div>
      <div className="mt-8 text-center">
        <p className="text-muted">Explora más recursos y aprende sobre economía y finanzas para tomar mejores decisiones en tu empresa.</p>
      </div>
    </div>
  );
}
