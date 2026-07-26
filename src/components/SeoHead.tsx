import React, { useEffect } from 'react';
import { STORE_INFO } from '../data/storeInfo';

export const SeoHead: React.FC = () => {
  useEffect(() => {
    // Set Document Title
    document.title = `${STORE_INFO.name} | Kozmetik & Kişisel Bakım Mağazası`;

    // Inject JSON-LD Schema.org for Online Store
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'OnlineStore',
      'name': STORE_INFO.name,
      'description': STORE_INFO.shortDescription,
      'telephone': STORE_INFO.phone,
      'openingHours': 'Mo-Sa 08:30-20:30',
      'priceRange': '₺₺',
      'currenciesAccepted': 'TRY',
      'paymentAccepted': 'WhatsApp Order'
    };

    let scriptTag = document.getElementById('json-ld-schema') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }, []);

  return null;
};
