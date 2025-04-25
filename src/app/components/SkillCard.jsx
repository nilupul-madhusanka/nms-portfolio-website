import React from "react";

const SkillCard = ({ iconUrl, name, level }) => {
    return (
        <div>
            <div
                className="h-52 md:h-72 rounded-t-xl relative group flex items-center justify-center bg-[#181818]"
                style={{ backgroundImage: `url(${iconUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            >
                <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex items-center justify-center group-hover:bg-opacity-80 transition-all duration-500">
                    <p className="text-white text-lg font-semibold">{level}</p>
                </div>
            </div>
            <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4 text-center">
                <h5 className="text-xl font-semibold mb-2 transition duration-300 hover:brightness-110 hover:scale-110">{name}</h5>
            </div>
        </div>
    );
};

export default SkillCard;
