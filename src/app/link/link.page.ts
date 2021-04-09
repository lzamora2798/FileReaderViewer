import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

import {Plugins,FilesystemDirectory} from '@capacitor/core';
@Component({
  selector: 'app-link',
  templateUrl: './link.page.html',
  styleUrls: ['./link.page.scss'],
})
export class LinkPage  {

  pdfSRC:any;
  linki: string = ""
  constructor(private domSatizer :DomSanitizer) { 
    this.pdfSRC = this.domSatizer.bypassSecurityTrustResourceUrl(this.linki);

    console.log(FilesystemDirectory.Documents)
  }


}
