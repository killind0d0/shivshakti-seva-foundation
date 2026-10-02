/**
 * Shivshakti Seva Foundation - WhatsApp Dispatch Helper
 * Direct, instant routing of public form submissions to the Foundation's official helpline.
 */

export const FOUNDATION_HELPLINE_DISPLAY = "+91 91171 35379";
export const FOUNDATION_WHATSAPP_NUMBER = "919117135379";

/**
 * Generates an official WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(
  message: string,
  phone: string = FOUNDATION_WHATSAPP_NUMBER
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(
    message
  )}`;
}

/**
 * Directly opens WhatsApp in a new tab/app window
 */
export function openWhatsAppDirect(
  message: string,
  phone: string = FOUNDATION_WHATSAPP_NUMBER
): void {
  if (typeof window !== "undefined") {
    const url = getWhatsAppUrl(message, phone);
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
