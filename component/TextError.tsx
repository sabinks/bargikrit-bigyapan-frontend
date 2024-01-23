import React from "react";

const TextError = ({
    error,
}: {
    error: string[] | string | undefined | any;
}) => {
    return <p className="text-red-500 text-xs flex flex-col py-2">{error}</p>;
};

export default TextError;
