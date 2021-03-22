import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Range} from "../entity/Range";

export class RangeController {
    static async add(request: Request, response: Response) {
        const projectRepository = getRepository(Range);

        const { reference, libelle, typeFinition, typeCouverture, typeAngle, typeIsolant } = request.body;

        const range = new Range();
        range.reference = reference;
        range.libelle = libelle;
        range.typeFinition = typeFinition;
        range.typeCouverture = typeCouverture;
        range.typeAngle = typeAngle;
        range.typeIsolant = typeIsolant;


        try {
            await projectRepository.save(range);
        } catch(err) {
            return response.status(400).json({message: "Une erreur est survenue", err})
        }

        response.send(range);
    }

    static async findAll(request: Request, response: Response) {
        const rangeRepository = getRepository(Range);
        const ranges = await rangeRepository.findAndCount();

        response.send(ranges);
    }
}