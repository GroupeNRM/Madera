import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Project} from "../entity/Project";

export class ProjectController {
    static async createProject(request: Request, response: Response) {
        const projectRepository = getRepository(Project);

        const { client, devis, libelle, dateCreation } = request.body;

        const project = new Project();
        project.client = client;
        project.devis = devis;
        project.libelle = libelle;
        project.dateCreation = dateCreation;

        try {
            await projectRepository.save(project);
        } catch(err) {
            return response.status(400).json({message: "Une erreur est survenue", err})
        }

        response.send(project);
    }
}