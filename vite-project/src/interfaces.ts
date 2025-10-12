import { HousingType } from "./enums";

export interface MaintenanceTask {
  id: number;
  title: string;
  description?: string;
  housingTypes: HousingType[];
  relevantMonths: number[];
}
