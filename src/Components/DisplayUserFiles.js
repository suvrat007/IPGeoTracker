import React from "react";
import {useDispatch, useSelector} from "react-redux";
import useFetchCollection from "../hooks/useFetchCollection";
import useHandleFileClick from "../hooks/useHandleFileClick";
import {updateToggle} from "../Utils/dataSlice";

const DisplayUserFiles = ({trigger}) =>{
    const userId = useSelector(store=> store.login.uid);
    const { data: fetchedData } = useFetchCollection(userId);
    const handleFileClick = useHandleFileClick(userId);

    return(
        <div className="w-full justify-start ">
            {fetchedData.length > 0 ? (
                <div className="p-2 flex flex-row flex-wrap border-2 rounded-xl ">
                    <h1 className="text-lg">Saved Files:</h1>
                    {fetchedData.map((id) => (
                        <p
                            className="p-2 m-2 cursor-pointer border-2 rounded-lg text-white text-center backdrop-blur w-full"
                            key={id}
                            onClick={() => {
                                handleFileClick(id);
                                trigger();
                            }}>
                            {id}
                        </p>
                        )
                    )}
                </div>
            ) : (
                <p>No files found.</p>
            )}
        </div>
    )
}
export default DisplayUserFiles;