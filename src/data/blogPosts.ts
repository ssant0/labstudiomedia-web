import type { ImageMetadata } from "astro";

import Blog1Image from "../img/blog/1.webp";
import Blog2Image from "../img/blog/2.webp";
import Blog3Image from "../img/blog/3.webp";
import Blog4Image from "../img/blog/4.webp";
import Blog5Image from "../img/blog/5-1.webp";
import Blog6Image from "../img/blog/6.webp";
import Blog7Image from "../img/blog/7.webp";
import Blog8Image from "../img/blog/8.webp";
import Blog9Image from "../img/blog/9.webp";
import Blog10Image from "../img/blog/10.webp";

export interface BlogPostMeta {
  title: string;
  description: string;
  image: ImageMetadata;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/á/g, "a")
    .replace(/ś/g, "s")
    .replace(/é/g, "e")
    .replace(/ŕ/g, "r")
    .replace(/ý/g, "y")
    .replace(/ú/g, "u")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ṕ/g, "p")
    .replace(/ĺ/g, "l")
    .replace(/ḱ/g, "k")
    .replace(/j́/g, "j")
    .replace(/ǵ/g, "g")
    .replace(/ź/g, "z")
    .replace(/ć/g, "c")
    .replace(/ń/g, "n")
    .replace(/ḿ/g, "m")
    .replace(/ñ/g, "n")
    .replace(/ /g, "-")
    .replace(/:/g, "");
}

export const blogPosts: BlogPostMeta[] = [
  {
    title: "10 Motivos por los Cuales una Página Web es Importante para un Negocio",
    description:
      "Descubre por qué tener una página web es esencial para tu negocio. Aquí te presentamos 10 razones clave para mejorar tu presencia en línea y aumentar tus ventas.",
    image: Blog1Image,
  },
  {
    title: "La Importancia del Diseño Responsivo en la Era Móvil",
    description:
      "Descubre por qué el diseño responsivo es esencial en la era móvil. Aprende cómo un sitio web adaptable puede mejorar la experiencia del usuario y aumentar la conversión.",
    image: Blog2Image,
  },
  {
    title: "La Importancia de la Fotografía Profesional para tu Negocio",
    description:
      "Descubre cómo la fotografía profesional puede mejorar la imagen de tu negocio, atraer más clientes y aumentar tus ventas. Aprende sobre los beneficios y la importancia de invertir en fotos de alta calidad.",
    image: Blog3Image,
  },
  {
    title: "Elige el Dron Perfecto para tus Proyectos",
    description:
      "Descubre cómo elegir el dron perfecto para tus proyectos de grabación. Exploramos modelos como el DJI Mini 4, Air 3 y Mavic 3, con sus precios, funciones y características técnicas.",
    image: Blog4Image,
  },
  {
    title: "Tendencias de Diseño Web en 2024: Lo que Necesitas Saber",
    description:
      "Explora las principales tendencias de diseño web en 2024, desde la accesibilidad mejorada hasta el 3d. Mantente actualizado y asegura que tu sitio web destaque en el competitivo mercado digital.",
    image: Blog5Image,
  },
  {
    title: "10 Errores Comunes de Diseño Web y Cómo Evitarlos",
    description:
      "Descubre los 10 errores más comunes en diseño web y aprende cómo evitarlos para mejorar la experiencia de usuario y el rendimiento de tu sitio.",
    image: Blog6Image,
  },
  {
    title: "Post-producción en Fotografía de Productos: Retoca como un Profesional",
    description:
      "Descubre consejos y técnicas de edición para mejorar la calidad de las fotos de productos en postproducción. Aprende a retocar imágenes como un profesional y lleva tus fotografías al siguiente nivel.",
    image: Blog7Image,
  },
  {
    title: "Drones para Fotografía de Eventos: Capturando Momentos Únicos desde Nuevas Perspectivas",
    description:
      "Descubre cómo utilizar drones para capturar fotografías impresionantes en eventos como bodas, conciertos y deportes, ofreciendo perspectivas únicas que no son posibles con cámaras tradicionales.",
    image: Blog8Image,
  },
  {
    title: "Innovaciones en Tecnología de Drones: Lo Último en Cámaras y Estabilización para Video y Fotografía",
    description:
      "Explora las últimas innovaciones en tecnología de drones, centrándote en las mejoras de cámaras y sistemas de estabilización que están transformando la calidad del contenido en video y fotografía.",
    image: Blog9Image,
  },
  {
    title: "Cómo Incorporar Imágenes con Drones en Estrategias de Soluciones Digitales",
    description:
      "Descubre cómo integrar imágenes aéreas capturadas con drones en tus estrategias de soluciones digitales para crear contenido más atractivo y diferenciador en redes sociales, sitios web y presentaciones corporativas.",
    image: Blog10Image,
  },
];
