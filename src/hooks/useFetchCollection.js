import {collection, getDocs} from "firebase/firestore";
import {firestore} from "../Utils/firebaseConfig";

const useFetchCollection = async ({userId}) =>{
    try {
        const userCollectionRef = collection(firestore, userId);
        const snapshot = await getDocs(userCollectionRef);

        if (snapshot.empty) {
            // console.log("No files found for the user.");
            return([]);
        } else {
            const ids = snapshot.docs.map((doc) => doc.id); // Map document IDs
            return(ids);
        }
    } catch (err) {
        console.error("Error fetching file data:", err);
    }

}
export default useFetchCollection;