import { MdDashboard } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { FaBagShopping, FaUserGroup } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";

export const navLinks = [
  {
    url: "/",
    icon: <MdDashboard />,
    label: "대시보드",
  },
  {
    url: "/banner",
    icon: <BsCollectionFill />,
    label: "배너",
  },
  {
    url: "/products",
    icon: <FaBoxes />,
    label: "상품",
  },
  {
    url: "/orders",
    icon: <FaBagShopping />,
    label: "주문 목록",
  },
  {
    url: "/users",
    icon: <FaUserGroup />,
    label: "회원 정보",
  },
];
