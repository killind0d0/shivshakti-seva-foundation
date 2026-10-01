/**
 * Development & Setup Banner Configuration
 * 
 * To show the "Enter API details to start the website" banner:
 *   Set `enabled: true`
 * 
 * To hide/disable it:
 *   Set `enabled: false`
 * 
 * You can also toggle this live in the browser console:
 *   localStorage.setItem("ssf_dev_banner", "true");  // Enable
 *   localStorage.setItem("ssf_dev_banner", "false"); // Disable
 */

export const devBannerConfig = {
  // Master toggle: set to true to display, false to hide
  enabled: true,

  // Bilingual messaging as requested
  titleHindi: "वेबसाइट सेटअप एवं विकास मोड (Development Mode)",
  messageHindi: "वेबसाइट को पूर्णतः सक्रिय करने हेतु आवश्यक API विवरण दर्ज करें",
  messageEnglish: "Enter API details to start and activate the website",
  badgeText: "कॉन्फ़िगरेशन प्रतीक्षित (Setup Pending)",
};
