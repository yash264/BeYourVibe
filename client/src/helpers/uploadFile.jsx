const cloud_name = 'dcinkczc2';
const upload_preset = 'JobFinder';

const uploadFile = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  try {
      const response = await fetch(url, {
          method: "POST",
          body: formData,
      });
      const data = await response.json();
      console.log(data);
     // setPdfUrl(data.secure_url);

  } catch (error) {
      console.error(error);
  }
};

export default uploadFile;
