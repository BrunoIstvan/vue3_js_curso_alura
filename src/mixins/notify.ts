import { TypeNotification } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/mutations";

import { store } from '@/store';

export const notifyMixin = {
    methods: {
        notify(type: TypeNotification, title: string, text: string) : void {
            store.commit(NOTIFY, { type, title, text });
        }
    }
}