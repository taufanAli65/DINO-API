export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthenticatedRequest extends Request {
    params: any;
    user: AuthUser;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest{
    email: string;
    password: string;
}