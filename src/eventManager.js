import { v4 as uuidv4 } from 'uuid';

export class EventManager {
  constructor() {
    this.subscribers = [];
  }

  subscribe(eventType, subscriberCallback) {
    this.subscribers = [
      ...this.subscribers,
      { 
        id: uuidv4(),
        type: eventType,
        callback: subscriberCallback 
      }
    ]
  }

  publish(event) {
    const { type, payload } = event;
    const singleTypeSubscribers = this.subscribers.filter(
      subscriber => subscriber.type === type
    );
    singleTypeSubscribers.forEach(subscriber => subscriber.callback(payload));
  }
}
