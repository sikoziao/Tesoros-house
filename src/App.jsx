import React, { useState } from 'react';

// Menú demostrativo nocturno para Tesoros'house (Av. Diego Portales, Temuco)
const MENU_ITEMS = [
  {
    id: 1,
    nombre: 'Burger Tesoro Real (Doble)',
    categoria: 'Burgers & Sándwiches',
    precio: 7900,
    descripcion:
      'Doble hamburguesa casera a la plancha, doble queso cheddar, tocino ahumado, aros de cebolla crujientes y salsa de la casa en pan brioche.',
    imagen:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    destacado: true,
    personalizable: true,
  },
  {
    id: 2,
    nombre: 'Churrasco Tesoro XL',
    categoria: 'Burgers & Sándwiches',
    precio: 6800,
    descripcion:
      'Abundante carne de vacuno a la plancha, queso fundido, champiñones salteados, cebolla caramelizada y mayo casera.',
    imagen:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    destacado: true,
    personalizable: true,
  },
  {
    id: 3,
    nombre: 'Churrasco Italiano Bajonero',
    categoria: 'Burgers & Sándwiches',
    precio: 6200,
    descripcion:
      'Clásico infaltable: carne a la plancha, palta recién molida, tomate en rodajas y mayonesa a elección.',
    imagen:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    destacado: false,
    personalizable: true,
  },
  {
    id: 4,
    nombre: "Chorrillana Tesoros'house (2 a 3 pers.)",
    categoria: 'Chorrillanas & Papas',
    precio: 11500,
    descripcion:
      'Montaña de papas fritas caseras con carne picada, pollo, longaniza/vienesas, cebolla caramelizada y 2 huevos fritos.',
    imagen:
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    destacado: true,
    personalizable: false,
  },
  {
    id: 5,
    nombre: 'Papas Cheddar & Tocino',
    categoria: 'Chorrillanas & Papas',
    precio: 5800,
    descripcion:
      'Bandeja de papas fritas crujientes bañadas en salsa cheddar caliente con lluvia de tocino crocante y cebollín.',
    imagen:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80',
    destacado: false,
    personalizable: false,
  },
  {
    id: 6,
    nombre: 'As Italiano / Completo XL',
    categoria: 'Completos & Ass',
    precio: 3800,
    descripcion:
      'Carne de vacuno a la plancha (As) o vienesa premium con palta, tomate y mayo casera o al ajo.',
    imagen:
      'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
    destacado: true,
    personalizable: true,
  },
  {
    id: 7,
    nombre: 'Promo Bajón Nocturno (Para 2)',
    categoria: 'Promos Nocturnas',
    precio: 13900,
    descripcion:
      '2 Churrascos o Burgers a elección + Porción mediana de papas fritas + 2 Bebidas en lata 350ml.',
    imagen:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    destacado: true,
    personalizable: true,
  },
  {
    id: 8,
    nombre: 'Bebida Lata 350ml / Energética',
    categoria: 'Bebidas',
    precio: 1600,
    descripcion: 'Coca-Cola, Coca-Cola Zero, Fanta, Sprite bien heladas.',
    imagen:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    destacado: false,
    personalizable: false,
  },
];

