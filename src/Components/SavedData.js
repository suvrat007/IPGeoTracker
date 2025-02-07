import useFetchCollection from "../hooks/useFetchCollection";
import useHandleFileClick from "../hooks/useHandleFileClick";
import {deleteDoc, doc} from "firebase/firestore";
import {firestore} from "../Utils/firebaseConfig";

const SavedData = ({ userId , refresh , setRefresh}) => {
    // const [refresh, setRefresh] = useState(true);
    const { data: fetchedData, loading, error } = useFetchCollection(userId,refresh);
    const handleFileClick = useHandleFileClick(userId);

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }
    if (error) {
        return <p>Error: {error}</p>; // Show error state
    }

    const deleteElement = async (i) =>{
        await deleteDoc(doc(firestore,userId, i));
        setRefresh(prev=>!prev);
    }

    return (
        <div className="w-[90%] m-auto mt-5">
            <div className="text-white">
                <h1 className="text-2xl m-2 underline ">Saved Files</h1>
                <div>
                    {fetchedData.length > 0 ? (
                        <div className="flex flex-row flex-wrap ">
                            {fetchedData.map((id) => (
                                <div className="flex flex-row w-1/2 mt-2">
                                    <p
                                    className="p-2 cursor-pointer border-2 rounded-l-lg text-white text-center backdrop-blur w-[85%] "
                                    key={id}
                                    onClick={() => {
                                        handleFileClick(id);
                                    }}>{id}</p>
                                    <button onClick={()=>deleteElement(id)}
                                            className="border-2 p-2 w-[15%] mr-2 rounded-r-lg"><img src="https://img.icons8.com/?size=100&id=11705&format=png&color=FFFFFF"/></button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No files found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedData;