import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl text-white mb-6" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="cta-gradient-btn px-8 py-3 rounded-lg font-bold transition-all duration-300 transform text-base uppercase"
          style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 