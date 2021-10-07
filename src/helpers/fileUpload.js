import { cloudinary, cloudinaryUploadPreset } from "../keys/keys";

export const fileUpload = async( file ) => {

    const cloudUrl = cloudinary;

    const formData = new FormData();

    formData.append('upload_preset', cloudinaryUploadPreset);
    formData.append('file', file);
    // formData.append('folder', 'journal-app');    // Save files in an specific directory

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ){
            const cloudResp = await resp.json();

            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
        
    } catch (error) {
        throw error;
    }
    
}

