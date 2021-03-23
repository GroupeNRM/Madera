import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Devis } from "../entity/Devis";

export class DevisController {
    static async createDevis(request: Request, response: Response) {
        const devisRepository = getRepository(Devis);

        const { reference, total_ht, total_ttc, remise, echelonnement, createdAt, projet } = request.body;

        const devis = new Devis();

        devis.reference = reference;
        devis.total_ht = total_ht;
        devis.total_ttc = total_ttc;
        devis.remise = remise;
        devis.echelonnement = echelonnement;
        devis.createdAt = createdAt;
        devis.projet = projet;

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
            devis = await devisRepository.findOneOrFail(request.params.id);
        } catch (e) {
            return response.status(404).send({ message: "Devis not found" })
        }

        response.send(devis);
    }

    static updateDevis = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        const id = request.params.id;
        const { projet, reference, echelonnement } = request.body;

        let devis: Devis;

        try {
            devis = await devisRepository.findOneOrFail(id);

            devis.projet = projet;
            devis.reference = reference;
            devis.echelonnement = echelonnement;

            try {
                await devisRepository.save(devis);
            } catch (e) {
                return response.status(400).send({ message: "Erreur dans la sauvegarde du devis" });
            }
        } catch (e) {
            return response.status(404).send({ message: "Aucun devis avec cet ID" });
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