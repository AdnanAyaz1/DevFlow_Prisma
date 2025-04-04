interface Link {
  link: string;
  icon: string;
  route: string;
}

export const links: Link[] = [
  { link: "Home", icon: "/icons/home.svg", route: "/" },
  { link: "Collections", icon: "/icons/star.svg", route: "/collections" },
  // { link: "Find Jobs", icon: "/icons/briefcase.svg", route: "/jobs" },
  { link: "Tags", icon: "/icons/tag.svg", route: "/tags" },
  {
    link: "Communities",
    icon: "/icons/communities.svg",
    route: "/communities",
  },
  {
    link: "Ask a Question",
    icon: "/icons/askQuestion.svg",
    route: "/ask-question",
  },
  // {
  //   link: "Recommended Questions",
  //   icon: "/icons/communities.svg",
  //   route: "/recommended-questions",
  // },
];
