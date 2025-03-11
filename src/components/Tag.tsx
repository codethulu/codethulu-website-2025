import { Link } from "@tanstack/react-router";

interface TagProps {
    tag: string;
    backgroundColor?: string; // Optional prop to customize background color
}

const Tag = ({ tag, backgroundColor = "white" }: TagProps) => {
    // Determine if the background is dark
    const isDarkBackground = backgroundColor === "black" || backgroundColor === "#000000"; // Add more dark colors if needed
    const textColor = isDarkBackground ? "white" : "black";

    return (
        <Link
            to="/projects"
            search={{ query: tag.toUpperCase() }} // Populate search bar with tag content
            className="inline-block mr-2 mb-2"
        >
            <div
                className="relative flex items-center h-8 px-3 pr-4 text-sm font-bold uppercase"
                style={{ backgroundColor }}
            >
                {/* Left pointed edge */}
                <div
                    className="absolute left-0 top-0 w-0 h-0 border-t-4 border-b-4 border-r-4"
                    style={{
                        borderTopColor: "transparent",
                        borderBottomColor: "transparent",
                        borderRightColor: backgroundColor,
                    }}
                />
                <span className={`relative z-10`} style={{ color: textColor }}>
                    {tag}
                </span>
            </div>
        </Link>
    );
};

export default Tag;