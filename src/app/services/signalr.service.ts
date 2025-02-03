import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { NotyfService } from './notif.service';
import { Message, User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private lastError: string | null = null;
  baseURL: string = 'https://localhost:7261/tracker';

  constructor(private notyfService: NotyfService) { }

  startConnection(accessToken: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseURL, {
        accessTokenFactory: () => accessToken
      }) //Auto reconnect when losing the connection
      .configureLogging(signalR.LogLevel.Information) //Log information debug
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => {
        console.error('Error starting SignalR connection: ', err);
      });

    //Listen "onError" event from server
    this.hubConnection.on("onError", (message: string) => {
      this.lastError = message; // Save the newest error
      this.notyfService.error(message); // Show error
    });
  }

  private async invokeWithErrorHandling<T>(methodName: string, ...args: any[]): Promise<T> {
    this.lastError = null; // Delete old error
    const result = await this.hubConnection.invoke<T>(methodName, ...args);

    if (this.lastError) {
      throw new Error(this.lastError);
    }

    return result; // Return result
  }

  onMessageReceived(callback: (message: Message, result: number) => void): void {
    this.hubConnection.on('newMessage', callback);
  }

  onAddUser(callback: (user: User, chatId: string) => void): void {
    this.hubConnection.on('addUser', callback);
  }

  async leave(isPhysician: boolean): Promise<void> {
    return this.invokeWithErrorHandling("Leave", isPhysician);
  }

  async sendMessage(message: string, isSystem: boolean): Promise<void> {
    return this.invokeWithErrorHandling("SendMessage", message, isSystem);
  }

  async join(memberRole: number, chatId?: string | null): Promise<void> {
    return this.invokeWithErrorHandling("join", chatId, memberRole);
  }

  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR Connection Stopped!'));
    }
  }
}
