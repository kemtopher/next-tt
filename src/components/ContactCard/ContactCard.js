'use client';

import React from "react";


// export const ContactCard = ({ name, title, phone, email, website }) => {
//   return (
//     <div className="bg-stone-50 text-slate-800 shadow-md p-15 max-w-lg w-full">
//       <div className="font-display font-bold text-3xl mb-1">{name}</div>
//       <div className="font-display italic mb-4">{title}</div>
//       <div className="font-display text-md space-y-1">
//         <p className="font-secondary"><span className="font-display font-medium">Phone:</span> <a href="tel:+16783607349" className="text-blue-600">{phone}</a></p>
//         <p><span className="font-display font-medium">Email:</span> <a href={`mailto:${email}`} className="font-secondary text-blue-600 hover:underline">{email}</a></p>
//         <p><span className="font-display font-medium">Website:</span> <a href={website} className="font-secondary text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{website}</a></p>
//       </div>
//     </div>
//   );
// };

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
    <div className="bg-white shadow-md rounded-xl p-6 max-w-sm w-full text-slate-800 font-serif relative">
      <div className="font-bold text-xl mb-1">{name}</div>
      <div className="text-slate-500 mb-4">{title}</div>
      <div className="text-sm space-y-1 mb-4">
        <p><span className="font-medium">Phone:</span> {phone}</p>
        <p><span className="font-medium">Email:</span> <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a></p>
        <p><span className="font-medium">Website:</span> <a href={website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{website}</a></p>
      </div>

      <button
        onClick={downloadVCard}
        className="mt-4 inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700"
      >
        Download Contact
      </button>
    </div>
  );
};