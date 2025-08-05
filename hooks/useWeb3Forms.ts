
import { useState } from 'react';

interface UseWeb3FormsProps {
  access_key: string;
  onSuccess?: (message: string, data: any) => void;
  onError?: (message: string, data: any) => void;
}

interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useWeb3Forms = ({ access_key, onSuccess, onError }: UseWeb3FormsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Web3FormsResponse | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", access_key);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const jsonResponse: Web3FormsResponse = await response.json();
      setResult(jsonResponse);

      if (jsonResponse.success) {
        onSuccess?.(jsonResponse.message, jsonResponse.data);
      } else {
        onError?.(jsonResponse.message, jsonResponse.data);
      }
    } catch (error) {
        const errorResponse = { success: false, message: "An unexpected error occurred." };
        setResult(errorResponse);
        onError?.(errorResponse.message, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, result };
};