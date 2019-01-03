import {SampleObject} from '../models/SampleObject';
import {EntityStore} from './EntityStore';
import {EntityHandler} from './EntityHandler';

class SampleStore extends EntityStore<SampleObject> {
    constructor() {
        super(0, false, new EntityHandler<SampleObject>((so) => so.id));

        // add some samples:
        for (let i = 0; i < 50; i++) {
            this.entityHandler.addOne({id: i*2, text: 'test' + i*2});
        }
    }
}

//export default new EntityStore<SampleObject>(0, false, new EntityHandler<SampleObject>());

export default new SampleStore();
