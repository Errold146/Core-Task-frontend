import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to={'/'}>
            <img src="/logo.png" alt="Logotipo CoreTask" />
        </Link>
    )
}
