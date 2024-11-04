import { SubscriptionHistory } from "./SubscriptionHistory";
import { User } from "./user";
export class Subscription {
    idSub: number;
    dateDebut: Date;
    dateExpiration: Date;
    price: number;
    subType: SubscriptionType;
    user: User;
    //subscriptionHistories: SubscriptionHistory[];
}
export enum SubscriptionType {
    ANNUEL = 'ANNUEL',
    MENSUEL = 'MENSUEL',
    SEMESTRIEL = 'SEMESTRIEL'
  }
  
  
