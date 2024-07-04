export class Token {
  private TOKEN_KEY = "token";

  get() {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    return token;
  }

  save(newToken: string) {
    return sessionStorage.setItem(this.TOKEN_KEY, newToken);
  }

  clear() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}

export const token = new Token();
