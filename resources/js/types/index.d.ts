export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
export interface Record {
    id: number;
    user_id: number;
    category_id: number;
    category: string;
    uuid: string;
    name: string;
    type: string;
    from_wallet_id: string;
    from_wallet: string;
    to_wallet_id: string;
    to_wallet: string;
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
