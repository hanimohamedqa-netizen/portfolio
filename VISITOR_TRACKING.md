# 👀 Visitor Tracking Feature

## What It Does

Your portfolio now **automatically tracks every visitor** who lands on your website and sends you instant Discord notifications with comprehensive information about them!

## 🎯 Key Features

### 1. **Automatic Tracking**
- Tracks visitors as soon as they land on your portfolio
- No action required from the visitor
- Tracks once per session (won't spam you with multiple notifications from the same visitor refreshing)

### 2. **Source Detection**
Automatically detects WHERE visitors came from:
- **💼 LinkedIn** - Captures their LinkedIn profile URL if they clicked from LinkedIn
- **🐦 Twitter/X** - Tracks visits from Twitter
- **📘 Facebook** - Tracks Facebook referrals
- **📸 Instagram** - Tracks Instagram referrals
- **⚡ GitHub** - Tracks GitHub referrals
- **🔍 Google Search** - Tracks Google search visitors
- **🌐 Other Websites** - Tracks any other referring websites
- **🔗 Direct Visit** - Detects when someone types your URL directly

### 3. **Complete Visitor Information**

Every notification includes:
- ✅ **Source Platform** (LinkedIn, Twitter, etc.)
- ✅ **Referer URL** (their profile link if from social media)
- ✅ **Location** (City, Country with flag emoji 🇺🇸)
- ✅ **IP Address**
- ✅ **Device Type** (Desktop/Mobile/Tablet)
- ✅ **Device Name** (e.g., "iPhone", "Samsung Galaxy S21")
- ✅ **Operating System** (e.g., "Windows 10/11", "iOS 17.2", "Android 12")
- ✅ **Browser** (e.g., "Chrome 121", "Safari 17.2", "Firefox 146")
- ✅ **Page Visited** (which page they landed on)
- ✅ **Visit Time** (exact timestamp)

## 📱 Example LinkedIn Scenario

**When someone clicks your portfolio link from LinkedIn:**

1. They see your LinkedIn post/profile
2. They click your portfolio website link
3. **INSTANTLY** you get a Discord notification like this:

```
👀 New Visitor to Your Portfolio!

💼 Source: LinkedIn
🇺🇸 Location: New York, United States
🌐 IP Address: 172.xxx.xxx.xxx
🔗 Referer URL: https://www.linkedin.com/in/john-doe-profile
📄 Page Visited: /
🖥️ Device: Desktop
💻 Operating System: Windows 10/11
🌐 Browser: Chrome 121.0
⏰ Visit Time: 12/30/2025, 7:30:45 PM
```

You'll know:
- ✅ They came from LinkedIn (Source: LinkedIn)
- ✅ Their LinkedIn profile URL (if available in referer)
- ✅ Where they're located
- ✅ What device/browser they're using
- ✅ Exactly when they visited

## 🔧 How It Works

### Technical Implementation:

1. **Automatic Page Load Tracking**
   - JavaScript runs when visitor loads the page
   - Tracks only once per browser session (using `sessionStorage`)
   - Sends visitor data to `/api/visitor-tracking`

2. **Server-Side Data Collection**
   - Captures real IP address from request headers
   - Parses User-Agent to extract device/OS/browser info
   - Fetches geolocation from IP using ipapi.co
   - Analyzes referer header to detect source platform

3. **Smart Platform Detection**
   - Checks referer URL for keywords (linkedin.com, twitter.com, etc.)
   - Extracts profile URLs when available
   - Assigns appropriate emoji and platform name

4. **Discord Notification**
   - Formats all data into beautiful embed
   - Color-coded (green for visitor tracking)
   - Organized fields with emojis
   - Includes timestamp and footer

## 📊 Notification Types

Your portfolio sends **TWO types of notifications**:

### Type 1: Visitor Tracking (Green)
- 👀 Title: "New Visitor to Your Portfolio!"
- 🟢 Color: Green (#10b981)
- When: Someone visits your portfolio
- Includes: Source platform, location, device info

### Type 2: CV Download (Blue)
- 📥 Title: "CV Downloaded!"
- 🔵 Color: Indigo (#6366f1)
- When: Someone downloads your CV
- Includes: Name they entered, location, device info

## ⚙️ Configuration

**No configuration needed!** The feature works automatically with your existing Discord webhook.

Your `.env.local` already has:
```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/[your-webhook]
```

Both visitor tracking AND CV download notifications use the same webhook.

## 🚫 Privacy & Session Management

- **One notification per session**: Won't spam if visitor refreshes
- **Session storage**: Uses browser's sessionStorage to track visited status
- **No cookies**: Privacy-friendly implementation
- **Localhost excluded**: Won't track your own development visits (once deployed)

## 📈 Use Cases

### LinkedIn Post
Share your portfolio on LinkedIn → Get notified instantly when professionals click it, along with their LinkedIn profile URL

### Twitter/X Bio
Add portfolio to bio → See who's interested from Twitter

### GitHub Profile
Link from GitHub → Track fellow developers visiting

### Resume/Email
Include link in resume → Know when recruiters check your portfolio

### Google Search
Portfolio appears in search → See organic traffic from Google

## 🎨 Customization

Want to change the notification appearance? Edit these files:

- **Notification Format**: `app/api/visitor-tracking/route.ts`
- **Tracking Logic**: `app/page.tsx` (useEffect hook)
- **Platform Detection**: `detectSourcePlatform()` function in route.ts

## 🔍 Testing

To test visitor tracking:

1. Open your portfolio in a new **Incognito/Private window**
2. Add `?ref=linkedin` to the URL to simulate LinkedIn
3. Check Discord for notification
4. Each new private session will trigger a notification

**Note**: Regular refresh won't trigger notification (session-based)

## 🌐 Deployment Notes

When you deploy to Netlify/Vercel:

1. Environment variables automatically work
2. Real IP addresses will be captured (not localhost)
3. Geolocation will work properly
4. LinkedIn/Twitter referers will be detected

## 📱 Mobile Visitors

The system detects:
- iPhone models
- iPad
- Android devices (with model names like "Samsung Galaxy S21")
- Tablets

## 🎯 LinkedIn-Specific Benefits

When someone clicks from LinkedIn:
- ✅ **Platform**: Shows "LinkedIn" with 💼 emoji
- ✅ **Referer URL**: Captures the LinkedIn URL they came from
- ✅ **Professional Context**: You know it's a professional visitor
- ✅ **Timing**: Know when to expect follow-up messages

## 💡 Pro Tips

1. **Share strategically**: Post your portfolio link on LinkedIn/Twitter at peak times
2. **Track performance**: See which platform drives most traffic
3. **Follow up**: If someone from LinkedIn visits, you might get a connection request
4. **A/B Testing**: Try different LinkedIn posts, see which gets more clicks

## 🔐 Security

- No sensitive data stored
- IP addresses only used for geolocation
- No database, notifications sent directly to Discord
- Session storage clears when browser closes

---

**Enjoy tracking your portfolio visitors! 🎉**
