export const SIGNIN = '/signin';
export const ROOT = '/';

// -> these two if not explicitly say then use '/api/auth'
// '/api/auth/callback/google'
// '/api/auth/callback/github'
export const PUBLIC_ROUTES = [
  '/signin',
  '/register',
  '/products',
  '/api/signin',
  '/api/register',
  '/api/auth',
  '/marketplace',
  '/test',
  '/api/uploadthing',
  '/api/products',
  '/api/diseases'
]

export const PROTECTED_SUB_ROUTES = [
  '/checkout',
]