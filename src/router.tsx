import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import DashboardView from "@/views/DashboardView";
import RegisterView from "./views/auth/RegisterView";
import NewCodeView from "./views/auth/RequestNewCodeView";
import NewPasswordView from "./views/auth/NewPasswordView";
import EditProjectView from "./views/projects/EditProjectView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import ProjectsDetailsView from "./views/projects/ProjectsDetailsView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectId" element={<ProjectsDetailsView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/new-code" element={<NewCodeView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}