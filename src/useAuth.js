import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router'

export function useAuth()  {
  const router = useRouter()

  async function refreshTokenIfNeeded() {
    const token = sessionStorage.getItem('accessToken');
    if (token && isTokenExpired(token)) {
      try {
        const formData = new URLSearchParams();
        formData.append('refreshToken', sessionStorage.getItem('refreshToken'));

        const response = await fetch('http://localhost:8080/refreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });

        if (response.ok) {
          const newToken = await response.text();
          sessionStorage.setItem('accessToken', newToken);
          return newToken;
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (err) {
        await router.push('/login');
      }
    }
    return token;
  }

  function isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true; // Assume expired if there's an error decoding
    }
  }

  return { refreshTokenIfNeeded, isTokenExpired };
}
