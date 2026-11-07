import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { StudentDashboard } from './pages/StudentDashboard'
import { ClassRepDashboard } from './pages/ClassRepDashboard'
import { LecturerDashboard } from './pages/LecturerDashboard'
import { CoursesPage } from './pages/CoursesPage'
import { AnnouncementsPage } from './pages/AnnouncementsPage'
import { CalendarPage } from './pages/CalendarPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/student" replace />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/class-rep" element={<ClassRepDashboard />} />
          <Route path="/lecturer" element={<LecturerDashboard />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
