import { environment } from '../environments/environment';

export const constants = {
    version: '0.1',
    apiUrl: environment.production ? 'https://db-polling.herokuapp.com' : 'http://localhost:3000',
}