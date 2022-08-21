export interface DialogData {
  heading: string;
  discount: string;
}

export interface ExistingTemplate {
  data: DialogData;
  key: number;
  css: string;
}
