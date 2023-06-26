import { Model } from '@aws-amplify/datastore-connector';


export class Media extends Model {
    id;
    name;
    url;
    type;
    createdAt;
    updatedAt;

    constructor(init) {
        super();
        Object.assign(this, init);
    }

    static copyOf(source, mutator) {
        return Object.assign(new this(), source, mutator);
    }
}
