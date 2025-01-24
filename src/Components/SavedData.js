import { useEffect, useState } from "react";
import { collection, getDocs ,getDoc ,doc} from "firebase/firestore";
import { firestore } from "../Utils/firebaseConfig";
import {useDispatch} from "react-redux";
import {addAddress} from "../Utils/dataSlice";

const SavedData = ({ userId }) => {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to capture errors

    const dispatch = useDispatch();
    useEffect(() => {
        if (userId) {
            fetchAllFileData();
        }
    }, [userId]);

    const fetchAllFileData = async () => {
        try {
            setLoading(true); // Start loading
            const userCollectionRef = collection(firestore, userId);
            const snapshot = await getDocs(userCollectionRef);

            if (snapshot.empty) {
                // console.log("No files found for the user.");
                setFetchedData([]);
            } else {
                const ids = snapshot.docs.map((doc) => doc.id); // Map document IDs
                setFetchedData(ids);
            }
        } catch (err) {
            console.error("Error fetching file data:", err);
            setError("Failed to fetch files. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error state
    }

    const handleCLick = async (id) =>{
        const docRef = doc(firestore, userId, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data()?.data; // Retrieve document data
            dispatch(addAddress(data));
        } else {
            console.log("No such document!");
        }
    }

    return (
        <div>
            <h1>File IDs for User: {userId}</h1>
            {fetchedData.length > 0 ? (
                <ul>
                    {fetchedData.map((id) => (
                        <p className="translate-x-0.5"
                           key={id}
                           onClick={() => handleCLick(id)}
                        >
                            {id}
                        </p>
                    ))}
                </ul>
            ) : (
                <p>No files found.</p>
            )}
        </div>
    );
};

export default SavedData;
