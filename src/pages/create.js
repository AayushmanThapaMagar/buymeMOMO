import CreateContract from "../components/factory";
import NavBar from "../components/navbar";

export default function Home() {
    return (
        <>
        <div>
            <NavBar />
        </div>
        <div>
            <CreateContract />
        </div>
        </>
    )
}