import { User } from "src/user/user.entity";
import { Plan} from "../subscription/plan.entity";


export interface Transaction {
    id: string;
}

export interface CheckoutService {

    createSubscriptionTransaction(user: User, plan: Plan): Promise<Transaction>;

    // createTransaction(userId: string, plan: Plan) Promise<Transaction>;
    verifyTransaction(id: string): Promise<Transaction>;
}

