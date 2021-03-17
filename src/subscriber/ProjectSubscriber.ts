import {EntitySubscriberInterface, EventSubscriber, getConnection, InsertEvent} from "typeorm";
import {Project} from "../entity/Project";
import {Activity} from "../entity/Activity";

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {


    /**
     * Indicates that this subscriber only listen to Project events.
     */
    listenTo() {
        return Project;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Project>) {
        const activityRepository = getConnection().getRepository(Activity);
        let newActivity = new Activity();
        newActivity.libelle = event.entity.libelle;
        newActivity.emitter = "Projet";

        try {
            await activityRepository.save(newActivity);
        } catch (e) {
            console.log("Une erreur est survenue lors de l'enregistrement de l'activité.");
        }
    }
}