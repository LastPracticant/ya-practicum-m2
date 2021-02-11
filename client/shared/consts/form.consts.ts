export const CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR = new RegExp(/^((?!\s)[a-zA-Z]){3,20}$/);
export const CHECK_PHONE_NUMBER = new RegExp(/^\d{7,11}$/);
export const CHECK_EMAIL = new RegExp(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/);
