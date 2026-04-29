import { Spinner } from "@/components"
import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"

export default function ProfileView() {

    const { data, isLoading } = useAuth()

    if ( isLoading ) return <Spinner centered />

    if ( data ) return <ProfileForm data={data} />
}
