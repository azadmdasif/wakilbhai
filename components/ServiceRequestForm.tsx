'use client';

import { useSearchParams } from 'next/navigation';
import LeadForm from './LeadForm';

interface ServiceOption {
  id: string;
  title: string;
  priceINR: number;
}

interface ServiceRequestFormProps {
  services: ServiceOption[];
  strings: {
    serviceName: string;
    costInfo: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

/**
 * Reads ?service={id} on the client so the page itself stays fully static.
 * Must be rendered inside a <Suspense> boundary.
 */
export default function ServiceRequestForm({ services, strings }: ServiceRequestFormProps) {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const selected = services.find((s) => s.id === serviceId);

  return (
    <div>
      {selected && (
        <div className="mb-6 bg-gray-800 border border-brand-gold/30 rounded-xl p-4">
          <p className="text-sm text-gray-400">{strings.serviceName}</p>
          <p className="text-lg font-bold text-white">{selected.title}</p>
          <p className="text-brand-gold font-extrabold font-display">₹{selected.priceINR}</p>
        </div>
      )}
      <LeadForm
        fields={[
          { name: 'name', label: strings.name, type: 'text', required: true },
          { name: 'email', label: strings.email, type: 'email' },
          { name: 'phone', label: strings.phone, type: 'tel', required: true },
          { name: 'message', label: strings.message, type: 'textarea' },
        ]}
        hiddenValues={{
          subject: `Service request: ${selected ? selected.title : 'unspecified'}`,
          from_name: 'WakilBhai Service Request',
          service_id: selected?.id ?? '',
          service_price: selected ? String(selected.priceINR) : '',
        }}
        submitLabel={strings.send}
        sendingLabel={strings.sending}
        successMessage={strings.success}
        errorMessage={strings.error}
      />
      <p className="text-xs text-gray-500 mt-4">{strings.costInfo}</p>
    </div>
  );
}
