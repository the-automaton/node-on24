
export interface ListEventParams {
  startDate?: string;
  endDate?: string;
  dateInterval?: number;
  dateIntervalOffset?: number;
  dateIntervalTimezone?: string;
  includeSubaccounts?: 'Y' | 'N';
  subaccounts?: string;
  dateFilterMode?: 'goodafter' | 'updated' | 'creation' | 'livestart' | 'liveend' | 'archivestart' | 'archiveend';
  filterOrder?: 'asc' | 'desc';
  includeInactive?: 'Y' | 'N';
  contentType?: 'all' | 'experience' | 'gateway' | 'pdf' | 'video' | 'webcast' | 'webpage';
  itemsPerPage?: number;
  pageOffset?: number;
};

export interface ListEventResult {
  totalevents: number;
  events: Record<string, any>[];
};

export interface ListEventRegistrantParams {
  startDate?: string;
  endDate?: string;
  dateInterval?: number;
  dateIntervalOffset?: number;
  dateIntervalTimezone?: string;
  excludeSubaccounts?: 'N' | 'Y';
  subaccounts?: string;
  pageOffset?: number;
  itemsPerPage?: number;
  partnerref?: string;
  userStatus?: 'all' | 'any' | 'deleted' | 'forgotten';
  email?: string;
  noshow?: 'N' | 'Y';
  excludeLive?: 'N' | 'Y';
  filterforgotten?: 'N' | 'Y';
  excludeAnonymous?: 'N' | 'Y';
};

export interface ListEventRegistrantResult {
  eventid: number;
  totalregistrants: number;
  registrants: Record<string, any>[];
};

export interface RegistrationField {
  fieldid: string;
  fieldcaption: string;
  fieldtype: string;
  validationtype: string;
  required: 'Y' | 'N';
  options?: string[];
}

export interface GetEventRegistrationFieldsResult {
  registrationfields: RegistrationField[];
};

export interface Registrant {
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
  exteventusercd?: string;
  company?: string;
  jobtitle?: string;
  addressstreet1?: string;
  addressstreet2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  workphone?: string;
  homephone?: string;
  fax?: string;
  companyindustry?: string;
  companysize?: string;
  eventemail?: string;
  marketingemail?: string;
  partnerref?: string;
  std1?: string;
  std2?: string;
  std3?: string;
  std4?: string;
  std5?: string;
  std6?: string;
  std7?: string;
  std8?: string;
  std9?: string;
  std10?: string;
  other?: string;
  notes?: string;
  emailformat?: string;
};

export interface UpdateRegistrantResult {
  updatedregistrants: number[];
};

export interface ForgetRegistrantResult {
  deletedregistrants: Record<string, any>;
};
