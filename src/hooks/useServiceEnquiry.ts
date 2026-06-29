// website/src/hooks/useServiceEnquiry.ts
import { useMutation } from '@tanstack/react-query';
import { API } from '../lib/axios';
import { handleError } from '../lib/handleError';

// ─── Payload sent to POST /enquiry ────────────────────────────────────────────
// `service` is always pre-filled from the clicked service card.
export interface ServiceEnquiryPayload {
  name: string;
  email: string;
  company?: string;
  message?: string;
  service: string;
}

// ─── Shape of the API response ────────────────────────────────────────────────
export interface EnquiryResponse {
  id: string;
  status: 'received';
}

// ─── Mutation hook ────────────────────────────────────────────────────────────
export const useSubmitServiceEnquiry = () =>
  useMutation<EnquiryResponse, Error, ServiceEnquiryPayload>({
    mutationFn: async (payload) => {
      const { data } = await API.post<EnquiryResponse>('/contact/service', payload);
      return data;
    },
    onError: handleError,
  });