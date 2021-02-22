import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Devis} from "../entity/Devis";

export class DevisController {

    /**
     * 
     * @param request 
     * @param response 
     */
    static async createDevis(request: Request, response: Response) {
        const devisRepository = getRepository(Devis);

        const { libelle, etat, total_ht, remise,createdAt, echelonnement  } = request.body;

        const devis = new Devis();
        devis.libelle = libelle;
        devis.etat = etat;
        devis.total_ht = total_ht;
        devis.remise = remise;
        devis.createdAt = createdAt;
        devis.echelonnement = echelonnement;

        try {
            await devisRepository.save(devis);
        } catch(err) {
            return response.status(400).json({message: "Une erreur est survenue", err})
        }

        response.send(devis);
    }

    static findOneById = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        let devis: Devis;

        try {
            devis = await devisRepository.findOneOrFail(request.params.id, {
                select: ["id", "etat", "libelle", "total_ht", "dateCreation", "echelonnement", "isActive"]
            });
        } catch (e) {
            return response.status(404).send({ message: "Devis not found" })
        }

        response.send(devis);
    }

    static archiveProject = async (request: Request, response: Response) => {
        const devisRepository = getRepository(Devis);
        const id = request.params.id;
        let devis: Devis;

        try {
            devis = await devisRepository.findOneOrFail(id);
            devis.isActive = false;

            await devisRepository.save(devis);
        } catch (e) {
            return response.status(404).send({ message: "Devis not found" });
        }

        return response.send(devis);
    }
}