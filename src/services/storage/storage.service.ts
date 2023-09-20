import { ObjectOrArray } from '@interfaces';

/* eslint-disable @typescript-eslint/no-explicit-any */
class StorageService {
  private prefix = import.meta.env.VITE_REACT_APP_BASE_NAME || 'app';

  private localStorage: Storage | undefined;

  private sessionStorage: Storage | undefined;

  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  // Local Storage
  public set(key: string, data: string | number): void {
    this.localStorage?.setItem(this.generateKey(key), data.toString());
  }

  public get(key: string): string | null {
    return this.localStorage ? this.localStorage.getItem(this.generateKey(key)) : null;
  }

  public remove(key: string): void {
    this.localStorage?.removeItem(this.generateKey(key));
  }

  public clear(): void {
    this.localStorage?.clear();
  }

  public setObject(key: string, data: ObjectOrArray): void {
    this.set(key, JSON.stringify(data));
  }

  public getObject(key: string): ObjectOrArray {
    const value = this.get(key);
    return value !== null ? JSON.parse(value) : null;
  }

  // Session Storage
  public setSession(key: string, data: string | number): void {
    this.sessionStorage?.setItem(this.generateKey(key), data.toString());
  }

  public getSession(key: string): string | null {
    return this.sessionStorage ? this.sessionStorage.getItem(this.generateKey(key)) : null;
  }

  public setSessionObject(key: string, data: ObjectOrArray): void {
    this.setSession(key, JSON.stringify(data));
  }

  public getSessionObject(key: string): ObjectOrArray {
    const value = this.getSession(key);
    return value !== null ? JSON.parse(value) : null;
  }

  private generateKey(key: string): string {
    return `${this.prefix}_${key}`;
  }

  // Cookie
  public clearCookie() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  public getCookie(name: string) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  public setCookie(name: string, value: string) {
    let expires = '';
    const days = 1;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
}

export default new StorageService();
