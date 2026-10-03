/**
 * Under Development & Maintenance Screen Configuration
 * 
 * When `maintenanceMode: true`:
 *   The entire website is shielded behind a majestic "Under Development & Setup" screen.
 *   Visitors cannot see or scroll through the website content.
 *   It announces that the website is in development and waiting for API setup.
 *   Developers can enter the passkey (`developerPasscode`) or click "डेवलपर अनलॉक" to preview.
 * 
 * When `maintenanceMode: false`:
 *   The website is 100% visible and accessible to everyone.
 * 
 * You can also toggle this instantly in browser console without code changes:
 *   localStorage.setItem("ssf_maintenance_mode", "false"); location.reload(); // Live to everyone
 *   localStorage.setItem("ssf_maintenance_mode", "true");  location.reload(); // Shielded
 */

export const devBannerConfig = {
  // Master toggle: set to false to completely disable and remove the API setup banner
  enabled: false,
  maintenanceMode: false,

  // Simple passkey for developer / admin to unlock the preview on any device
  developerPasscode: "sj2026",

  // Public display texts
  titleHindi: "वेबसाइट निर्माण एवं तकनीकी सेटअप प्रगति पर है",
  titleEnglish: "Website Currently Under Development",
  noticeHindi: "वेबसाइट को पूर्णतः सक्रिय करने हेतु आवश्यक API विवरण दर्ज करें एवं तकनीकी सत्यापन पूरा करें।",
  noticeEnglish: "Enter API details to complete activation and start the website.",
  developerCredit: "अभिकल्पन एवं तकनीकी प्रबंधन: एस.जे. डिजिटल्स (SJ Digitals)",
};
