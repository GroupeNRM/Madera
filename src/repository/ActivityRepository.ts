import {EntityRepository, Repository} from "typeorm";
import {Activity} from "../entity/Activity";

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {
    async findLastFive() {
        return await this.createQueryBuilder("activity")
            .limit(10)
            .getMany();
    }
}