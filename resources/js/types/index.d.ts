export interface User {
    // id: number,
    uuid: string,
    name: string,
    email: string,
    email_verified_at: string,
    avatar?: string,
    username?: string,
}

export interface BudgetItem {
    // id: number,
    uuid: string,
    name: string,
    description: string,
    start: string,
    end: string,
    occurence: string,
    interval: string,
    amount: number,
    used: number,
    remaining: number,

    budget_category?: CategoryItem[],
    budget_wallet?: WalletItem[],
    budget_tags?: TagsItem[],
}
export interface CategoryItem {
    // id: number,
    uuid: string,
    user_id: number,
    parent_id: number,
    parent?: CategoryItem,
    child?: CategoryItem[],
    name: string,
    deleted_at?: string | null
}
export interface PlannedItem {
    // id: number,
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
    planned_payment_tags?: TagsItem[],
    deleted_at?: string,
}
export interface PlannedRecord {
    // id: number,
    uuid: string,
    planned_payment_id: number,
    planned_payment: PlannedItem,
    record_id?: number,
    record?: RecordItem,
    status: string,
    period: string
}
export interface RecordItem {
    // id: number,
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
    planned_payment_record: PlannedRecord,
    record_tags?: TagsItem[],
    is_hidden: boolean | number
}
export interface TagsItem {
    // id: number,
    uuid: string,
    user_id: number,
    name: string,
    deleted_at?: string | null
}
export interface WalletItem {
    // id: number,
    uuid: string,
    user_id: number;
    parent_id: number,
    parent: WalletItem,
    child?: WalletItem[],
    type: string,
    name: string,
    starting_balance?: number,
    current_balance?: number,
    balance?: number,
    deleted_at?: string | null
}
export interface WalletGroupItem {
    // id: number,
    uuid: string,
    user_id: number,
    name: string,
    balance?: number,
    wallet_group_item?: WalletItem[]
}
export interface WalletShareItem {
    // id: number,
    uuid: string,
    user_id?: number,
    token: string,
    name: string,
    note?: string,
    passphrase?: string,
    valid_until: string,
    balance?: number,
    wallet_share_item?: WalletItem[]
}

export interface NotificationActionDetail {
    title: string,
    route: string
}
export interface NotificationAction {
    title: string,
    message: string,
    actions: NotificationActionDetail[],
    data: NotificationAction
}
export interface NotificationItem {
    // id: number,
    uuid: string,
    title: string,
    message: string,
    action: NotificationAction | any,
    is_seen: boolean,
    created_at: string,
    seen_at?: string | undefined | null
}

export interface Timezone {
    label: string,
    tzCode: string,
    name: string,
    utc: string,
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        timezone?: string
    };
};
