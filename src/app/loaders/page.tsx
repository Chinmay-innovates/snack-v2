'use client';
import { AnimatedDotLoader } from '@/components/animated-dot-loader';
import React, { useState, useMemo } from 'react';

// 🌟 Quantum Dot Loader - Mind-bending physics simulation
type Intensity = 'low' | 'medium' | 'high';

const QuantumDotLoader = ({ intensity = 'medium' }: { intensity?: Intensity }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        delay: i * 0.15,
        angle: (i * 51.43) % 360, // Golden angle for natural distribution
      })),
    [],
  );

  const intensityConfig = {
    low: 'scale-75 opacity-70',
    medium: 'scale-100 opacity-90',
    high: 'scale-125 opacity-100',
  };

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className={`absolute inset-0 ${intensityConfig[intensity]}`}>
        {particles.map(({ id, delay, angle }) => (
          <div
            key={id}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-quantum-orbit will-change-transform"
            style={{
              animationDelay: `${delay}s`,
              transform: `rotate(${angle}deg) translateX(25px) rotate(-${angle}deg)`,
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))',
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-gradient-to-r from-white to-blue-100 rounded-full animate-quantum-core shadow-lg shadow-blue-500/50" />
        </div>
      </div>
    </div>
  );
};

// 🔥 Plasma Wave Loader - Liquid energy visualization
const PlasmaWaveLoader = () => {
  const waves = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: i * 0.2,
        scale: 1 + i * 0.15,
      })),
    [],
  );

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {waves.map(({ id, delay, scale }) => (
        <div
          key={id}
          className="absolute w-12 h-12 rounded-full border-2 border-gradient-plasma animate-plasma-pulse"
          style={{
            animationDelay: `${delay}s`,
            transform: `scale(${scale})`,
            background: `conic-gradient(from ${id * 72}deg, 
              rgba(255, 20, 147, 0.8), 
              rgba(0, 255, 255, 0.8), 
              rgba(255, 215, 0, 0.8), 
              rgba(255, 20, 147, 0.8))`,
            filter: 'blur(1px)',
          }}
        />
      ))}
      <div className="absolute w-6 h-6 bg-white rounded-full animate-bounce shadow-2xl shadow-pink-500/50" />
    </div>
  );
};

// ⚡ Neural Network Loader - AI brain visualization
const NeuralNetworkLoader = () => {
  const nodes = useMemo(
    () => [
      { x: 50, y: 20, delay: 0 },
      { x: 20, y: 50, delay: 0.3 },
      { x: 80, y: 50, delay: 0.6 },
      { x: 35, y: 80, delay: 0.9 },
      { x: 65, y: 80, delay: 1.2 },
    ],
    [],
  );

  const connections = useMemo(
    () => [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [1, 4],
      [3, 4],
    ],
    [],
  );

  return (
    <div className="relative w-20 h-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {connections.map(([start, end], idx) => (
          <line
            key={idx}
            x1={nodes[start].x}
            y1={nodes[start].y}
            x2={nodes[end].x}
            y2={nodes[end].y}
            stroke="url(#neuralGradient)"
            strokeWidth="1.5"
            className="animate-neural-pulse"
            style={{ animationDelay: `${idx * 0.2}s` }}
          />
        ))}
        <defs>
          <linearGradient id="neuralGradient">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map((node, idx) => (
        <div
          key={idx}
          className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-neural-node shadow-lg shadow-emerald-500/50"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${node.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// 🌪️ Vortex Loader - Hypnotic spiral energy
const VortexLoader = ({ direction = 'clockwise' }) => {
  const spirals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: i * 30,
        radius: 8 + i * 2,
        delay: i * 0.08,
      })),
    [],
  );

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {spirals.map(({ id, angle, radius, delay }) => (
        <div
          key={id}
          className={`absolute w-2 h-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-full animate-vortex-spin will-change-transform ${
            direction === 'counter-clockwise' ? 'animate-reverse' : ''
          }`}
          style={{
            animationDelay: `${delay}s`,
            transform: `rotate(${angle}deg) translateX(${radius}px)`,
            filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))',
          }}
        />
      ))}
      <div className="absolute w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-pulse shadow-xl shadow-yellow-500/60" />
    </div>
  );
};

// 🎭 Morphing Loader - Shape-shifting wonder
const MorphingLoader = () => {
  const shapes = ['circle', 'square', 'diamond', 'triangle'];
  const [currentShape, setCurrentShape] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [shapes.length]);

  const getShapeClass = (shape: string) => {
    const base =
      'w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 transition-all duration-700 ease-in-out shadow-2xl shadow-purple-500/50';
    switch (shape) {
      case 'circle':
        return `${base} rounded-full`;
      case 'square':
        return `${base} rounded-none rotate-0`;
      case 'diamond':
        return `${base} rounded-none rotate-45`;
      case 'triangle':
        return `${base} rounded-none clip-triangle`;
      default:
        return base;
    }
  };

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className={getShapeClass(shapes[currentShape])}>
        <div className="absolute inset-1 bg-white/20 rounded-inherit animate-ping" />
      </div>
    </div>
  );
};

// 🌈 Rainbow Cascade Loader - Colorful waterfall effect
const RainbowCascadeLoader = () => {
  const drops = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.15,
        hue: i * 45,
      })),
    [],
  );

  return (
    <div className="flex items-end justify-center space-x-1 h-16">
      {drops.map(({ id, delay, hue }) => (
        <div
          key={id}
          className="w-3 rounded-full bg-current animate-rainbow-cascade will-change-transform"
          style={{
            animationDelay: `${delay}s`,
            color: `hsl(${hue}, 80%, 60%)`,
            filter: `drop-shadow(0 0 8px hsl(${hue}, 80%, 60%))`,
          }}
        />
      ))}
    </div>
  );
};

