import { FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const Information = () => {
    return(
        <div>
            <div className="text-lg border-b-2 p-4">
                <p className={'ml-6'}>WHAT WE PROVIDE?</p>
            </div>
            <div className="flex flex-row justify-between border-b-2">
                <div className={'p-10 w-[70%]'}>
                    <h1 className={'text-4xl mb-4 font-bold'}>How to use //</h1>
                    <div
                        className="text-white p-4 rounded-2xl shadow-lg space-y-4 text-lg leading-relaxed">
                        <p>1. <span className="text-green-400">Capture Data with Wireshark:</span> Use Wireshark to
                            monitor your network traffic. Start a capture session and let it run while your desired
                            network activity takes place.</p>
                        <p>2. <span className="text-green-400">Export as JSON:</span> After capturing, export the packet
                            data in JSON format. In Wireshark, go to <span className="text-yellow-400">File &gt; Export Packet Dissections &gt; As JSON</span> and
                            save the file.</p>
                        <p>3. <span className="text-green-400">Upload JSON to PacketLens:</span> Open the PacketLens
                            tool and upload your exported JSON file through the upload interface.</p>
                        <p>4. <span className="text-green-400">View Mapped Data:</span> Once uploaded, PacketLens will
                            process and map the packet data—visually presenting key details like source/destination IPs,
                            ports, packet sizes, and other metadata for easy analysis.</p>
                    </div>
                </div>

                <div className={'border-l-2 flex flex-col justify-center items-center w-[35%]'}>
                    {/*<svg width="392" height="315" viewBox="0 0 392 315" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*    <path*/}
                    {/*        d="M1.96832 107.5L57.6555 1.5M1.96832 107.5L57.6555 277M1.96832 107.5L386.405 12.5M1.96832 107.5L342.93 189M57.6555 1.5L386.405 12.5M57.6555 1.5L216.901 313.5M57.6555 1.5L342.93 189M57.6555 1.5V277M386.405 12.5L342.93 189M386.405 12.5L57.6555 277M386.405 12.5L216.901 313.5M342.93 189L216.901 313.5M342.93 189L57.6555 277M216.901 313.5L57.6555 277"*/}
                    {/*        stroke="#DFDFDF" strokeWidth="2"*/}
                    {/*    />*/}
                    {/*    <path*/}
                    {/*        d="M111.877 237C111.877 239.761 109.69 242 106.992 242C104.294 242 102.107 239.761 102.107 237C102.107 234.239 104.294 232 106.992 232C109.69 232 111.877 234.239 111.877 237Z"*/}
                    {/*        fill="#D9D9D9"*/}
                    {/*    />*/}
                    {/*    <ellipse cx="58.144" cy="121" rx="4.88484" ry="5" fill="#D9D9D9"/>*/}
                    {/*    <ellipse cx="100.154" cy="84" rx="4.88484" ry="5" fill="#D9D9D9"/>*/}
                    {/*    <ellipse cx="343.418" cy="189" rx="4.88484" ry="5" fill="#D9D9D9"/>*/}
                    {/*    <ellipse cx="386.405" cy="13" rx="4.88484" ry="5" fill="#D9D9D9"/>*/}
                    {/*</svg>*/}

                    {/*<svg width="144" height="147" viewBox="0 0 144 147" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*    <ellipse cx="71.8454" cy="73.5" rx="71.8071" ry="73.5" fill="url(#paint0_linear_763_1346)"/>*/}
                    {/*    <defs>*/}
                    {/*        <linearGradient id="paint0_linear_763_1346" x1="118.035" y1="27.8108" x2="15.5879"*/}
                    {/*                        y2="126.734" gradientUnits="userSpaceOnUse">*/}
                    {/*            <stop offset="0.103" stopColor="#524BCE"/>*/}
                    {/*            <stop offset="0.628" stopColor="#E38A63"/>*/}
                    {/*            <stop offset="1" stopColor="#524CCE"/>*/}
                    {/*        </linearGradient>*/}
                    {/*    </defs>*/}
                    {/*</svg>*/}
                    <img
                        src="https://media-hosting.imagekit.io/a1ed93a62a294cd9/screenshot_1744120197789.png?Expires=1838728198&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=iibgz322AmoW09vyt2WnIdOlWeVSgNMsMT-l2gTaEORSemXn07HeRACmcFmEcD~mzk6UUXyXbq72hiXsXzW8xaUoPf3RtVw08~AAAo2JJAoNqZY8WVARZj9x4HHqc-d2KH0JcSMNhdw4RvmsHJ4rqnXOV9IGCK-9bSh3ZuLAacXYIch-RYyk4e5cGQ0r4Kxs8gIBgcr62DME0lFkcZYfdOgR4J0zWnhCZC6bXvxzChRh0sDz9HDwPj31vD6~F9ib9YICtQ~-Uy4VFENL60i13l-ApL68gRU7nohGWbL0t3ngcVnVeY-bQWE6Qu7e3Yboq4tZIbJ-GP7kFmtNmAMlwQ__"
                        className={'w-40%'}/>

                </div>
            </div>

            <div className="flex flex-row justify-between border-b-2">
                <div className={' flex flex-col justify-center items-center w-[35%] h-[25em]'}>
                    <img
                        src="https://media-hosting.imagekit.io/9a9f091cf5694797/screenshot_1744121591703.png?Expires=1838729592&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xxBETx9lVCwb6PzAFNFM4b7to-Xw93tikNmcuooxczga~xXrC9M9n7bTHNFFg5EUWz8iC-YHhxzd4SYun0OUpTLELmP~SeN6k9J3VwdkpdwyhwidUzwXpCPB84c0dEsM2kptBs49u5yfkbZiigAhGKYOTB9uBJ2i5DyKQhtevI7Zsswg7I5NEA2a5hld4-AUn9V-dJm~VB6gPXkHghzjbpSPK~UAhDzXz-Buj4-ywBqvo4KrptZRRaGXKK12MeBOw6--JZmK669NqirVPgpWsvpJjluxnxMSqH7AhOShS8EP716GaBKbQb2lMGbCD69xjeY~-NVUYOT8mbcV~oBKFw__"
                        className={'w-40% h-full'}/>
                </div>
                <div className="p-10 w-[70%] text-left border-l-2">
                    <h1 className="text-4xl mb-4 font-bold">Network Around Globe //</h1>
                    <div class="text-white p-4 rounded-2xl shadow-lg space-y-4 text-xl ">
                        <p><span class="text-green-400">We take your packet data:</span> Once you upload your JSON file, PacketLens reads and parses all TCP packet information.</p>
                        <p><span class="text-green-400">We analyze and filter:</span> Each packet is inspected for details like source and destination IPs, ports, and packet size to identify meaningful data points.</p>
                        <p><span class="text-green-400">We search and locate:</span> Using IP geolocation, PacketLens finds the physical locations associated with destination IPs.</p>
                        <p><span class="text-green-400">We plot on the map:</span> Finally, we visualize where your TCP requests have been sent from your device, giving you a clear global picture of your network activity.</p>
                    </div>

                </div>

            </div>

            <div className="py-8 px-10 flex flex-col gap-6">
                {/* Main Slogan */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">NO PACKETS CAN ESCAPDE OUR LENS</h1>

                    <div className="flex gap-6 text-white text-xl">
                        <FaTwitter className="cursor-pointer hover:text-blue-400"/>
                        <FaLinkedinIn className="cursor-pointer hover:text-blue-500"/>
                        <FaFacebookF className="cursor-pointer hover:text-blue-600"/>
                    </div>

                </div>

                {/* Credits and Copyright */}
                <div className="flex justify-between items-center text-sm flex-wrap mt-10">
                    <div className="text-orange-400 font-semibold">
                    <span>Designed By : Sumit Singh Bisht</span>
                        <span className="ml-6">Developed By : Suvrat Mittal</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-400">
                        {/* Replace below with your logo or SVG */}
                        <span className="text-xs">◎◎◎</span>
                        <span>2025</span>
                        <span>Copyright, Inc.</span>
                        <span>All rights reserved</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Information