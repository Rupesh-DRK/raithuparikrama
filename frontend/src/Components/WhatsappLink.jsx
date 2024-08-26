import React from 'react';
import whatsapp from "../assets/whatsapp.png";

const WhatsAppLink = ({ phoneNumber, message }) => {
  const baseUrl = "https://wa.me/";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `${baseUrl}${phoneNumber}?text=${encodedMessage}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className='d-flex align-items-center w-75' >
      <button className='btn btn-sm m-0 p-0' style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <img src={whatsapp} alt="WhatsApp" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
      </button>
    </a>
  );
};

export default WhatsAppLink;
