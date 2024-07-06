export interface Station {
    id:                     number;
    uid:                    string;
    name:                   string;
    level:                  number;
    imageLink:              string;
    stationItems:           StationItem[];
    stationLvlRequirements: StationLvlRequirement[];
}

export interface StationItem {
    id:        number;
    stationId: number;
    itemId:    number;
    quantity:  number;
    item:      Item;
}

export interface Item {
    id:       number;
    uid:      string;
    name:     string;
    iconLink: string;
}

export interface StationLvlRequirement {
    id:                  number;
    requiredStationId:   string;
    requiredStationName: string;
    level:               number;
}
