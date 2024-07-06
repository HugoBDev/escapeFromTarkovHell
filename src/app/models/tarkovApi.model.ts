export interface Station {
    id:           number;
    uid:          string;
    name:         string;
    level:        number;
    imageLink:    string;
    stationItems: StationItem[];
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