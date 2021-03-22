import {Request, Response} from "express";
import {getCustomRepository, getRepository} from "typeorm";
import {RangeRepository} from "../repository/RangeRepository";
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

    static async findLastOne(request: Request, response: Response) {
        const rangeRepository = getCustomRepository(RangeRepository);
        let range: Range

        try {
            range = await rangeRepository.findLastOne();
        } catch (e) {
            response.status(404).send({message: "Il n'existe pas encore de gamme !"});
        }

        response.send(range);
    }
}