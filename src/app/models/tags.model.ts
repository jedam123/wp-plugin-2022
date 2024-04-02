export interface Tags {
  id: number;
  slug: string;
  field_map: string;
  name: string;
  disabled?: boolean;
  required: boolean;
  validation_msg: string;
}
