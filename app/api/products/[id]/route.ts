import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function DELETE(_, { params }) {
    try {
        const { id } = params;
        const { data, error } = await supabase.from('products').delete().match({ id });
        if (error) throw error;

        return Response.json({
            status: 'success',
            message: 'Product deleted',
            data,
        });
    } catch (e) {
        console.error('fail: deleteProduct', e);
        return Response.json({
            status: 'error',
            message: 'Product not deleted',
            data: null,
        });
    }
}

// UPDATE /api/products/:id
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { product } = body;

        const { name, description } = product;
        if (!name || name.length < 3 || name.length > 50) {
            throw new Error('Name must be at least 3 characters and at most 50 characters');
        }

        // if description is less than 3 characters, save as null
        let productDescription = null;
        if (description && description.length >= 3) {
            productDescription = description;
        }

        if (productDescription && productDescription.length > 250) {
            throw new Error('Description must be at most 250 characters');
        }

        // save the product to the products table
        const { data, error } = await supabase.from('products').update({ name, description: productDescription }).match({ id });

        if (error) throw error;

        return Response.json({
            status: 'success',
            message: 'Product updated',
            data,
        });
    } catch (e) {
        console.error('fail: updateProduct', e);
        return Response.json({
            status: 'error',
            message: 'Product not updated',
            data: null,
        });
    }
}