import {getRepository} from "typeorm";
import {Client} from "../entity/Client";
import {Request, Response} from "express";

export class ClientController {
    static async createClient(request: Request, response: Response) {
        const clientRepository = getRepository(Client);

        const {prenom, nom, mail, adress, codePostal, telephone, ville, statutPro} = request.body;

        const client = new Client();
        client.firstName = prenom;
        client.lastName = nom;
        client.email = mail;
        client.adress = adress;
        client.zip_code = codePostal;
        client.phone_number = telephone;
        client.city = ville;
        client.pro_status = statutPro;

        try {
            await clientRepository.save(client);
        } catch(err) {
            return response.status(400).json({message: "Une erreur est survenue", err})
        }

        response.send(client);
    }

    static all = async (request: Request, response: Response) => {
        const clientRepository = getRepository(Client);
        const clients = await clientRepository.findAndCount();

        response.send(clients);
    }
}