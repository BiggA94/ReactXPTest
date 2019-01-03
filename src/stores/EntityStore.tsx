import {autoSubscribe, AutoSubscribeStore, StoreBase} from 'resub';
import {EntityHandler} from './EntityHandler';

@AutoSubscribeStore
export class EntityStore<b> extends StoreBase {
    entityHandler: EntityHandler<b>;

    constructor(throttleMs: number | undefined, bypassTriggerBlocks: boolean, entityStore: EntityHandler<b>) {
        super(throttleMs, bypassTriggerBlocks);

        // reset map and ids
        this.entityHandler = entityStore;
    }

    @autoSubscribe
    public getAll(): b[] {
        return this.entityHandler.getAll();
    }

    public addAll(entities: b[]) {
        for (let i = 0; i < entities.length; i++) {
            const entityHandlerElement = entities[i];
            this.entityHandler.addOne(entityHandlerElement);
        }

        this.trigger();
    }

}
