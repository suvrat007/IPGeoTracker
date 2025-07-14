import { Link } from "react-router-dom";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../../Utils/Redux/locationSlice";
import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { HiOutlineDocument } from "react-icons/hi";
import FileUpload from "./FileUpload";


const Header = ({fileName}) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");


    return (
        <div className="w-full bg-[#453FAC] p-2">
            <div className={'border-b-2 border-black pb-2'}>
                <div className="flex items-center ">
                    <HiOutlineDocument size={60} className="text-xl text-white mr-1 " />
                    <div>
                        <p className={'text-[.75rem]'}>CURRENT FILE</p>
                        <p className={'text-2xl'}>FileName: {fileName ? fileName : "No File Selected"} </p>
                    </div>
                </div>
                <div className="flex justify-between p-2 ">
                    <Link to="/mapPath">
                        <button
                            onClick={() => dispatch(deleteCoordinates())}
                            className="flex items-center gap-2 px-6 py-2 text-white border-2 border-white rounded-full text-sm font-medium hover:scale-105 transition"
                        >
                            <span>
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="1.70238" cy="1.70238" r="1.70238" fill="white" />
                                    <circle cx="11.2976" cy="11.2976" r="1.70238" fill="white" />
                                    <path
                                        d="M1.85714 1.70239H6.19047H10.5238C11.8651 2.42461 13.7429 4.70477 10.5238 6.80954H2.63095C1.18651 7.73811 -0.835713 9.59525 2.63095 11.4524H6.80952H11.2976"
                                        stroke="white"
                                    />
                                </svg>
                            </span>
                            Map With Path
                        </button>
                    </Link>

                    <Link to="/map">
                        <button
                            onClick={() => dispatch(deletePathPair())}
                            className="flex items-center gap-2 px-6 py-2 bg-white text-black border-2 border-black rounded-full text-sm font-medium hover:scale-105 transition"
                        >
                            <span>
                                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 17C8.825 17 8.675 16.95 8.55 16.85C8.425 16.75 8.33125 16.6187 8.26875 16.4562C8.03125 15.7562 7.73125 15.1 7.36875 14.4875C7.01875 13.875 6.525 13.1562 5.8875 12.3312C5.25 11.5062 4.73125 10.7188 4.33125 9.96875C3.94375 9.21875 3.75 8.3125 3.75 7.25C3.75 5.7875 4.25625 4.55 5.26875 3.5375C6.29375 2.5125 7.5375 2 9 2C10.4625 2 11.7 2.5125 12.7125 3.5375C13.7375 4.55 14.25 5.7875 14.25 7.25C14.25 8.3875 14.0312 9.3375 13.5938 10.1C13.1688 10.85 12.675 11.5937 12.1125 12.3312C11.4375 13.2312 10.925 13.9812 10.575 14.5812C10.2375 15.1687 9.95625 15.7937 9.73125 16.4562C9.66875 16.6312 9.56875 16.7688 9.43125 16.8688C9.30625 16.9563 9.1625 17 9 17ZM9 14.3187C9.2125 13.8937 9.45 13.475 9.7125 13.0625C9.9875 12.65 10.3875 12.1 10.9125 11.4125C11.45 10.7125 11.8875 10.0687 12.225 9.48125C12.575 8.88125 12.75 8.1375 12.75 7.25C12.75 6.2125 12.3813 5.33125 11.6438 4.60625C10.9188 3.86875 10.0375 3.5 9 3.5C7.9625 3.5 7.075 3.86875 6.3375 4.60625C5.6125 5.33125 5.25 6.2125 5.25 7.25C5.25 8.1375 5.41875 8.88125 5.75625 9.48125C6.10625 10.0687 6.55 10.7125 7.0875 11.4125C7.6125 12.1 8.00625 12.65 8.26875 13.0625C8.54375 13.475 8.7875 13.8937 9 14.3187ZM9 9.125C9.525 9.125 9.96875 8.94375 10.3312 8.58125C10.6937 8.21875 10.875 7.775 10.875 7.25C10.875 6.725 10.6937 6.28125 10.3312 5.91875C9.96875 5.55625 9.525 5.375 9 5.375C8.475 5.375 8.03125 5.55625 7.66875 5.91875C7.30625 6.28125 7.125 6.725 7.125 7.25C7.125 7.775 7.30625 8.21875 7.66875 8.58125C8.03125 8.94375 8.475 9.125 9 9.125Z"
                                        fill="black"
                                    />
                                </svg>
                            </span>
                            Map With Pins
                        </button>
                    </Link>
                </div>
            </div>

            <div>
                <FileUpload setFile={setFile} />
            </div>
        </div>
    );
};

export default Header;