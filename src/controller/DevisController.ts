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

        const { reference, etat, total_ht, total_ttc, remise,createdAt, updatedAt, echelonnement  } = request.body;

        const devis = new Devis();
        devis.reference = reference;
        devis.etat = etat;
        devis.total_ht = total_ht;
        devis.total_ttc = total_ttc;
        devis.remise = remise;
        devis.createdAt = createdAt;
        devis.updatedAt = updatedAt;
        devis.echelonnement = echelonnement;

        try {
            await devisRepository.save(devis);
        } catch(err) {
            return response.status(400).json({message: "Une erreur est survenue", err})
        }

        response.send(devis);
    }
}