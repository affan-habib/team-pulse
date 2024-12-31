import { QRCode } from '../components/QRCode';
import { QuickLinks } from '../components/QuickLinks';

export function Home() {
  const currentUrl = window.location.origin;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-colors">
        Team Pulse
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - QR Code */}
        <div className="flex flex-col items-start">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Scan to Participate
            </h2>
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <QRCode url={currentUrl} />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-6 text-center">
              Scan this QR code to join the interactive session on your mobile device
            </p>
          </div>
        </div>

        {/* Right Column - Quick Links */}
        <div>
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}