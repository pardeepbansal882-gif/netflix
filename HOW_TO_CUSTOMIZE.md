# 🎬 Netflix Romance: The Ultimate Customization Guide

Welcome to your premium, cinematic love story app! This guide will help you customize every detail to make it truly personal.

---

## 🔐 1. Real OTP Verification (EmailJS)
To make the login work with **Real Email OTP**, follow these steps:
1.  **Create Account**: Sign up for free at [EmailJS.com](https://www.emailjs.com/).
2.  **Add Service**: Connect your Gmail in "Email Services" and copy the **Service ID**.
3.  **Create Template**: In "Email Templates", create a new template with:
    - Subject: `Your OTP for Netflix Romance`
    - Body: `Hello, your passcode is: {{passcode}}`
    - Copy the **Template ID**.
4.  **API Key**: Go to "Account" -> "API Keys" and copy your **Public Key**.
5.  **Update Code**: Open **`login.html`**, scroll to the bottom (**around line 152**), and paste your IDs in the `REAL OTP CONFIGURATION` section.

---

## 📱 2. How to Install as an App (PWA)
You can use this project just like an actual app on your phone!
- **On Android/iOS**: Open your hosted link in Chrome/Safari.
- **Menu**: Tap the three dots (Chrome) or the Share icon (Safari).
- **Install**: Select **"Add to Home Screen"** or **"Install App"**.
- The **Netflix Romance** icon will now appear on your phone's home screen!

---

## 🧭 3. The Invisible Premium Sidebar
The sidebar is hidden for a cinematic "Full Screen" look.
- **Trigger**: Hover your mouse or swipe from the **extreme left edge** (5px zone).
- **Navigation**: Use icons for Search, Home, My List, Moments, and Logout.
- **Center Alignment**: All icons are perfectly centered for a premium feel.

---

## 💖 4. Season 5: Our Future (Dashboard)
This special row features blurred, dream-like images with handwritten romantic notes.
- **Customize Images**: Put your future-themed images in the `assets/` folder named `card_dinner.png`, `card_city.png`, etc.
- **Customize Notes**: Open `dashboard.html` and edit the text inside `<div class="coming-soon-text">`.
- **Font**: It uses the **'Pacifico'** cursive font for a cute, personalized look.

---

## 📂 5. Yearly Folders (Assets)
Each year has its own dedicated folder inside `assets/` (`year1`, `year2`, `year3`, `year4`).
- **`banner_video.mp4`**: The high-res background video.
- **`main_feature.mp4`**: The full-length movie that plays when you click "Play".
- **`music.mp3`**: The romantic song that plays when you open the Season Love Letter.
- **`card_1.png` to `card_24.png`**: Your beautiful memory posters.

---

## 🛠️ 6. Performance & Quality Tips
- **Image Size**: Keep image files under 1MB for fast loading.
- **Video Format**: Use `.mp4` for maximum compatibility.
- **Lag Fix**: If the dashboard lags, ensure you aren't using overly large 4K videos for the banner.
- **Lazy Loading**: Posters now use `loading="lazy"` automatically to stay smooth.

---

---

## ✉️ 7. How to Edit the "Sealed Letters" (Season 4 Vault)
To change the secret messages inside the virtual envelopes:
1.  Open **`dashboard.html`**.
2.  Search for `sealedVaultSection` (**around line 273 and 287**).
3.  Inside each `<div class="sealed-envelope-card">`, look for the text inside `<p class="letter-text">`.
4.  Replace it with your own personal messages!

---

## 📝 8. How to Edit the "Season Love Letters" (Popup Note)
To change the long message that pops up with music:
1.  Open **`script.js`**.
2.  Look for the `const defaultNotes = { ... }` section (**around line 385**).
3.  Change the text for `'1'`, `'2'`, `'3'`, and `'4'` to whatever you like.
4.  You can also edit this **directly in the app** by clicking the "Edit Note" button below the message!

---

**Everything is set up to be professional and stable. Enjoy your journey through memories! ❤️✨**
