

export interface HideoutItem {
    hideoutStations: HideoutItem[];
    id:        string;
    name:      string;
    imageLink: string;
    levels:    Level[];
    currentStationLvl : number
}

export interface Level {
    level:                    number;
    stationLevelRequirements: StationLevelRequirement[];
    itemRequirements:         ItemRequirement[];
}

export interface ItemRequirement {
    id: string ;
    quantity: number;
    item:     Item;
}

export interface Item {
    tarkovId : string;
    quantity : ItemRequirement["quantity"]
    name:     string;
    iconLink: string;
}



export interface StationLevelRequirement {
    station: Station;
    level:   number;
}

export interface Station {
    name: string;
}

