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
                    const ids = snapshot.docs.map((doc) => doc.id);
                    setData(ids);
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

    return { data, loading, error };
};

export default useFetchCollection;
