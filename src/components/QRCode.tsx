import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  url: string;
  size?: number;
}

export function QRCode({ url, size = 256 }: QRCodeProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeSVG
        value={url}
        size={size}
        level="H"
        includeMargin
        className="bg-white p-4 rounded-lg shadow-md"
      />
      <p className="text-sm text-gray-600">Scan to participate</p>
    </div>
  );
}