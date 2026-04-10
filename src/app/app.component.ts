import { Component } from '@angular/core';
import { BlogComponent } from './components/blog/blog.component';
import { ChatbotWidgetComponent } from './components/chatbot-widget/chatbot-widget.component';
import { CvProfessionalComponent } from './components/cv-professional/cv-professional.component';
import { HomeComponent } from './components/home/home.component';
import { VideosComponent } from './components/videos/videos.component';

type AppView = 'home' | 'videos' | 'blog' | 'cv';
type Theme = 'dark' | 'light';
type SectionTarget = 'services' | 'works';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, VideosComponent, BlogComponent, CvProfessionalComponent, ChatbotWidgetComponent],
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

  get isDarkTheme(): boolean {
    return this.activeTheme === 'dark';
  }

  setView(view: AppView): void {
    this.activeView = view;
  }

  toggleTheme(): void {
    this.activeTheme = this.activeTheme === 'dark' ? 'light' : 'dark';
  }

  goToHomeSection(target: SectionTarget): void {
    this.activeView = 'home';

    requestAnimationFrame(() => {
      const sectionId = target === 'services' ? 'services-section' : 'works-section';
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
