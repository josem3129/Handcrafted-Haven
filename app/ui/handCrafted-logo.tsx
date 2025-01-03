import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { playfair } from '@/app/ui/fonts';

export default function HandCraftedLogo() {
  return (
    <div
      className={`${playfair.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[36px]">Handcrafted Haven</p>
    </div>
  );
}
