import {SampleObject} from '../models/SampleObject';
import {EntityStore} from './EntityStore';
import {EntityHandler} from './EntityHandler';
import {autoSubscribeWithKey} from 'resub';

const SELECT_ENTITY = 'select';

class SampleStore extends EntityStore<SampleObject> {

    private selectedItem: number | undefined;

    constructor() {
        super(0, false, new EntityHandler<SampleObject>((so) => so.id));

        // add some samples:
        for (let i = 0; i < 50; i++) {
            const entityId = i * 5;
            this.entityHandler.addOne({id: entityId, text: 'test' + entityId});
        }
    }

    public select(id: number) {
        this.selectedItem = id;
        this.trigger(SELECT_ENTITY);
    }

    @autoSubscribeWithKey(SELECT_ENTITY)
    public getSelected() {
        if (this.selectedItem != null) {
            return this.getOne(this.selectedItem);
        } else {
            return undefined;
        }
    }
}

export default new SampleStore();
