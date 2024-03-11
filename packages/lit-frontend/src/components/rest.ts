const API_ROOT = "http://localhost:3000/api";

export function serverPath(path: string) {
  return `${API_ROOT}${path}`;
}

// const SERVER_ROOT = "http://localhost:3000";
const SERVER_ROOT = window.location.origin;
const API_PATH = "/api";
const TOKEN_KEY = "JWT_AUTH_TOKEN";

export class APIUser {
  authenticated = false;
  username = "fellow_traveler";
  signOut = () => {};

  static _theUser = new APIUser();

  static deauthenticate(user: APIUser) {
    const anon = new APIUser();

    console.log("Deauthenticating", user, APIUser._theUser);
    if (user === APIUser._theUser) {
      localStorage.removeItem(TOKEN_KEY);
      APIUser._theUser = anon;
    }

    console.log("Deauthenticated", APIUser._theUser);

    return anon;
  }
}

export class AuthenticatedUser extends APIUser {
  token: string | undefined;

  constructor(token: string, signOut: () => void) {
    super();
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const jsonPayload = JSON.parse(payload);

    console.log("Token payload", jsonPayload);
    this.token = token;
    this.authenticated = false;

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (jsonPayload.exp && jsonPayload.exp < currentTime) {
      console.log("Token expired");
      // const TOKEN_KEY = "JWT_AUTH_TOKEN";
      // console.log("Signing out");
      // localStorage.removeItem(TOKEN_KEY);
    } else {
      console.log("Token not expired");
      this.authenticated = true; // Set authenticated to true if token is not expired
      this.username = jsonPayload.username;
      this.signOut = signOut;
    }

    this.username = jsonPayload.username;
    this.signOut = signOut;
  }

  static authenticate(token: string, signOut: () => void) {
    APIUser._theUser = new AuthenticatedUser(token, signOut);
    localStorage.setItem(TOKEN_KEY, token);
    return APIUser._theUser;
  }

  static authenticateFromLocalStorage(signOut: () => void) {
    const priorToken = localStorage.getItem(TOKEN_KEY);

    return priorToken
      ? AuthenticatedUser.authenticate(priorToken, signOut)
      : APIUser._theUser;
  }
}

export class JSONRequest {
  json: Object | undefined;
  user: AuthenticatedUser | undefined;
  _base = API_PATH;

  constructor(body: Object | undefined) {
    this.json = body;
  }

  base(newBase: string = "") {
    this._base = newBase;
    return this;
  }

  get(endpoint: string): Promise<Response> {
    return fetch(this._url(endpoint), {
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json),
    });
  }

  // gets absolute path
  getAbsolute(endpoint: string): Promise<Response> {
    const path = `${SERVER_ROOT}${endpoint}`;
    return fetch(path, {
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json),
    });
  }

  post(endpoint: string) {
    return fetch(this._url(endpoint), {
      method: "POST",
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json),
    });
  }

  postAbsolute(endpoint: string) {
    const path = `${SERVER_ROOT}${endpoint}`;
    return fetch(path, {
      method: "POST",
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json),
    });
  }

  put(endpoint: string) {
    return fetch(this._url(endpoint), {
      method: "PUT",
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json),
    })
      .then((response) => {
        if (response.status === 413) {
          return Promise.reject("Payload Too Large");
        }
        // Handle other response statuses if needed
        return response.json(); // or response.text() if response body is text
      })
      .catch((error) => {
        // Handle other types of errors
        return Promise.reject(error);
       
      });
  }

  _headers() {
    const hasBody = this.json !== undefined;
    const isAuthenticated = APIUser._theUser.authenticated;
    const contentType = { "Content-Type": "application/json" };

    if (isAuthenticated) {
      const token = (APIUser._theUser as AuthenticatedUser).token;
      const authorization = {
        Authorization: `Bearer ${token}`,
      };
      if (hasBody) return { ...contentType, ...authorization };
      else return authorization;
    } else {
      if (hasBody) return { ...contentType };
      else return undefined;
    }
  }

  _url(path: string) {
    return `${SERVER_ROOT}${this._base}${path}`;
  }
}

export class FormDataRequest extends JSONRequest {
  constructor(body: FormData) {
    super(Object.fromEntries(body));
  }
}

export class APIRequest extends JSONRequest {
  constructor() {
    super(undefined);
  }
}
