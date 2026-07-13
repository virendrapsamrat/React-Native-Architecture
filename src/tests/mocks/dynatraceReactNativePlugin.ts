export enum DataCollectionLevel {
  Off,
  Performance,
  User,
  UserBehavior,
}

export class UserPrivacyOptions {
  constructor(
    public dataCollectionLevel: DataCollectionLevel,
    public crashReportingOptedIn: boolean,
    public screenRecordOptedIn = false,
  ) {}
}

export class EventData {
  addEventProperty = () => this;
  withDuration = () => this;
}

export const Dynatrace = {
  applyUserPrivacyOptions: jest.fn(),
  endSession: jest.fn(),
  identifyUser: jest.fn(),
  reportErrorStacktrace: jest.fn(),
  sendEvent: jest.fn(),
  startView: jest.fn(),
};
