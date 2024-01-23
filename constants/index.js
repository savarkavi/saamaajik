import { FaHome, FaSearch, FaRegHeart } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export const sidebarLinks = [
  {
    icon: <FaHome />,
    route: "/",
    label: "Home",
  },
  {
    icon: <FaSearch />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <FaRegHeart />,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <BiSolidImageAdd />,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <IoIosPeople />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <CgProfile />,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
