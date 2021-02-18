export type PatternProps = {
    value: RegExp;
    message: string;
};

export const CHECK_REQUIRED = {
    value: true,
    message: 'Это обязательное поле',
};

export const CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR = {
    value: new RegExp(/^((?!\s)[a-zA-Z]){3,20}$/),
    message: 'Буквы от 3 до 20',
};

export const CHECK_PHONE_NUMBER = {
    value: new RegExp(/^\d{7,11}$/),
    message: 'Номер телефона должен содержать цифры.',
};

export const CHECK_EMAIL = {
    value: new RegExp(/(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/),
    message: 'Указанный email не существует.',
};
