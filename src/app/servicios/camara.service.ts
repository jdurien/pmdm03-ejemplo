import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { GestionStorageService } from './gestion-storage.service';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  listaUrl: string[] = [];
  listaPath: string[]= [];

  constructor(private platform: Platform, private usarStorage: GestionStorageService) {
    this.loadSaved();
   }
 //********************  ESTA PARTE SE TOMA DE LOS APUNTES 4.4 hay que cargarlo en el constructor ******************** */
   private async loadSaved() {
    // Recupera los datos de Storage en formato string
    const photoList = await this.usarStorage.getObject("rutas");

    // Lo parsea a un array de objetos IFoto y lo almacena en el atributo accesoFotos
    // Si no obtiene datos inicializará el array para poder empezar a almacenar fotos.
    this.listaPath = JSON.parse(photoList.value) || [];    
    
    // Se obtiene una URL válida para visualizar cada foto guardada en el sistema de archivos
    // En los navegadores debemos cargar las imágenes en formato base64 para que se visualicen correctamente
    // En los dispositivos podemos obtener la URL a partir del path

    let webviewPath: string;
    for (let photo of this.listaPath) {
      if (!this.platform.is("hybrid")) {     
          const readFile = await Filesystem.readFile({
              path: photo,
              directory: Directory.Data
          });

          // La URL de la foto en base64 para que se pueda visualizar
          webviewPath = `data:image/jpeg;base64,${readFile.data}`;   //la imagen en bruto. Ver tema 4.1.2   
      } else {
        webviewPath = Capacitor.convertFileSrc(photo);
      }
      this.listaUrl.push(webviewPath);
    }
  }
//************************** */
  getListaUrl(): string[] {
    return this.listaUrl;
  }

  public async sacarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, //base64 permite imagen en bruto
      source: CameraSource.Camera
    });

    // Guardamosla URL para visualizar la imagen añadiendo la cabecera base64
    this.listaUrl.push("data:image/jpeg;base64," + image.base64String); //eliminamos webpath por base64string y le añadimos la cabecera entrecomillada

    this.savePicture(image);

  }

  private async savePicture(image) {

    let base64Data = image.base64String;
    // Guarda el fichero
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data    //directory.data borrará las fotos si borramos la app.
    });
    
    // Si trabajamos con el navegador, guardamos solo el nombre del fichero. Lo necesitaremos para 
    // Con dispositivos móviles guardaremos la ruta que nos devuelve
    let ruta: string;
  
    if (this.platform.is('hybrid')) {
      ruta = savedFile.uri; //para los móviles
    } else {
      ruta = fileName; //sólo navegadores
  
    }
  
    this.listaPath.push(ruta);  //almacena la ruta de la foto en el final del array
  
    // Almacenamos los datos de las fotos en Storage para poder acceder a ellas
    this.usarStorage.setObject("rutas", this.listaPath);
  }
}
