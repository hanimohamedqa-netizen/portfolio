import { NextRequest, NextResponse } from 'next/server';

// Parse device information from user agent
function parseDeviceInfo(userAgent: string) {
  const ua = userAgent.toLowerCase();

  // Detect device type
  let deviceType = '🖥️ Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = '📱 Tablet';
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceType = '📱 Mobile';
  }

  // Detect OS
  let os = 'Unknown OS';
  let osVersion = '';
  if (ua.includes('windows nt 10.0')) { os = 'Windows 10/11'; }
  else if (ua.includes('windows nt 6.3')) { os = 'Windows 8.1'; }
  else if (ua.includes('windows nt 6.2')) { os = 'Windows 8'; }
  else if (ua.includes('windows nt 6.1')) { os = 'Windows 7'; }
  else if (ua.includes('mac os x')) {
    os = 'macOS';
    const match = userAgent.match(/Mac OS X (\d+[._]\d+([._]\d+)?)/);
    if (match) osVersion = match[1].replace(/_/g, '.');
  }
  else if (ua.includes('android')) {
    os = 'Android';
    const match = userAgent.match(/Android (\d+(\.\d+)?)/);
    if (match) osVersion = match[1];
  }
  else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = ua.includes('iphone') ? 'iOS (iPhone)' : 'iOS (iPad)';
    const match = userAgent.match(/OS (\d+[._]\d+([._]\d+)?)/);
    if (match) osVersion = match[1].replace(/_/g, '.');
  }
  else if (ua.includes('linux')) { os = 'Linux'; }

  // Detect browser
  let browser = 'Unknown Browser';
  let browserVersion = '';
  if (ua.includes('edg/')) {
    browser = 'Edge';
    const match = userAgent.match(/Edg\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('chrome/') && !ua.includes('edg')) {
    browser = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('firefox/')) {
    browser = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('safari/') && !ua.includes('chrome')) {
    browser = 'Safari';
    const match = userAgent.match(/Version\/(\d+(\.\d+)?)/);
    if (match) browserVersion = match[1];
  } else if (ua.includes('opera/') || ua.includes('opr/')) {
    browser = 'Opera';
  }

  // Device model for mobile
  let deviceModel = '';
  if (deviceType.includes('Mobile') || deviceType.includes('Tablet')) {
    if (ua.includes('iphone')) {
      const match = userAgent.match(/iPhone\s?(\w+)?/);
      deviceModel = match ? match[0] : 'iPhone';
    } else if (ua.includes('ipad')) {
      deviceModel = 'iPad';
    } else if (ua.includes('android')) {
      // Try to extract Android device model
      const match = userAgent.match(/Android.*;\s*([^)]+)\s*Build/);
      if (match) deviceModel = match[1].trim();
    }
  }

  const osInfo = osVersion ? `${os} ${osVersion}` : os;
  const browserInfo = browserVersion ? `${browser} ${browserVersion}` : browser;
  const deviceInfo = deviceModel ? `${deviceModel}` : deviceType;

  return {
    deviceType,
    os: osInfo,
    browser: browserInfo,
    deviceName: deviceInfo,
    fullString: userAgent
  };
}

