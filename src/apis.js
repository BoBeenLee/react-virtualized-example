import axios from "axios";
import _ from "lodash";

const API_KEY = "142fedf848c3f6a6e3bcadafdc1608ed";

const flickrSearchByTag = async (tag, page) => {
  const apiKey = API_KEY;

  const response = await axios.get(
    "https://api.flickr.com/services/rest/" +
      "?method=flickr.photos.search" +
      "&api_key=" +
      apiKey +
      "&page=" +
      page +
      "&tags=" +
      tag +
      "&format=json" +
      "&nojsoncallback=1"
  );
  return {
    pages: _.get(response.data, "photos.pages", 0),
    photos: _.map(_.get(response.data, "photos.photo", []), photo => {
      return {
        ...photo,
        imageUrl:
          `https://farm${photo.farm}.staticflickr.com/` +
          `${photo.server}/${photo.id}_${photo.secret}_q.jpg`
      };
    })
  };
};

export { flickrSearchByTag };
