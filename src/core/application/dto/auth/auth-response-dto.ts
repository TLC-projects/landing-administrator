export interface LoginCredentialsDto {
  email: string
  password: string
}

export interface TokenCredentialsDto {
  data: string
}

export interface AuthUserDto {
  id: string
  name: string,
  lastName: string,
  email: string
  password?: string
}

export interface AuthServerResponseDto {
  data?: string
  user?: AuthUserDto
}

export interface AuthResultDto {
  success: boolean
  message?: string
  user?: AuthUserDto
}