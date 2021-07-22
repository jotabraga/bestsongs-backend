import {Request, Response} from "express";
import * as recommendationService from "../services/recommendationService";

export async function recommendSong(req: Request, res: Response){
    try{
        const { song, link } = req.body;

    if(!song || !link) {
        return res.sendStatus(400);
    }

    await recommendationService.recommendASong(song, link);
    res.sendStatus(201);
    
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function upvoteSong(){

}

export async function downvoteSong(){

}

export async function getRandomSong(){

}

export async function getTopListSongs(){
    
}
