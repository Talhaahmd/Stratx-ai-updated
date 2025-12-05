import { IMenuDT } from "@/types/menu-d-t";


const menu_data: IMenuDT[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About",
    link: "/about-us",
    dropdown_menus: [
      { title: "About Us", link: "/about-us" },
      { title: "Our Services", link: "/service" },
      { title: "Our Clients", link: "/brand" },
    ],
  },
  {
    id: 3,
    title: "Portfolio",
    link: "/home-11",
  },
  {
    id: 4,
    title: "Blog",
    link: "/blog-list",
  },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
  },
];



export default menu_data;

// mobile menus 
export const mobile_menu_data: {
  id: number;
  title: string;
  link: string;
  dropdown_menus?: {
    title: string;
    link: string;
  }[];
}[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About",
    link: "/about-us",
    dropdown_menus: [
      { title: "About Us", link: "/about-us" },
      { title: "Our Services", link: "/service" },
      { title: "Our Clients", link: "/brand" },
    ],
  },
  {
    id: 3,
    title: "Portfolio",
    link: "/home-11",
  },
  {
    id: 4,
    title: "Blog",
    link: "/blog-list",
  },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
  },
];