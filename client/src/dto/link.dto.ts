import {LinkInterface} from "./link.interface";

export type LinkDto = Omit<LinkInterface, 'id'>;
