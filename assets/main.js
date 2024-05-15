/******* 
    AQUÍ DEFINIMOS LAS CONSTANTES GLOBALES 
*******/
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/ddeliuoky/image/upload`
const CLOUDINARY_UPLOAD_PRESET = 'wscqmohi';
const imageUploadbar = document.getElementById('img-upload-bar');
const imagePreview = document.getElementById('img-preview');

/*****
    LA VARIABLE DE ARCHIVO A LA QUE SE ASIGNARÁ EL ARCHIVO DE TIPO DE IMAGEN.
    ESTA VARIABLE  
*****/
let file = document.getElementById('file');

/******* 
   AQUÍ OBTENEMOS LA IMAGEN DEL LIBRO Y LA SUBIMOS AL SERVIDOR 
*******/
file.addEventListener('change', async (e) => {

	const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    
    /******* 
        AQUÍ ENVIAMOS A CLOUDINARY USANDO LA API 
    *******/
	const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },

            onUploadProgress (e) {
                let progress = Math.round((e.loaded * 100.0) / e.total);
                console.log(progress);
                imageUploadbar.setAttribute('value', progress);
            }
        }
    );
    /******* 
      AQUÍ ASIGNAMOS LA FUENTE AL ATRIBUTO SRC DE IMG 
    *******/
    imagePreview.src = res.data.secure_url;
});