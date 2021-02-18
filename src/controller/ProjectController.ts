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

    static findOneById = async (request: Request, response: Response) => {
        const projectRepository = getRepository(Project);
        let project: Project;

        try {
            project = await projectRepository.findOneOrFail(request.params.id, {
                select: ["id", "client", "devis", "libelle", "dateCreation"]
            });
        } catch (e) {
            return response.status(404).send({message: "Project not found"})
        }

        response.send(project);
    }
}