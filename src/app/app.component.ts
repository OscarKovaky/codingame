import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { VideosComponent } from './components/videos/videos.component';
import { BlogComponent } from './components/blog/blog.component';
import { CvComponent } from './components/cv/cv.component';

type AppView = 'home' | 'videos' | 'blog' | 'cv';
type Theme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, VideosComponent, BlogComponent, CvComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly views: { id: AppView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'videos', label: 'Videos' },
    { id: 'blog', label: 'Blog' },
    { id: 'cv', label: 'CV' }
  ];

  activeView: AppView = 'home';
  activeTheme: Theme = 'dark';
  isChatOpen = false;
  chatMessage = '';
  readonly phoneLeadMessage =
    'Hola, te escribo desde el portafolio y me interesa una propuesta. ¿Podemos hablar por WhatsApp?';
  readonly chatHints: string[] = [];
  readonly whatsappUrl = `https://wa.me/?text=${encodeURIComponent(this.phoneLeadMessage)}`;

  setView(view: AppView): void {
    this.activeView = view;
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === 'dark' ? 'light' : 'dark';
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  updateChatMessage(value: string): void {
    this.chatMessage = value;
  }

  sendChatMessage(): void {
    const message = this.chatMessage.trim();
    if (!message) {
      return;
    }

    this.chatHints.unshift(message);
    this.chatHints.splice(3);
    this.chatMessage = '';
  }
}
