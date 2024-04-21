import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegistrationPage from './pages/Registration/RegistationPage';
import HomePage from './pages/Home/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { UserRole } from './models/user/UserRole';
import GradesPage from './pages/Student/Grades/GradesPage';
import { useAppSelector } from './store/store';
import TeacherGroupsPage from './pages/Teacher/Groups/GroupsPage';
import AdminGroupsPage from './pages/Admin/Groups/GroupsPage';
import AdminGroupPage from './pages/Admin/Groups/GroupPage';
import AddGroupPage from './pages/Admin/Groups/AddGroupPage';
import EditGroupPage from './pages/Admin/Groups/EditGroupPage';
import UsersPage from './pages/Admin/Users/UsersPage';
import EditUserPage from './pages/Admin/Users/EditUserPage';

function App() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="/*" element={<HomePage />}>
                    {user?.role == UserRole.Student && (
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
                    )}
                    {user?.role == UserRole.Teacher && (
                        <Route
                            path="groups"
                            element={
                                <ProtectedRoute
                                    component={<TeacherGroupsPage />}
                                    allowedRoles={[UserRole.Teacher]}
                                    redirectPath={''}
                                />
                            }
                        />
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
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
