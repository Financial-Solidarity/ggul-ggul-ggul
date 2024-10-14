declare module '@types' {
  export type NotificationType =
    | 'CHALLENGE_READY'
    | 'CHALLENGE_START'
    | 'CHALLENGE_END'
    | 'CHALLENGE_DESTROYED'
    | '';

  export interface NotificationDTO {
    id: string;
    title: string;
    body: string;
    createdAt: string;
  }

  export interface NotificationListResponse extends Pagination {
    content: NotificationDTO[];
  }
}