export async function POST(request: NextRequest) {
  try {
    const { name, timestamp } = await request.json();

    // Get real user information
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'Direct visit';

    // Parse device information
    const deviceInfo = parseDeviceInfo(userAgent);

    // Get location from IP (using ipapi.co free service)
    let locationInfo = 'Unknown location';
    try {
      const ipToCheck = ip.split(',')[0].trim();
      if (ipToCheck !== 'unknown' && ipToCheck !== '::1' && !ipToCheck.startsWith('127.')) {
        const geoResponse = await fetch(`https://ipapi.co/${ipToCheck}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          locationInfo = `${geoData.city || 'Unknown'}, ${geoData.country_name || 'Unknown'}`;
        }
      }
    } catch (error) {
      console.error('Failed to get location:', error);
    }

    const emailData = {
      to: process.env.NOTIFICATION_EMAIL || 'hani.mohamedqa@gmail.com',
      subject: `🔔 CV Downloaded - ${locationInfo}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 10px;">
          <h2 style="color: #6366f1; margin-bottom: 20px;">📥 CV Download Notification</h2>

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin-top: 0; color: #1a1a1a;">User Information</h3>
            <p><strong>Provided Name:</strong> ${name}</p>
            <p><strong>IP Address:</strong> ${ip}</p>
            <p><strong>Location:</strong> ${locationInfo}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Device Information</h3>
            <p><strong>${deviceInfo.deviceType} Device:</strong> ${deviceInfo.deviceName}</p>
            <p><strong>Operating System:</strong> ${deviceInfo.os}</p>
            <p><strong>Browser:</strong> ${deviceInfo.browser}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Technical Details</h3>
            <p><strong>Time:</strong> ${new Date(timestamp).toLocaleString()}</p>
            <p><strong>Referer:</strong> ${referer}</p>
            <p><strong>User Agent:</strong> ${userAgent}</p>
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            This notification was sent from your portfolio website.
          </p>
        </div>
      `,
    };

    let notificationSent = false;

    // Try Discord Webhook (UNLIMITED & FREE - RECOMMENDED!)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordEmbed = {
          embeds: [{
            title: '📥 CV Downloaded!',
            color: 0x6366f1, // Indigo color
            fields: [
              { name: '👤 Name', value: name, inline: true },
              { name: '📍 Location', value: locationInfo, inline: true },
              { name: '🌐 IP Address', value: ip, inline: false },
              { name: deviceInfo.deviceType + ' Device', value: deviceInfo.deviceName, inline: true },
              { name: '🖥️ Operating System', value: deviceInfo.os, inline: true },
              { name: '🌐 Browser', value: deviceInfo.browser, inline: true },
              { name: '⏰ Time', value: new Date(timestamp).toLocaleString(), inline: false },
              { name: '🔗 Referer', value: referer, inline: true },
              { name: '📱 Full User Agent', value: userAgent.substring(0, 100) + '...', inline: false },
            ],
            timestamp: new Date(timestamp).toISOString(),
            footer: { text: 'Portfolio Notification System' }
          }]
        };

        const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordEmbed),
        });

        if (discordRes.ok) {
          notificationSent = true;
          console.log('✅ Discord notification sent');
        }
      } catch (error) {
        console.error('Discord webhook failed:', error);
      }
    }

    // Try Resend Email (100/day limit)
    if (!notificationSent && process.env.RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'portfolio@yourdomain.com',
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html,
          }),
        });

        if (res.ok) {
          notificationSent = true;
          console.log('✅ Resend email sent');
        } else {
          console.error('Resend failed:', await res.text());
        }
      } catch (error) {
        console.error('Resend error:', error);
      }
    }

    // Try Telegram Bot (UNLIMITED & FREE)
    if (!notificationSent && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const message = `📥 *CV Downloaded*\n\n👤 *Name:* ${name}\n📍 *Location:* ${locationInfo}\n🌐 *IP:* ${ip}\n\n${deviceInfo.deviceType} *Device:* ${deviceInfo.deviceName}\n🖥️ *OS:* ${deviceInfo.os}\n🌐 *Browser:* ${deviceInfo.browser}\n\n⏰ *Time:* ${new Date(timestamp).toLocaleString()}\n🔗 *Referer:* ${referer}`;

        const telegramRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        });

        if (telegramRes.ok) {
          notificationSent = true;
          console.log('✅ Telegram notification sent');
        }
      } catch (error) {
        console.error('Telegram failed:', error);
      }
    }

    // Fallback: Log to console
    if (!notificationSent) {
      console.log('⚠️ No notification service configured. CV Download Info:', {
        name, locationInfo, ip, time: new Date(timestamp).toLocaleString()
      });
    }

    return NextResponse.json({ success: true, message: 'Notification sent' });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
