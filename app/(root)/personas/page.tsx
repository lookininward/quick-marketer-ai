import PersonaForm from "@/components/personas/PersonaForm";

function Personas() {
    return (
        <div className="py-7 px-10 flex flex-col align-center">
            <h1 className="text-xl font-semibold mb-4">Personas</h1>
            <div className="h-full w-1/3">
                <PersonaForm />
            </div>
        </div>
    )
}

export default Personas;