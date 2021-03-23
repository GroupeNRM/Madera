import {EntitySubscriberInterface, EventSubscriber, getConnection, InsertEvent} from "typeorm";
import {Activity} from "../entity/Activity";
import {Client} from "../entity/Client";

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client> {


    /**
     * Indicates that this subscriber only listen to Client events.
     */
    listenTo() {
        return Client;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Client>) {
        const activityRepository = getConnection().getRepository(Client);
        let newActivity = new Activity();
        newActivity.libelle = event.entity.email;
        newActivity.emitter = "Client";

        try {
            await activityRepository.save(newActivity);
            console.log("saved new activity")
        } catch (e) {
            console.log("Une erreur est survenue lors de l'enregistrement de l'activité.");
            console.log(e);
        }
    }
}