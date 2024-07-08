import React from 'react'
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import PersonaForm
    from './PersonaForm'
function PersonaDialogContent({
    personaToEdit,
    onPersonaSuccess
}: {
    personaToEdit?: Product | null,
    onPersonaSuccess: () => void
}) {
    return (
        <DialogContent className="max-h-[calc(100vh-100px)]">
            <DialogHeader>
                <DialogTitle>{personaToEdit ? "Edit" : "Create"} Persona</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-scroll max-h-[calc(100vh-200px)]">
                <PersonaForm
                    persona={personaToEdit!}
                    onSuccess={onPersonaSuccess}
                />
            </div>
        </DialogContent>
    )
}

export default PersonaDialogContent