const PHONE_NUMBER = "5511924807054";

export function whatsappLink(message: string) {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
