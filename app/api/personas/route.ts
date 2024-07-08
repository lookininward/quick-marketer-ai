import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {
        const { data, error } = await supabase.from('personas').select('*');
        if (error) throw error;
        return Response.json(data);
    } catch (e) {
        console.error('fail: fetchPersonas', e);
        return Response.json([]);
    }
}

export async function POST(request: NextApiRequest) {
    try {
        const body = await request.json();
        const { persona } = body;

        const { name, age, height, weight, description } = persona;
        if (!name || name.length < 3 || name.length > 50) {
            throw new Error('Name must be at least 3 characters and at most 50 characters');
        }
        console.log('age', age);
        if (!age || age < 0 || age > 150) {
            throw new Error('Age must be between 0 and 150');
        }

        if (!height || height < 0 || height > 300) {
            throw new Error('Height must be between 0 and 300');
        }

        if (!weight || weight < 0 || weight > 500) {
            throw new Error('Weight must be between 0 and 500');
        }

        // if description is less than 3 characters, save as null
        let personaDescription = null;
        if (description && description.length >= 3) {
            personaDescription = description;
        }

        if (personaDescription && personaDescription.length > 250) {
            throw new Error('Description must be at most 250 characters');
        }



        // save the persona to the personas table
        const { data, error } = await supabase.from('personas').insert([
            {
                name,
                age,
                height,
                weight,
                description: personaDescription
            }
        ]);

        if (error) throw error;

        return Response.json({
            status: 'success',
            message: 'Persona created ',
            data,
        });
    } catch (e) {
        console.error('fail: createPersona', e);
        return Response.json({
            status: 'error',
            message: 'Persona not created',
            data: null,
        });
    }
}