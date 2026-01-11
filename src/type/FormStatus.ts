export type formStatusType = {
    status: string;
    message: string;
    data?: {
        [key: string]: string;
    } | any;
    formData?: FormData;
}

export const initFormStatus: formStatusType = {
    status: "",
    message: ''
}