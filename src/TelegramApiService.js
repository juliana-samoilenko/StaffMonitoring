export class TelegramApiService {
  constructor() {
    this.token = '1202790472:AAHMq3jgjf7_uEe9jS_f91bX6l5Nznan5uc';
    this.chatId = '-1001335994754';
    this.baseUrl = `https://api.telegram.org/bot${this.token}`;
  }

  sendMessage(employeeName, zoneName, time) {
    const message = `${employeeName} зашёл в зону ${zoneName} в ${time}`;
    const api = `${this.baseUrl}/sendMessage?chat_id=${this.chatId}&text=${message}`;

    fetch(api);
  }
}
