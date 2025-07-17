import { supabase } from '@/supabase/client'

export interface UserDocument {
    id: string
    email: string
    created_at: string
    updated_at: string
}

export const createUserDocument = async (
    userId: string,
    email: string
): Promise<UserDocument | null> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    id: userId,
                    email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ])
            .select()
            .single()

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating user document:', error);
        return null;
    }
};

export const getUserDocument = async (
    userId: string
): Promise<UserDocument | null> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data
    } catch (error) {
        console.error('Error fetching user document:', error);
        return null
    }
};

export const updateUserDocument = async (
    userId: string,
    updates: Partial<UserDocument>
): Promise<UserDocument | null> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId)
            .select()
            .single()

        if (error) throw error;
        return data
    } catch (error) {
        console.error('Error updating user document:', error);
        return null
    }
}
