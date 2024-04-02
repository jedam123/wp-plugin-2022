export interface FormsData {
  id: number;
  button_label: string;
  default_style: string;
  font_color: string;
  button_color: string;
  button_hover: string;
  success_message: string;
  error_message: string;
  already_exist_message: string;
  privacy_policy_message: string;
  api_key: string;
  field_required_message: string;
}

export interface FieldsData {
  id: number;
  field_label: string;
  fields_map: string;
  form_id: number;
  timestamp: string;
  regex: string;
  required: boolean;
  validate_text: string;
  slug: string;
}
