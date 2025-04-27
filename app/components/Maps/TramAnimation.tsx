import Image from 'next/image';
import './TramAnimation.css';

export default function TramAnimation() {
  return (
    <div className="absolute bottom-[-25px] left-0 w-full overflow-hidden">
      <div className="scrolling-banner-container">
        <div className="scrolling-banner">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center">
              <Image
                src="/tram2-tam.png"
                alt="Tramway de Montpellier"
                width={200}
                height={20}
                className="h-20 w-auto"
                priority={index === 0}
              />
              <div className="w-[100vw]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
