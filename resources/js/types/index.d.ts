export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
export interface CategoryItem {
    id: number;
    uuid: string;
    user_id: number;
    parent_id: number;
    parent: CategoryItem;
    name: string;
}
export interface WalletItem {
    id: number;
    uuid: string;
    user_id: number;
    parent_id: number;
    parent: WalletItem;
    type: string;
    starting_balance?: number;
    name: string;
}
export interface RecordItem {
    id: number;
    uuid: string;
    user_id: number;
    category_id: number;
    category: CategoryItem;
    name: string;
    type: string;
    from_wallet_id: string;
    from_wallet: WalletItem;
    to_wallet_id: string;
    to_wallet: WalletItem;
    amount: number;
    extra_type: string;
    extra_percentage: number;
    extra_amount: number;
    date: string;
    time: string;
    datetime: string;
    note: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
