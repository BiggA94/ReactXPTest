import {autoSubscribe, AutoSubscribeStore, StoreBase} from 'resub';
import {EntityHandler} from './EntityHandler';

@AutoSubscribeStore
export class EntityStore<b> extends StoreBase {
    protected entityHandler: EntityHandler<b>;

    constructor(throttleMs: number | undefined, bypassTriggerBlocks: boolean, entityHandler: EntityHandler<b>) {
        super(throttleMs, bypassTriggerBlocks);

        // reset map and ids
        this.entityHandler = entityHandler;
    }

    @autoSubscribe
    public getAll(): b[] {
        return this.entityHandler.getAll();
    }

    @autoSubscribe
    public getOne(id: number): b | undefined {
        // TODO: fix non working @key in front of id param
        return this.entityHandler.getOne(id);
    }

    public addOne(entity: b) {
        this.entityHandler.addOne(entity);
        this.trigger();
    }

    public addAll(entities: b[]) {
        StoreBase.pushTriggerBlock();
        for (const entity of entities) {
            this.entityHandler.addOne(entity);
        }

        this.trigger();
        StoreBase.popTriggerBlock();
    }
}

export function createEntityStore<entity>(throttleMs: number | undefined, bypassTriggerBlocks: boolean, selectId: (entity: entity) => number) {
    return new EntityStore<entity>(throttleMs, bypassTriggerBlocks, new EntityHandler(selectId));
}
