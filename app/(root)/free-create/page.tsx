'use client';

import FreeCreateDashboard from "@/components/FreeCreateDashboard/FreeCreateDashboard";
import { FreeCreateProvider } from "@/context/FreeCreateContext";

function FreeCreate() {
    return (
        <FreeCreateProvider>
            <FreeCreateDashboard />
        </FreeCreateProvider>
    )
}

export default FreeCreate;