'use client';
import React from 'react';
import { MainLogo } from '../MainLogo/MainLogo';

export const ContactCard = ({ name, title, phone, email, website }) => {
  const generateVCard = ({ name, title, phone, email, website }) => {
    return `BEGIN:VCARD
            VERSION:3.0
            FN:${name}
            TITLE:${title}
            TEL;TYPE=cell:${phone}
            EMAIL:${email}
            URL:${website}
            END:VCARD`;
  };

  const downloadVCard = () => {
    const vcard = generateVCard({ name, title, phone, email, website });
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative max-w-lg w-full">
        {/* Logo card */}
        <div
          aria-hidden="true"
          className="contact-card bg-white h-auto sm:h-[250px] pointer-events-none absolute inset-0 -rotate-22 translate-x-18 translate-y-18 scale-95 border bg-white shadow-md -z-1 flex justify-center items-center"
        >
          <MainLogo className="w-30 sm:w-50 h-30 sm:h-50" />
        </div>

        {/* Info card */}
        <div className="contact-card bg-white border flex flex-col h-auto sm:h-[250px] justify-between -translate-y-8 shadow-md z-10 py-6 py-8 md:py-10 px-8 md:px-13 lg:px-15 max-w-lg w-full">
          <div className="">
            <div className="font-display font-bold text-xl md:text-3xl mb-1">{name}</div>
            <div className="font-display italic mb-4 text-xs xs:text-sm md:text-base">{title}</div>
          </div>
          
          <div className="font-display text-md space-y-1">
            <p className="font-secondary">
              <span className="font-display font-bold text-sm xs:text-base">Phone:</span>{' '}
              <a
                href="tel:+16783607349"
                className="hover:text-accent"
              >
                {phone}
              </a>
            </p>
            <p>
              <span className="font-display font-bold text-sm xs:text-base">Email:</span>{' '}
              <a
                href={`mailto:${email}`}
                className="font-secondary hover:text-accent hover:underline"
              >
                {email}
              </a>
            </p>
            <p>
              <span className="font-display font-bold text-sm xs:text-base">Website:</span>{' '}
              <a
                href={website}
                className="font-secondary hover:text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {website}
              </a>
            </p>
          </div>
        </div>
      </div>
       

      {/* <button
        onClick={downloadVCard}
        className="mt-4 inline-block border text-sm hover:text-white font-medium px-4 py-2 hover:cursor-pointer hover:bg-black"
      >
        Download Contact
      </button> */}
    </div>
  );
};
