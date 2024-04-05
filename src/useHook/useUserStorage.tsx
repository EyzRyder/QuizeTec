import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { useUserStore } from "@/lib/store";

const MODE_KEY = "userData";

export function useUserStorage() {
  const [store, setStore] = useState<Storage | null>(null);
  const [user, setUser] = useState<any>(null);
  const { updateUser } = useUserStore();

  useEffect(() => {
    const initStorage = async () => {
      try {
        const newStore: Storage = new Storage({
          name: "QUIZETEC",
          driverOrder: [
            CordovaSQLiteDriver._driver,
            Drivers.IndexedDB,
            Drivers.LocalStorage,
          ],
        });

        await newStore.defineDriver(CordovaSQLiteDriver);

        const storeInstance = await newStore.create();
        setStore(storeInstance);

        const storedMode = (await storeInstance.get(MODE_KEY)) || null;
        console.log("Loaded: " + storedMode);
        setUser(storedMode);
      } catch (err) {
        console.error("Error initializing storage: ", err);
      }
    };
    initStorage();
  }, []);

  const updateUserStorage = async (item: any) => {
    try {
      setUser(item);
      updateUser(item);
      console.log(item);
      await store?.set(MODE_KEY, item);
    } catch (err) {
      console.error("Error updating user storage: ", err);
    }
  };

  return {
    user,
    updateUserStorage,
  };
}
