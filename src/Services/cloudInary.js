const cloudInary = required('cloudinary').v2;
const fs = require('fs');

(async function() {
    try {
        await cloudInary.config({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
        })
    } catch (error) {
        console.error('Error configuring Cloudinary:', error);
    }
    // Upload a image to Cloudinary
    const uploadImage = await cloudInary.uploader
        .upload("./public/images/1.jpg", {
            public_id: "Shoes/1",
            overwrite: true,
            resource_type: "image"
        })
        .catch((error) => {
            console.error("Error uploading image to Cloudinary:" , error);
        })
        console.log("Image uploaded successfully:", uploadImage);

        // Transform the iamge cropping it to 200x200 pixels
        const autoCropUrl = cloudInary.url("Shoes/1" , {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500,
        })
        console.log("Transformed image URL:", autoCropUrl);
})();