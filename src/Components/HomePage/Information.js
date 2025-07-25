import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { emptyAddress } from "../../Utils/Redux/dataSlice";
import { deleteCoordinates } from "../../Utils/Redux/justPinsSlice";
import { deletePathPair } from "../../Utils/Redux/locationSlice";
import { addFile } from "../../Utils/Redux/fileSlice";
import { parseAndDispatchFile } from "./parseAndDispatchFile";

// Define hover data for each file
const fileHoverData = {
    "test.json": {
        text: "Destinations of the TCP packets captured in this file:",
        sites: ["Instagram", "Twitter", "Facebook", "YouTube", "Reddit"],
    },
    "test2.json": {
        text: "Destinations of the TCP packets captured in this file:",
        sites: ["GitHub", "Acternitnity", "StackOverflow", "MagicUI", "ChatGPT", "Claude", "Grok", "Gemini"],
    },
    "test3.json": {
        text: "Destinations of the TCP packets captured in this file:",
        sites: ["Netflix", "Prime Video", "Twitch", "Spotify", "JioHostar"],
    },
    "test4.json": {
        text: "Destinations of the TCP packets captured in this file:",
        sites: ["BBC News", "The New York Times", "The Guardian", "NDTV", "Reuters"],
    },
    "test5.json": {
        text: "Destinations of the TCP packets captured in this file:",
        sites: ["Amazon", "Flipkart", "Nykaa", "Myntra", "eBay"],
    },
    "test6.json": {
        text: "Destinations of the TCP packets captured in this file:",
        sites: ["Notion", "Drive", "Trello", "Canva", "Dropbox"],
    },
};

const Information = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState([]);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state

    const handleDemoFileClick = async (file) => {
        try {
            setLoading(true);
            dispatch(emptyAddress());
            dispatch(deleteCoordinates());
            dispatch(deletePathPair());
            dispatch(addFile(file));
            setFileName(file);

            // Fetch the JSON file
            const response = await fetch(`/Utils/DemoData/${file}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}`);
            }
            const fileData = await response.text();
            const parsedData = parseAndDispatchFile(fileData, file, dispatch);
            setInputData(parsedData);
        } catch (error) {
            console.error(`Error fetching or parsing ${file}:`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-base sm:text-lg border-b-2 p-4 sm:p-6">
                <p className="ml-4 sm:ml-6">CLICK TO TEST</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 py-6">
                    {Object.keys(fileHoverData).map((file, idx) => (
                        <div key={idx} className="relative group">
                            <button
                                onClick={() => handleDemoFileClick(file)}
                                className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-white/10 transition duration-200 shadow-md w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading} // Disable button during loading
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16V4m0 12l3-3m-3 3l-3-3m6 5h4a2 2 0 002-2V6a2 2 0 00-2-2h-4m-4 16H8a2 2 0 01-2-2V6a2 2 0 012-2h4"
                                    />
                                </svg>
                                <div className="text-white text-xs sm:text-sm font-medium truncate">
                                    {file}
                                </div>
                            </button>
                            <div
                                className="absolute z-50 hidden group-hover:block bg-black/90 text-white text-xs sm:text-sm rounded-lg p-3 sm:p-4 w-64 sm:w-72 max-w-xs shadow-xl border border-white/10 top-full mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-200"
                            >
                                <p className="font-semibold mb-2">{fileHoverData[file].text}</p>
                                <ul className="list-disc list-inside space-y-1 break-words">
                                    {fileHoverData[file].sites.map((site, i) => (
                                        <li key={i}>{site}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                    </div>
                )}
                <p className="ml-4 sm:ml-6">WHAT WE PROVIDE?</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between border-b-2">
                <div className="p-6 sm:p-8 md:p-10 md:w-[60%]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold">How to use //</h1>
                    <div
                        className="text-white p-4 rounded-2xl shadow-lg space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
                        <p>
                            1. <span className="text-green-400">Capture Data with Wireshark:</span> Use Wireshark to
                            monitor your network
                            traffic. Start a capture session and let it run while your desired network activity takes
                            place.
                        </p>
                        <p>
                            2. <span className="text-green-400">Export as JSON:</span> After capturing, export the
                            packet data in JSON
                            format. In Wireshark, go to <span className="text-yellow-400">File > Export Packet Dissections > As JSON</span> and
                            save the file.
                        </p>
                        <p>
                            3. <span className="text-green-400">Upload JSON to PacketLens:</span> Open the PacketLens
                            tool and upload your
                            exported JSON file through the upload interface or select a demo file.
                        </p>
                        <p>
                            4. <span className="text-green-400">View Mapped Data:</span> Once uploaded, PacketLens will
                            process and map the
                            packet data—visually presenting key details like source/destination IPs, ports, packet
                            sizes, and other metadata
                            for easy analysis.
                        </p>
                    </div>
                </div>
                <div
                    className="flex justify-center items-center md:w-[40%] p-4 sm:p-6 md:p-8 border-t-2 md:border-t-0 md:border-l-2">
                    <img src="/assets/1.jpg" className="w-full max-w-[300px] sm:max-w-[400px] p-4" alt="How to use"/>
                </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse justify-between border-b-2">
                <div className="p-6 sm:p-8 md:p-10 md:w-[60%]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold">Network Around Globe //</h1>
                    <div className="text-white p-4 rounded-2xl shadow-lg space-y-4 text-sm sm:text-base md:text-lg">
                        <p>
                            <span className="text-green-400">We take your packet data:</span> Once you upload your JSON
                            file or select a
                            demo file, PacketLens reads and parses all TCP packet information.
                        </p>
                        <p>
                            <span className="text-green-400">We analyze and filter:</span> Each packet is inspected for details like source
                            and destination IPs, ports, and packet size to identify meaningful data points.
                        </p>
                        <p>
                            <span className="text-green-400">We search and locate:</span> Using IP geolocation, PacketLens finds the
                            physical locations associated with destination IPs.
                        </p>
                        <p>
                            <span className="text-green-400">We plot on the map:</span> Finally, we visualize where your TCP requests have
                            been sent from your device, giving you a clear global picture of your network activity.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center md:w-[40%] p-4 sm:p-6 md:p-8 border-t-2 md:border-t-0 md:border-r-2">
                    <img src="/assets/2.jpg" className="w-full max-w-[300px] sm:max-w-[400px] p-4" alt="Network around globe" />
                </div>
            </div>

            <div className="py-6 sm:py-8 px-4 sm:px-6 md:px-10 flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
                        NO PACKETS CAN ESCAPDE OUR LENS
                    </h1>
                    <div className="flex gap-4 sm:gap-6 text-white text-lg sm:text-xl mt-4 sm:mt-0">
                        <a
                            href="https://www.linkedin.com/in/suvrat-mittal-05b642294/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                        >
                            <FaLinkedinIn className="cursor-pointer" />
                        </a>
                        <a
                            href="https://github.com/suvrat007/IPGeoTracker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300"
                        >
                            <FaGithub className="cursor-pointer" />
                        </a>
                        <a
                            href="https://x.com/suvrat_007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1DA1F2]"
                        >
                            <FaXTwitter className="cursor-pointer" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm flex-wrap gap-2 sm:gap-0">
                    <div className="text-orange-400 font-semibold text-center sm:text-left">
                        <span>Designed By: Sumit Singh Bisht</span>
                        <span className="ml-0 sm:ml-6">Developed By: Suvrat Mittal</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-400 mt-2 sm:mt-0">
                        <span className="text-xs">◎◎◎</span>
                        <span>2025</span>
                        <span>Copyright, Inc.</span>
                        <span>All rights reserved</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;