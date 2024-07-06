import React from 'react'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ContactForm from "@/components/ContactForm";

function ContactDialogContent() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Thank You for Checking This Demo Out!</DialogTitle>
                <DialogDescription>
                    If you want to get in touch to expand on this or work with me in some other way, enter your email and message, and Il get back to you ASAP. You can also learn more about me by visiting my LinkedIn, GitHub, etc. You can see the full source code for this demo at: [your GitHub repository link].
                </DialogDescription>
            </DialogHeader>
            <ContactForm />
        </DialogContent>
    )
}

export default ContactDialogContent