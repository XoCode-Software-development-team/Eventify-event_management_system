import { Component, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/Service/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  userMessage: string = '';
  messages: { text: string, type: string }[] = [];
  isLoading: boolean = false;

  constructor(private chatService: ChatbotService) { }

  ngOnInit(): void { }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, type: 'user' });
      this.isLoading = true;
      this.chatService.sendMessage(this.userMessage).subscribe({
        next: (response) => {
          this.messages.push({ text: response.reply, type: 'bot' });
          this.isLoading = false;
        },
        error: (error) => {
          this.messages.push({ text: 'Sorry, something went wrong. Please try again.', type: 'error' });
          console.error(error);
          this.isLoading = false;
        }
      });
      this.userMessage = '';
    }
  }
}
