import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetaData: EntityMetadataMap = {
    Post: {
        entityDispatcherOptions: {
            optimisticUpdate: true, // it will update data in local store without waiting for API response
        },
    },
};

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata: entityMetaData,
};
