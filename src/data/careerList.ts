export interface CareerItem {
    institution: string;
    start_date: string;
    end_date: string;
    description: string;
    color: string;
    role: string; // Added role field
}

const careerList: CareerItem[] = [
    {
        institution: "University of Warwick",
        start_date: "AUTUMN 2020",
        end_date: "SUMMER 2023",
        description: "I completed my undergraduate degree at The University of Warwick in 2023. During my time I studied a theoretical curriculum, focussing my studies on algorithms, formal languages, and discrete mathematics. I was an active exec of the Computing Society.",
        color: "#722ea5",
        role: "Computer Science Student"
    },
    {
        institution: "Canonical",
        start_date: "WINTER 2024",
        end_date: "AUTUMN 2024",
        description: "Canonical creates and maintains open source software at the heart of our industry, most notably, Ubuntu - the most popular GNU/Linux distribution. At Canonical, I worked in the DevOps team to develop the Juju/Charm ecosystem and support both open source software and the development of Ubuntu. I learnt a lot in writing transparent, maintainable code and it was amazing to be part of such a huge mission.",
        color: "#E95420",
        role: "Associate Software Engineer"
    },
    {
        institution: "Bolt6",
        start_date: "AUTUMN 2024",
        end_date: "PRESENT",
        description: "At Bolt6 I am currently working across the stack, on both DevOps and software engineering projects. Bolt6 uses image vision and machine learning to deliver industry-disruptive live sports tracking, AR and graphics. This has included working in a small team to build the onprem infrastructure as we move to a hybrid cloud model, working on the core software stack (C++) and working on full stack for development of a web-based cluster manager and deployment tool.",
        color: "#00A3E0",
        role: "DevOps/Software Engineer"
    },
];

export default careerList;