'use client';

import { useState } from 'react';

export interface LeadFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
}

interface LeadFormProps {
  fields: LeadFormField[];
  /** Extra hidden values submitted with the form (subject, service, …). */
  hiddenValues?: Record<string, string>;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  selectPlaceholder?: string;
}

// Public Web3Forms site key, carried over from the legacy SPA forms.
const ACCESS_KEY = 'b9f95d5b-8f90-477b-a068-55293c654708';

export default function LeadForm({
  fields,
  hiddenValues,
  submitLabel,
  sendingLabel,
  successMessage,
  errorMessage,
  selectPlaceholder,
}: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', ACCESS_KEY);
    for (const [key, value] of Object.entries(hiddenValues ?? {})) {
      formData.append(key, value);
    }
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const json = (await response.json()) as { success: boolean };
      setStatus(json.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="text-green-400 font-semibold text-center py-8">{successMessage}</p>;
  }

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`f-${field.name}`} className="block text-sm text-gray-400 mb-1">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea id={`f-${field.name}`} name={field.name} required={field.required} rows={5} className={inputClass} />
          ) : field.type === 'select' ? (
            <select id={`f-${field.name}`} name={field.name} required={field.required} defaultValue="" className={inputClass}>
              <option value="" disabled>
                {selectPlaceholder ?? '—'}
              </option>
              {(field.options ?? []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={`f-${field.name}`}
              name={field.name}
              type={field.type}
              required={field.required}
              dir={field.type === 'tel' || field.type === 'email' ? 'ltr' : undefined}
              className={inputClass}
            />
          )}
        </div>
      ))}
      {status === 'error' && <p className="text-red-400 text-sm">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full font-bold py-3 px-6 rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? sendingLabel : submitLabel}
      </button>
    </form>
  );
}
