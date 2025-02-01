const API_KEY = "df2ea3a3fa5440889b41ec175a5732b0";

const categories = [
    {
        name: "trending",
        title: "Em alta",
        path: `/trending/all/day?language=pt-BR&api_key=${API_KEY}`,
        isLarge: true,
    },
    {
        name: "netflixOriginals",
        title: "Originais Netflix",
        path: `/discover/tv?api_key=df2ea3a3fa5440889b41ec175a5732b0&with_networks=213`,
        isLarge: false,
    },
    {
        name: "topRated",
        title: "Populares",
        path: `/discover/tv?api_key=${API_KEY}&language=pt-BR`,
        isLarge: false,
    },
    {
        name: "comedy",
        title: "Comédias",
        path: `/trending/all/day?api_key=${API_KEY}&with_genres=35`,
        isLarge: false,
    },
    {
        name: "action&Adventure",
        title: "Ação e Aventura",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
        isLarge: false,
    },
    {
        name: "documentaries",
        title: "Documentários",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
        isLarge: false,
    },
    {
        name: "kids",
        title: "Infantil",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
        isLarge: false,
    },
];

export const getMovies = async (path) => {
    try {        
        let url =`https://api.themoviedb.org/3${path}`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log("error getMovies: ", error);
    }
};

export default categories;