import * as songRepository from "../repositories/songRepository";
import { Request } from "express";

type Song = {
  id: number,
  name: string,
  link: string,
  score: number
}

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
    await songRepository.upvoteSong(existingSong.rows[0].id);

  } else {
    await songRepository.registerSong(song, link);
  }
}

export async function increaseSongScore(id: string) { 

    await songRepository.upvoteSong(id);

}

export async function decreaseSongScore(id: string) {
  
  const existingSong = await songRepository.getSongById(id);

  if (existingSong.rows[0].score <= -4) {
    await songRepository.deleteSong(existingSong.rows[0].id);

  } else {
    await songRepository.downvoteSong(id);
  }
}

export async function getRandomSong() {
    
  const probability = Math.random()*(100 - 30) + 30;

  if( probability <= 30){
    const lowScoreSongs = await songRepository.getLowScoreSongs();
    return pickRandomSong(lowScoreSongs);    

  } else {
    const topSongs = await songRepository.getTopSongs();
    return pickRandomSong(topSongs);  
  }    
}

function  pickRandomSong(songs: Song[]) {

  const aleatoryNumber = Math.random()*songs.length - 1;
  
  const drawnSong = {
    id: songs[aleatoryNumber].id,
    name: songs[aleatoryNumber].name,
    youtubeLink: songs[aleatoryNumber].link,
    score: songs[aleatoryNumber].score
  }

  return drawnSong;  
  
}


async function getTopListWithAmount(req: Request) {

  const amount = parseInt(req.params.amount);
  // const orderedRecommendationsWithGenres =
  //   await getRecommendationsWithGenresUsingSubquery("top", amount);
  // if (!orderedRecommendationsWithGenres[0]) {
  //   throw new ErrorWithStatus("smas404");
  // }
  // return orderedRecommendationsWithGenres;
}

