import * as Yup from 'yup';

const requiredFiled = Yup.string().required('This is the required field');

export const loginValidator = requiredFiled
    .min(1, 'Should be more than or equal to 1 symbols')
    .max(20, 'Should be less than or equal to 20 symbols')
    .matches(
        /^(?=.*[A-Za-z])[-_A-Za-z\d]{1,20}$/,
        'Latin, can contain numbers, but not consist of them, no spaces, no special characters (hyphens and underscores are allowed)',
    );

export const emailValidator = requiredFiled.email('Invalid email');

export const passwordValidator = requiredFiled
    .min(8, 'Should be more than or equal to 8 symbols')
    .max(40, 'Should be less than or equal to 40 symbols')
    .matches(
        /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
        'At least one capital letter and a number are required',
    );

export const phoneValidator = requiredFiled
    .min(5, 'Should be more than or equal to 10 symbols')
    .max(15, 'Should be less than or equal to 15 symbols')
    .matches(/^\+?[0-9]{5,15}$/, 'Consists of numbers, may start with a plus');

export const nameValidator = requiredFiled.matches(
    /(^[A-Z][a-z-]*[a-z]$)|(^[А-ЯЁ][а-яё-]*[а-яё]$)/,
    'Latin or Cyrillic, the first letter must be capital, no spaces and no numbers, no special characters (only a hyphen is allowed)',
);

export const passwordConfirmationValidator = (ref: string) => requiredFiled.oneOf([Yup.ref(ref), null], 'Passwords must match');
