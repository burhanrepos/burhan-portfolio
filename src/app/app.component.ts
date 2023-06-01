import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { Title, Meta } from '@angular/platform-browser';
import { LanguageService } from "src/app/services/language/language.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Burhan-portfolio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService
  ) {
  }
  ngOnInit(): void {
  this.languageService.initLanguage()

    this.titleService.setTitle("Burhan Shaheen | Front-End Engineer | Software Engineer");
    this.metaService.addTags([
      { name: 'keywords', content: 'Frontend, Front-End Engineer,MEAN Stack Developer , MERN Stack Development , Software Engineer, software, developer' },
      { name: 'description', content: 'As a software engineer with expertise in both MEAN and MERN stacks, I have a comprehensive understanding of full-stack web development. My strong foundation in JavaScript allows me to effectively work with front-end technologies such as Angular and React, as well as back-end technologies such as Node.js and Express.' },
    ]);
    
    AOS.init();
}
}
