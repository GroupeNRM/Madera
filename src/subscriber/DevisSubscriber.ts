import {EntitySubscriberInterface, EventSubscriber, getConnection, InsertEvent} from "typeorm";
import {Devis} from "../entity/Devis";
import {Activity} from "../entity/Activity";

@EventSubscriber()
export class DevisSubscriber implements EntitySubscriberInterface<Devis> {


    /**
     * Indicates that this subscriber only listen to Devis events.
     */
    listenTo() {
        return Devis;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Devis>) {
        const activityRepository = getConnection().getRepository(Activity);
        let newActivity = new Activity();
        newActivity.libelle = event.entity.reference;
        newActivity.emitter = "Devis";

        try {
            await activityRepository.save(newActivity);
            console.log("saved new activity")

        } catch (e) {
            console.log("Une erreur est survenue lors de l'enregistrement de l'activité.");
        }
    }
}