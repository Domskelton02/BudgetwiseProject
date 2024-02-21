export interface UserData {
    name: string;
    email: string;
    password: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RefreshToken {
    refreshToken: string;
  }
  
  export interface ForgotPasswordRequest {
    email: string;
  }
  
export interface LoginResponse {
    token: string;
    user: {
      id: string;
      email: string;
    };
  }
  