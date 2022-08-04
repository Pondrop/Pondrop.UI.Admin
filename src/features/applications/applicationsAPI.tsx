import { applications } from 'assets/data/tableData';
import { IApplications } from 'models';

export function fetchApplications() {
  return new Promise<{ data: IApplications[] }>((resolve) => setTimeout(() => resolve({ data: applications }), 800));
}
