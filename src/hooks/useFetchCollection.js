import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../Utils/firebaseConfig";

const useFetchCollection = (userId,refresh) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollection = async () => {
            if (!userId) return; // Prevent unnecessary fetches if userId is null
            setLoading(true);
            setError(null);

            try {
                const userCollectionRef = collection(firestore, userId);
                const snapshot = await getDocs(userCollectionRef);

                if (snapshot.empty) {
                    setData([]); // No files found
                } else {
                    const documents = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(documents);
                }
            } catch (err) {
                console.error("Error fetching file data:", err);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, [userId,refresh]);

    console.log(data);

    return { data, loading, error };
};

export default useFetchCollection;
