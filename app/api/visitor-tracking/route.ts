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

// Detect source platform from referer
function detectSourcePlatform(referer: string): { platform: string; emoji: string; profileUrl: string } {
  const refLower = referer.toLowerCase();

  if (refLower.includes('linkedin.com')) {
    return {
      platform: 'LinkedIn',
      emoji: '💼',
      profileUrl: referer.includes('/in/') ? referer.split('?')[0] : referer
    };
  } else if (refLower.includes('twitter.com') || refLower.includes('x.com')) {
    return { platform: 'Twitter/X', emoji: '🐦', profileUrl: referer };
  } else if (refLower.includes('facebook.com')) {
    return { platform: 'Facebook', emoji: '📘', profileUrl: referer };
  } else if (refLower.includes('instagram.com')) {
    return { platform: 'Instagram', emoji: '📸', profileUrl: referer };
  } else if (refLower.includes('github.com')) {
    return { platform: 'GitHub', emoji: '⚡', profileUrl: referer };
  } else if (refLower.includes('reddit.com')) {
    return { platform: 'Reddit', emoji: '🔶', profileUrl: referer };
  } else if (refLower.includes('google.com')) {
    return { platform: 'Google Search', emoji: '🔍', profileUrl: referer };
  } else if (referer && referer !== 'Direct visit') {
    return { platform: 'Other Website', emoji: '🌐', profileUrl: referer };
  }

  return { platform: 'Direct Visit', emoji: '🔗', profileUrl: 'No referer' };
}

export async function POST(request: NextRequest) {
  try {
    const { timestamp, page } = await request.json();

    // Get visitor information
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'Direct visit';

    // Parse device information
    const deviceInfo = parseDeviceInfo(userAgent);

    // Detect source platform
    const source = detectSourcePlatform(referer);

    // Get location from IP (using ipapi.co free service)
    let locationInfo = 'Unknown location';
    let countryFlag = '🌍';
    try {
      const ipToCheck = ip.split(',')[0].trim();
      if (ipToCheck !== 'unknown' && ipToCheck !== '::1' && !ipToCheck.startsWith('127.')) {
        const geoResponse = await fetch(`https://ipapi.co/${ipToCheck}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          locationInfo = `${geoData.city || 'Unknown'}, ${geoData.country_name || 'Unknown'}`;
          countryFlag = geoData.country_code ? getFlagEmoji(geoData.country_code) : '🌍';
        }
      }
    } catch (error) {
      console.error('Failed to get location:', error);
    }

    // Send Discord notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordEmbed = {
          embeds: [{
            title: '👀 New Visitor to Your Portfolio!',
            color: 0x10b981, // Green color for visitor tracking
            fields: [
              { name: source.emoji + ' Source', value: `**${source.platform}**`, inline: true },
              { name: countryFlag + ' Location', value: locationInfo, inline: true },
              { name: '🌐 IP Address', value: ip, inline: false },
              { name: '📄 Page Visited', value: page || '/', inline: true },
              { name: deviceInfo.deviceType + ' Device', value: deviceInfo.deviceName, inline: true },
              { name: '🖥️ Operating System', value: deviceInfo.os, inline: true },
              { name: '🌐 Browser', value: deviceInfo.browser, inline: true },
              { name: '⏰ Visit Time', value: new Date(timestamp).toLocaleString(), inline: true },
            ],
            timestamp: new Date(timestamp).toISOString(),
            footer: { text: 'Portfolio Visitor Tracking' }
          }]
        };

        // Add referer URL as a separate field if it's from a social platform
        if (source.platform !== 'Direct Visit' && source.profileUrl !== 'No referer') {
          discordEmbed.embeds[0].fields.splice(3, 0, {
            name: '🔗 Referer URL',
            value: source.profileUrl.substring(0, 1000),
            inline: false
          });
        }

        const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordEmbed),
        });

        if (discordRes.ok) {
          console.log('✅ Visitor notification sent to Discord');
        }
      } catch (error) {
        console.error('Discord webhook failed:', error);
      }
    }

    return NextResponse.json({ success: true, message: 'Visitor tracked' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
