import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { StudentDashboard } from './pages/StudentDashboard'
import { ClassRepDashboard } from './pages/ClassRepDashboard'
import { LecturerDashboard } from './pages/LecturerDashboard'
import { CoursesPage } from './pages/CoursesPage'
import { AnnouncementsPage } from './pages/AnnouncementsPage'
import { CalendarPage } from './pages/CalendarPage'

function RoleHome() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  const destinations = {
    student: '/student',
    class_rep: '/class-rep',
    lecturer: '/lecturer',
  }

  return <Navigate to={destinations[user.role]} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected application routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<RoleHome />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/class-rep"
            element={
              <ProtectedRoute allowedRoles={['class_rep']}>
                <ClassRepDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lecturer"
            element={
              <ProtectedRoute allowedRoles={['lecturer']}>
                <LecturerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}