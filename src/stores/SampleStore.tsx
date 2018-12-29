import {autoSubscribe, AutoSubscribeStore, StoreBase} from 'resub';
import {SampleObject} from '../models/SampleObject';

@AutoSubscribeStore
class SampleStore extends StoreBase {
    private _sampleObjects: SampleObject[] = [];

    constructor(throttleMs: number | undefined, bypassTriggerBlocks: boolean, sampleObjects: SampleObject[]) {
        super(throttleMs, bypassTriggerBlocks);
        this._sampleObjects = sampleObjects;

        for (let i = 0; i < 50; i++) {
            this._sampleObjects.push({text: 'test' + i});
        }
    }

    @autoSubscribe
    public getSampleObjects() {
        return this._sampleObjects;
    }

}

export default new SampleStore(0, false, []);
