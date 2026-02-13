import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-more-projects',
    templateUrl: './more-projects.component.html',
    styleUrls: ['./more-projects.component.scss'],
    standalone: false
})
export class MoreProjectsComponent implements OnInit {

  constructor(
    private router: Router,
    public analyticsService: AnalyticsService,
    public languageService: LanguageService
    ) { }

    public otherProjects:any;

    ngOnInit() {

      this.languageService.translateService.get("OtherProjects.Projects").subscribe((val:any) => {
        this.otherProjects=val;
        
        })
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
    redirect(route: string, event:any) {
      const id = event.target.id;
      if(id=='demoLink' || id=='ghLink'){
        return
      }
      window.open(route, '_blank');
    }

}
