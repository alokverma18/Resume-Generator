import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isActive = false;

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  closeMenu() {
    setTimeout(() => {
      this.isActive = false;
    }, 200);
  }
  
}
