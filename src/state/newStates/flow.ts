import { atom, useAtom } from "jotai";
let member_atom = atom<null | UserData>(null);
export function useMemberEdit() {
  let [member, setMember] = useAtom(member_atom);
  return { member, setMember };
}

interface Individual {
  aboutCompany: string | null;
  acceptedTnC: boolean;
  accountType: string;
  companyAddress: string | null;
  companyEmail: string | null;
  companyName: string | null;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  emailVerifiedAt: string;
  firstName: string;
  id: string;
  isSuperAdmin: boolean;
  isVerified: boolean;
  lastName: string;
  mobiHolderId: string;
  natureOfOrganization: string | null;
  phoneNumber: string;
  photo: string;
  status: string;
  updatedAt: string;
  username: string;
  wallet: string;
}

interface UserData {
  createdAt: string;
  dateJoined: string;
  designation: string;
  id: number;
  individual: Individual;
  individualId: string;
  memberId: string;
  organizationEmail: string;
  organizationId: string;
  requestedBy: string;
  status: string;
  updatedAt: string;
}
import axios from "axios";
import { useTokenStore } from "./auth";

export const BaseUrl = "https://api.mobiholder.tech";
export const newApi = axios.create({
  baseURL: BaseUrl,
});

newApi.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
