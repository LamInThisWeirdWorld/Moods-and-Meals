import { supabase } from "../database-client";

export const uploadImages = async (images: File[], mealId: string) => {
    const uploadedImages = [];

    for (const file of images) {
        const filePath = `${mealId}/${crypto.randomUUID()}`;
        const { data, error } = await supabase.storage
            .from("meal-images")
            .upload(filePath, file)

        if (error) throw error;

        uploadedImages.push(filePath);
    }

    return uploadedImages;
}