import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {
        const { data, error } = await supabase.from('tags').select('*');
        if (error) throw error;
        return Response.json(data);
    } catch (e) {
        console.error('fail: fetchTags', e);
        return Response.json([]);
    }
}

export async function POST(request: NextApiRequest) {
    try {
        const body = await request.json();
        const { tag } = body;

        const { name, description } = tag;
        if (!name || name.length < 3 || name.length > 50) {
            throw new Error('Name must be at least 3 characters and at most 50 characters');
        }

        // if description is less than 3 characters, save as null
        let tagDescription = null;
        if (description && description.length >= 3) {
            tagDescription = description;
        }

        if (tagDescription && tagDescription.length > 250) {
            throw new Error('Description must be at most 250 characters');
        }

        // save the tag to the tags table
        const { data, error } = await supabase.from('tags').insert([
            { name, description: tagDescription }
        ]);

        if (error) throw error;

        return Response.json({
            status: 'success',
            message: 'Tag created ',
            data,
        });
    } catch (e) {
        console.error('fail: createTag', e);
        return Response.json({
            status: 'error',
            message: 'Tag not created',
            data: null,
        });
    }
}