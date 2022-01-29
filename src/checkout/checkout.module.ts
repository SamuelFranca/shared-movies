import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { ConfigService } from '@nestjs/config';
import { SubscriptionService } from '../subscription/subscription.service';
import { StripeCheckoutService } from './stripe/stripe-checkout.service';
import { CHECKOUT_SERVICE } from './checkout.constants'
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  
  imports: [SubscriptionModule],
  controllers: [CheckoutController],
  providers: [
  {    
    inject: [ConfigService, SubscriptionService ],
    provide: CHECKOUT_SERVICE,
    useFactory: (configService: ConfigService, subscriptionService: SubscriptionService ) => new StripeCheckoutService(configService, subscriptionService),
  }
  ],
})
export class CheckoutModule {}
