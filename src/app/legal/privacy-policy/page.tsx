export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-white mb-6 text-center" style={{ fontFamily: 'Instrument Sans', fontWeight: 500 }}>
          Privacy Policy
        </h1>
        <div className="bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-white/10">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-6">
              We collect information that you provide directly to us when using our services, including:
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Contact information (name, email, phone number)</li>
                <li>Business information</li>
                <li>Communication preferences</li>
              </ul>
            </p>

            <h2 className="text-2xl text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-6">
              We use the information we collect to:
              <ul className="list-disc pl-6 mt-2 text-gray-300">
                <li>Provide and improve our services</li>
                <li>Communicate with you about our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you technical notices and support messages</li>
              </ul>
            </p>

            <h2 className="text-2xl text-white mb-4">3. Information Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, modification, or destruction.
            </p>

            <h2 className="text-2xl text-white mb-4">4. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@cicco.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 