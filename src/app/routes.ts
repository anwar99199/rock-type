import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/app/layouts/RootLayout';
import { StonesGallery } from '@/app/components/StonesGallery';
import { LandingPage } from '@/app/components/LandingPage';
import { AnalyzePage } from '@/app/pages/AnalyzePage';
import { LearningPage } from '@/app/pages/LearningPage';
import { CoursesPage } from '@/app/pages/CoursesPage';
import { CourseDetailPage } from '@/app/pages/CourseDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: 'stones',
        Component: StonesGallery,
      },
      {
        path: 'analyze',
        Component: AnalyzePage,
      },
      {
        path: 'learn',
        Component: LearningPage,
      },
      {
        path: 'courses',
        Component: CoursesPage,
      },
      {
        path: 'courses/:courseId',
        Component: CourseDetailPage,
      },
    ],
  },
]);