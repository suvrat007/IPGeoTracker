// parseAndDispatchFile.js

import { addAddress } from "../../Utils/Redux/dataSlice";

export const parseAndDispatchFile = (jsonData, fileName, dispatch) => {
    try {
        // Validate that jsonData is an array
        if (!Array.isArray(jsonData)) {
            console.error(`Expected JSON array for ${fileName}, but received:`, typeof jsonData);
            throw new Error("Data must be an array of packet objects");
        }

        const uniquePairs = new Set();
        let processedCount = 0;
        let skippedCount = 0;

        jsonData.forEach((item, index) => {
            try {
                // Extract source and destination IP addresses from the packet structure
                const src = item?._source?.layers?.ip?.["ip.src"];
                const dst = item?._source?.layers?.ip?.["ip.dst"];
                
                if (src && dst) {
                    // Validate IP addresses (basic validation)
                    if (isValidIP(src) && isValidIP(dst)) {
                        // Create a unique pair identifier (sorted to avoid duplicates like [A,B] and [B,A])
                        const pair = JSON.stringify([src, dst].sort());
                        
                        if (!uniquePairs.has(pair)) {
                            uniquePairs.add(pair);
                            dispatch(addAddress({ src, dst }));
                            processedCount++;
                        }
                    } else {
                        console.warn(`Invalid IP addresses in packet ${index + 1}: src=${src}, dst=${dst}`);
                        skippedCount++;
                    }
                } else {
                    // Log missing IP addresses for debugging
                    if (index < 5) { // Only log first 5 to avoid spam
                        console.warn(`Missing IP addresses in packet ${index + 1}:`, {
                            src: src || 'missing',
                            dst: dst || 'missing',
                            structure: item?._source?.layers?.ip ? 'ip layer found' : 'no ip layer'
                        });
                    }
                    skippedCount++;
                }
            } catch (itemError) {
                console.error(`Error processing packet ${index + 1}:`, itemError);
                skippedCount++;
            }
        });

        console.log(`File processing complete for ${fileName}:`);
        console.log(`- Total packets: ${jsonData.length}`);
        console.log(`- Unique IP pairs processed: ${processedCount}`);
        console.log(`- Packets skipped: ${skippedCount}`);

        if (processedCount === 0) {
            throw new Error("No valid IP address pairs found in the packet data");
        }

        return {
            totalPackets: jsonData.length,
            processedPairs: processedCount,
            skippedPackets: skippedCount,
            uniquePairs: uniquePairs.size
        };

    } catch (error) {
        console.error("Error processing packet data:", error);
        throw error; // Re-throw to be handled by the calling function
    }
};

// Helper function to validate IP addresses
const isValidIP = (ip) => {
    if (!ip || typeof ip !== 'string') return false;
    
    // Basic IPv4 validation
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Regex.test(ip)) {
        const parts = ip.split('.');
        return parts.every(part => {
            const num = parseInt(part, 10);
            return num >= 0 && num <= 255;
        });
    }
    
    // Basic IPv6 validation (simplified)
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    if (ipv6Regex.test(ip)) {
        return true;
    }
    
    // Allow shortened IPv6 formats
    if (ip.includes('::')) {
        const parts = ip.split('::');
        if (parts.length === 2) {
            return true; // Simplified check for compressed IPv6
        }
    }
    
    return false;
};