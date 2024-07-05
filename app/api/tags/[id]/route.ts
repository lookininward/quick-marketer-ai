import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function DELETE(_, { params }) {
    try {
        const { id } = params;
        const { data, error } = await supabase.from('tags').delete().match({ id });
        if (error) throw error;

        return Response.json({
            status: 'success',
            message: 'Tag deleted',
            data,
        });
    } catch (e) {
        console.error('fail: deleteTag', e);
        return Response.json({
            status: 'error',
            message: 'Tag not deleted',
            data: null,
        });
    }
}

// UPDATE /api/tags/:id
export async function PUT(request, { params }) {
    try {
        const { id } = params;
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
        const { data, error } = await supabase.from('tags').update({ name, description: tagDescription }).match({ id });

        if (error) throw error;

        return Response.json({
            status: 'success',
            message: 'Tag updated',
            data,
        });
    } catch (e) {
        console.error('fail: updateTag', e);
        return Response.json({
            status: 'error',
            message: 'Tag not updated',
            data: null,
        });
    }
}