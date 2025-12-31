# 📧 Notification Setup Guide

Your portfolio now supports **multiple notification methods** with automatic fallback!

## 🎯 Recommended: Discord Webhook (UNLIMITED & FREE)

**Why Discord?**
- ✅ **Unlimited notifications** (no daily limits!)
- ✅ **Completely FREE**
- ✅ **Instant notifications**
- ✅ **Beautiful embed format**
- ✅ **Mobile app available**

### Setup Discord (5 minutes):

1. **Create a Discord Server** (if you don't have one)
   - Open Discord
   - Click the "+" button
   - Create "My Portfolio Notifications"

2. **Create a Webhook**
   - Right-click your server > Server Settings
   - Go to **Integrations** > **Webhooks**
   - Click **New Webhook**
   - Name it "CV Downloads"
   - Choose a channel (like #notifications)
   - Click **Copy Webhook URL**

3. **Add to your project**
   - Open `.env.local` (create if doesn't exist)
   - Add this line:
   ```env
   DISCORD_WEBHOOK_URL=paste_your_webhook_url_here
   ```

**Done!** You'll now get instant Discord notifications with all visitor details!

---

## 📧 Alternative 1: Resend Email (100/day FREE)

Good for professional email notifications, but has daily limits.

### Setup:
1. Go to [resend.com](https://resend.com)
2. Sign up (free)
3. Get your API key from dashboard
4. Add to `.env.local`:
```env
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=your-email@gmail.com
```

**Limitation:** 100 emails per day (then stops until next day)

---

## 💬 Alternative 2: Telegram Bot (UNLIMITED & FREE)

Another unlimited option if you prefer Telegram.

### Setup:
1. Open Telegram, search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow instructions
3. Copy the **bot token**
4. Start a chat with your bot
5. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
6. Add to `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

---

## 🔄 How It Works

The system tries each method in order:

1. **Discord** (if configured) → Unlimited, instant
2. **Resend Email** (if configured) → 100/day limit
3. **Telegram** (if configured) → Unlimited
4. **Console Log** (fallback) → Shows in terminal

**Smart Fallback:** If Resend hits 100/day limit, it automatically tries Telegram or Discord!

---

## 📊 What Information You Get

Every notification includes:
- ✅ **Name** (what user entered)
- ✅ **Real IP Address**
- ✅ **Location** (City, Country from IP)
- ✅ **Download Time**
- ✅ **Referrer** (where they came from)
- ✅ **Device/Browser Info**

---

## 🚀 Quick Start (Recommended)

**For maximum reliability with NO limits:**

1. Set up **Discord webhook** (primary - unlimited)
2. Keep **Resend** as backup (100/day)

Add both to `.env.local`:
```env
DISCORD_WEBHOOK_URL=your_discord_webhook_url
RESEND_API_KEY=re_eYKPV92r_JMdfGS1AwWSfDYSkfnd7Qot6
NOTIFICATION_EMAIL=hani.mohamedqa@gmail.com
```

Now you have **unlimited notifications** with email backup! 🎉

---

## ❓ Troubleshooting

**Not receiving notifications?**
1. Check `.env.local` exists in root folder
2. Restart dev server: `npm run dev`
3. Check console for error messages
4. Test download button on localhost:3000

**Discord webhook not working?**
- Make sure URL starts with `https://discord.com/api/webhooks/`
- Check webhook is enabled in Discord server settings
- Ensure channel permissions allow webhook posts
