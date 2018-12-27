import {autoSubscribe, AutoSubscribeStore, StoreBase} from 'resub';
import {SampleObject} from '../models/SampleObject';


@AutoSubscribeStore
class SampleStore extends StoreBase {
    private _sampleObjects: SampleObject[] = [{text: "TestText"}];

    @autoSubscribe
    public getSampleObjects() {
        return this._sampleObjects;
    }


}

export default new SampleStore();