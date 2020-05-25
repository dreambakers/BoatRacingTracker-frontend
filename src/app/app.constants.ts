import { environment } from '../environments/environment';

export const constants = {
    version: '0.1',
    apiUrl: environment.production ? 'https://db-brt.herokuapp.com' : 'http://localhost:3000',
    raceStatus: {
        waiting: 'waiting',
        inProgress: 'inProgress',
        finished: 'finshed'
    },
    emitterKeys: {
        raceSetup: 'raceSetup'
    }
}