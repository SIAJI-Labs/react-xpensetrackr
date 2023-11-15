export interface User {
    id: number,
    uuid: string,
    name: string,
    email: string,
    email_verified_at: string,
    avatar?: string,
    username?: string
}
export interface CategoryItem {
    id: number,
    uuid: string,
    user_id: number,
    parent_id: number,
    parent: CategoryItem,
    name: string
}
export interface WalletItem {
    id: number,
    uuid: string,
    user_id: number;
    parent_id: number,
    parent: WalletItem,
    child?: WalletItem,
    type: string,
    name: string,
    starting_balance?: number,
    current_balance?: number,
    balance?: number
}
export interface RecordItem {
    id: number,
    uuid: string,
    user_id: number,
    category_id: number,
    category: CategoryItem,
    name: string,
    type: string,
    from_wallet_id: string,
    from_wallet: WalletItem,
    to_wallet_id: string,
    to_wallet: WalletItem,
    amount: number,
    extra_type: string,
    extra_percentage: number,
    extra_amount: number,
    date: string,
    time: string,
    datetime: string,
    note: string,
    planned_payment_record: PlannedRecord
}
export interface PlannedItem {
    id: number,
    uuid: string,
    number: string,
    user_id: number,
    category_id: number,
    category: CategoryItem,
    name: string,
    type: string,
    from_wallet_id: string,
    from_wallet: WalletItem,
    to_wallet_id: string,
    to_wallet: WalletItem,
    amount: number,
    extra_type: string,
    extra_percentage: number,
    extra_amount: number,
    date_start: string,
    date_start_temp?: string,
    repeat_type: string,
    repeat_frequency: number,
    repeat_period: string,
    repeat_until: string,
    until_number: number,
    note: string,
    deleted_at?: string,
}
export interface PlannedRecord {
    id: number,
    uuid: string,
    planned_payment_id: number,
    planned_payment: PlannedItem,
    record_id?: number,
    record?: RecordItem,
    status: string,
    period: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
