import { MongoClient } from "mongodb";
import { Satellite } from '../interfaces/satelite';

let client: MongoClient;

async function initConfig() {
  client = new MongoClient('mongodb+srv://dynamicdevs:Y9Qt05xo4i4f8o7XzLc6@cluster0.ihklg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  await client.connect();
}

/**
 * Guardar en base de datos la información de un satélite
 * @param satellite 
 */
async function saveSatellite(satellite: Satellite): Promise<void> {
  const { name, distance, message, position } = satellite;
  await initConfig();

  await client.db('dynamicdevs').collection('satellites').updateOne({ name }, { $set: { distance, message, position } }, { upsert: true });
}

/**
 * Obtener la información de los  satélites
 */
async function getSatellites(): Promise<Satellite[]> {
  await initConfig();
  
  const db = client.db('dynamicdevs');
  const satellites = await db.collection('satellites').find({}, { projection: { _id: 0 } }).toArray();
  return satellites as any;
}

export const DataBase = {
  initConfig,
  saveSatellite,
  getSatellites
}
