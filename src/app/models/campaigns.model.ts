export interface CampaignsData {
  total: number;
  data: Campaigns[];
}

export interface Campaigns {
  id: number;
  name: string;
  status: string;
  created: string;
  from_email: string;
}
