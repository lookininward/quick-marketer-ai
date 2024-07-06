import React from 'react'
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import TagForm from "@/components/tags/TagForm";

function TagDialogContent({
    tagToEdit,
    onTagSuccess
}: {
    tagToEdit?: Tag | null,
    onTagSuccess: () => void
}) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{tagToEdit ? "Edit" : "Create"} Tag</DialogTitle>
            </DialogHeader>
            <TagForm
                tag={tagToEdit!}
                onSuccess={onTagSuccess}
            />
        </DialogContent>
    )
}

export default TagDialogContent