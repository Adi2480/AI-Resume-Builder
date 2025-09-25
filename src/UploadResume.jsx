import React, {useState} from "react";
import axios from "axios";

function UploadResume(){
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if(!file){
            setMessage("Please select file first");
            return;
        }

        const allowedTypes = ["application/pdf", 
                          "application/msword", 
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

        if(!allowedTypes.includes(file.type)){
            setMessage("Please upload valid file only PDF and word documents are allowed");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("https://localhost:7050/api/resume/upload",formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            });

            setMessage("Resume upload successfully");
        } catch (error) {
            console.log(error);
            setMessage("Error in upload resume, please try again later");
        }
    };

    return(
        <div>
            <h2>Upload Resume</h2>
            <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx"/>
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
}

export default UploadResume;