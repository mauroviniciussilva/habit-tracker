import { Drivers, Storage } from '@ionic/storage';

const storage = new Storage({
  name: '__habit-tracker',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});

export default storage;
