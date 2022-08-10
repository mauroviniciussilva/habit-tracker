import { WonderPush, WonderPushOriginal } from '@awesome-cordova-plugins/wonderpush';

export abstract class NotificationService {
  static provider: WonderPushOriginal;

  public static init() {
    this.provider = WonderPush;
    document.addEventListener('deviceready', async () => {
      await WonderPush.subscribeToNotifications();
    });
  }

  public static async setUserConsent(consent: boolean) {
    await this.provider.setUserConsent(consent);
  }

  public static sendNotification() {
    this.provider.trackEvent('add-habit', {
      string_name: 'John Doe',
      int_age: 32
    });
  }
}
