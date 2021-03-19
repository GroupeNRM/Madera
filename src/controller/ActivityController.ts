import {Request, Response} from "express";
import {getCustomRepository} from "typeorm";
import {ActivityRepository} from "../repository/ActivityRepository";
import {Activity} from "../entity/Activity";

export class ActivityController {
    static async getLastFive(request: Request, response: Response) {
        const activityController = getCustomRepository(ActivityRepository);
        let activities: Activity[]

        try {
             activities = await activityController.findLastFive();
        } catch (e) {
            return response.status(400).send({ message: "Erreur dans la récupération des activités" });
        }

        response.send(activities)
    }
}