'use client';
import React from "react";


export const ContactCard = ({ name, title, phone, email, website }) => {
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
        <div className="bg-stone-50 border border-stone-300 text-slate-800 shadow-md py-10 px-15 max-w-lg w-full">
            <div className="font-display font-bold text-3xl mb-1">{name}</div>
                <div className="font-display italic mb-4">{title}</div>
                <div className="font-display text-md space-y-1">
                <p className="font-secondary"><span className="font-display font-medium">Phone:</span> <a href="tel:+16783607349" className="text-slate-600 hover:text-accent">{phone}</a></p>
                <p><span className="font-display font-medium">Email:</span> <a href={`mailto:${email}`} className="font-secondary text-slate-600 hover:text-accent hover:underline">{email}</a></p>
                <p><span className="font-display font-medium">Website:</span> <a href={website} className="font-secondary text-slate-600 hover:text-accent hover:underline" target="_blank" rel="noopener noreferrer">{website}</a></p>
            </div>
        </div>

        <button
            onClick={downloadVCard}
            className="mt-4 inline-block bg-stone-50 border text-sm hover:text-white font-medium px-4 py-2 hover:cursor-pointer hover:bg-black"
        >
            Download Contact
        </button>
    </div>
  );
};