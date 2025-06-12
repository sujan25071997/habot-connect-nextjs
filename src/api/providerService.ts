import providersData from "./data.json";

export interface Provider {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  shortDescription: string;
  longDescription: string;
  contactEmail: string;
  phoneNumber: string;
}

const providers: Provider[] = providersData as Provider[];

export const fetchProviders = (): Promise<Provider[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(providers);
    }, 500);
  });
};

export const fetchProviderById = (id: string): Promise<Provider> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const provider = providers.find((p) => p.id === id);
      if (provider) {
        resolve(provider);
      } else {
        reject(new Error("Provider not found"));
      }
    }, 500);
  });
};
