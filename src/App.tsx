import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegistrationPage from './pages/Registration/RegistationPage';
import HomePage from './pages/Home/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { UserRole } from './models/user/UserRole';
import GradesPage from './pages/Student/Grades/GradesPage';
import { useAppSelector } from './store/store';
import TeacherSubjectsPage from './pages/Teacher/Subjects/SubjectsPage';
import AdminGroupsPage from './pages/Admin/Groups/GroupsPage';
import AdminGroupPage from './pages/Admin/Groups/GroupPage';
import AddGroupPage from './pages/Admin/Groups/AddGroupPage';
import EditGroupPage from './pages/Admin/Groups/EditGroupPage';
import UsersPage from './pages/Admin/Users/UsersPage';
import EditUserPage from './pages/Admin/Users/EditUserPage';
import SubjectsPage from './pages/Admin/Subjects/SubjectsPage';
import EditSubjectPage from './pages/Admin/Subjects/EditSubjectPage';
import AddSubjectPage from './pages/Admin/Subjects/AddSubjectPage';
import GroupWithSubjectsPage from './pages/Teacher/Groups/GroupWithSubjectsPage';
import GroupGradesPage from './pages/Teacher/Groups/GroupGradesPage';
import StudentGradesPage from './pages/Teacher/Grades/StudentGradesPage';
import GroupFinalGradesPage from './pages/Teacher/Groups/GroupFinalGradesPage';
import StudentFinalGradePage from './pages/Teacher/Grades/StudentFinalGradePage';
import FinalGradesPage from './pages/Student/Grades/FinalGradesPage';
import SubjectGroupsPage from './pages/Teacher/Subjects/SubjectGroupsPage';
import StudentAddGradePage from './pages/Teacher/Grades/StudentAddGradePage';
import StudentEditGradePage from './pages/Teacher/Grades/StudentEditGradePage';
import UserInfoPage from './pages/UserInfo/UserInfoPage';
import GradesExportRecord from './pages/Admin/Grades/GradesExportRecord';

function App() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="/*" element={<HomePage />}>
                    {user?.role == UserRole.Student && (
                        <>
                            <Route
                                path="grades"
                                element={
                                    <ProtectedRoute
                                        component={<GradesPage />}
                                        allowedRoles={[UserRole.Student]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="final-grades"
                                element={
                                    <ProtectedRoute
                                        component={<FinalGradesPage />}
                                        allowedRoles={[UserRole.Student]}
                                        redirectPath={''}
                                    />
                                }
                            />
                        </>
                    )}
                    {user?.role == UserRole.Teacher && (
                        <>
                            <Route
                                path="subjects"
                                element={
                                    <ProtectedRoute
                                        component={<TeacherSubjectsPage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="groups/:groupId/subjects"
                                element={
                                    <ProtectedRoute
                                        component={<GroupWithSubjectsPage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="groups/:groupId/subject/:subjectId/grades"
                                element={
                                    <ProtectedRoute
                                        component={<GroupGradesPage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="groups/:groupId/subject/:subjectId/final-grades"
                                element={
                                    <ProtectedRoute
                                        component={<GroupFinalGradesPage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="grades/subject/:subjectId/student/:studentId"
                                element={
                                    <ProtectedRoute
                                        component={<StudentGradesPage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="grades/subject/:subjectId/student/:studentId/add_grade"
                                element={
                                    <ProtectedRoute
                                        component={<StudentAddGradePage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="grades/subject/:subjectId/student/:studentId/grade/:gradeId/edit"
                                element={
                                    <ProtectedRoute
                                        component={<StudentEditGradePage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="grades/subject/:subjectId/student/:studentId/final"
                                element={
                                    <ProtectedRoute
                                        component={<StudentFinalGradePage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="subject_groups/:subjectId"
                                element={
                                    <ProtectedRoute
                                        component={<SubjectGroupsPage />}
                                        allowedRoles={[UserRole.Teacher]}
                                        redirectPath={''}
                                    />
                                }
                            />
                        </>
                    )}
                    {user?.role == UserRole.Admin && (
                        <>
                            <Route
                                path="groups"
                                element={
                                    <ProtectedRoute
                                        component={<AdminGroupsPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="groups/:groupId"
                                element={
                                    <ProtectedRoute
                                        component={<AdminGroupPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="groups/:groupId/edit"
                                element={
                                    <ProtectedRoute
                                        component={<EditGroupPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="groups/create"
                                element={
                                    <ProtectedRoute
                                        component={<AddGroupPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />

                            <Route
                                path="users"
                                element={
                                    <ProtectedRoute
                                        component={<UsersPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="users/:userId/edit"
                                element={
                                    <ProtectedRoute
                                        component={<EditUserPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />

                            <Route
                                path="subjects"
                                element={
                                    <ProtectedRoute
                                        component={<SubjectsPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="subjects/:subjectId/edit"
                                element={
                                    <ProtectedRoute
                                        component={<EditSubjectPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="subjects/create"
                                element={
                                    <ProtectedRoute
                                        component={<AddSubjectPage />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                            <Route
                                path="grades/export"
                                element={
                                    <ProtectedRoute
                                        component={<GradesExportRecord />}
                                        allowedRoles={[UserRole.Admin]}
                                        redirectPath={''}
                                    />
                                }
                            />
                        </>
                    )}

                    {user !== null && (
                        <Route path="user_info" element={<UserInfoPage />} />
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
