import {createEntityStore} from './EntityStore';
import {SampleObject2} from '../models/SampleObject2';

export * from './SampleStore';

export const SampleStore2 = createEntityStore<SampleObject2>(0, false, (so2) => so2.id);