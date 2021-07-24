import {Request, Response} from "express";
import * as recommendationService from "../services/recommendationService";

export async function recommendSong(req: Request, res: Response){
    try{
        const { song, link } = req.body;

        if(!song || !link) {
            return res.sendStatus(400);
        }

        if(!recommendationService.validateRecommendationData(song, link)){
            return res.sendStatus(400);
        }

        await recommendationService.recommendASong(song, link);

        res.sendStatus(201);
    
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function upvoteSong(req: Request, res: Response){

    try{
        let { id } = req.params;  
        
        if(!id) {
            return res.sendStatus(400);
        }
   
        await recommendationService.increaseSongScore(id);

        res.sendStatus(201);
        
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }

}

export async function downvoteSong(req: Request, res: Response){

    try{
        const { id } = req.params;
    
        if(!id) {
            return res.sendStatus(400);
        }
  
        await recommendationService.decreaseSongScore(id);

        res.sendStatus(201);
        
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
}

export async function getRandomSong(req: Request, res: Response){

    try{
        await recommendationService.getRandomSong();

        res.sendStatus(201);
        
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }

}

export async function getTopListSongs(){
    
}