const CATEGORIAS = [
  'Todos',
  'Promos Nocturnas',
  'Burgers & Sándwiches',
  'Chorrillanas & Papas',
  'Completos & Ass',
  'Bebidas',
];

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // Modal de personalización
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [salsa, setSalsa] = useState('Mayo Casera');
  const [extra, setExtra] = useState('Con todo (Normal)');

  // Datos del cliente

  const [nombreCliente, setNombreCliente] = useState('');
  const [modalidad, setModalidad] = useState('Para llevar (Retiro)');
  const [tiempoRetiro, setTiempoRetiro] = useState('En 15-20 min');
  const [notas, setNotas] = useState('');
  // Lógica de Horario Nocturno (Abierto desde las 18:00 hasta las 02:00 AM de la madrugada)
  const verificarHorarioNocturno = () => {
    const ahora = new Date();
    const hora = ahora.getHours();
    return hora >= 18 || hora < 2;
  };

  const estaAbierto = verificarHorarioNocturno();

  const formatoCLP = (valor) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(valor);
  };

  const productosFiltrados = MENU_ITEMS.filter((item) => {
    const coincideCategoria =
      categoriaActiva === 'Todos' || item.categoria === categoriaActiva;
    const coincideBusqueda =
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const manejarClickAgregar = (producto) => {
    if (producto.personalizable) {
      setProductoSeleccionado(producto);
      setSalsa('Mayo Casera');
      setExtra('Con todo (Normal)');
    } else {
      agregarAlCarrito(producto, null, null);
    }
  };

  const agregarAlCarrito = (producto, opSalsa, opExtra) => {
    const claveUnica = `${producto.id}-${opSalsa || 'base'}-${
      opExtra || 'base'
    }`;

    setCarrito((prev) => {
      const existe = prev.find((item) => item.claveUnica === claveUnica);
      if (existe) {
        return prev.map((item) =>
          item.claveUnica === claveUnica
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...producto,
          claveUnica,
          salsa: opSalsa,
          extra: opExtra,
          cantidad: 1,
        },
      ];
    });
    setProductoSeleccionado(null);
  };

  const cambiarCantidad = (claveUnica, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.claveUnica === claveUnica) {
            return { ...item, cantidad: item.cantidad + delta };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Enviar pedido a WhatsApp de Tesoros'house (+56 9 4086 5185)
  const enviarPedidoWhatsApp = () => {
    const telefonoWhatsApp = '56940865185';

    const lineas = [
      `*NUEVO PEDIDO - TESOROS'HOUSE*`,
      `----------------------------------`,
      `*Cliente:* ${nombreCliente || 'Sin especificar'}`,
      `*Modalidad:* ${modalidad}`,
      `*Paso a retirar:* ${tiempoRetiro}`,
      `----------------------------------`,
      `*DETALLE DEL PEDIDO:*`,
      ...carrito.map((item) => {
        const opciones = item.salsa ? ` (${item.salsa}, ${item.extra})` : '';
        return `- ${item.cantidad}x ${item.nombre}${opciones} - ${formatoCLP(
          item.precio * item.cantidad
        )}`;
      }),
      ...(notas ? [`\n*Notas:* ${notas}`] : []),
      `----------------------------------`,
      `*TOTAL A PAGAR: ${formatoCLP(totalCarrito)}*`,
    ];

    const mensaje = lineas.join('\n');
    const url = `https://api.whatsapp.com/send?phone=${telefonoWhatsApp}&text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-28 font-sans text-left">
      {/* HEADER HERO NOCTURNO */}
      <header className="relative bg-gradient-to-b from-rose-950/80 via-stone-900 to-stone-950 border-b border-stone-800 pt-6 pb-5 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-2">
            <div>
              {estaAbierto ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Abierto hasta tarde • Pide por WhatsApp
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Horario Nocturno • Abre por la tarde/noche
                </span>
              )}
              <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                👑 Tesoros'house
              </h1>
              <p className="text-stone-400 text-sm mt-1">
                El tesoro del bajón en Temuco • Av. Diego Portales
              </p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=56940865185"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-end bg-stone-800/90 hover:bg-stone-700 border border-stone-700 px-3 py-2 rounded-xl text-xs transition shrink-0"
            >
              <span className="text-stone-400">Pedidos WhatsApp</span>
              <span className="font-bold text-rose-400 text-sm">
                +56 9 4086 5185
              </span>
            </a>
          </div>

          {/* BUSCADOR */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Buscar promo, burger, chorrillana, churrasco..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-rose-500 transition"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3.5 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* CATEGORÍAS */}
      <nav className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                categoriaActiva === cat
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* GRILLA DE PRODUCTOS */}
      <main className="max-w-3xl mx-auto px-4 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden flex flex-row md:flex-col justify-between hover:border-stone-700 transition"
            >
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {producto.destacado && (
                      <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        🌙 Ideal Bajón
                      </span>
                    )}
                    <span className="text-xs text-stone-400">
                      {producto.categoria}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white leading-snug">
                    {producto.nombre}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {producto.descripcion}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-amber-400">
                    {formatoCLP(producto.precio)}
                  </span>
                  <button
                    onClick={() => manejarClickAgregar(producto)}
                    className="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1 shadow-sm"
                  >
                    <span>+ Agregar</span>
                  </button>
                </div>
              </div>

              <div className="w-28 sm:w-36 md:w-full md:h-40 relative shrink-0">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL PARA SALSAS Y PREFERENCIAS */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {productoSeleccionado.nombre}
                </h3>
                <p className="text-xs text-stone-400">Personaliza tu pedido</p>
              </div>
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="text-stone-400 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="my-4">
              <label className="block text-xs font-bold uppercase text-stone-300 mb-2">
                1. Elige tu Mayo / Salsa:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Mayo Casera',
                  'Mayo Ajo',
                  'Ketchup / Mostaza',
                  'Sin Mayo',
                ].map((op) => (
                  <button
                    key={op}
                    onClick={() => setSalsa(op)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition ${
                      salsa === op
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-stone-800 border-stone-700 text-stone-300'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <div className="my-4">
              <label className="block text-xs font-bold uppercase text-stone-300 mb-2">
                2. Preferencia:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Con todo (Normal)', 'Con Ají', 'Sin Cebolla'].map((op) => (
                  <button
                    key={op}
                    onClick={() => setExtra(op)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition ${
                      extra === op
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-stone-800 border-stone-700 text-stone-300'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                agregarAlCarrito(productoSeleccionado, salsa, extra)
              }
              className="w-full mt-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3 rounded-xl shadow-lg transition"
            >
              Confirmar y Agregar • {formatoCLP(productoSeleccionado.precio)}
            </button>
          </div>
        </div>
      )}

      {/* BARRA FLOTANTE DEL CARRITO */}
      {carrito.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-stone-950 via-stone-950/95 to-transparent">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setCarritoAbierto(true)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-xl flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="bg-stone-950 text-rose-400 text-xs font-extrabold px-2.5 py-1 rounded-lg">
                  {totalItems}
                </span>
                <span className="text-sm sm:text-base">Ver mi pedido</span>
              </div>
              <span className="text-base sm:text-lg font-black">
                {formatoCLP(totalCarrito)}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL DEL CARRITO Y CHECKOUT */}
      {carritoAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-stone-900 w-full max-w-md h-full flex flex-col justify-between overflow-hidden">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                🛒 Tu Pedido en Tesoros'house
              </h2>
              <button
                onClick={() => setCarritoAbierto(false)}
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 w-8 h-8 rounded-full font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div className="space-y-2.5">
                {carrito.map((item) => (
                  <div
                    key={item.claveUnica}
                    className="bg-stone-800/80 border border-stone-700/70 rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="pr-2">
                      <h4 className="font-bold text-sm text-white">
                        {item.nombre}
                      </h4>
                      {item.salsa && (
                        <p className="text-xs text-rose-400 font-medium">
                          {item.salsa} • {item.extra}
                        </p>
                      )}
                      <span className="text-xs text-amber-400 font-semibold">
                        {formatoCLP(item.precio * item.cantidad)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-lg border border-stone-700">
                      <button
                        onClick={() => cambiarCantidad(item.claveUnica, -1)}
                        className="text-stone-300 hover:text-white font-bold px-1.5"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => cambiarCantidad(item.claveUnica, 1)}
                        className="text-rose-400 hover:text-rose-300 font-bold px-1.5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-800 pt-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Datos de tu pedido
                </h3>

                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl p-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-rose-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  {['Para llevar (Retiro)', 'Servir acá'].map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setModalidad(tipo)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                        modalidad === tipo
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-stone-800 border-stone-700 text-stone-400'
                      }`}
                    >
                      {tipo === 'Para llevar (Retiro)'
                        ? '🛍️ Para llevar'
                        : '🍔 Servir acá'}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1.5">
                    ¿En cuánto pasas por el local?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Estoy afuera', 'En 15-20 min', 'En 30 min'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTiempoRetiro(t)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition ${
                          tiempoRetiro === t
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-stone-800 border-stone-700 text-stone-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows="2"
                  placeholder="Notas (Ej: pago con transferencia, sin tomate...)"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl p-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="p-4 border-t border-stone-800 bg-stone-950 space-y-2.5">
              <div className="flex justify-between items-center text-base font-extrabold">
                <span className="text-stone-300">Total a Pagar:</span>
                <span className="text-xl text-amber-400">
                  {formatoCLP(totalCarrito)}
                </span>
              </div>

              <button
                onClick={enviarPedidoWhatsApp}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <span>📲 Enviar Pedido al WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
