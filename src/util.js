export const checkFavorites = (data, type) => {
  const favorites = getStorage();
  data.map((e) => {
    if(favorites.length > 0){
      e.favorite = false;
      favorites.map((el) => {
        if (type === "search") {
          if (e.url === el.url && !e.favorite && e.favorite !== true) {
            e.favorite = true;
          }
        }
        if (type === "rule") {
          if (e.id === el.id && !e.favorite && e.favorite !== true) {
            e.favorite = true;
          }
        }
      });
    }
  });
  return data;
};

export const findElement = (arr, propName, propValue) => {
  for (var i = 0; i < arr.length; i++)
    if (arr[i][propName] === propValue) return i;

  // will return undefined if not found; you could return a default instead
}

export const getStorage = () => localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
