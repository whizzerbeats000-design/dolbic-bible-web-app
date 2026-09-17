// Notification subscription boundary — Phase 3
// Requires VAPID keys and Supabase edge function
// This creates the typed interface only

export interface PushSubscriptionData {
  endpoint: string;
  p256dh: string;
  auth: string;
  user_id: string;
}

export interface NotificationPreferences {
  user_id: string;
  daily_scripture: boolean;
  daily_quote: boolean;
  daily_prayer: boolean;
  daily_reflection: boolean;
  notification_time: string; // HH:MM format
  timezone: string; // e.g. Africa/Lagos
}

export const DEFAULT_NOTIFICATION_TIME = '06:00';
export const DEFAULT_TIMEZONE = 'Africa/Lagos';