// 🔮 Holographic Loader - Futuristic 3D effect
const HolographicLoader = () => {
  return (
    <div className="relative w-20 h-20 perspective-1000">
      <div className="absolute inset-0 animate-holographic-rotate preserve-3d">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-cyan-400 rounded-lg opacity-60"
            style={{
              transform: `rotateY(${i * 90}deg) translateZ(10px)`,
              background: `linear-gradient(${i * 90}deg, 
                rgba(6, 182, 212, 0.1), 
                rgba(139, 92, 246, 0.1), 
                rgba(236, 72, 153, 0.1))`,
              filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-xl shadow-cyan-500/80" />
      </div>
    </div>
  );
};

const DotsLoader = () => {
  return <AnimatedDotLoader />;
};
// 🎪 Interactive Playground Component
const LoaderPlayground = () => {
  type LoaderKey =
    | 'quantum'
    | 'plasma'
    | 'neural'
    | 'vortex'
    | 'morphing'
    | 'rainbow'
    | 'holographic'
    | 'dots';
  const [selectedLoader, setSelectedLoader] = useState<LoaderKey>('quantum');
  const [isPlaying, setIsPlaying] = useState(true);

  const loaders: Record<
    LoaderKey,
    {
      component: React.ComponentType<any>;
      name: string;
      description: string;
    }
  > = {
    quantum: {
      component: QuantumDotLoader,
      name: '🌟 Quantum Dots',
      description: 'Physics-inspired orbital motion',
    },
    plasma: {
      component: PlasmaWaveLoader,
      name: '🔥 Plasma Wave',
      description: 'Liquid energy visualization',
    },
    neural: {
      component: NeuralNetworkLoader,
      name: '⚡ Neural Network',
      description: 'AI brain simulation',
    },
    vortex: {
      component: VortexLoader,
      name: '🌪️ Vortex Spiral',
      description: 'Hypnotic energy vortex',
    },
    morphing: {
      component: MorphingLoader,
      name: '🎭 Shape Morpher',
      description: 'Dynamic shape transformation',
    },
    rainbow: {
      component: RainbowCascadeLoader,
      name: '🌈 Rainbow Cascade',
      description: 'Colorful waterfall effect',
    },
    holographic: {
      component: HolographicLoader,
      name: '🔮 Holographic',
      description: 'Futuristic 3D projection',
    },
    dots: {
      component: AnimatedDotLoader,
      name: '🌟 Beat Loader',
      description: 'Animated Dots',
    },
  };

  const CurrentLoader = loaders[selectedLoader].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 size-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-1/2 size-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
            SPECTACULAR LOADERS
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Next-generation loading animations that push the boundaries of web design
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg shadow-purple-500/50"
            >
              {isPlaying ? '⏸️ Pause All' : '▶️ Play All'}
            </button>
          </div>
        </div>

        {/* Main Showcase */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Loader Selector */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Choose Your Loader</h3>
            <div className="space-y-3">
              {Object.entries(loaders).map(([key, loader]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLoader(key as LoaderKey)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    selectedLoader === key
                      ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 border-2 border-purple-400 shadow-lg shadow-purple-500/30'
                      : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="font-semibold text-lg">{loader.name}</div>
                  <div className="text-sm text-gray-400">{loader.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Display */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-3xl p-12 border border-gray-700/50 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{loaders[selectedLoader].name}</h2>
                <p className="text-gray-400">{loaders[selectedLoader].description}</p>
              </div>

              <div className="flex justify-center items-center h-40 mb-8">
                {isPlaying && <CurrentLoader />}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-cyan-400 font-semibold mb-2">✨ Features</div>
                  <ul className="text-gray-300 space-y-1">
                    <li>• GPU Accelerated</li>
                    <li>• Fully Responsive</li>
                    <li>• Dark Mode Ready</li>
                  </ul>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-pink-400 font-semibold mb-2">🚀 Performance</div>
                  <ul className="text-gray-300 space-y-1">
                    <li>• 60+ FPS</li>
                    <li>• Low Memory</li>
                    <li>• Smooth Animations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Complete Collection
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(loaders).map(([key, loader]) => {
              const Component = loader.component;
              return (
                <div
                  key={key}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer"
                  onClick={() => setSelectedLoader(key as LoaderKey)}
                >
                  <div className="flex justify-center items-center h-24 mb-4">
                    {isPlaying && <Component />}
                  </div>
                  <h4 className="text-lg font-semibold text-center text-gray-200">{loader.name}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <h4 className="text-2xl font-bold mb-6 text-green-400">🎯 Button Integration</h4>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-blue-500/30">
                <div className="scale-75">{isPlaying && <QuantumDotLoader intensity="low" />}</div>
                <span>Processing Quantum Data...</span>
              </button>
              <button className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-pink-500/30">
                <div className="scale-75">{isPlaying && <VortexLoader />}</div>
                <span>Generating Vortex...</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <h4 className="text-2xl font-bold mb-6 text-orange-400">🔥 Card Loading</h4>
            <div className="bg-gray-900/50 rounded-xl p-8 border-2 border-dashed border-gray-600">
              <div className="text-center">
                <div className="mb-4">{isPlaying && <PlasmaWaveLoader />}</div>
                <p className="text-gray-400 text-lg">Loading spectacular content...</p>
                <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full animate-loading-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderPlayground;
