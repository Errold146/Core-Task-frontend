import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
	FolderPlusIcon, RocketLaunchIcon, SparklesIcon, EyeIcon, PencilSquareIcon, TrashIcon, UserIcon, DocumentTextIcon 
} from "@heroicons/react/24/outline";

import { Heading, Spinner } from "@/components";
import { deleteProject, getProjects } from "@/api/ProjectAPI";

export default function DashboardView() {
	const { data, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationFn: deleteProject,
		onError: (error) => {
			toast.error(error.message)
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({queryKey: ['projects']})
			toast.success(data)
		}
	})

	if (isLoading) return <Spinner centered />;

	if (data) return (
		<>
			<Heading
				title="Mis Proyectos"
				subtitle="Maneja y Administra tus proyectos"
			/>

			<nav className="my-5">
				<Link
					to={"/projects/create"}
					className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-azul-600 hover:bg-azul-700 text-white hover:shadow-azul-600/30 hover:scale-105"
				>
					<PlusIcon className="size-5" />
					Nuevo Proyecto
				</Link>
			</nav>

			{data.length ? (
				<ul
					role="list"
					className="grid gap-6 mt-10 sm:grid-cols-1 lg:grid-cols-2"
				>
					{data.map((project) => (
						<li
							key={project._id}
							className="relative z-0 overflow-hidden transition-all duration-300 bg-white border border-t-0 group rounded-2xl border-gris-200 hover:z-10 hover:-translate-y-1 hover:shadow-xl hover:shadow-azul-600/10 focus-within:z-20"
						>
							<div className="h-1 rounded-t-2xl bg-gradient-to-r from-azul-500 via-azul-600 to-verde-500" />

							<div className="flex items-start justify-between p-6">
								<div className="flex-1 min-w-0 space-y-3">
									<Link
										to={`/projects/${project._id}`}
										className="text-xl font-bold transition-colors duration-200 text-gris-800 hover:text-azul-600 hover:underline"
									>
										{project.projectName}
									</Link>

									<div className="flex items-center gap-2 text-sm text-gris-500">
										<UserIcon className="size-4 text-azul-400" />
										<span>{project.clientName}</span>
									</div>

									<div className="flex items-start gap-2 text-sm text-gris-400">
										<DocumentTextIcon className="mt-0.5 size-4 shrink-0 text-gris-300" />
										<p className="line-clamp-2">{project.description}</p>
									</div>
								</div>

								<Menu as="div" className="relative flex-none ml-4">
									<MenuButton className="flex items-center justify-center transition-all duration-200 rounded-lg size-10 text-gris-400 hover:text-azul-600 hover:bg-azul-50">
										<span className="sr-only">opciones</span>
										<EllipsisVerticalIcon
											className="size-6"
											aria-hidden="true"
										/>
									</MenuButton>
									<MenuItems
										anchor="bottom end"
										transition
										className="z-40 p-2 space-y-1 bg-white border shadow-xl w-52 rounded-xl border-gris-100 shadow-gris-900/10 focus:outline-none transition duration-200 ease-out data-[closed]:scale-90 data-[closed]:opacity-0"
									>
											<MenuItem>
												<Link
													to={`/projects/${project._id}`}
													className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gris-700 hover:bg-azul-50 hover:text-azul-700 transition-colors duration-150"
												>
													<EyeIcon className="size-5 text-azul-500" />
													Ver Proyecto
												</Link>
											</MenuItem>
											<MenuItem>
												<Link
													to={`/projects/${project._id}/edit`}
													className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gris-700 hover:bg-verde-50 hover:text-verde-700 transition-colors duration-150"
												>
													<PencilSquareIcon className="size-5 text-verde-500" />
													Editar Proyecto
												</Link>
											</MenuItem>
											<div className="my-1 border-t border-gris-100" />
											<MenuItem>
												<button
													type="button"
													className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-150"
													onClick={() => mutate(project._id)}
												>
													<TrashIcon className="size-5" />
													Eliminar Proyecto
												</button>
											</MenuItem>
										</MenuItems>
								</Menu>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className="flex flex-col items-center justify-center max-w-3xl px-6 py-16 mx-auto mt-10 border rounded-2xl bg-gradient-to-br from-gris-50 via-white to-azul-50 border-gris-200">
					<div className="relative">
						<div className="flex items-center justify-center rounded-full size-24 bg-azul-100">
							<FolderPlusIcon className="text-azul-600 size-12" />
						</div>
						<span className="absolute flex items-center justify-center rounded-full -top-1 -right-1 size-8 bg-verde-400">
							<SparklesIcon className="text-white size-5" />
						</span>
					</div>

					<h3 className="mt-6 text-2xl font-bold text-gris-900">
						¡Comienza tu primer proyecto!
					</h3>
					<p className="max-w-md mt-2 text-center text-gris-500">
						Organiza tus ideas, gestiona tareas y lleva tus proyectos al
						siguiente nivel. Todo empieza con un solo clic.
					</p>

					<Link
						to={"/projects/create"}
						className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-azul-600 hover:bg-azul-700 text-white hover:shadow-azul-600/30 hover:scale-105"
					>
						<PlusIcon className="size-5" />
						Crear Proyecto
					</Link>

					<div className="flex items-center gap-2 mt-5 text-sm text-gris-400">
						<RocketLaunchIcon className="size-4" />
						<span>Es rápido, fácil y gratuito</span>
					</div>
				</div>
			)}
		</>
	);
}
