import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Payment } from 'mercadopago';
import { getMercadoPagoConfig } from '@/lib/mercadopago';

export async function POST(req: Request) {
  try {
    const mpConfig = getMercadoPagoConfig();
    const body = await req.json();
    const { action, data } = body;

    // Apenas processamos pagamentos finalizados
    if (action === 'payment.created' || action === 'payment.updated') {
      const paymentId = data.id;
      const payment = new Payment(mpConfig);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const userId = paymentData.metadata.user_id;
        const externalReference = paymentData.external_reference;

        // Se for uma compra do plano PRO
        if (externalReference === 'unilink_pro_subscription') {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: 'PRO',
              // Aqui poderíamos adicionar lógica de expiração se não for vitalício
            }
          });
          console.log(`[MP_WEBHOOK] User ${userId} upgraded to PRO`);
        }
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('[MERCADOPAGO_WEBHOOK_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
