import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import translationsEN from '../../../assets/i18n/en.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language!: "es" | "en";

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {}

  initLanguage(){
    this.translateService.setTranslation('en', translationsEN);
    this.translateService.addLangs(["en", "es"])
    let language = navigator.language || (navigator as any).userLanguage;
    language = "en"
    this.translateService.setDefaultLang(language)

    // Change the URL without navigate:
    this.location.go(language)

    this.language=language
  }

  changeLanguage(language:any){
    this.translateService.setDefaultLang(language)
    this.location.go(language)
    this.language=language
  }
}
