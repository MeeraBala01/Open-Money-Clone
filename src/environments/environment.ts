import { InjectionToken } from '@angular/core';

export const URL_CONFIG = new InjectionToken<urlConfigType>('URL_CONFIG');

interface urlConfigType {
  baseUrl: string;
}

export const urlConfig = { baseUrl: 'https://uat-onboarding-dev.bankopen.co' };
