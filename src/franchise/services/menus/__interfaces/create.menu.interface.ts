export interface CreateMenuI {
  client_document: string;
  client_id: string;
  client_name: string;
  event_ids: [];
  groups: { name: string; order: number; logo_image: any }[];
  name: string;
  promoter_document: string;
  promoter_id: string;
  promoter_name: string;
}
