interface AuthenticationRequest {
  name: string
  email: string
  password: string
}

export type SignUpRequest = Required<AuthenticationRequest>

export type LoginRequest = Required<Omit<AuthenticationRequest, 'name'>>