// website/src/hooks/useContact.ts
import { useMutation } from '@tanstack/react-query';
import { API } from '../lib/axios';
import { handleError } from '../lib/handleError';

// ─── Payload sent to POST /contact ────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message?: string;
  preferredTime?: string;
}

// ─── Shape of the API response ────────────────────────────────────────────────
export interface ContactResponse {
  id: string;
  status: 'received';
}

// ─── Mutation hook ────────────────────────────────────────────────────────────
export const useSubmitContact = () =>
  useMutation<ContactResponse, Error, ContactPayload>({
    mutationFn: async (payload) => {
      const { data } = await API.post<ContactResponse>('/contact', payload);
      return data;
    },
    onError: handleError,
  });