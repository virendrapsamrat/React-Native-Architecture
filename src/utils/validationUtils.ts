import { Regex } from '@/constants/Regex';

export const isValidEmail = (email: string): boolean => Regex.EMAIL.test(email);

export const isValidPassword = (password: string): boolean =>
  Regex.PASSWORD.test(password);

export const isValidPhone = (phone: string): boolean => Regex.PHONE.test(phone);

export const isRequired = (value: string): boolean => value.trim().length > 0;

export const minLength = (value: string, min: number): boolean =>
  value.length >= min;

export const passwordsMatch = (password: string, confirm: string): boolean =>
  password === confirm;
