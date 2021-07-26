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
        const { id } = req.params;  
        
        if(!parseInt(id)) {
            return res.sendStatus(400);
        }
   
        const requisition = await recommendationService.increaseSongScore(id);

        if(requisition === null){
            res.sendStatus(404);
        }

        res.sendStatus(200);
        
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }

}

export async function downvoteSong(req: Request, res: Response){

    try{
        const { id } = req.params;
    
        if(!parseInt(id)) {
            return res.sendStatus(400);
        }
  
        const requisition = await recommendationService.decreaseSongScore(id);

        if(requisition === null){
            res.sendStatus(404);
        }

        res.sendStatus(200);
        
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
}

export async function getRandomSong(req: Request, res: Response){

    try{
        const randomSong = await recommendationService.getRandomSong();

        res.send(randomSong).status(201);
        
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }

}

export async function getTopListSongs(req: Request, res: Response){

    try{

        const { amount } = req.params;

        if(!amount) {
            return res.sendStatus(400);
        }

        if(parseInt(amount) <= 0) {
            return res.sendStatus(400);
        }

        const topList = await recommendationService.getTopListWithAmount(amount);

        res.send(topList).status(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }    
}
