import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ChangePasswordView from "./views/Profile/ChangePasswordView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import DashboardView from "@/views/DashboardView";
import EditProjectView from "./views/projects/EditProjectView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import LoginView from "./views/auth/LoginView";
import NewCodeView from "./views/auth/RequestNewCodeView";
import NewPasswordView from "./views/auth/NewPasswordView";
import NotFoundView from "./views/NotFoundView";
import ProfileView from "./views/Profile/ProfileView";
import ProjectsDetailsView from "./views/projects/ProjectsDetailsView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import RegisterView from "./views/auth/RegisterView";
import ProfileLayout from "./layouts/ProfileLayout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectId" element={<ProjectsDetailsView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />
                    
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/new-code" element={<NewCodeView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>

                <Route path="/404" element={<NotFoundView />} />
                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    )
}