import { useDispatch } from "react-redux";
import { addAddress, emptyAddress } from "../Utils/dataSlice";
import { deleteCoordinates } from "../Utils/justPinsSlice";
import { deletePathPair } from "../Utils/locationSlice";
import useFetchCollection from "../hooks/useFetchCollection";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Utils/firebaseConfig";

const SavedData = ({ userId }) => {
    const dispatch = useDispatch();
    const { data: fetchedData, loading, error } = useFetchCollection(userId);
    // console.log(fetchedData);

    // Function to handle clicking on a file ID
    const handleClick = async (id) => {
        try {
            const docRef = doc(firestore, userId, id);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const data = docSnapshot.data()?.data; // Retrieve document data
                if (data) {
                    dispatch(emptyAddress(),deleteCoordinates(),deletePathPair());
                    data.forEach((item) => dispatch(addAddress(item))); // Add each address to Redux
                }
            } else {
                console.log("No such document!");
            }
        } catch (err) {
            console.error("Error fetching document:", err);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error state
    }

    return (
        <div>
            <div className="text-white m-auto w-[80%]">
                <h1 className="text-2xl m-2 underline">File IDs:</h1>
                {fetchedData.length > 0 ? (
                    <div className="p-2 flex flex-row flex-wrap">
                        {fetchedData.map((id) => (
                            <p
                                className="p-2 m-2 cursor-pointer border-2 rounded-lg text-white text-center backdrop-blur w-[24rem]"
                                key={id}
                                onClick={() => handleClick(id)}>
                                {id}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>No files found.</p>
                )}
            </div>
        </div>
    );
};

export default SavedData;