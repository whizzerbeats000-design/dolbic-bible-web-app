import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dolbic.bible',
  appName: 'DOLBIC Bible',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#0B2E68',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0B2E68',
    },
  },
};

export default config;
