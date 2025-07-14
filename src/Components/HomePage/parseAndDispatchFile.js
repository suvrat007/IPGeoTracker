import { addAddress } from "../../Utils/Redux/dataSlice";

export const parseAndDispatchFile = (fileData, fileName, dispatch) => {
    try {
        const json = typeof fileData === "string" ? JSON.parse(fileData) : fileData;
        const uniquePairs = new Set();
        json.forEach((item) => {
            const src = item?._source?.layers?.ip?.["ip.src"];
            const dst = item?._source?.layers?.ip?.["ip.dst"];
            if (src && dst) {
                const pair = JSON.stringify([src, dst].sort());
                if (!uniquePairs.has(pair)) {
                    uniquePairs.add(pair);
                    dispatch(addAddress({ src, dst }));
                }
            }
        });
        return json;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
};