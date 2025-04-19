// app/payment/response/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentResponsePage() {
    const searchParams = useSearchParams();
    const refPayco = searchParams.get('ref_payco');
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (!refPayco) return;

            try {
                const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`);
                const data = await response.json();
                
                // Verificamos el estado
                if (data.success && data.data) {
                    const status = data.data.x_response;
                    setPaymentStatus(status);
                } else {
                    setPaymentStatus('Error consultando el pago');
                }
            } catch (error) {
                console.error('Error consultando ePayco:', error);
                setPaymentStatus('Error en la validación');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentStatus();
    }, [refPayco]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Cargando estado de pago...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {paymentStatus === 'Aceptada' ? (
                <>
                    <h1 className="text-2xl font-bold text-green-600">¡Pago aprobado!</h1>
                    <p className="mt-4">Gracias por tu compra. Referencia: {refPayco}</p>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-red-600">Pago rechazado o pendiente</h1>
                    <p className="mt-4">Estado: {paymentStatus}</p>
                    <p className="mt-2">Referencia: {refPayco}</p>
                </>
            )}
        </div>
    );
}
