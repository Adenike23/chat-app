import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '66c87f6a003072be648e'
export const DATABASE_ID = '66c881c0001fe6e47b45'
export const COLLECTION_ID_MESSAGES = '66c881d30004cdc99560'


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66c87f6a003072be648e');

    export const databases = new Databases(client);

export default client;