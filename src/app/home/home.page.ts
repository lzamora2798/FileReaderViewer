import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import {Plugins,FilesystemDirectory} from '@capacitor/core';


const {Filesystem,Storage} = Plugins; 
const FILE_KEY = 'files';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  downloadUrl = '';
  myFiles = []
  downloadProgress = 0;
  pdfUrl = 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf'
  png2 = 'https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_500kB.png'
  pngUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png'
  constructor(private http: HttpClient) {
    this.loadFiles();
  }

  async loadFiles(){
    const videoList = await Storage.get({key:FILE_KEY});
    this.myFiles = JSON.parse(videoList.value) || [];
  }

  private convertBlobToBase64 = (blob:Blob) => new Promise((resolve,reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private getMimetype(name){
    if(name.indexOf('pdf')>=0){
      return 'application/pdf';
    }
    else if (name.indexOf('png')>=0){
      return 'image/png';
    }
  }

  downloadFile(url?){
    this.downloadUrl = url ? url : this.downloadUrl;
    this.http.get(this.downloadUrl,{
      responseType:'blob',
      reportProgress:true,
      observe:'events'
    }).subscribe(async event =>{
      if(event.type == HttpEventType.DownloadProgress){
        this.downloadProgress = Math.round((100*event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response){
        this.downloadProgress = 0;
        const name = this.downloadUrl.substr(this.downloadUrl.lastIndexOf('/')+1);
        const base64 = await this.convertBlobToBase64(event.body) as string;
        const savedFiled = await Filesystem.writeFile({
          path:name,
          data:base64,
          directory:FilesystemDirectory.Documents,
        })
        console.log("saved",savedFiled.uri)
        this.pngUrl =base64
        console.log(this.pngUrl);

      }
    })

  }
}
