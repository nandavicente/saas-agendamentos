import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  updateStatus(arg0: number, status: string) {
    throw new Error('Method not implemented.');
  }
  findByAppointment(arg0: number) {
    throw new Error('Method not implemented.');
  }
  create(arg0: any) {
    throw new Error('Method not implemented.');
  }
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-01' });

  async createPaymentIntent(amount: number, currency = 'brl') {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
  }
}
