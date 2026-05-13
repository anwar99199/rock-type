import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { AuthProvider } from '@/app/contexts/AuthContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  );
}
