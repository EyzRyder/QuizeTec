import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { useUserStore } from "@/lib/store";
const MODE_KEY = 'userData';


export function useUserStorage() {
  const [store, setStore] = useState<Storage>();
  const [user, setUser] = useState<any>(null);
  const { updateUser } = useUserStore()

  useEffect(() => {
    const initStorage = async () => {
      const newStore: Storage = new Storage({
        name: "QUIZETEC",
        // driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
      });

      // await newStore.defineDriver(CordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store)

      const storedMode = await store?.get(MODE_KEY) || false;
      console.log('Loaded: ' + storedMode)
      setUser(storedMode);
    }
    initStorage();
  }, []);


  const updateUserStorage = async (item: any) => {
    const updatedTodos = item;
    setUser(updatedTodos);
    updateUser(updatedTodos);
    console.log(updatedTodos);
    await store?.set(MODE_KEY, updatedTodos);
  }

  return {
    user,
    updateUserStorage,
  }
}