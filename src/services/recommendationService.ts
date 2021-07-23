import * as songRepository from "../repositories/songRepository";

export async function validateRecommendationData(song: string, link: string) {
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  if (link.match(p) && typeof song === "string") {
    return true;
    
  } else {
    return false;
  }
}

export async function recommendASong(song: string, link: string) {
    
  const existingSong = await songRepository.getSongByName(song);

  if (existingSong.rowCount > 0) {
    await songRepository.upvoteSong(song);

  } else {
    await songRepository.registerSong(song, link);
  }
}
