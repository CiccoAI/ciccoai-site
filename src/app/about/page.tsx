export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl text-white mb-6" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>
          About Cicco.AI
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We specialize in creating AI-powered automation solutions that help businesses streamline their operations and enhance customer engagement.
        </p>
      </div>
    </div>
  );
} 