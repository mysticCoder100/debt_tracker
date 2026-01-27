import {AggregateField} from "@firebase/firestore";

export  type DebtorCountType = {
    debtor: AggregateField<number>;
    non_debtor: AggregateField<number>;
};

export type TotalDebtType = {
    total: AggregateField<number>;
}