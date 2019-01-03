export class EntityHandler<e> {
    constructor(selectId: (entity: e) => number) {
        this._selectId = selectId;
    }

    private _ids: number[] = [];
    private _entities: Map<number, e> = new Map();

    private _selectId: (entity: e) => number;

    // TODO: sort function
    private _sortFn = (entity1: e, entity2: e) => this._selectId(entity1) - this._selectId(entity2);

    public addOne(entity: e) {
        const id = this._selectId(entity);
        this._ids.push(id);
        this._entities.set(id, entity);
    }

    public getAll(): e[] {
        // TODO: should return immutable copy
        // @ts-ignore
        return Array.from(this._entities, ([id, entity]) => entity).sort(this._sortFn);
    }
}
