import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MinioService {

    private readonly accesKeyId = 'Bearer DjjGWp1QpWL87Q9Z7fJT';
    private readonly secretAccessKey = 'BaoeKiv67fBHJmwJan5se7NXcLyImYeAUeMRNKWY';
    private readonly apiUrl = 'http://5.250.184.31:9000'; // Reemplaza con la URL de tu servidor MinIO

    constructor(private http: HttpClient) { }

    getBucketContents(): Observable<any> {
        const bucketName = 'images'; // Reemplaza con el nombre de tu bucket
        const endpoint = `${this.apiUrl}/${bucketName}?list-type=2`;
        // Define las cabeceras con las credenciales de acceso
        const headers = new HttpHeaders()
            //.append('Authorization', 'Bearer TU_ACCESS_KEY_ID:TU_SECRET_ACCESS_KEY') // Reemplaza con tus credenciales de acceso
            //.append('x-amz-content-sha256', 'UNSIGNED-PAYLOAD'); // Se requiere para autenticación v4
            .append('Authorization', this.accesKeyId + ':' + this.secretAccessKey) // Reemplaza con tus credenciales de acceso
            .append('x-amz-content-sha256', 'UNSIGNED-PAYLOAD'); // Se requiere para autenticación v4
        // Realiza la solicitud GET para obtener el contenido del bucket
        return this.http.get(endpoint, { headers });
    }

    authenticate(): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${this.accesKeyId}:${this.secretAccessKey}`)}`
        });
        // Aquí puedes realizar una solicitud HTTP a MinIO para autenticarte
        // por ejemplo, puedes hacer una solicitud a un endpoint de tu servidor MinIO para verificar las credenciales

        // Ejemplo de solicitud HTTP ficticia
        // Reemplaza 'url-de-tu-endpoint' con la URL real de tu endpoint en el servidor MinIO
        //return this.http.get('url-de-tu-endpoint', { headers });
        return this.http.get(this.apiUrl, { headers });
    }

    getUrl(image: string): Observable<string> {
        return new Observable<string>((observer) => {
          // Llamar al método de autenticación
          this.authenticate().subscribe(
            (response) => {
              // Si la autenticación fue exitosa, construir la URL de la imagen y enviarla al observador
              const url = this.getUrlImagen(image);
              observer.next(url);
              observer.complete();
            },
            (error) => {
              // Si hay un error en la autenticación, enviar el error al observador
              observer.error(error);
              observer.complete();
            }
          );
        });
      }

      getUrlImagen(nombreImagen: string): string {
        // URL completa de la imagen
        return `${this.apiUrl}/${nombreImagen}`;
      }
}