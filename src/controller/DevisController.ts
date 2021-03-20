import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Devis } from "../entity/Devis";

export class DevisController {
    static async createDevis(request: Request, response: Response) {
        const devisRepository = getRepository(Devis);

        const { reference, total_ht, total_ttc, remise, echelonnement, createdAt, projet, client   } = request.body;

        const devis = new Devis();

        devis.reference = reference;
        devis.total_ht = total_ht;
        devis.total_ttc = total_ttc;
        devis.remise = remise;
        devis.echelonnement = echelonnement;
        devis.createdAt = createdAt;
        devis.projet = projet;
        devis.client = client;

        try {
            await devisRepository.save(devis);
        } catch (err) {
            return response.status(400).json({ message: "Une erreur est survenue", err })
        }

        response.send(devis);
    }

    static findOneById = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        let devis: Devis;

        try {
            devis = await devisRepository.findOneOrFail(request.params.id, {
                select: ["id", "reference", "total_ht", "total_ttc", "remise", "echelonnement", "createdAt", "projet", "client", "isActive"]
            });
        } catch (e) {
            return response.status(404).send({ message: "Devis not found" })
        }

        response.send(devis);
    }

    static updateDevis = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        const id = request.params.id;
        const { projet, client, reference, echelonnement, updatedAt   } = request.body;

        let devis: Devis;

        try{
            devis = await devisRepository.findOneOrFail(id);
            devis.projet = projet;
            devis.client = client;
            devis.reference = reference;
            devis.echelonnement = echelonnement;

            await devisRepository.save(devis);
        }catch (e){
            return response.status(404).send({ message: " Devis not found" });
        }

        return response.send(devis);
    }

    static archiveDevis = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        const id = request.params.id;
        let devis: Devis;

        try {
            devis = await devisRepository.findOneOrFail(id);
            devis.isActive = false;

            await devisRepository.save(devis);
        } catch (e) {
            return response.status(404).send({ message: " Devis not found" });
        }

        return response.send(devis);
    }

    static findAll = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        const devis = await devisRepository.findAndCount();

        response.send(devis);
    }
}