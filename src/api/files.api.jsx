import { config, configApiBackend } from '../config';

export class Files {
    // ELIMINAR UN ARCHIVO
    async deleteFile(accessToken, idfiles) {
    try {
        const url = `${config.baseApi}/${configApiBackend.files}/${idfiles}`;
        const params = {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}` },
        };
        
        const response = await fetch(url, params);
        
        if (response.status !== 204) throw result;
    
        } catch (error) {
              throw error;
            } 
        }
}