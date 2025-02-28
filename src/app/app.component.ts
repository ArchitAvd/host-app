import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CustomManifest, CustomRemoteConfig } from './utils/config';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { getManifest } from '@angular-architects/module-federation';
import { buildRoutes } from './utils/routes';

@Component({
  selector: 'host-app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
  // encapsulation: ViewEncapsulation.ShadowDom,
  // imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  remotes: CustomRemoteConfig[] = [];
  private router1 = inject(Router);
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const manifest = getManifest<CustomManifest>();

    const routes = buildRoutes(manifest);
    this.router.resetConfig(routes);

    this.remotes = Object.values(manifest);
    this.router.initialNavigation();
  }
}
