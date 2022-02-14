export enum TypeNotification {
    SUCCESS, 
    WARNING,
    ERROR
}

export interface INotification {
    title: string,
    text: string,
    type: TypeNotification,
    id: number
}