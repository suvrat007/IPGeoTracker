import { firestore } from "../Utils/firebaseConfig";
import { collection, query, where, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import {useSelector} from "react-redux";

const FileUploader = ({ inputData }) => {

    const uid = useSelector(store => store.login.uid);
    const saveToFirestore = async () => {
        if (!uid || !inputData) {
            console.error("User ID or data is missing");
            return;
        }

        try {
            // Reference to the "users" collection
            const usersCollection = collection(firestore, "users");

            // Check if the user exists
            const userQuery = query(usersCollection, where("uid", "==", uid));
            const userSnapshot = await getDocs(userQuery);

            let userDocId;

            if (userSnapshot.empty) {
                // If user doesn't exist, create a new user document
                const newUserRef = doc(usersCollection, uid); // Use UID as the document ID
                await setDoc(newUserRef,
                    { uid,
                        createdAt: new Date() });
                userDocId = newUserRef.id;
                console.log("New user created with ID:", userDocId);
            } else {
                // If user exists, get the document ID
                userDocId = userSnapshot.docs[0].id;
                console.log("User already exists with ID:", userDocId);
            }

            // Reference the nested "jsonFiles" subcollection
            const userFilesCollection = collection(firestore, "users", userDocId, "jsonFiles");

            // Add the file data to the subcollection
            const fileResponse = await addDoc(userFilesCollection, {
                data: inputData,
                timestamp: new Date(),
            });

            console.log("File added with ID:", fileResponse.id);
        } catch (error) {
            console.error("Error saving to Firestore:", error);
        }
    };

    return (
        <button
            onClick={saveToFirestore}
            className="p-2 bg-blue-500 text-white rounded-md"
        >
            Save File to Firestore u lil id:{uid}
        </button>
    );
};

export default FileUploader;
