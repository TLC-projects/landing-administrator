export interface UserResultDto {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    jwtToken: string;
}

export interface UserServerResponseDto {
    data?: UserResultDto | UserResultDto[];
}