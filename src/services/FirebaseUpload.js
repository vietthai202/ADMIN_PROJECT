import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDGKxhYZ21CbfdxC1F0cfKZVAt9FrL9RUI",
    authDomain: "coffe-9ac0d.firebaseapp.com",
    projectId: "coffe-9ac0d",
    storageBucket: "coffe-9ac0d.appspot.com",
    messagingSenderId: "344285751123",
    appId: "1:344285751123:web:2aba608cbd46d8f66d23a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Initialize Firebase Auth
const auth = getAuth(app);

/**
 * Uploads a file to Firebase Storage and returns the file name.
 * @param {File} file - The file to upload (PNG or JPG).
 * @returns {Promise<string>} - The file name of the uploaded file.
 */
const uploadFileToFirebase = async (file) => {
    console.log(file);
    if (!file) {
        throw new Error("No file provided");
    }

    // Check if the user is authenticated
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async () => {

            try {
                // Create a storage reference with a unique file name
                const fileName = `${Date.now()}_${file.name}`;
                const storageRef = ref(storage, `images/${fileName}`);

                // Upload the file to Firebase Storage
                await uploadBytes(storageRef, file);

                // Get the download URL of the uploaded file
                const downloadURL = await getDownloadURL(storageRef);

                console.log(`File uploaded successfully. File name: ${fileName}`);
                console.log(`File available at: ${downloadURL}`);

                resolve(downloadURL);
            } catch (error) {
                reject(error);
            }

        });
    });
};

export default uploadFileToFirebase 
