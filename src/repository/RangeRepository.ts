import {EntityRepository, Repository} from "typeorm";
import {Range} from "../entity/Range";

@EntityRepository(Range)
export class RangeRepository extends Repository<Range> {
    async findLastOne() {
        return await this.createQueryBuilder("range")
            .limit(1)
            .orderBy('range.id', 'DESC')
            .getOne();
    }
}