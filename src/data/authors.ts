export interface Author {
  name: string;
  initials: string;
  role: string;
  bio: string;
  linkedin: string;
}

/**
 * Author profiles for blog posts, keyed by the `createdBy` value used in
 * each post. Only current team members are listed; posts with an unknown
 * author render no bio block.
 */
export const authors: Record<string, Author> = {
  "Manuel Samaniego": {
    name: "Manuel Samaniego",
    initials: "MS",
    role: "Co-Fundador · Desarrollo Web",
    bio: "Traduce las ideas en sitios rápidos, funcionales y bien posicionados, a cargo de la arquitectura técnica y la experiencia de usuario.",
    linkedin: "https://www.linkedin.com/in/manuel-samaniego/",
  },
  "Ivan Franco": {
    name: "Ivan Franco",
    initials: "IF",
    role: "Co-Fundador · Director Creativo y Diseño",
    bio: "Define la identidad visual y la dirección creativa de cada proyecto, cuidando que cada marca comunique con personalidad y claridad.",
    linkedin: "https://www.linkedin.com/in/ivan-franco-5a9b07334/",
  },
};

export const authorsPageUrl = "https://labstudiomedia.com/sobre-nosotros";
