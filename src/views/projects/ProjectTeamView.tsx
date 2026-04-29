import { toast } from "sonner";
import { Fragment } from "react/jsx-runtime";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { UserGroupIcon, UserPlusIcon, UserCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Heading, Spinner } from "@/components";
import AddMemberModal from "@/components/team/AddMemberModal";
import { deleteUserFromProject, getProjectTeam } from "@/api/TeamAPI";

export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteUserFromProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    if ( isLoading ) return <Spinner centered />;
    if ( isError ) return <Navigate to={'/404'} />;

    if ( data ) return (
        <>
            <Heading
                title='Administrar Equipo'
                subtitle='Administra el equipo de trabajo para este proyecto'
            />

            <nav className="flex gap-3 my-5">
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-azul-600 hover:bg-azul-700 text-white hover:shadow-azul-600/30 hover:scale-105"
                >
                    <ArrowLeftIcon className="size-5" />
                    Regresar
                </Link>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 text-lg font-bold transition-all duration-300 rounded-xl shadow-lg cursor-pointer bg-verde-600 hover:bg-verde-700 text-white hover:shadow-verde-600/30 hover:scale-105"
                    onClick={() => navigate('?addMember=true')}
                >
                    <UserPlusIcon className="size-5" />
                    Agregar Miembro
                </button>
            </nav>   

            <div className="flex items-center gap-3 my-10">
                <UserGroupIcon className="size-8 text-azul-500" />
                <h2 className="text-5xl font-black">Miembros actuales</h2>
            </div>
            {data.length ? (
                <ul role="list" className="space-y-3">
                    {data?.map((member) => (
                        <li
                            key={member._id}
                            className="group relative z-0 flex items-center justify-between gap-4 rounded-xl border border-gris-200 bg-white p-5 shadow-sm transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-gris-300 hover:shadow-lg hover:shadow-azul-500/10 focus-within:z-20"
                        >
                            <div className="flex items-center min-w-0 gap-4">
                                <div className="flex items-center justify-center rounded-full size-11 bg-azul-100 shrink-0">
                                    <UserCircleIcon className="size-6 text-azul-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold truncate text-gris-800">
                                        {member.name}
                                    </p>
                                    <p className="text-sm truncate text-gris-400">
                                        {member.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center shrink-0">
                                <Menu as="div" className="relative">
                                    <MenuButton className="grid p-2 transition-all duration-200 rounded-lg place-items-center text-gris-400 hover:bg-gris-100 hover:text-gris-700 focus:outline-none">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="size-6" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-150"
                                        enterFrom="opacity-0 scale-90 -translate-y-1"
                                        enterTo="opacity-100 scale-100 translate-y-0"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100 scale-100 translate-y-0"
                                        leaveTo="opacity-0 scale-90 -translate-y-1"
                                    >
                                        <MenuItems className="absolute right-0 z-40 mt-2 w-52 origin-top-right rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-gris-200 focus:outline-none">
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <button
                                                        type='button'
                                                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${focus ? "bg-red-50 text-red-600" : "text-red-500"}`}
                                                        onClick={() => mutate({projectId, userId: member._id})}
                                                    >
                                                        <TrashIcon className="size-4" />
                                                        Eliminar del Proyecto
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='py-20 text-xl font-semibold text-center text-gris-400'>No hay miembros en este equipo</p>
            )}

            <AddMemberModal />
        </>
    )
}
