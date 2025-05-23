import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Utils/firebaseConfig";
import { addAddress, emptyAddress, updateToggle } from "../Utils/Redux/dataSlice";
import { deleteCoordinates } from "../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../Utils/Redux/locationSlice";
import { useDispatch } from "react-redux";

const useHandleFileClick = (userId) => {
    const dispatch = useDispatch();

    const handleClick = async (id) => {
        try {
            const docRef = doc(firestore, userId, id);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const data = docSnapshot.data()?.data;
                if (data) {
                    dispatch(emptyAddress());
                    dispatch(deleteCoordinates());
                    dispatch(deletePathPair());
                    data.forEach((item) => dispatch(addAddress(item)));

                    // dispatch(updateToggle());
                }
            } else {
                console.log("No such document!");
            }
        } catch (err) {
            console.error("Error fetching document:", err);
        }
    };

    return handleClick; // This is now usable directly onClick
};

export default useHandleFileClick;
