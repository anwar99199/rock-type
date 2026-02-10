import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { LanguageProvider } from '@/app/contexts/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}