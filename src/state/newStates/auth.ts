import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface AuthObject {
  isVerified: boolean;
  id: string;
  mobiHolderId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  companyName: string | null;
  companyAddress: string | null;
  companyEmail: string | null;
  aboutCompany: string | null;
  natureOfOrganization: string | null;
  isSuperAdmin: boolean;
  accountType: string;
  acceptedTnC: boolean;
  photo: string;
  wallet: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TokenStore {
  value: string;
  userObject?: AuthObject;
  setValue: (newValue: string) => void;
  getValue: () => string;
  setAccount: (data: any) => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      value: "",
      setValue: (newValue: string) => set({ value: newValue }),
      getValue: () => get().value,
      setAccount: (data: any) => set({ userObject: data }),
    }),
    {
      name: "string-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
