import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Payment } from 'mercadopago';
import { getMercadoPagoConfig } from '@/lib/mercadopago';

const BILLING_CYCLE_DAYS = 30;

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
        const paymentId = String(paymentData.id);

        // Se for uma compra do plano PRO
        if (externalReference === 'unilink_pro_subscription' && userId) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              mercadopagoPaymentId: true,
              mercadopagoCurrentPeriodEnd: true,
            },
          });

          if (!user) {
            return new NextResponse('User not found', { status: 404 });
          }

          if (user.mercadopagoPaymentId === paymentId) {
            return new NextResponse('OK', { status: 200 });
          }

          const baseDate =
            user.mercadopagoCurrentPeriodEnd &&
            user.mercadopagoCurrentPeriodEnd.getTime() > Date.now()
              ? user.mercadopagoCurrentPeriodEnd
              : new Date();

          const nextPeriodEnd = new Date(baseDate);
          nextPeriodEnd.setDate(nextPeriodEnd.getDate() + BILLING_CYCLE_DAYS);

          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: 'PRO',
              mercadopagoPaymentId: paymentId,
              mercadopagoCurrentPeriodEnd: nextPeriodEnd,
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
