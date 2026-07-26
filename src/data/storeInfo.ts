export const STORE_INFO = {
  name: 'Özyeşil Kozmetik',
  shortDescription: 'Kozmetik & Kişisel Bakım Mağazası',
  phone: '+90 543 911 47 75',
  phoneRaw: '+905439114775',
  whatsappNumber: '905439114775',
  whatsappDisplay: '0543 911 47 75',
  instagram: 'ozyesilkozmetik',
  instagramUrl: 'https://instagram.com/ozyesilkozmetik',
  email: 'bilgi@ozyesilkozmetik.com',
  workingHours: 'Pazartesi - Cumartesi: 08:30 - 20:30',
  sundayHours: 'Pazar: 10:00 - 18:00'
};

export function generateSingleProductWhatsAppLink(productName: string, brand: string, price: number, sku: string): string {
  const text = `Merhaba Özyeşil Kozmetik! 👋\n\nSitenizden şu ürün hakkında bilgi almak / sipariş vermek istiyorum:\n\n📌 *Ürün:* ${brand} ${productName}\n💰 *Fiyat:* ${price.toLocaleString('tr-TR')} TL\n🏷️ *Kodu:* ${sku}\n\nStok durumunu teyit edip siparişimi oluşturabilir misiniz?`;
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppLink(
  items: Array<{ name: string; brand: string; quantity: number; price: number; sku: string }>,
  totalPrice: number,
  customerInfo?: { fullName: string; phone: string; deliveryType: 'shipping' | 'store_pickup'; address?: string; note?: string }
): string {
  let itemDetails = '';
  items.forEach((item, index) => {
    itemDetails += `${index + 1}. *${item.brand} - ${item.name}*\n   • Adet: ${item.quantity}\n   • Birim Fiyat: ${item.price.toLocaleString('tr-TR')} TL\n   • Kod: ${item.sku}\n\n`;
  });

  let customerDetails = '';
  if (customerInfo && customerInfo.fullName) {
    customerDetails = `\n👤 *Müşteri Bilgileri:*\n• Ad Soyad: ${customerInfo.fullName}\n• Telefon: ${customerInfo.phone}\n• Teslimat Tercihi: ${customerInfo.deliveryType === 'store_pickup' ? 'Mağazadan Teslim' : 'Adrese Kargo Teslimatı'}\n`;
    if (customerInfo.deliveryType === 'shipping' && customerInfo.address) {
      customerDetails += `• Adres: ${customerInfo.address}\n`;
    }
    if (customerInfo.note) {
      customerDetails += `• Sipariş Notu: ${customerInfo.note}\n`;
    }
  }

  const text = `Merhaba Özyeşil Kozmetik! 👋\n\nSitenizdeki sepetimdeki ürünler için sipariş vermek istiyorum:\n\n🛒 *SİPARİŞ ÖZETİ:*\n${itemDetails}💵 *TOPLAM TUTAR:* ${totalPrice.toLocaleString('tr-TR')} TL\n${customerDetails}\nSiparişimi onaylayıp ödeme ve teslimat detayları için bilgi verebilir misiniz?`;

  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
